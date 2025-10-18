import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function PaymentPage() {
  const [, setLocation] = useLocation();
  const [transaction, setTransaction] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Scroll to top quando a página carregar
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Pega ID da transação da URL
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('id');

    if (!transactionId) {
      setLocation('/');
      return;
    }

    // Primeiro tenta usar dados corretos do sessionStorage
    const savedPaymentData = sessionStorage.getItem('paymentData');
    if (savedPaymentData) {
      try {
        const paymentData = JSON.parse(savedPaymentData);
        setTransaction(paymentData);
        sessionStorage.removeItem('paymentData'); // Remove após usar
      } catch (error) {
        console.error('Erro ao parsear payment data:', error);
      }
    }

    // Busca dados da transação da API (pode estar errado por bug da API)
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/payments/${transactionId}`);
        if (response.ok) {
          const data = await response.json();
          const apiTransaction = data.data || data;
          
          // Se já temos dados salvos corretos, só atualiza status/expiry
          if (savedPaymentData) {
            const savedData = JSON.parse(savedPaymentData);
            setTransaction({
              ...savedData,
              status: apiTransaction.status,
              expires_at: apiTransaction.expires_at
            });
          } else {
            // Se não temos dados salvos, usa da API
            setTransaction(apiTransaction);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar transação:', error);
      }
    };

    fetchTransaction();

    // Verificação automática de status a cada 1 segundo
    const statusCheckInterval = setInterval(async () => {
      try {
        const statusResponse = await fetch(`/api/transactions/${transactionId}`);
        
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          
          console.log('🔍 Verificando status:', statusData.status);
          
          // Verifica se o pagamento foi confirmado
          if (statusData.status === 'paid') {
            console.log('✅ PAGAMENTO CONFIRMADO! Redirecionando para /taxa em 500ms...');
            clearInterval(statusCheckInterval);
            
            // Pequeno delay para garantir que o log aparece
            setTimeout(() => {
              window.location.href = '/taxa';
            }, 500);
          }
        }
      } catch (error) {
        // Falha silenciosa - não mostra nada ao usuário
      }
    }, 1000); // Verifica a cada 1 segundo

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(statusCheckInterval);
  }, [setLocation]);

  // Timer de expiração
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatExpiryDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const day = now.getDate();
    const month = now.toLocaleString('pt-BR', { month: 'short' });
    const year = now.getFullYear();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}, ${day} de ${month} ${year}`;
  };

  const handleCopyPixCode = () => {
    const pixCode = transaction?.pix_code || transaction?.pixCopiaECola;
    if (pixCode) {
      navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F52B56] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ maxWidth: '428px', margin: '0 auto' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200">
        <button onClick={() => setLocation('/')} className="mr-3">
          <i className="fas fa-chevron-left text-lg"></i>
        </button>
        <h1 className="text-lg font-semibold">Código do pagamento</h1>
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-4">
        {/* Status */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Aguardando o pagamento</h2>
              <p className="text-2xl font-semibold text-black">
                R$ {parseFloat(transaction.amount || '0').toFixed(2).replace('.', ',')}
              </p>
            </div>
            <div className="bg-orange-400 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-clock text-white text-xl"></i>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center text-sm mb-1">
              <span className="text-gray-600 font-normal">Vence em</span>
              <span className="ml-2 bg-[#F52B56] text-white px-2 py-0.5 rounded font-semibold">
                {formatTime(timeLeft)}
              </span>
            </div>
            <p className="text-sm text-gray-600 font-normal">
              Prazo <span className="font-normal text-black">{formatExpiryDate()}</span>
            </p>
          </div>
        </div>

        {/* QR Code e Código PIX */}
        <div className="bg-white rounded-lg p-4">
          {/* Logo PIX centralizado */}
          <div className="flex justify-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg" 
              alt="PIX - Banco Central" 
              className="h-8"
            />
          </div>

          {/* QR Code */}
          {(transaction.pix_code || transaction.pix_qr_code) && (
            <div className="flex justify-center mb-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(transaction.pix_code || transaction.pix_qr_code)}`}
                alt="QR Code PIX" 
                className="w-48 h-48 object-contain"
              />
            </div>
          )}

          {/* Código PIX */}
          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-2 break-all font-mono max-h-12 overflow-hidden">
              {transaction.pix_code || transaction.pixCopiaECola || '00020101021226870014br.gov...'}
            </p>
          </div>

          {/* Botão Copiar */}
          <button
            onClick={handleCopyPixCode}
            className={`w-full ${copied ? 'bg-green-500' : 'bg-[#F52B56]'} text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors`}
            data-testid="button-copy-pix"
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} mr-2`}></i>
            {copied ? 'Copiado!' : 'Copiar'}
          </button>

          {/* Passo a passo */}
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <h4 className="text-sm font-semibold mb-2 text-gray-900">Como pagar com PIX Copia e Cola:</h4>
            <ol className="space-y-2">
              <li className="flex items-start text-xs text-gray-700 font-normal">
                <span className="bg-[#F52B56] text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs font-semibold">1</span>
                <span>Clique no botão "Copiar" acima para copiar o código PIX</span>
              </li>
              <li className="flex items-start text-xs text-gray-700 font-normal">
                <span className="bg-[#F52B56] text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs font-semibold">2</span>
                <span>Abra o app do seu banco e vá em PIX</span>
              </li>
              <li className="flex items-start text-xs text-gray-700 font-normal">
                <span className="bg-[#F52B56] text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs font-semibold">3</span>
                <span>Escolha a opção "Pix Copia e Cola" ou "Pagar com código"</span>
              </li>
              <li className="flex items-start text-xs text-gray-700 font-normal">
                <span className="bg-[#F52B56] text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs font-semibold">4</span>
                <span>Cole o código copiado e confirme o pagamento</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="mt-4 bg-white rounded-lg p-4">
          <h3 className="font-semibold mb-3">Resumo do pedido</h3>
          <div className="flex items-center mb-4">
            <img 
              src="https://ae-pic-a1.aliexpress-media.com/kf/S964945ee819e41c68c769ba1eccbc8981.jpg_640x640q75.jpg_.avif"
              alt="Buggy controle remoto a gasolina"
              className="w-20 h-20 object-contain rounded mr-3"
            />
            <div className="flex-1">
              <p className="text-sm font-normal mb-1">
                Buggy Controle remoto a Gasolina Com Bolsa Off Road 29cc
              </p>
              <p className="text-lg font-semibold text-[#F52B56]">
                R$ {parseFloat(transaction.amount || '0').toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>

          {/* Informações de Entrega */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <i className="fas fa-truck text-gray-600 mr-2"></i>
                <span className="text-sm text-gray-700 font-normal">Estimativa de entrega</span>
              </div>
              <span className="text-sm font-normal text-gray-900">3 a 4 dias</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-500 mr-2 font-normal">Enviado via</span>
              <img 
                src="https://cdn.cookielaw.org/logos/ca573dc2-6848-4d5d-811b-a73af38af8db/351dcc81-561f-44be-ad95-966e6f1bb905/f0416ebe-67db-4d95-aee0-56e49a2678f4/logo_jadlog.png"
                alt="Jadlog"
                className="h-5 object-contain"
              />
            </div>
          </div>
        </div>
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

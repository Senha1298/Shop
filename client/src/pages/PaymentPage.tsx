import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

export default function PaymentPage() {
  const [, setLocation] = useLocation();
  const [transaction, setTransaction] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(24 * 3600); // 24 horas em segundos
  const [copied, setCopied] = useState(false);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Pega ID da transação da URL
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('id');

    if (!transactionId) {
      setLocation('/');
      return;
    }

    // Busca dados da transação
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`https://app.4mpagamentos.com/api/v1/payments/${transactionId}`, {
          headers: {
            'Authorization': 'Bearer 3mpag_p7czqd3yk_mfr1pvd2'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTransaction(data);
        }
      } catch (error) {
        console.error('Erro ao buscar transação:', error);
      }
    };

    fetchTransaction();

    // Verifica status a cada 1 segundo
    const checkStatus = async () => {
      try {
        const response = await fetch(`https://app.4mpagamentos.com/api/v1/payments/${transactionId}`, {
          headers: {
            'Authorization': 'Bearer 3mpag_p7czqd3yk_mfr1pvd2'
          }
        });
        if (response.ok) {
          const data = await response.json();
          
          if (data.status === 'paid') {
            // Pagamento aprovado - redireciona para /taxa
            if (checkIntervalRef.current) {
              clearInterval(checkIntervalRef.current);
            }
            setTimeout(() => {
              window.location.href = '/taxa';
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
      }
    };

    checkIntervalRef.current = setInterval(checkStatus, 1000); // Verifica a cada 1 segundo

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
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
    now.setHours(now.getHours() + 24);
    const day = now.getDate();
    const month = now.toLocaleString('pt-BR', { month: 'short' });
    const year = now.getFullYear();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}, ${day} de ${month} ${year}`;
  };

  const handleCopyPixCode = () => {
    if (transaction?.pixCopiaECola) {
      navigator.clipboard.writeText(transaction.pixCopiaECola);
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
              <h2 className="text-xl font-bold mb-1">Aguardando o pagamento</h2>
              <p className="text-2xl font-bold text-black">
                R$ {transaction.amount?.toFixed(2).replace('.', ',')}
              </p>
            </div>
            <div className="bg-orange-400 rounded-full p-3">
              <i className="fas fa-clock text-white text-xl"></i>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center text-sm mb-1">
              <span className="text-gray-600">Vence em</span>
              <span className="ml-2 bg-[#F52B56] text-white px-2 py-0.5 rounded font-semibold">
                {formatTime(timeLeft)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Prazo <span className="font-medium text-black">{formatExpiryDate()}</span>
            </p>
          </div>
        </div>

        {/* QR Code e Código PIX */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Pix_logo.svg/1200px-Pix_logo.svg.png" 
              alt="PIX" 
              className="w-12 h-12 mr-2"
            />
            <span className="text-lg font-semibold">PIX</span>
          </div>

          {/* QR Code */}
          {transaction.pixQrCode && (
            <div className="flex justify-center mb-4">
              <img 
                src={transaction.pixQrCode} 
                alt="QR Code PIX" 
                className="w-48 h-48"
              />
            </div>
          )}

          {/* Código PIX */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2 break-all font-mono">
              {transaction.pixCopiaECola || '00020101021226870014br.gov...'}
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
        </div>

        {/* Instruções */}
        <div className="mt-4 bg-white rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-3">
            Para acessar esta página no app, abra Loja &gt; Pedidos &gt; Sem pagamento &gt; Visualizar o código
          </p>

          <h3 className="font-semibold mb-2">Como fazer pagamentos com PIX?</h3>
          <p className="text-sm text-gray-600">
            Copie o código de pagamento acima, selecione Pix no seu app de internet ou de banco e cole o código.
          </p>
        </div>
      </div>
    </div>
  );
}

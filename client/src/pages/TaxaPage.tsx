import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function TaxaPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center" style={{ maxWidth: '428px', margin: '0 auto' }}>
      <div className="text-center px-6">
        {/* Ícone de sucesso */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-check text-white text-5xl"></i>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-black mb-3">
          Pagamento Aprovado!
        </h1>

        {/* Mensagem */}
        <p className="text-gray-600 mb-8">
          Seu pagamento foi confirmado com sucesso. Obrigado pela sua compra!
        </p>

        {/* Botão voltar */}
        <button
          onClick={() => setLocation('/')}
          className="bg-[#F52B56] text-white font-semibold py-3 px-8 rounded-lg"
          data-testid="button-back-home"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
}

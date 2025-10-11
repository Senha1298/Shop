import { useState, useEffect } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

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
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button onClick={onClose} className="mr-3">
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          <h2 className="text-lg font-semibold flex-1">Resumo do pedido</h2>
        </div>

        {/* Cupom esgotado */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center text-sm" style={{ color: '#8B6914' }}>
            <span className="mr-1">🎁</span>
            <span className="font-medium">Cupom de produto esgotado</span>
          </div>
          <i className="fas fa-chevron-right text-sm" style={{ color: '#8B6914' }}></i>
        </div>

        {/* Avaliação */}
        <div className="px-4 py-2 flex items-center text-sm" style={{ color: '#8B6914' }}>
          <span className="mr-1">⭐</span>
          <span className="font-medium">Altamente avaliado! 4.6/5</span>
        </div>

        {/* Produto */}
        <div className="px-4 py-3 flex items-start border-b border-gray-200">
          <img 
            src="https://i.ibb.co/mFB188wc/Captura-de-Tela-2025-10-11-a-s-15-39-55.png"
            alt="Mini máquina de lavar"
            className="w-24 h-24 object-contain mr-3"
          />
          <div className="flex-1">
            <h3 className="text-sm font-normal mb-1">
              Mini máquina de lavar roupa portátil dobrá...
            </h3>
            <p className="text-xs text-gray-500 mb-2">ROXO COM CESTO 6,5L</p>
            <div className="flex items-center text-xs mb-2" style={{ color: '#8B6914' }}>
              <span className="mr-1">📦</span>
              <span>Devolução gratuita</span>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-lg font-semibold text-[#F52B56] mr-2">R$ 101,40</span>
              <span className="text-xs text-gray-400 line-through mr-1">R$ 350,00</span>
              <span className="text-xs text-[#F52B56]">-71%</span>
            </div>
            <div className="flex items-center justify-end">
              <button className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center">
                <i className="fas fa-minus text-xs"></i>
              </button>
              <input 
                type="text" 
                value="1" 
                readOnly
                className="w-10 text-center mx-2 text-sm"
              />
              <button className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center">
                <i className="fas fa-plus text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Entrega */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Receba até 14-18 de out</span>
            <span className="text-sm font-semibold">R$ 22,60</span>
          </div>
          <span className="text-xs text-gray-500">Envio padrão</span>
        </div>

        {/* Desconto TikTok */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-ticket-alt text-[#F52B56] mr-2"></i>
            <span className="text-sm font-medium">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-[#F52B56] mr-2">- R$ 11,27</span>
            <i className="fas fa-chevron-right text-sm text-gray-400"></i>
          </div>
        </div>

        {/* CEP e Endereço */}
        <div className="px-4 py-3">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">CEP</label>
            <input 
              type="text"
              placeholder=""
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">ENDEREÇO</label>
            <input 
              type="text"
              placeholder=""
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Espaçador para fixar o footer */}
        <div className="h-48"></div>

        {/* Footer fixo */}
        <div className="fixed bottom-0 bg-white border-t border-gray-200 w-full" style={{ maxWidth: '428px' }}>
          {/* Total e economia */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-semibold">Total</span>
              <span className="text-lg font-bold">R$ 124,00</span>
            </div>
            <div className="flex items-center text-sm px-2 py-1 rounded" style={{ color: '#F52B56', backgroundColor: '#FFF0F3' }}>
              <span className="mr-1">😊</span>
              <span>Você está economizando R$ 248,60 nesse pedido.</span>
            </div>
          </div>

          {/* Total final e botão */}
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-medium">Total (1 item)</span>
              <span className="text-xl font-bold text-[#F52B56]">R$ 124,00</span>
            </div>
            <button className="w-full bg-[#F52B56] text-white font-semibold py-3 rounded-lg">
              <div className="text-base">Fazer pedido</div>
              <div className="text-xs mt-1">O cupom expira em 06:46:32</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

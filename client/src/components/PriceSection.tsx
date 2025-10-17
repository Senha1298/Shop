import { getDeliveryDateRange } from '@/utils/deliveryDate';

export default function PriceSection() {
  const deliveryRange = getDeliveryDateRange();

  return (
    <div className="px-4 pt-3 pb-2" style={{ maxWidth: '428px' }}>
      <div className="flex items-center space-x-2">
        <span className="bg-[#F52B56] text-white text-sm font-bold px-2 py-0.5 rounded">
          -50%
        </span>
        <span className="flex items-end">
          <span className="text-[#F52B56] text-sm font-semibold leading-tight" style={{ marginBottom: '2px' }}>
            A partir de&nbsp;
          </span>
          <span className="text-[#F52B56] text-2xl font-semibold leading-none">
            R$ 139,90
          </span>
        </span>
        <i className="fas fa-ticket-alt text-[#F52B56] text-sm"></i>
        <span className="flex items-center text-[#e0e0e0] line-through text-sm font-normal whitespace-nowrap">
          R$ 279,90
        </span>
      </div>
      
      <div className="text-sm text-[#757575] mt-1" style={{ fontWeight: 400 }}>
        2x R$ 69,95
        <span className="text-[#F52B56]">
          {' '}sem juros
        </span>
      </div>
      
      <div className="mt-1 font-normal inline-block rounded px-2 py-1" style={{ background: '#FDE5EA' }}>
        <span className="text-[#F52B56] text-sm flex items-center">
          <i className="fas fa-ticket-alt mr-1"></i>
          Desconto de 10%, máximo de R$ 25
        </span>
      </div>
      
      <div className="mt-2 font-bold text-base leading-5 text-black">
        Buggy Controle remoto a Gasolina Com Bolsa Off Road 29cc
      </div>
      
      <div className="flex items-center mt-1">
        <span className="text-[#ffb400] text-sm">
          <i className="fas fa-star"></i>
        </span>
        <span className="text-[#ffb400] text-sm">
          <i className="fas fa-star"></i>
        </span>
        <span className="text-[#ffb400] text-sm">
          <i className="fas fa-star"></i>
        </span>
        <span className="text-[#ffb400] text-sm">
          <i className="fas fa-star"></i>
        </span>
        <span className="text-[#ffb400] text-sm">
          <i className="fas fa-star-half-alt"></i>
        </span>
        <span className="ml-1 text-black text-sm" style={{ fontWeight: 400 }}>
          4.6
        </span>
        <span className="ml-1 text-[#757575] text-sm" style={{ fontWeight: 400 }}>
          (32)
        </span>
        <span className="ml-2 text-[#757575] text-sm" style={{ fontWeight: 400 }}>
          233 vendidos
        </span>
      </div>
      
      <div className="flex flex-col mt-2">
        <div className="flex items-center text-sm">
          <img 
            src="https://i.ibb.co/prWkcTnx/Captura-de-Tela-2025-10-11-a-s-15-32-27-removebg-preview.png" 
            alt="Ícone de caminhão de entrega com fundo transparente" 
            className="w-5 h-5 mr-2 object-contain"
          />
          <span className="text-black font-normal">
            Receba até {deliveryRange}
          </span>
        </div>
        <div className="pl-7 text-sm text-[#757575] mt-0.5 font-normal">
          Taxa de envio: R$ 9,90
        </div>
      </div>
      
      <div className="flex items-center mt-3 space-x-2">
        <button 
          type="button" 
          className="rounded-full border-4 border-[#F52B56] p-0.5 focus:outline-none"
        >
          <img 
            alt="Buggy controle remoto a gasolina vermelho, vista frontal, fundo branco" 
            className="w-8 h-8 rounded-full object-cover" 
            height="32" 
            src="https://ae-pic-a1.aliexpress-media.com/kf/S964945ee819e41c68c769ba1eccbc8981.jpg_640x640q75.jpg_.avif" 
            width="32"
          />
        </button>
        <span className="text-sm text-black ml-2 font-normal">
          VERMELHO
        </span>
      </div>
    </div>
  );
}

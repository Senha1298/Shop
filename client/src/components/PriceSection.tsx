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
          R$ 279,80
        </span>
      </div>
      
      <div className="text-sm text-[#757575] mt-1" style={{ fontWeight: 400 }}>
        12x R$ 11,66
        <span className="text-[#F52B56]">
          {' '}sem juros
        </span>
      </div>
      
      <div className="mt-1 font-normal inline-block rounded px-2 py-1" style={{ background: '#FDE5EA' }}>
        <span className="text-[#F52B56] text-sm flex items-center">
          <i className="fas fa-ticket-alt mr-1"></i>
          Desconto de 10%, máximo de R$ 14
        </span>
      </div>
      
      <div className="mt-2 font-bold text-base leading-5 text-black">
        Escavadeira Infantil Elétrica 12V Mini Trator com Controle Remoto
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
          4.8
        </span>
        <span className="ml-1 text-[#757575] text-sm" style={{ fontWeight: 400 }}>
          (127)
        </span>
        <span className="ml-2 text-[#757575] text-sm" style={{ fontWeight: 400 }}>
          584 vendidos
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
          <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-500"></div>
        </button>
        <span className="text-sm text-black ml-2 font-normal">
          AMARELO
        </span>
      </div>
    </div>
  );
}

export default function PriceSection() {
  return (
    <div className="px-4 pt-3 pb-2" style={{ maxWidth: '428px' }}>
      <div className="flex items-center space-x-2">
        <span className="bg-[#F52B56] text-white text-sm font-semibold px-2 py-0.5 rounded">
          -73%
        </span>
        <span className="flex items-end">
          <span className="text-[#F52B56] text-sm font-bold leading-tight" style={{ marginBottom: '2px' }}>
            A partir de&nbsp;
          </span>
          <span className="text-[#F52B56] text-3xl font-bold leading-none">
            R$ 94,20
          </span>
        </span>
        <i className="fas fa-ticket-alt text-[#F52B56] text-sm"></i>
        <span className="flex items-center text-[#e0e0e0] line-through text-sm font-normal whitespace-nowrap">
          R$ 350,00
        </span>
      </div>
      
      <div className="text-sm text-[#757575] mt-1">
        2x R$ 47,10
        <span className="text-[#F52B56]">
          {' '}sem juros
        </span>
      </div>
      
      <div className="mt-1 font-medium inline-block rounded px-2 py-1" style={{ background: '#FDE5EA' }}>
        <span className="text-[#F52B56] text-sm flex items-center">
          <i className="fas fa-ticket-alt mr-1"></i>
          Desconto de 10%, máximo de R$ 25
        </span>
      </div>
      
      <div className="mt-2 font-semibold text-base leading-5 text-black">
        Mini máquina de lavar roupa portátil dobrável moderna máquina de lavar automática roupa inte...
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
        <span className="ml-1 text-black text-sm font-medium">
          4.6
        </span>
        <span className="ml-1 text-[#757575] text-sm">
          (32)
        </span>
        <span className="ml-2 text-[#757575] text-sm">
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
          <span className="text-black">
            Receba até 14–18 de out
          </span>
        </div>
        <div className="pl-7 text-sm text-[#757575] mt-0.5">
          Taxa de envio: R$ 22,60
        </div>
      </div>
      
      <div className="flex items-center mt-3 space-x-2">
        <button 
          type="button" 
          className="rounded-full border-4 border-[#F52B56] p-0.5 focus:outline-none"
        >
          <img 
            alt="Mini máquina de lavar cor roxa, vista frontal, fundo branco" 
            className="w-8 h-8 rounded-full object-cover" 
            height="32" 
            src="https://down-br.img.susercontent.com/file/br-11134207-7r98o-m2dab30m5z755d.webp" 
            width="32"
          />
        </button>
        <span className="text-sm text-black ml-2 font-semibold">
          ROXO
        </span>
      </div>
    </div>
  );
}

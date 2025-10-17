export default function ReviewsSection() {
  const reviews = [
    {
      name: "Carlos Eduardo Silva",
      rating: 5,
      variant: "VERMELHO",
      comment: "Produto incrível! O buggy é potente, robusto e muito divertido. O motor a gasolina 29cc tem muita força e a bolsa de transporte é super prática. Chegou antes do prazo e muito bem embalado. Recomendo!",
      image: "https://i.ytimg.com/vi/EZKnLCubXHM/maxresdefault.jpg"
    },
    {
      name: "Mariana Costa",
      rating: 5,
      variant: "VERMELHO",
      comment: "Comprei para meu filho e ele amou! A qualidade é excelente, o controle remoto é preciso e o buggy aguenta bem terrenos difíceis. Vale muito a pena!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStfzIW_SybyKMNzECCYW8wdQ_AgMPqndH-m0RnsAVuRr6dDSbIt9ze5SOMJB2t_00VAkU&usqp=CAU"
    },
    {
      name: "Roberto Almeida",
      rating: 5,
      variant: "VERMELHO",
      comment: "Excelente custo benefício! O buggy é muito bem construído, o motor é potente e econômico. A suspensão funciona muito bem em terrenos irregulares. Estou muito satisfeito!",
      image: "https://makerworld.bblmw.com/makerworld/model/US1f5ee8e63c5277/design/2024-11-12_b97c4be59dd95.jpg?x-oss-process=image/resize,w_400/format,webp"
    },
    {
      name: "Ana Paula Rodrigues",
      rating: 5,
      variant: "VERMELHO",
      comment: "Produto de altíssima qualidade! Meu marido está adorando. O acabamento é perfeito, o motor funciona perfeitamente e a velocidade é surpreendente. Entrega rápida!",
      image: "https://cache.willhaben.at/mmo/2/191/005/6182_-1974736377_hoved.jpg"
    },
    {
      name: "Lucas Ferreira",
      rating: 5,
      variant: "VERMELHO",
      comment: "Simplesmente perfeito! O buggy tem muita potência, a construção é sólida e resistente. A bolsa facilita muito o transporte. Melhor compra que fiz este ano!",
      image: "https://img.olx.com.br/images/18/180579196977419.jpg"
    }
  ];

  return (
    <div className="px-4 py-3" style={{ maxWidth: '428px' }}>
      <div className="text-base font-semibold mb-2 text-black">
        Avaliações dos clientes (32)
      </div>
      
      <div className="flex items-center mb-3">
        <span className="text-[#ffb400] text-base">
          <i className="fas fa-star"></i>
        </span>
        <span className="text-[#ffb400] text-base">
          <i className="fas fa-star"></i>
        </span>
        <span className="text-[#ffb400] text-base">
          <i className="fas fa-star"></i>
        </span>
        <span className="text-[#ffb400] text-base">
          <i className="fas fa-star"></i>
        </span>
        <span className="text-[#ffb400] text-base">
          <i className="fas fa-star-half-alt"></i>
        </span>
        <span className="ml-2 text-black text-sm font-normal">
          4.6
        </span>
        <span className="ml-2 text-[#757575] text-sm font-normal">
          /5
        </span>
      </div>
      
      {reviews.map((review, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center text-sm text-[#757575] mb-2 font-normal">
            <span className="mr-2">
              {review.name}
            </span>
          </div>
          
          <div className="flex items-center mb-1">
            {[...Array(review.rating)].map((_, i) => (
              <span key={i} className="text-[#ffb400] text-sm">
                <i className="fas fa-star"></i>
              </span>
            ))}
          </div>
          
          <div className="text-sm text-[#757575] mb-1 font-normal">
            Item: {review.variant}
          </div>
          
          <div className="text-sm text-black mb-2 font-normal">
            {review.comment}
          </div>
          
          <div className="flex space-x-2 mb-2">
            <img 
              alt={`Foto real do buggy controle remoto a gasolina vermelho - avaliação ${index + 1}`}
              className="w-14 h-14 rounded object-cover border border-[#e0e0e0]" 
              height="56" 
              src={review.image}
              width="56"
            />
          </div>
        </div>
      ))}

      {/* Separador */}
      <div className="border-t-8 border-gray-100 my-4"></div>

      {/* Avaliações da Loja */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-black">
            Avaliações da loja (12,8 mil)
          </h3>
          <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="bg-gray-100 text-black text-xs px-2.5 py-1 rounded">
            Embalagem de qualidade (1)
          </span>
          <span className="bg-gray-100 text-black text-xs px-2.5 py-1 rounded">
            Ótimo valor (1)
          </span>
        </div>
      </div>

      {/* Separador */}
      <div className="border-t-8 border-gray-100 mb-4"></div>

      {/* Info da Loja */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://raichu-uploads.s3.amazonaws.com/logo_busca-busca_8uXZzc.png"
            alt="Logo Busca Busca"
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <h4 className="text-sm font-semibold text-black mb-0.5">
              Busca Busca
            </h4>
            <p className="text-xs text-gray-500">
              68.8K vendido(s)
            </p>
          </div>
        </div>
        <button className="bg-gray-100 text-black font-medium text-xs px-5 py-1.5 rounded-md">
          Visitar
        </button>
      </div>
    </div>
  );
}

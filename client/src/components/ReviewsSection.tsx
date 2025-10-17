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
        <span className="ml-2 text-black text-sm font-semibold">
          4.6
        </span>
        <span className="ml-2 text-[#757575] text-sm">
          /5
        </span>
      </div>
      
      {reviews.map((review, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center text-sm text-[#757575] mb-2">
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
          
          <div className="text-sm text-[#757575] mb-1">
            Item: {review.variant}
          </div>
          
          <div className="text-sm text-black mb-2">
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
    </div>
  );
}

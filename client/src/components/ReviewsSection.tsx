declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Carlos Eduardo Silva",
      rating: 5,
      variant: "AMARELO",
      comment: "Produto incrível! Minha filha de 3 anos amou a escavadeira. A bateria dura bastante, o controle remoto funciona perfeitamente e a qualidade é excelente. Chegou antes do prazo e muito bem embalado. Recomendo!",
      image: "https://ireland.apollo.olxcdn.com/v1/files/ca1sp3l69jzz1-PL/image;s=1080x1080"
    },
    {
      name: "Mariana Costa",
      rating: 5,
      variant: "AMARELO",
      comment: "Comprei para meu filho e ele não para de brincar! A escavadeira é robusta, segura e muito divertida. O braço da escavadeira funciona de verdade e ele adora. Vale muito a pena!",
      image: "https://ridecars.nl/cdn/shop/files/Elektrische_kinder_graafmachine_24_volt_-_RideCars-6911012_1000x750.jpg?v=1736430651"
    },
    {
      name: "Roberto Almeida",
      rating: 5,
      variant: "AMARELO",
      comment: "Excelente custo benefício! A escavadeira elétrica é muito bem construída, a bateria 12V tem boa autonomia e o carregador é bivolt. Meu neto está adorando brincar. Estou muito satisfeito!",
      image: "https://ireland.apollo.olxcdn.com/v1/files/tbgfmxpoycit2-PL/image;s=1080x1080"
    },
    {
      name: "Ana Paula Rodrigues",
      rating: 5,
      variant: "AMARELO",
      comment: "Produto de altíssima qualidade! Meu filho está adorando. O acabamento é perfeito, todas as funções funcionam bem (buzina, luzes, músicas) e é muito seguro. Entrega rápida!",
      image: "https://img12.360buyimg.com/n1/jfs/t1/275231/24/17184/350071/67f39553Fb5a7da53/94725fa61b996cc3.jpg"
    },
    {
      name: "Lucas Ferreira",
      rating: 5,
      variant: "AMARELO",
      comment: "Simplesmente perfeito! A escavadeira tem controle remoto parental para emergências, a construção é sólida e resistente. Minha filha se diverte muito e está desenvolvendo coordenação motora. Melhor compra!",
      image: "https://svkinderautos.nl/assets/uploads/autos/Elektrische-Kinderauto-Graafmachine-Geel7463.jpg"
    }
  ];

  return (
    <div className="px-4 py-3" style={{ maxWidth: '428px' }}>
      <div className="text-base font-bold mb-2 text-black">
        Avaliações dos clientes (127)
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
          <i className="fas fa-star"></i>
        </span>
        <span className="ml-2 text-black text-sm font-normal">
          4.8
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
              alt={`Foto real da escavadeira infantil elétrica 12V amarela - avaliação ${index + 1}`}
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
          <h3 className="text-base font-bold text-black">
            Avaliações da loja (12,8 mil)
          </h3>
          <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="bg-gray-100 text-black text-xs font-normal px-2.5 py-1 rounded">
            Embalagem de qualidade (1)
          </span>
          <span className="bg-gray-100 text-black text-xs font-normal px-2.5 py-1 rounded">
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
            <h4 className="text-sm font-bold text-black mb-0.5">
              Busca Busca
            </h4>
            <p className="text-xs text-gray-500">
              68.8K vendido(s)
            </p>
          </div>
        </div>
        <button className="bg-gray-100 text-black font-semibold text-xs px-5 py-1.5 rounded-md">
          Visitar
        </button>
      </div>

    </div>
  );
}

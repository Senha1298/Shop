import { useState, useEffect } from 'react';
import ImageCarousel from '@/components/ImageCarousel';
import PriceSection from '@/components/PriceSection';
import OffersSection from '@/components/OffersSection';
import ReviewsSection from '@/components/ReviewsSection';
import DescriptionSection from '@/components/DescriptionSection';

export default function ProductPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const images = [
    {
      src: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m2dab30m5z755d.webp",
      alt: "Mini máquina de lavar roupa portátil dobrável cor roxa, vista frontal, produto inteiro, fundo branco"
    },
    {
      src: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m2d9v0et8iticf.webp",
      alt: "Mini máquina de lavar roupa portátil dobrável cor roxa, vista lateral, produto inteiro, fundo branco"
    },
    {
      src: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m2dab30mlf7q60.webp",
      alt: "Mini máquina de lavar roupa portátil dobrável cor roxa, vista superior, produto inteiro, fundo branco"
    },
    {
      src: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m2d9v0et9xdyf9.webp",
      alt: "Mini máquina de lavar roupa portátil dobrável cor roxa, detalhes do interior, fundo branco"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-black min-h-screen overflow-hidden">
      <div 
        className="transition-all duration-700 ease-out"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(100vh)',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* Header */}
        <div className="fixed top-0 left-0 w-full z-30 bg-white flex items-center justify-between px-3 pt-3 pb-2" style={{ maxWidth: '428px' }}>
          <div className="flex items-center space-x-3">
            <i className="fas fa-times text-2xl"></i>
          </div>
          <div className="flex items-center space-x-5">
            <img 
              src="https://i.ibb.co/wNscKnC6/Captura-de-Tela-2025-10-11-a-s-15-49-56.png" 
              alt="Barra de ícones de ação: compartilhar, carrinho e menu, estilizados em fundo branco" 
              className="w-24 h-7 object-contain"
            />
          </div>
        </div>

        {/* Main Image Carousel */}
        <ImageCarousel images={images} />

        {/* Price and Title */}
        <PriceSection />

        {/* Banner institucional */}
        <div style={{ maxWidth: '428px' }}>
          <img 
            src="https://i.ibb.co/KjxGK14n/IMG-7372-1.jpg" 
            alt="Banner promocional ou institucional da loja" 
            className="w-full object-cover"
          />
        </div>

        {/* Ofertas */}
        <OffersSection />

        {/* Avaliações */}
        <ReviewsSection />

        {/* Descrição */}
        <DescriptionSection />
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white flex items-center justify-between px-4 py-3 z-40" style={{ maxWidth: '428px' }}>
        <div className="flex items-center">
          <img 
            src="https://i.ibb.co/mFB188wc/Captura-de-Tela-2025-10-11-a-s-15-39-55.png" 
            alt="Ícone institucional da loja, fundo branco, símbolo dourado" 
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="flex items-center space-x-2 ml-6">
          <button className="bg-[#F2F2F2] text-black font-semibold text-xs rounded-lg px-1 py-2 shadow-sm">
            Adicionar ao carrinho
          </button>
          <button className="bg-[#F52B56] text-white font-semibold text-xs rounded-lg px-1 py-2 shadow-sm ml-0">
            Comprar com cupom
          </button>
        </div>
      </div>

      {/* Floating Up Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-24 right-4 bg-white border border-[#e0e0e0] shadow-lg rounded-full w-10 h-10 flex items-center justify-center z-50"
      >
        <i className="fas fa-arrow-up text-xl text-[#757575]"></i>
      </button>
    </div>
  );
}

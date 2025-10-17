import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import ImageCarousel from '@/components/ImageCarousel';
import PriceSection from '@/components/PriceSection';
import OffersSection from '@/components/OffersSection';
import ReviewsSection from '@/components/ReviewsSection';
import DescriptionSection from '@/components/DescriptionSection';

export default function ProductPage() {
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [showCouponMessage, setShowCouponMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleApplyCoupon = () => {
    setShowCouponMessage(true);
    setTimeout(() => {
      setShowCouponMessage(false);
      setLocation('/checkout?cupom=true');
    }, 1500);
  };

  const handleGoToCheckout = () => {
    setLocation('/checkout');
  };

  const images = [
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/S964945ee819e41c68c769ba1eccbc8981.jpg_640x640q75.jpg_.avif",
      alt: "Buggy controle remoto a gasolina vermelho, vista frontal, produto completo, fundo branco"
    },
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/S3edcac9db7944c9186d550d2b625e239A.jpg_640x640q75.jpg_.avif",
      alt: "Buggy controle remoto a gasolina vermelho, vista lateral, produto completo, fundo branco"
    },
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/S3911ca6e90304ce1a881631d30ec103a8.jpg_640x640q75.jpg_.avif",
      alt: "Buggy controle remoto a gasolina vermelho, vista superior, detalhes do chassi, fundo branco"
    },
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/Sd9b4a29817aa4c05b36ea06d8c43238bj.jpg_640x640q75.jpg_.avif",
      alt: "Buggy controle remoto a gasolina vermelho, detalhes do motor, fundo branco"
    },
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/S08be454ef1064d878b6e75c062193b9eU.jpg_640x640q75.jpg_.avif",
      alt: "Buggy controle remoto a gasolina vermelho com bolsa de transporte, fundo branco"
    },
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/S2169cbd4881e4ed188a2f5c0f3e15d97X.jpg_640x640q75.jpg_.avif",
      alt: "Buggy controle remoto a gasolina vermelho, close-up dos detalhes, fundo branco"
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
        <OffersSection onApplyCoupon={handleApplyCoupon} couponApplied={false} />

        {/* Avaliações */}
        <ReviewsSection />

        {/* Descrição */}
        <DescriptionSection />
      </div>

      {/* Floating Action Bar */}
      <div className="fixed left-0 w-full bg-white flex items-center justify-between px-4 py-2 z-40" style={{ maxWidth: '428px', bottom: '-10px' }}>
        <div className="flex items-center">
          <img 
            src="https://i.ibb.co/mFB188wc/Captura-de-Tela-2025-10-11-a-s-15-39-55.png" 
            alt="Ícone institucional da loja, fundo branco, símbolo dourado" 
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="flex items-center space-x-2 ml-6">
          <button 
            onClick={handleGoToCheckout}
            className="bg-[#F2F2F2] text-black font-semibold text-sm rounded-lg px-2 py-2.5 shadow-sm"
            data-testid="button-add-cart"
          >
            Adicionar ao carrinho
          </button>
          <button 
            onClick={handleGoToCheckout}
            className="bg-[#F52B56] text-white font-semibold text-sm rounded-lg px-2 py-2.5 shadow-sm ml-0"
            data-testid="button-buy-coupon"
          >
            Comprar com cupom
          </button>
        </div>
      </div>

      {/* Mensagem de cupom aplicado */}
      {showCouponMessage && (
        <div className="fixed top-20 left-0 right-0 mx-auto bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce text-center" style={{ maxWidth: '380px', width: 'calc(100% - 32px)' }}>
          <div className="flex items-center justify-center">
            <i className="fas fa-check-circle mr-2"></i>
            <span className="font-semibold">Cupom de 10% aplicado com sucesso!</span>
          </div>
        </div>
      )}

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

interface OffersSectionProps {
  onApplyCoupon: () => void;
  couponApplied: boolean;
}

export default function OffersSection({ onApplyCoupon, couponApplied }: OffersSectionProps) {
  return (
    <div className="px-4 py-3 border-b border-[#f5e6d6] bg-white" style={{ maxWidth: '428px' }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-black">
            10% OFF
          </div>
          <div className="text-[10px] text-[#757575] font-normal">
            nos pedidos acima de R$ 39
          </div>
        </div>
        <button 
          onClick={onApplyCoupon}
          disabled={couponApplied}
          className={`${couponApplied ? 'bg-gray-400' : 'bg-[#F52B56]'} text-white text-[10px] font-semibold px-4 py-1 rounded`}
        >
          {couponApplied ? 'Resgatado' : 'Resgatar'}
        </button>
      </div>
    </div>
  );
}

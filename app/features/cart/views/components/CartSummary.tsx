interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function CartSummary({ totalItems, totalPrice, onCheckout, onClearCart }: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-white mb-4">주문 요약</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-300">
          <span>총 상품 수량</span>
          <span>{totalItems}개</span>
        </div>
        
        <div className="border-t border-gray-700 pt-3">
          <div className="flex justify-between text-lg font-semibold text-white">
            <span>총 결제 금액</span>
            <span>{formatPrice(totalPrice)}원</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onCheckout}
          disabled={totalItems === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {totalItems === 0 ? '장바구니가 비어있습니다' : '결제하기'}
        </button>
        
        {totalItems > 0 && (
          <button
            onClick={onClearCart}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            장바구니 비우기
          </button>
        )}
      </div>
    </div>
  );
}
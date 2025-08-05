'use client';

import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { useCart } from '../../view-models/useCart';

export function CartList() {
  const {
    items,
    totalItems,
    totalPrice,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const handleCheckout = () => {
    alert('결제 기능은 준비 중입니다.');
  };

  const handleClearCart = () => {
    if (confirm('장바구니를 비우시겠습니까?')) {
      clearCart();
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-20 h-28 bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 rounded-lg p-6 h-fit">
            <div className="space-y-4">
              <div className="h-6 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-100">
          <h3 className="font-semibold mb-2">오류가 발생했습니다</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            장바구니가 비어있습니다
          </h2>
          <p className="text-gray-400 mb-6">
            영화를 선택하여 장바구니에 추가해보세요
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            영화 보러가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <CartSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
            onClearCart={handleClearCart}
          />
        </div>
      </div>
    </div>
  );
}
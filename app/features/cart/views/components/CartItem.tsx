import Image from 'next/image';
import { CartItem as CartItemType } from '../../models/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex gap-4">
      <div className="flex-shrink-0">
        <Image
          src={item.movie.posterImgUrl}
          alt={item.movie.title}
          width={80}
          height={120}
          className="rounded-lg object-cover"
        />
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{item.movie.title}</h3>
            <p className="text-sm text-gray-400">{item.movie.subTitle}</p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-400 hover:text-red-300 transition-colors p-1"
            aria-label="장바구니에서 제거"
          >
            ✕
          </button>
        </div>

        <div className="space-y-1 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <span className="font-medium">상영일:</span>
            <span>{formatDate(item.selectedDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">상영시간:</span>
            <span>{item.selectedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">좌석:</span>
            <span>{item.selectedSeats.join(', ')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-400">
              수량:
            </label>
            <select
              id={`quantity-${item.id}`}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400">
              개당 {formatPrice(item.price)}원
            </div>
            <div className="text-lg font-semibold text-white">
              {formatPrice(item.price * item.quantity)}원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
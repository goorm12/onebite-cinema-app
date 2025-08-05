'use client';

import Link from 'next/link';
import { CartList } from '../components/CartList';

export function CartPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">장바구니</h1>
            <p className="text-gray-400">
              선택하신 영화 티켓을 확인하고 결제해보세요
            </p>
          </div>
          
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            쇼핑 계속하기
          </Link>
        </div>

        <CartList />
      </div>
    </div>
  );
}
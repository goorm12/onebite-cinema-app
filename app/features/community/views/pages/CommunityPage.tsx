'use client';

import Link from 'next/link';
import { CommunityList } from '../components/CommunityList';

export function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">영화 커뮤니티</h1>
          <p className="text-gray-400">
            영화에 대한 다양한 이야기를 나누어보세요
          </p>
        </div>
        
        <Link
          href="/community/write"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          글쓰기
        </Link>
      </div>

      <CommunityList />
    </div>
  );
}
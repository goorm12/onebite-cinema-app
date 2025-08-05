'use client';

import { CommunityCategory } from '../../models/community';

interface CommunityFilterProps {
  selectedCategory?: CommunityCategory;
  searchQuery: string;
  onCategoryChange: (category: CommunityCategory | undefined) => void;
  onSearchChange: (query: string) => void;
}

export function CommunityFilter({
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange
}: CommunityFilterProps) {
  const categories = [
    { value: undefined, label: '전체' },
    { value: 'general' as const, label: '일반' },
    { value: 'review' as const, label: '리뷰' },
    { value: 'discussion' as const, label: '토론' },
    { value: 'news' as const, label: '뉴스' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.label}
              onClick={() => onCategoryChange(category.value)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="게시글 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
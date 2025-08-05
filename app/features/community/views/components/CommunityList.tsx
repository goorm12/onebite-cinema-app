'use client';

import { CommunityPostItem } from './CommunityPostItem';
import { CommunityFilter } from './CommunityFilter';
import { useCommunityList } from '../../view-models/useCommunityList';

export function CommunityList() {
  const {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    selectedCategory,
    searchQuery,
    setCategory,
    setSearchQuery,
    goToPage
  } = useCommunityList();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-100">
        <h3 className="font-semibold mb-2">오류가 발생했습니다</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CommunityFilter
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={setCategory}
        onSearchChange={setSearchQuery}
      />

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>게시글이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <CommunityPostItem key={post.id} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
import Link from 'next/link';
import { CommunityPost } from '../../models/community';

interface CommunityPostItemProps {
  post: CommunityPost;
}

export function CommunityPostItem({ post }: CommunityPostItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryBadge = (category: string) => {
    const categoryMap = {
      general: { label: '일반', color: 'bg-gray-500' },
      review: { label: '리뷰', color: 'bg-blue-500' },
      discussion: { label: '토론', color: 'bg-green-500' },
      news: { label: '뉴스', color: 'bg-red-500' }
    };

    const categoryInfo = categoryMap[category as keyof typeof categoryMap] || categoryMap.general;
    
    return (
      <span className={`inline-block px-2 py-1 text-xs text-white rounded ${categoryInfo.color}`}>
        {categoryInfo.label}
      </span>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {getCategoryBadge(post.category)}
          <span className="text-sm text-gray-400">{post.author}</span>
        </div>
        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
      </div>
      
      <Link href={`/community/${post.id}`} className="block">
        <h3 className="text-lg font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {post.content}
        </p>
      </Link>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            ❤️ {post.likes}
          </span>
          <span className="flex items-center gap-1">
            👁️ {post.views}
          </span>
          <span className="flex items-center gap-1">
            💬 {post.comments}
          </span>
        </div>
      </div>
    </div>
  );
}
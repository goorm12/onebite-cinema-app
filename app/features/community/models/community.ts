export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  comments: number;
  category: CommunityCategory;
}

export interface CommunityComment {
  id: number;
  postId: number;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
}

export type CommunityCategory = 'general' | 'review' | 'discussion' | 'news';

export interface CommunityListParams {
  category?: CommunityCategory;
  page?: number;
  limit?: number;
  search?: string;
}

export interface CommunityListResponse {
  posts: CommunityPost[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
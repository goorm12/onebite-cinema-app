import { CommunityPost, CommunityListParams, CommunityListResponse } from '../models/community';

export class CommunityService {
  private static baseUrl = '/api/community';

  static async getCommunityPosts(params: CommunityListParams = {}): Promise<CommunityListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.category) searchParams.set('category', params.category);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.search) searchParams.set('search', params.search);

    const url = `${this.baseUrl}/posts?${searchParams.toString()}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch community posts:', error);
      return this.getMockData();
    }
  }

  static async getPostById(id: number): Promise<CommunityPost | null> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch post:', error);
      return null;
    }
  }

  private static getMockData(): CommunityListResponse {
    const mockPosts: CommunityPost[] = [
      {
        id: 1,
        title: "영화 추천해주세요!",
        content: "요즘 볼만한 영화 있을까요?",
        author: "movie_lover",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z",
        likes: 12,
        views: 156,
        comments: 8,
        category: "general"
      },
      {
        id: 2,
        title: "아바타 2 보신 분?",
        content: "아바타 2 어떤지 궁금합니다.",
        author: "cinema_fan",
        createdAt: "2024-01-14T15:20:00Z",
        updatedAt: "2024-01-14T15:20:00Z",
        likes: 24,
        views: 298,
        comments: 15,
        category: "review"
      },
      {
        id: 3,
        title: "올해 최고의 영화는?",
        content: "2024년 개봉작 중 최고의 영화를 뽑아봅시다.",
        author: "film_critic",
        createdAt: "2024-01-13T09:45:00Z",
        updatedAt: "2024-01-13T09:45:00Z",
        likes: 35,
        views: 412,
        comments: 22,
        category: "discussion"
      }
    ];

    return {
      posts: mockPosts,
      totalCount: mockPosts.length,
      currentPage: 1,
      totalPages: 1
    };
  }
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import { CommunityPost, CommunityListParams, CommunityCategory } from '../models/community';
import { CommunityService } from '../services/communityService';

interface UseCommunityListState {
  posts: CommunityPost[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  selectedCategory: CommunityCategory | undefined;
  searchQuery: string;
}

interface UseCommunityListActions {
  fetchPosts: (params?: CommunityListParams) => Promise<void>;
  setCategory: (category: CommunityCategory | undefined) => void;
  setSearchQuery: (query: string) => void;
  goToPage: (page: number) => void;
  refresh: () => void;
}

export function useCommunityList(): UseCommunityListState & UseCommunityListActions {
  const [state, setState] = useState<UseCommunityListState>({
    posts: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    selectedCategory: undefined,
    searchQuery: ''
  });

  const fetchPosts = useCallback(async (params?: CommunityListParams) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await CommunityService.getCommunityPosts({
        page: state.currentPage,
        limit: 10,
        category: state.selectedCategory,
        search: state.searchQuery,
        ...params
      });

      setState(prev => ({
        ...prev,
        posts: response.posts,
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch posts',
        loading: false
      }));
    }
  }, [state.currentPage, state.selectedCategory, state.searchQuery]);

  const setCategory = useCallback((category: CommunityCategory | undefined) => {
    setState(prev => ({ ...prev, selectedCategory: category, currentPage: 1 }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query, currentPage: 1 }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const refresh = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [state.currentPage, state.selectedCategory, state.searchQuery]);

  return {
    ...state,
    fetchPosts,
    setCategory,
    setSearchQuery,
    goToPage,
    refresh
  };
}
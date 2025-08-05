'use client';

import { useCallback } from 'react';
import { useStudentStore } from './useStudentStore';
import { StudentListParams } from '../types/student';

/**
 * 학생 목록 관리를 위한 커스텀 훅
 * Zustand 스토어를 구독하고 학생 관련 액션들을 제공합니다.
 * 
 * @returns 학생 목록 상태와 액션 함수들
 */
export function useStudentList() {
  // Zustand 선택적 구독 사용 (CLAUDE.md 컨벤션)
  const studentList = useStudentStore(state => state.studentList);
  const isLoading = useStudentStore(state => state.isLoading);
  const hasError = useStudentStore(state => state.hasError);
  const errorMessage = useStudentStore(state => state.errorMessage);
  const currentPage = useStudentStore(state => state.currentPage);
  const totalPages = useStudentStore(state => state.totalPages);
  const totalCount = useStudentStore(state => state.totalCount);
  const selectedStudentIds = useStudentStore(state => state.selectedStudentIds);
  const currentParams = useStudentStore(state => state.currentParams);
  
  // 액션 함수들
  const fetchStudentList = useStudentStore(state => state.fetchStudentList);
  const deleteStudent = useStudentStore(state => state.deleteStudent);
  const deleteMultipleStudents = useStudentStore(state => state.deleteMultipleStudents);
  const toggleStudentSelection = useStudentStore(state => state.toggleStudentSelection);
  const toggleAllStudentsSelection = useStudentStore(state => state.toggleAllStudentsSelection);
  const clearSelection = useStudentStore(state => state.clearSelection);
  const clearError = useStudentStore(state => state.clearError);

  /**
   * 페이지를 변경하는 함수
   * @param page - 이동할 페이지 번호
   */
  const goToPage = useCallback((page: number) => {
    fetchStudentList({ ...currentParams, page });
  }, [fetchStudentList, currentParams]);

  /**
   * 검색을 수행하는 함수
   * @param searchKeyword - 검색할 키워드
   */
  const searchStudents = useCallback((searchKeyword: string) => {
    fetchStudentList({ ...currentParams, search: searchKeyword, page: 1 });
  }, [fetchStudentList, currentParams]);

  /**
   * 필터를 적용하는 함수
   * @param filterParams - 필터 파라미터
   */
  const applyFilters = useCallback((filterParams: Partial<StudentListParams>) => {
    fetchStudentList({ ...currentParams, ...filterParams, page: 1 });
  }, [fetchStudentList, currentParams]);

  /**
   * 정렬을 변경하는 함수
   * @param sortBy - 정렬 기준
   * @param sortOrder - 정렬 순서
   */
  const changeSorting = useCallback((
    sortBy: StudentListParams['sortBy'],
    sortOrder: StudentListParams['sortOrder'] = 'asc'
  ) => {
    fetchStudentList({ ...currentParams, sortBy, sortOrder });
  }, [fetchStudentList, currentParams]);

  /**
   * 필터를 초기화하는 함수
   */
  const resetFilters = useCallback(() => {
    fetchStudentList({ page: 1, limit: currentParams.limit });
  }, [fetchStudentList, currentParams.limit]);

  /**
   * 선택된 학생들을 삭제하는 함수
   * @throws Error - 삭제 실패 시
   */
  const deleteSelectedStudents = useCallback(async () => {
    if (selectedStudentIds.length === 0) {
      throw new Error('삭제할 학생을 선택해주세요.');
    }
    
    await deleteMultipleStudents(selectedStudentIds);
  }, [deleteMultipleStudents, selectedStudentIds]);

  /**
   * 현재 페이지의 모든 학생이 선택되었는지 확인하는 함수
   * @returns boolean - 모든 학생이 선택되었는지 여부
   */
  const isAllStudentsSelected = useCallback(() => {
    if (studentList.length === 0) return false;
    return studentList.every(student => selectedStudentIds.includes(student.id));
  }, [studentList, selectedStudentIds]);

  /**
   * 일부 학생이 선택되었는지 확인하는 함수 (체크박스 indeterminate 상태용)
   * @returns boolean - 일부 학생이 선택되었는지 여부
   */
  const isSomeStudentsSelected = useCallback(() => {
    const selectedCount = studentList.filter(student => selectedStudentIds.includes(student.id)).length;
    return selectedCount > 0 && selectedCount < studentList.length;
  }, [studentList, selectedStudentIds]);

  return {
    // 상태
    studentList,
    isLoading,
    hasError,
    errorMessage,
    currentPage,
    totalPages,
    totalCount,
    selectedStudentIds,
    currentParams,
    
    // 액션 함수들
    fetchStudentList,
    deleteStudent,
    deleteSelectedStudents,
    toggleStudentSelection,
    toggleAllStudentsSelection,
    clearSelection,
    clearError,
    
    // 유틸리티 함수들
    goToPage,
    searchStudents,
    applyFilters,
    changeSorting,
    resetFilters,
    isAllStudentsSelected,
    isSomeStudentsSelected,
    
    // 계산된 값들
    hasSelectedStudents: selectedStudentIds.length > 0,
    selectedCount: selectedStudentIds.length,
    hasStudents: studentList.length > 0
  };
}
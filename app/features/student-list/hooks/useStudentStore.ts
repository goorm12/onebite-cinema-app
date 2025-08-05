'use client';

import { create } from 'zustand';
import { Student, StudentListParams, StudentListResponse } from '../types/student';
import { apiGetStudents, apiDeleteStudent } from '../api/studentApi';

/**
 * 학생 관리 스토어 상태 인터페이스
 */
interface StudentStoreState {
  /** 학생 목록 */
  studentList: Student[];
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 상태 */
  hasError: boolean;
  /** 에러 메시지 */
  errorMessage: string | null;
  /** 현재 페이지 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 전체 학생 수 */
  totalCount: number;
  /** 현재 검색 파라미터 */
  currentParams: StudentListParams;
  /** 선택된 학생 목록 */
  selectedStudentIds: number[];
}

/**
 * 학생 관리 스토어 액션 인터페이스
 */
interface StudentStoreActions {
  /** 학생 목록 조회 */
  fetchStudentList: (params?: StudentListParams) => Promise<void>;
  /** 학생 삭제 */
  deleteStudent: (studentId: number) => Promise<void>;
  /** 여러 학생 삭제 */
  deleteMultipleStudents: (studentIds: number[]) => Promise<void>;
  /** 학생 선택/해제 */
  toggleStudentSelection: (studentId: number) => void;
  /** 전체 학생 선택/해제 */
  toggleAllStudentsSelection: () => void;
  /** 선택 초기화 */
  clearSelection: () => void;
  /** 에러 상태 초기화 */
  clearError: () => void;
}

/**
 * 학생 관리를 위한 Zustand 스토어
 * 학생 목록 조회, 삭제, 선택 등의 상태를 관리합니다.
 */
export const useStudentStore = create<StudentStoreState & StudentStoreActions>((set, get) => ({
  // 초기 상태
  studentList: [],
  isLoading: false,
  hasError: false,
  errorMessage: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  currentParams: {},
  selectedStudentIds: [],

  /**
   * 학생 목록을 조회하는 액션
   * @param params - 조회 파라미터
   */
  fetchStudentList: async (params: StudentListParams = {}) => {
    const currentState = get();
    const mergedParams = { ...currentState.currentParams, ...params };
    
    set({ isLoading: true, hasError: false, errorMessage: null });
    
    try {
      const response: StudentListResponse = await apiGetStudents(mergedParams);
      
      set({
        studentList: response.students,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalCount: response.totalCount,
        currentParams: mergedParams,
        isLoading: false,
        selectedStudentIds: [] // 새로운 데이터 로드 시 선택 초기화
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '학생 목록을 불러오는데 실패했습니다.';
      
      set({
        isLoading: false,
        hasError: true,
        errorMessage
      });
      
      console.error('Failed to fetch student list:', error);
    }
  },

  /**
   * 특정 학생을 삭제하는 액션
   * @param studentId - 삭제할 학생 ID
   * @throws Error - 삭제 실패 시
   */
  deleteStudent: async (studentId: number) => {
    const currentState = get();
    
    set({ isLoading: true, hasError: false, errorMessage: null });
    
    try {
      await apiDeleteStudent(studentId);
      
      // 로컬 상태에서 삭제된 학생 제거
      const updatedStudentList = currentState.studentList.filter(student => student.id !== studentId);
      const updatedSelectedIds = currentState.selectedStudentIds.filter(id => id !== studentId);
      
      set({
        studentList: updatedStudentList,
        selectedStudentIds: updatedSelectedIds,
        totalCount: currentState.totalCount - 1,
        isLoading: false
      });
      
      // 현재 페이지에 학생이 없으면 이전 페이지로 이동
      if (updatedStudentList.length === 0 && currentState.currentPage > 1) {
        get().fetchStudentList({ ...currentState.currentParams, page: currentState.currentPage - 1 });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '학생 삭제에 실패했습니다.';
      
      set({
        isLoading: false,
        hasError: true,
        errorMessage
      });
      
      console.error('Failed to delete student:', error);
      throw error;
    }
  },

  /**
   * 여러 학생을 일괄 삭제하는 액션
   * @param studentIds - 삭제할 학생 ID 배열
   * @throws Error - 삭제 실패 시
   */
  deleteMultipleStudents: async (studentIds: number[]) => {
    const currentState = get();
    
    set({ isLoading: true, hasError: false, errorMessage: null });
    
    try {
      // 각 학생을 순차적으로 삭제 (실제 환경에서는 배치 삭제 API 사용 권장)
      await Promise.all(studentIds.map(id => apiDeleteStudent(id)));
      
      // 로컬 상태에서 삭제된 학생들 제거
      const updatedStudentList = currentState.studentList.filter(student => !studentIds.includes(student.id));
      
      set({
        studentList: updatedStudentList,
        selectedStudentIds: [],
        totalCount: currentState.totalCount - studentIds.length,
        isLoading: false
      });
      
      // 현재 페이지에 학생이 없으면 목록 다시 조회
      if (updatedStudentList.length === 0) {
        get().fetchStudentList(currentState.currentParams);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '학생 삭제에 실패했습니다.';
      
      set({
        isLoading: false,
        hasError: true,
        errorMessage
      });
      
      console.error('Failed to delete multiple students:', error);
      throw error;
    }
  },

  /**
   * 학생 선택/해제를 토글하는 액션
   * @param studentId - 토글할 학생 ID
   */
  toggleStudentSelection: (studentId: number) => {
    const currentState = get();
    const isSelected = currentState.selectedStudentIds.includes(studentId);
    
    if (isSelected) {
      set({
        selectedStudentIds: currentState.selectedStudentIds.filter(id => id !== studentId)
      });
    } else {
      set({
        selectedStudentIds: [...currentState.selectedStudentIds, studentId]
      });
    }
  },

  /**
   * 현재 페이지의 모든 학생 선택/해제를 토글하는 액션
   */
  toggleAllStudentsSelection: () => {
    const currentState = get();
    const currentPageStudentIds = currentState.studentList.map(student => student.id);
    const canSelectAll = currentPageStudentIds.some(id => !currentState.selectedStudentIds.includes(id));
    
    if (canSelectAll) {
      // 현재 페이지의 모든 학생을 선택에 추가
      const newSelectedIds = [
        ...currentState.selectedStudentIds.filter(id => !currentPageStudentIds.includes(id)),
        ...currentPageStudentIds
      ];
      set({ selectedStudentIds: newSelectedIds });
    } else {
      // 현재 페이지의 모든 학생을 선택에서 제거
      set({
        selectedStudentIds: currentState.selectedStudentIds.filter(id => !currentPageStudentIds.includes(id))
      });
    }
  },

  /**
   * 학생 선택을 모두 초기화하는 액션
   */
  clearSelection: () => {
    set({ selectedStudentIds: [] });
  },

  /**
   * 에러 상태를 초기화하는 액션
   */
  clearError: () => {
    set({ hasError: false, errorMessage: null });
  }
}));
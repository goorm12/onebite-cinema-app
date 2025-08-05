/**
 * 학생 정보를 나타내는 인터페이스
 */
export interface Student {
  /** 학생 고유 ID */
  id: number;
  /** 학생 이름 */
  name: string;
  /** 학생 이메일 */
  email: string;
  /** 학과명 */
  department: string;
  /** 학년 (1-4) */
  grade: number;
  /** 입학년도 */
  enrollmentYear: number;
  /** 학생 상태 */
  status: StudentStatus;
  /** 평점 (0.0 - 4.5) */
  gpa: number;
  /** 연락처 */
  phoneNumber: string;
  /** 생성일 */
  createdAt: string;
  /** 수정일 */
  updatedAt: string;
}

/**
 * 학생 상태 타입
 */
export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'suspended';

/**
 * 학생 목록 조회 파라미터
 */
export interface StudentListParams {
  /** 페이지 번호 (1부터 시작) */
  page?: number;
  /** 페이지당 항목 수 */
  limit?: number;
  /** 검색 키워드 */
  search?: string;
  /** 학과별 필터 */
  department?: string;
  /** 학년별 필터 */
  grade?: number;
  /** 상태별 필터 */
  status?: StudentStatus;
  /** 정렬 기준 */
  sortBy?: 'name' | 'gpa' | 'enrollmentYear' | 'createdAt';
  /** 정렬 순서 */
  sortOrder?: 'asc' | 'desc';
}

/**
 * 학생 목록 응답 인터페이스
 */
export interface StudentListResponse {
  /** 학생 목록 */
  students: Student[];
  /** 전체 학생 수 */
  totalCount: number;
  /** 현재 페이지 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지당 항목 수 */
  limit: number;
}

/**
 * 학생 생성 요청 인터페이스
 */
export interface CreateStudentRequest {
  /** 학생 이름 */
  name: string;
  /** 학생 이메일 */
  email: string;
  /** 학과명 */
  department: string;
  /** 학년 */
  grade: number;
  /** 입학년도 */
  enrollmentYear: number;
  /** 연락처 */
  phoneNumber: string;
}

/**
 * 최대 파일 크기 상수 (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
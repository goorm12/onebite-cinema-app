import { Student, StudentListParams, StudentListResponse, CreateStudentRequest } from '../types/student';

/**
 * 학생 목록을 조회하는 API 함수
 * @param params - 조회 파라미터
 * @returns Promise<StudentListResponse> - 학생 목록 응답
 * @throws Error - API 호출 실패 시
 */
export async function apiGetStudents(params: StudentListParams = {}): Promise<StudentListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.search) searchParams.set('search', params.search);
  if (params.department) searchParams.set('department', params.department);
  if (params.grade) searchParams.set('grade', params.grade.toString());
  if (params.status) searchParams.set('status', params.status);
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);

  const apiUrl = `/api/students?${searchParams.toString()}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch students:', error);
    // Mock 데이터 반환 (개발용)
    return getMockStudentData(params);
  }
}

/**
 * 특정 학생을 ID로 조회하는 API 함수
 * @param studentId - 학생 ID
 * @returns Promise<Student | null> - 학생 정보 또는 null
 * @throws Error - API 호출 실패 시
 */
export async function apiGetStudentById(studentId: number): Promise<Student | null> {
  try {
    const response = await fetch(`/api/students/${studentId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch student:', error);
    throw error;
  }
}

/**
 * 새 학생을 생성하는 API 함수
 * @param studentData - 학생 생성 데이터
 * @returns Promise<Student> - 생성된 학생 정보
 * @throws Error - API 호출 실패 시
 */
export async function apiCreateStudent(studentData: CreateStudentRequest): Promise<Student> {
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create student:', error);
    throw error;
  }
}

/**
 * 학생 정보를 삭제하는 API 함수
 * @param studentId - 삭제할 학생 ID
 * @returns Promise<void>
 * @throws Error - API 호출 실패 시
 */
export async function apiDeleteStudent(studentId: number): Promise<void> {
  try {
    const response = await fetch(`/api/students/${studentId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to delete student:', error);
    throw error;
  }
}

/**
 * 개발용 Mock 데이터를 생성하는 함수
 * @param params - 조회 파라미터
 * @returns StudentListResponse - Mock 학생 목록 응답
 */
function getMockStudentData(params: StudentListParams): StudentListResponse {
  const mockStudents: Student[] = [
    {
      id: 1,
      name: '김철수',
      email: 'kim.cheolsu@university.ac.kr',
      department: '컴퓨터공학과',
      grade: 3,
      enrollmentYear: 2022,
      status: 'active',
      gpa: 3.8,
      phoneNumber: '010-1234-5678',
      createdAt: '2022-03-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee.younghee@university.ac.kr',
      department: '경영학과',
      grade: 2,
      enrollmentYear: 2023,
      status: 'active',
      gpa: 4.2,
      phoneNumber: '010-2345-6789',
      createdAt: '2023-03-01T00:00:00Z',
      updatedAt: '2024-01-14T00:00:00Z'
    },
    {
      id: 3,
      name: '박민수',
      email: 'park.minsu@university.ac.kr',
      department: '기계공학과',
      grade: 4,
      enrollmentYear: 2021,
      status: 'graduated',
      gpa: 3.5,
      phoneNumber: '010-3456-7890',
      createdAt: '2021-03-01T00:00:00Z',
      updatedAt: '2024-01-13T00:00:00Z'
    },
    {
      id: 4,
      name: '정수진',
      email: 'jung.sujin@university.ac.kr',
      department: '화학과',
      grade: 1,
      enrollmentYear: 2024,
      status: 'active',
      gpa: 4.0,
      phoneNumber: '010-4567-8901',
      createdAt: '2024-03-01T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z'
    }
  ];

  // 필터링 로직 적용
  let filteredStudents = mockStudents;
  
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredStudents = filteredStudents.filter(student => 
      student.name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.department.toLowerCase().includes(searchLower)
    );
  }
  
  if (params.department) {
    filteredStudents = filteredStudents.filter(student => student.department === params.department);
  }
  
  if (params.grade) {
    filteredStudents = filteredStudents.filter(student => student.grade === params.grade);
  }
  
  if (params.status) {
    filteredStudents = filteredStudents.filter(student => student.status === params.status);
  }

  // 정렬 로직 적용
  if (params.sortBy) {
    filteredStudents.sort((a, b) => {
      const aValue = a[params.sortBy!];
      const bValue = b[params.sortBy!];
      const order = params.sortOrder === 'desc' ? -1 : 1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * order;
      }
      
      return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * order;
    });
  }

  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    students: filteredStudents.slice(startIndex, endIndex),
    totalCount: filteredStudents.length,
    currentPage: page,
    totalPages: Math.ceil(filteredStudents.length / limit),
    limit
  };
}
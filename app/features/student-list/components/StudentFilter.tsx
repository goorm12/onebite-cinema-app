'use client';

import { useState } from 'react';
import { StudentStatus, StudentListParams } from '../types/student';

/**
 * StudentFilter 컴포넌트의 Props 인터페이스
 */
interface StudentFilterProps {
  /** 현재 필터 파라미터 */
  currentParams: StudentListParams;
  /** 필터 변경 콜백 */
  onFilterChange: (params: Partial<StudentListParams>) => void;
  /** 필터 초기화 콜백 */
  onResetFilters: () => void;
}

/**
 * 학생 목록 필터링을 위한 컴포넌트
 * 검색, 학과, 학년, 상태별 필터링 기능을 제공합니다.
 * 
 * @param props - StudentFilter 컴포넌트 props
 * @returns JSX.Element - 필터 UI
 */
export function StudentFilter({ 
  currentParams, 
  onFilterChange, 
  onResetFilters 
}: StudentFilterProps) {
  
  // 로컬 검색 상태 관리 (디바운싱을 위해)
  const [localSearchValue, setLocalSearchValue] = useState(currentParams.search || '');

  /**
   * 사용 가능한 학과 목록
   * 실제 환경에서는 API에서 동적으로 가져오는 것이 좋습니다.
   */
  const availableDepartments = [
    '컴퓨터공학과',
    '경영학과',
    '기계공학과',
    '화학과',
    '전자공학과',
    '건축학과',
    '영어영문학과',
    '수학과'
  ];

  /**
   * 학생 상태 옵션 목록
   */
  const statusOptions: Array<{ value: StudentStatus; label: string }> = [
    { value: 'active', label: '재학' },
    { value: 'inactive', label: '휴학' },
    { value: 'graduated', label: '졸업' },
    { value: 'suspended', label: '제적' }
  ];

  /**
   * 검색어 입력 핸들러
   * @param value - 검색어
   */
  const handleSearchChange = (value: string) => {
    setLocalSearchValue(value);
    
    // 디바운싱: 입력 후 300ms 후에 실제 검색 실행
    const timeoutId = setTimeout(() => {
      onFilterChange({ search: value || undefined });
    }, 300);

    // 이전 타이머 클리어
    return () => clearTimeout(timeoutId);
  };

  /**
   * 학과 필터 변경 핸들러
   * @param department - 선택된 학과
   */
  const handleDepartmentChange = (department: string) => {
    onFilterChange({ department: department || undefined });
  };

  /**
   * 학년 필터 변경 핸들러
   * @param grade - 선택된 학년
   */
  const handleGradeChange = (grade: string) => {
    const gradeNumber = grade ? parseInt(grade) : undefined;
    onFilterChange({ grade: gradeNumber });
  };

  /**
   * 상태 필터 변경 핸들러
   * @param status - 선택된 상태
   */
  const handleStatusChange = (status: string) => {
    onFilterChange({ status: (status as StudentStatus) || undefined });
  };

  /**
   * 필터 초기화 핸들러
   */
  const handleResetFilters = () => {
    setLocalSearchValue('');
    onResetFilters();
  };

  /**
   * 현재 적용된 필터 개수를 계산하는 함수
   * @returns number - 적용된 필터 개수
   */
  const getActiveFilterCount = (): number => {
    let count = 0;
    if (currentParams.search) count++;
    if (currentParams.department) count++;
    if (currentParams.grade) count++;
    if (currentParams.status) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">학생 검색 및 필터</h2>
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {activeFilterCount}개 필터 적용됨
            </span>
            <button
              onClick={handleResetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              초기화
            </button>
          </div>
        )}
      </div>

      {/* 필터 컨트롤들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 검색 입력 */}
        <div className="lg:col-span-2">
          <label htmlFor="student-search" className="block text-sm font-medium text-gray-700 mb-1">
            학생 검색
          </label>
          <input
            id="student-search"
            type="text"
            value={localSearchValue}
            onChange={(e) => {
              setLocalSearchValue(e.target.value);
              handleSearchChange(e.target.value);
            }}
            placeholder="이름, 이메일, 학과로 검색..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 학과 필터 */}
        <div>
          <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">
            학과
          </label>
          <select
            id="department-filter"
            value={currentParams.department || ''}
            onChange={(e) => handleDepartmentChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">전체 학과</option>
            {availableDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* 학년 필터 */}
        <div>
          <label htmlFor="grade-filter" className="block text-sm font-medium text-gray-700 mb-1">
            학년
          </label>
          <select
            id="grade-filter"
            value={currentParams.grade?.toString() || ''}
            onChange={(e) => handleGradeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">전체 학년</option>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
          </select>
        </div>
      </div>

      {/* 두 번째 행: 상태 필터 */}
      <div className="mt-4">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          학생 상태
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusChange('')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              !currentParams.status 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                currentParams.status === option.value
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 활성 필터 표시 */}
      {activeFilterCount > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">적용된 필터:</span>
            {currentParams.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                검색: {currentParams.search}
                <button
                  onClick={() => onFilterChange({ search: undefined })}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {currentParams.department && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                학과: {currentParams.department}
                <button
                  onClick={() => onFilterChange({ department: undefined })}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {currentParams.grade && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                학년: {currentParams.grade}학년
                <button
                  onClick={() => onFilterChange({ grade: undefined })}
                  className="ml-1 text-yellow-600 hover:text-yellow-800"
                >
                  ×
                </button>
              </span>
            )}
            {currentParams.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                상태: {statusOptions.find(opt => opt.value === currentParams.status)?.label}
                <button
                  onClick={() => onFilterChange({ status: undefined })}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
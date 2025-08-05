'use client';

import { useEffect } from 'react';
import { StudentItem } from './StudentItem';
import { StudentFilter } from './StudentFilter';
import { useStudentList } from '../hooks/useStudentList';

/**
 * 학생 목록을 표시하고 관리하는 메인 컴포넌트
 * 필터링, 검색, 선택, 삭제 등의 기능을 제공합니다.
 * 
 * @returns JSX.Element - 학생 목록 UI
 */
export function StudentList() {
  const {
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
    hasSelectedStudents,
    selectedCount,
    hasStudents,
    
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
    applyFilters,
    resetFilters,
    isAllStudentsSelected,
    isSomeStudentsSelected
  } = useStudentList();

  /**
   * 컴포넌트 마운트 시 학생 목록 조회
   */
  useEffect(() => {
    fetchStudentList();
  }, [fetchStudentList]);

  /**
   * 선택된 학생들 삭제 핸들러
   * 확인 다이얼로그를 표시하고 삭제를 진행합니다.
   */
  const handleDeleteSelected = async () => {
    const shouldDelete = confirm(`선택된 ${selectedCount}명의 학생을 정말 삭제하시겠습니까?`);
    if (!shouldDelete) return;

    try {
      await deleteSelectedStudents();
      alert('선택된 학생들이 성공적으로 삭제되었습니다.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.';
      alert(message);
    }
  };

  /**
   * 개별 학생 삭제 핸들러
   * @param studentId - 삭제할 학생 ID
   */
  const handleDeleteStudent = async (studentId: number) => {
    try {
      await deleteStudent(studentId);
      alert('학생이 성공적으로 삭제되었습니다.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.';
      alert(message);
    }
  };

  /**
   * 페이지네이션 버튼들을 생성하는 함수
   * @returns JSX.Element[] - 페이지네이션 버튼 배열
   */
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // 끝 페이지가 전체 페이지보다 작으면 시작 페이지 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 이전 페이지 버튼
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700"
        >
          이전
        </button>
      );
    }

    // 페이지 번호 버튼들
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-2 text-sm font-medium border ${
            page === currentPage
              ? 'bg-blue-50 border-blue-500 text-blue-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          {page}
        </button>
      );
    }

    // 다음 페이지 버튼
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700"
        >
          다음
        </button>
      );
    }

    return buttons;
  };

  // 로딩 상태 렌더링
  if (isLoading && !hasStudents) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">학생 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 렌더링
  if (hasError) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">오류가 발생했습니다</h3>
              <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearError}
              className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition-colors"
            >
              오류 해제
            </button>
            <button
              onClick={() => fetchStudentList()}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">학생 관리</h1>
        <p className="text-gray-600">학생 정보를 조회하고 관리할 수 있습니다.</p>
      </div>

      {/* 필터 컴포넌트 */}
      <StudentFilter
        currentParams={currentParams}
        onFilterChange={applyFilters}
        onResetFilters={resetFilters}
      />

      {/* 액션 바 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 전체 선택 체크박스 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isAllStudentsSelected()}
                ref={(input) => {
                  if (input) input.indeterminate = isSomeStudentsSelected();
                }}
                onChange={toggleAllStudentsSelection}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                aria-label="전체 학생 선택"
              />
              <label className="ml-2 text-sm text-gray-700">
                전체 선택 ({selectedCount}개 선택됨)
              </label>
            </div>

            {/* 선택된 항목 액션 */}
            {hasSelectedStudents && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteSelected}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  선택 삭제 ({selectedCount})
                </button>
                <button
                  onClick={clearSelection}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  선택 해제
                </button>
              </div>
            )}
          </div>

          {/* 전체 학생 수 표시 */}
          <div className="text-sm text-gray-600">
            전체 {totalCount.toLocaleString()}명의 학생
          </div>
        </div>
      </div>

      {/* 학생 목록 */}
      {!hasStudents ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👨‍🎓</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            표시할 학생이 없습니다
          </h2>
          <p className="text-gray-600 mb-4">
            현재 필터 조건에 맞는 학생이 없습니다.
          </p>
          <button
            onClick={resetFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <>
          {/* 학생 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {studentList.map((student) => (
              <StudentItem
                key={student.id}
                student={student}
                isSelected={selectedStudentIds.includes(student.id)}
                onToggleSelection={toggleStudentSelection}
                onDelete={handleDeleteStudent}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <nav className="flex rounded-md shadow-sm" aria-label="페이지네이션">
                {renderPaginationButtons()}
              </nav>
            </div>
          )}
        </>
      )}

      {/* 로딩 오버레이 (데이터가 있을 때) */}
      {isLoading && hasStudents && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">처리 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}
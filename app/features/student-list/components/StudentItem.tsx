'use client';

import { Student, StudentStatus } from '../types/student';

/**
 * StudentItem 컴포넌트의 Props 인터페이스
 */
interface StudentItemProps {
  /** 표시할 학생 정보 */
  student: Student;
  /** 학생 선택 여부 */
  isSelected: boolean;
  /** 학생 선택/해제 콜백 */
  onToggleSelection: (studentId: number) => void;
  /** 학생 삭제 콜백 */
  onDelete: (studentId: number) => void;
}

/**
 * 개별 학생 정보를 표시하는 컴포넌트
 * 학생의 기본 정보와 상태를 카드 형태로 렌더링합니다.
 * 
 * @param props - StudentItem 컴포넌트 props
 * @returns JSX.Element - 학생 정보 카드
 */
export function StudentItem({ 
  student, 
  isSelected, 
  onToggleSelection, 
  onDelete 
}: StudentItemProps) {
  
  /**
   * 학생 상태에 따른 배지 스타일을 반환하는 함수
   * @param status - 학생 상태
   * @returns string - CSS 클래스명
   */
  const getStatusBadgeStyle = (status: StudentStatus): string => {
    const baseClasses = 'inline-block px-2 py-1 text-xs font-medium rounded-full';
    
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'graduated':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  /**
   * 학생 상태의 한국어 라벨을 반환하는 함수
   * @param status - 학생 상태
   * @returns string - 상태 한국어 라벨
   */
  const getStatusLabel = (status: StudentStatus): string => {
    const statusMap = {
      active: '재학',
      inactive: '휴학',
      graduated: '졸업',
      suspended: '제적'
    };
    
    return statusMap[status] || '알 수 없음';
  };

  /**
   * GPA를 시각적으로 표시하기 위한 색상을 반환하는 함수
   * @param gpa - 학점 (0.0 - 4.5)
   * @returns string - CSS 텍스트 색상 클래스
   */
  const getGpaColorClass = (gpa: number): string => {
    if (gpa >= 4.0) return 'text-green-600 font-semibold';
    if (gpa >= 3.5) return 'text-blue-600';
    if (gpa >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  /**
   * 날짜를 한국어 형식으로 포맷하는 함수
   * @param dateString - ISO 날짜 문자열
   * @returns string - 포맷된 날짜 문자열
   */
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return '날짜 정보 없음';
    }
  };

  /**
   * 학생 삭제 확인 후 실행하는 핸들러
   */
  const handleDeleteClick = () => {
    const shouldDelete = confirm(`${student.name} 학생을 정말 삭제하시겠습니까?`);
    if (shouldDelete) {
      onDelete(student.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}>
      <div className="p-6">
        {/* 헤더: 체크박스, 이름, 상태 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelection(student.id)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              aria-label={`${student.name} 선택`}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={getStatusBadgeStyle(student.status)}>
              {getStatusLabel(student.status)}
            </span>
            <button
              onClick={handleDeleteClick}
              className="text-red-500 hover:text-red-700 transition-colors p-1"
              aria-label={`${student.name} 삭제`}
              title="학생 삭제"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* 학생 정보 그리드 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">학과:</span>
            <span className="ml-2 text-gray-900">{student.department}</span>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">학년:</span>
            <span className="ml-2 text-gray-900">{student.grade}학년</span>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">입학년도:</span>
            <span className="ml-2 text-gray-900">{student.enrollmentYear}년</span>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">평점:</span>
            <span className={`ml-2 ${getGpaColorClass(student.gpa)}`}>
              {student.gpa.toFixed(1)}/4.5
            </span>
          </div>
          
          <div className="col-span-2">
            <span className="font-medium text-gray-700">연락처:</span>
            <span className="ml-2 text-gray-900">{student.phoneNumber}</span>
          </div>
        </div>

        {/* 푸터: 생성일 */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            등록일: {formatDate(student.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
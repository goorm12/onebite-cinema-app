import { StudentList } from '../features/student-list/components/StudentList';

/**
 * 학생 관리 페이지 컴포넌트
 * 학생 목록 조회, 검색, 필터링, 삭제 등의 기능을 제공합니다.
 * 
 * @returns JSX.Element - 학생 관리 페이지
 */
export default function StudentsPage() {
  return <StudentList />;
}
## 프로젝트 컨텍스트

            - **기술 스택**: React + TypeScript + Zustand + Vanilla Extract + Next.js
            - **아키텍처**: MVVM 패턴 (View-ViewModel-Model)

            ## 필수 검토 항목

            ### 🏗️ MVVM 패턴 준수
            - `components/` (View): UI 렌더링과 이벤트 처리만
            - `hooks/` (ViewModel): 비즈니스 로직, Zustand 구독
            - `api/` (Model): 데이터 통신만 담당

            ### 📝 코드 가독성 (필수)
            - **함수 주석**: 모든 함수에 JSDoc 필수 (`@param`, `@returns`, `@throws`)
            - **복잡한 로직**: 왜 그렇게 구현했는지 설명 주석 필수
            - **변수명**: 명확하고 직관적 (예: `isUserLoggedIn`, `studentExamResults`)

            ### 🎯 네이밍 컨벤션
            - 폴더: kebab-case (`class-manage`)
            - 컴포넌트: PascalCase (`StudentList.tsx`)
            - 함수/변수: camelCase (`getUserData`)
            - API 함수: `api` 접두사 (`apiGetStudents`)
            - 상수: UPPER_CASE (`MAX_FILE_SIZE`)
            - Boolean: `is/has/can` 접두사 (`isLoading`)

            ### ⚡ React/TypeScript 규칙
            - Zustand 선택적 구독 사용
            - Recipe 우선 (Vanilla Extract)
            - 에러 처리 필수 (try-catch, 에러 로깅)
            - props 2개 이상 시 interface 정의

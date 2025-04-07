import { Suspense } from "react";
import AllMovies from "./components/allMovies";
import RecoMovies from "./components/recoMovies";
const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<div>🎬 추천 영화 로딩 중...</div>}>
        <RecoMovies />
      </Suspense>
      <Suspense fallback={<div>📽 전체 영화 로딩 중...</div>}>
        <AllMovies />
      </Suspense>
    </div>
  );
};

export default Home;

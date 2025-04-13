import { Suspense } from "react";
import AllMovies from "./components/allMovies";
import RecoMovies from "./components/recoMovies";
import MovieItemListSkeleton from "./components/skeleton/movieItemListSkeleton";

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1>지금 가장 추천하는 영화</h1>
      <Suspense
        fallback={<MovieItemListSkeleton count={3} gridCols="grid-cols-3" />}
      >
        <RecoMovies />
      </Suspense>

      <h1>등록된 모든 영화</h1>
      <Suspense
        fallback={<MovieItemListSkeleton count={18} gridCols="grid-cols-5" />}
      >
        <AllMovies />
      </Suspense>
    </div>
  );
};

export default Home;

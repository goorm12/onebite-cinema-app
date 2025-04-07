import { MovieData } from "@/app/types/types";
import MovieItem from "./movieItem";

const AllMovies = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
    cache: "force-cache",
  });

  if (!response.ok) return <div>영화 불러오기를 실패 하였습니다.</div>;

  const movies: MovieData[] = await response.json();

  return (
    <section className="flex flex-col gap-4">
      <h1>등록된 모든 영화</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-3.5">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default AllMovies;

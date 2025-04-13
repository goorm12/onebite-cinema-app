import { MovieData } from "@/app/types/types";
import MovieItem from "./movieItem";
import delay from "@/app/delay";

const RecoMovies = async () => {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/random`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) return <div>영화 불러오기를 실패 하였습니다.</div>;

  const movies: MovieData[] = await response.json();
  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3.5">
        {movies.slice(0, 3).map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default RecoMovies;

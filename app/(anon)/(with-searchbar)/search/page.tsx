import { MovieData } from "@/app/types/types";
import MovieItem from "@/app/(anon)/(with-searchbar)/components/movieItem";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const { q } = await searchParams;

  if (!q.trim()) return <div>검색어를 입력해 주세요</div>;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/search?q=${q}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) return <div>영화를 찾을 수 없습니다.</div>;
  const data: MovieData[] = await response.json();

  const movies: MovieData[] = data.filter((movie) => movie.title.includes(q));

  if (!movies.length) return <div>영화를 찾을 수 없습니다.</div>;

  return (
    <section>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  gap-3.5">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Page;

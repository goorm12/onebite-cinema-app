import Image from "next/image";
import { MovieData } from "@/app/types/types";
import dummyData from "@/app/data/dummy.json";
import MovieItem from "@/app/components/movieItem";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const { q } = await searchParams;

  // const movies: MovieData[] = dummyData.filter((movie) =>
  //   movie.title.includes(q)
  // );

  // if (!movies.length) return <div>영화를 찾을 수 없습니다.</div>;
  return (
    <section>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  gap-3.5">
        {dummyData.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Page;

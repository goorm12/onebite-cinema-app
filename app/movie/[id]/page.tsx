import { MovieData } from "@/app/types/types";
import MovieDetail from "./components/movieDetail";
import ReviewEditor from "./components/reviewEditor";
import ReviewList from "./components/reviewList";

export const generateStaticParams = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
    cache: "force-cache",
  });

  const movies: MovieData[] = await response.json();
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <section className="flex flex-col gap-5">
      <MovieDetail id={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </section>
  );
};

export default Page;

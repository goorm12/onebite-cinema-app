import { MovieData } from "@/app/types/types";
import Image from "next/image";
import { notFound } from "next/navigation";
const MovieDetail = async ({ id }: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    <div>영화를 찾을 수 없습니다.</div>;
  }

  const movie: MovieData = await response.json();

  if (!movie) return <div>영화를 찾을 수 없습니다.</div>;

  return (
    <section className="flex flex-col gap-5">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${movie?.posterImgUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
        className="before-overlay rounded-lg"
      >
        <div className="z-10 pt-5 pb-5 ">
          <Image
            src={movie?.posterImgUrl}
            alt={movie?.title}
            width={300}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <div className="flex flex-row gap-2 text-sm">
          <p>{movie.releaseDate} /</p>
          <p>{movie.genres} /</p>
          <p>{movie.runtime}분</p>
        </div>
        <p className="text-sm">{movie.company}</p>
        <p>{movie.subTitle}</p>
        <p>{movie.description}</p>
      </div>
    </section>
  );
};

export default MovieDetail;

import { MovieData } from "@/app/types/types";
import Image from "next/image";

import Link from "next/link";

const MovieItem = ({ movie }: { movie: MovieData }) => {
  return (
    <div className="mx-auto max-w-[300px]">
      <Link href={`/movie/${movie.id}`}>
        <Image
          src={movie.posterImgUrl}
          alt={movie.title}
          width={300}
          height={500}
          className="w-full"
        />
      </Link>
    </div>
  );
};

export default MovieItem;

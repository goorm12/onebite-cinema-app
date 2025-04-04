import MovieItem from "@/app/components/movieItem";
import dummyData from "@/app/data/dummy.json";
const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <article className="flex flex-col gap-4">
        <h1>지금 가장 추천하는 영화</h1>
        <div className="grid grid-cols-3 gap-3.5">
          {dummyData.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </article>

      <article className="flex flex-col gap-4">
        <h1>등록된 모든 영화</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-3.5">
          {dummyData.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default Home;

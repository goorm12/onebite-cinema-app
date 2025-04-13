import MovieItemSkeleton from "./movieItemSkeleton";

const MovieItemListSkeleton = ({
  count,
  gridCols = "grid-cols-3",
}: {
  count: number;
  gridCols?: string;
}) => {
  return (
    <div className={`grid ${gridCols} gap-4`}>
      {Array.from({ length: count }).map((_, idx) => (
        <MovieItemSkeleton key={idx} />
      ))}
    </div>
  );
};

export default MovieItemListSkeleton;

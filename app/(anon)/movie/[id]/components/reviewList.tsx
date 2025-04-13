import { ReviewData } from "@/app/types/reviewData";
import ReviewItem from "./reviewItem";

const ReviewList = async ({ movieId }: { movieId: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/movie/${movieId}`
  );

  if (!response.ok) return <div>댓글을 불러올 수 가 없습니다.</div>;

  const reviews: ReviewData[] = await response.json();
  return (
    <section className="flex flex-col gap-4">
      {reviews.map((review) => {
        return <ReviewItem key={review.id} {...review} />;
      })}
    </section>
  );
};

export default ReviewList;

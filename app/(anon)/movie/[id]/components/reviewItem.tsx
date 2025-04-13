import { ReviewData } from "@/app/types/reviewData";

const ReviewItem = ({ content, author, createdAt }: ReviewData) => {
  return (
    <section className="border-1 rounded-md py-2 px-4 flex flex-col gap-2 items-start">
      <div className="flex gap-2 items-center">
        <p className="font-bold">{author}</p>
        <p className="text-neutral-400 text-xs ">
          {new Date(createdAt).toLocaleDateString()}일 작성됨
        </p>
      </div>
      <p>{content}</p>
      <button className=" cursor-pointer text-xs text-neutral-400 border-b border-netural-400">
        🗑️ 리뷰 삭제하기
      </button>
    </section>
  );
};

export default ReviewItem;

import { createReviewAction } from "../actions/createReviewAction.action";

const ReviewEditor = ({ movieId }: { movieId: string }) => {
  return (
    <section>
      <form className="flex flex-col gap-4" action={createReviewAction}>
        <input name="movieId" readOnly value={movieId} hidden />
        <textarea
          name="content"
          className="border-b-neutral-200 border-1 w-full p-2 rounded-sm"
          placeholder="내용을 입력해주세요"
          required
        />
        <div className="flex gap-4 justify-end">
          <input
            type="text"
            name="author"
            placeholder="작성자"
            className="border-b-neutral-200 border-1 py-2 px-4 rounded-sm"
            required
          />
          <button
            type="submit"
            className="bg-neutral-100 py-2 px-4 text-black rounded-sm cursor-pointer"
          >
            작성하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReviewEditor;

"use client";

import { useActionState, useEffect, useRef } from "react";
import { deleteReviewAction } from "../actions/deleteReviewAction.action";

const ReviewDeleteButton = ({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input hidden readOnly name="movieId" value={movieId} />
      <input hidden readOnly name="reviewId" value={reviewId} />
      <div
        onClick={() => {
          if (confirm("정말 삭제하시겠습니까?"))
            return formRef.current?.requestSubmit();
        }}
        className="cursor-pointer"
      >
        {isPending ? "삭제중..." : "🗑️ 리뷰 삭제하기"}
      </div>
    </form>
  );
};

export default ReviewDeleteButton;

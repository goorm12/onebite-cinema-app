"use server";

import { revalidateTag } from "next/cache";

export const createReviewAction = async (_: any, formData: FormData) => {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: "댓글 내용과 작성자는 필수입니다.",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId,
        content,
        author,
      }),
    });

    if (!response.ok) {
      throw new Error("댓글 저장에 실패했습니다.");
    }

    revalidateTag(`review-${movieId}`);
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `댓글 저장에 실패했습니다.${error}`,
    };
  }
};

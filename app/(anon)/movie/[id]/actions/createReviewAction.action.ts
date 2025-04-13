"use server";

export const createReviewAction = async (formData: FormData) => {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return;
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

    console.log(response.status);
  } catch (error) {
    console.error(error);
    return;
  }
};

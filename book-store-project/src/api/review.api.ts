import { BookReviewItem } from "@/models/book.model";
import { httpClient, requestHandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
  const response = await httpClient.get<BookReviewItem[]>(`/reviews/${bookId}`);

  return response.data;
  
  // 리팩토링한 후부터 아래처럼 사용하나, 이 코드는 잘 작동하지 않아 위처럼 구버전 계속 사용
  // return await requestHandler<BookReviewItem[]>('get', `/reviews/${bookId}`);
};
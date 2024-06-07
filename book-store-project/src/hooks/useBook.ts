import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook } from "../api/books.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  
  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      if (book && Array.isArray(book) && book.length > 0) {
        setBook(book[0]); // 첫 번째 객체 선택
      } else {
        setBook(book); // 단일 객체
      }
    });
  }, [bookId]);

  return { book };
};
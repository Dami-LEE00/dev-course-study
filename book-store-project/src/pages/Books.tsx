import React from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import BooksFilter from '../components/books/BooksFilter';
import BooksList from '../components/books/BooksList';
import BooksEmpty from '../components/books/BooksEmpty';
import Pagination from '../components/books/Pagination';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import { useBooks } from '../hooks/useBooks';

const Books = () => {
  const { books, pagination, isEmpty } = useBooks();

  console.log('books: ', books);
  console.log('pagination: ', pagination);

  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <BookWrapper>
        <BooksFilter />
        <BooksViewSwitcher />
        {!isEmpty && <BooksList books={books} />}
        {isEmpty && <BooksEmpty />}
        {!isEmpty && <Pagination />}
      </BookWrapper>
    </>
  )
};

const BookWrapper = styled.div`

`;

export default Books;
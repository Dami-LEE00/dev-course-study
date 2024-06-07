import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';
import { useLocation } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';
import { ViewMode } from './BooksViewSwitcher';

interface Props {
  books: Book[];
}

const BooksList = ({ books }: Props) => {
  const [view, setView] = useState<ViewMode>('grid');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if(params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);

  return (
    <BooksListWrapper view={view}>
      {books.map((item) => (
        <BookItem key={item.id} book={item} view={view} />
      ))}
    </BooksListWrapper>
  )
};

interface BooksListStyleProps {
  view: ViewMode;
}

const BooksListWrapper = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) => view === 'grid' ? 'repeat(4, 1fr)' :'repeat(1, 1fr)'};
  gap: 24px;
`; 

export default BooksList;
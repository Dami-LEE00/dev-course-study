import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem from '../books/BookItem';

interface Props {
  books: Book[];
}

const MainNewBooks = ({ books }: Props) => {
  return (
    <MainNewBooksWrapper>
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          view='grid'
        />
      ))}
    </MainNewBooksWrapper>
  )
};

const MainNewBooksWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainNewBooks;
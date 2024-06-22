import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookBestItem from '../books/BookBestItem';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Props {
  books: Book[];
}

const MainBest = ({ books }: Props) => {
  return (
    <MainBestWrapper>
      {books.map((item, index) => (
        <BookBestItem
          key={item.id}
          book={item}
          itemIndex={index}
        />
      ))}
    </MainBestWrapper>
  )
};

const MainBestWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainBest;
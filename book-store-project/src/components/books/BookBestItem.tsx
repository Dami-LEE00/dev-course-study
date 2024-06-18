import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem, { BookItemWrapper } from './BookItem';

interface Props {
  book: Book,
  itemIndex: number,
}

const BookBestItem = ({ book, itemIndex }: Props) => {
  return (
    <BookBestItemWrapper>
      <BookItem book={book} view='grid' />
      <div className="rank">{itemIndex + 1}</div>
    </BookBestItemWrapper>
  )
};

const BookBestItemWrapper = styled.div`
  ${BookItemWrapper} {
    .summary,
    .price,
    .likes {
      display: none;
    }

    h2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  position: relative;

  .rank {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    background: ${(props) => props.theme.color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 600;
  }
`;

export default BookBestItem;
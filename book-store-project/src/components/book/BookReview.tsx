import { BookReviewItemWrite, BookReviewItem as IBookReviewItem } from '@/models/book.model';
import styled from 'styled-components';
import BookReviewItem from './BookReviewItem';
import BookReviewAdd from './BookReviewAdd';

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewItemWrite) => void;
}

const BookReview = ({ reviews, onAdd }: Props) => {
  console.log(reviews);
  return (
    <BookReviewWrapper>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem review={review} />
      ))}
    </BookReviewWrapper>
  )
};

const BookReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;
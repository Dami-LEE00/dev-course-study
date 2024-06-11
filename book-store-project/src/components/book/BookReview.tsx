import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import styled from 'styled-components';
import BookReviewItem from './BookReviewItem';

interface Props {
  reviews: IBookReviewItem[];
}

const BookReview = ({ reviews }: Props) => {
  console.log(reviews);
  return (
    <BookReviewWrapper>
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
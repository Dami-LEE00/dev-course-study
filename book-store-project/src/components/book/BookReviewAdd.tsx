import { BookReviewItemWrite } from '@/models/book.model';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
  onAdd: (data: BookReviewItemWrite) => void
}

const BookReviewAdd = ({ onAdd }: Props) => {

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<BookReviewItemWrite>();

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(onAdd)}>
        <fieldset>
          <textarea {...register('content', { required: true })}></textarea>
          {errors.content && <p className='error-text'>리뷰 내용을 입력해주세요.</p>}
        </fieldset>
        <div className="submit">
          <fieldset>
            <select {...register('score', { required: true, valueAsNumber: true })}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </fieldset>
          <Button size='medium' schema='primary'>작성하기</Button>
        </div>
      </form>
    </BookReviewAddStyle>
  )
};

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: end;

      select {
        padding: 8px 16px;
        border-radius: ${({ theme }) => theme.borderRadius.default};
      }
      
      .error-text {
        color: red;
        padding: 0;
        margin: 0;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 12px;
    }
  }

  .submit {
    display: flex;
    justify-content: end;
    gap: 8px;
  }
`;

export default BookReviewAdd;
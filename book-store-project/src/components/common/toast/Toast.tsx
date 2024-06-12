import useToastStore, { ToastItem } from '@/store/toastStore';
import styled from 'styled-components';
import { FaPlus, FaBan, FaInfoCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export const TOAST_REMOVE_DELAY = 3000; // 3초

const Toast = ({ id, message, type }: ToastItem) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setFadingOut] = useState(false);

  const handleRemoveToast = () => {
    setFadingOut(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // 삭제
      removeToast(id);
    }, TOAST_REMOVE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <ToastWrapper className={isFadingOut ? 'fade-out' : 'fade-in'}>
      {type === 'info' && <FaInfoCircle />}
      {type === 'error' && <FaBan />}
      <p>{message}</p>
      <button onClick={handleRemoveToast}>
        <FaPlus />
      </button>
    </ToastWrapper>
  )
};

const ToastWrapper = styled.div`
  @keyframes fade-in {
    form {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    form {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }
  
  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  padding: 12px;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
  opacity: 0;
  transition: all 0.2s ease-in-out;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.color.primary};
    background-color: transparent;
    border: none;
    cursor: pointer;

    svg {
      transform: rotate(45deg);
    }
  }
`;

export default Toast;
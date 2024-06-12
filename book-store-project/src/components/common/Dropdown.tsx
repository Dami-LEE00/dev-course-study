import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen: boolean;
}

const Dropdown = ({ children, toggleButton, isOpen = false }: Props) => {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsizeClick(event: MouseEvent) {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // 외부 클릭 시
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsizeClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsizeClick);
    };
  }, [dropdownRef]);

  return (
    <DropdownWrapper $open={open} ref={dropdownRef}>
      <button
        className='toggle'
        onClick={() => setOpen(!open)}
      >{toggleButton}</button>
      {open && <div className="panel">{children}</div>}
    </DropdownWrapper>
  )
};

interface DropdownStyleProps {
  $open: boolean;
}

const DropdownWrapper = styled.div<DropdownStyleProps>`
  position: relative;

  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;

    svg {
      width: 30px;
      height: 30px;
      fill: ${({ theme, $open }) => $open ? theme.color.primary : theme.color.text};
      transition: fill 0.15s linear;
    }
  }

  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 100;;
  }
`;

export default Dropdown;
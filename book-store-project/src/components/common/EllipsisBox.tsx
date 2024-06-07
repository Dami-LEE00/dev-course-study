import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
  children: React.ReactNode;
  linelimit: number;
}

const EllipsisBox = ({ children, linelimit }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <EllipsisBoxWrapper linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button 
        size='small' 
        schema='normal' 
        onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '접기' : '더보기'}
          <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxWrapper>
  )
};

interface EllipsisBoxWrapperProps {
  linelimit: number;
  $expanded: boolean;
}

const EllipsisBoxWrapper = styled.div<EllipsisBoxWrapperProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ linelimit, $expanded }) => $expanded ? 'none' : linelimit };
    -webkit-box-orient: vertical;
    padding: 20px 0 0 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;
    svg {
      transform: ${({ linelimit, $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0)' };;
    }
  }
`;

export default EllipsisBox;
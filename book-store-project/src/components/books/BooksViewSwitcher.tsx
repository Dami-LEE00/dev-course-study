import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { FaList, FaTh } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';

const viewOptions = [
  {
    value: 'list',
    icon: <FaList />
  },
  {
    value: 'grid',
    icon: <FaTh />
  }
];

export type ViewMode = 'grid' | 'list';

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if(!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch('grid');
    }
  }, [searchParams]);

  return (
    <BooksViewSwitcherWrapper>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          size='medium'
          schema={searchParams.get(QUERYSTRING.VIEW) === option.value ? 
            'primary' : 'normal'
          }
          onClick={() => handleSwitch(option.value as ViewMode)}
        >{option.icon}</Button>
      ))}
    </BooksViewSwitcherWrapper>
  )
}

const BooksViewSwitcherWrapper = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: #fff;
  }
`; 

export default BooksViewSwitcher;
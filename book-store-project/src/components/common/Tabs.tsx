import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

interface TabsProps {
  children: React.ReactNode;
}

const Tabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];
  console.log(tabs);

  return (
    <TabsWrapper>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex]}</div>
    </TabsWrapper>
  )
};

const TabsWrapper = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      padding: 12px 24px;
      border: none;
      background-color: #ddd;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) => theme.borderRadius.default} ${({ theme }) => theme.borderRadius.default} 0 0;
      cursor: pointer;

      &.active {
        color: #fff;
        background: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .tab-content {
    padding: 24px 0;
  }
`;

export { Tabs, Tab };
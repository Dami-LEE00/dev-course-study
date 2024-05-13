import React, { useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  // 1초마다 수행
  setInterval(() => {
    setTime(new Date());
  }, 1000);
  return (
    <div>
      <h2>현재 날짜 및 시간</h2>
      <p>{time.toLocaleDateString()}</p>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  )
}

export default Clock;
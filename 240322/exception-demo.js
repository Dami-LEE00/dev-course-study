const express = require('express');
const app = express();
app.listen(3000);

const colors = [
  { id: 1, name: 'red' },
  { id: 2, name: 'yellow' },
  { id: 3, name: 'green' },
  { id: 4, name: 'blue' },
];

app.get('/colors', (req, res) => {
  // json array
  res.json(colors);
})

app.get('/colors/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  // URL의 id와 colors의 객체 중 id가 같은 객체 출력
  let findColor = colors.find((color) => (
    color.id === id
  ));

  // 예외 처리
  if(findColor) {
    res.json(findColor);
  } else {
    res.status(404).json({
      message: '전달받은 id로 저장된 색상이 없습니다.'
    });
  }
})
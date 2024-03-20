// express 모듈 셋팅
const express = require('express');
const app = express();

// 실행 포트번호
app.listen(3000);
app.use(express.json());

// 데이터 셋팅
const user1 = {
  name: 'DamiLee',
  phone: '010-1111-2222',
  email: 'dami@gmail.com'
}
const user2 = {
  name: 'HariLee',
  phone: '010-3333-4444',
  email: 'hari@gmail.com'
}
const user3 = {
  name: 'MinseoSeok',
  phone: '010-5555-6666',
  email: 'minseo@gmail.com'
}

// 맵(Map) 생성 및 user 고유 id 초기화
let userDB = new Map();
var id = 1;

// userDB에 객체 생성
userDB.set(id++, user1);
userDB.set(id++, user2);
userDB.set(id++, user3);

// REST API 설계
app.get('/', (req, res) => {
  res.send('Welcome Get User Page!');
});

// 전체 사용자 조회
app.get('/users', (req, res) => {
  let userList = [...userDB];

  res.json(userList);
});

// 개별 사용자 조회
app.get('/users/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  // 각 id별 사용자 정보
  const user = userDB.get(id);

  if(user === undefined) {
    res.json({
      error: '사용자 정보를 찾을 수 없습니다.'
    });
  } else {
    // 해당 사용자 정보에 고유 id 부여
    user["id"] = id;
    res.json(user);
  }
});

// 개별 사용자 등록
app.post('/users', (req, res) => {
  console.log(req.body);

  userDB.set(id++, req.body);

  res.json({
    message: `${userDB.get(id-1).name}님, 사용자 등록이 완료되었습니다.`
  });
});
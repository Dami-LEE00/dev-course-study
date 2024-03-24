// express 모듈 셋팅
const express = require('express');
const app = express();

// 실행 포트번호
app.listen(3000);
// http 외 모듈인 '미들웨어':json 설정
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
})

// 전체 사용자 조회
app.get('/users', (req, res) => {
  let userList = {};
  if(userDB.size !== 0) {
    userDB.forEach((value, key) => {
      userList[key] = value;
    });
    res.json(userList);
  } else {
    res.status(404).json({
      error: '조회할 사용자가 없습니다.'
    });
  }
})

// 개별 사용자 조회
app.get('/users/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  // 각 id별 사용자 정보
  let user = userDB.get(id);
  // 사용자가 존재하지 않을 경우 - 존재할 경우
  if(user === undefined) {
    res.status(404).json({
      error: '사용자 정보를 찾을 수 없습니다.'
    });
  } else {
    // 해당 사용자 정보에 고유 id 부여
    user["id"] = id;
    res.json(user);
  }
})

// 개별 사용자 등록
app.post('/users', (req, res) => {
  userDB.set(id++, req.body);
  // 사용자 등록
  res.json({
    message: `${userDB.get(id-1).name}님, 사용자 등록이 완료되었습니다.`
  });
});

// 전체 사용자 삭제
app.delete('/users', (req, res) => {
  // Map의 길이를 확인할 때는 length가 아닌 size로 확인한다.
  if(userDB.size > 0) {
    userDB.clear();
    res.json({
      message: '전체 사용자 삭제가 완료되었습니다.'
    })
  } else {
    res.status(404).json({
      message: '삭제할 사용자가 없습니다.'
    })
  }
})

// 개별 사용자 삭제
app.delete('/users/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  // 각 id별 사용자 정보
  let user = userDB.get(id);
  // user(객체 자체)를 가져오는 게 아니라, id를 가져와서 삭제해야 한다.
  if(user) {
    const name = user.name;
    userDB.delete(id);  
    res.json({
      message: `${name}님의 계정이 삭제되었습니다.`
    });
  } else {
    res.status(404).json({
      error: '사용자 정보를 찾을 수 없습니다.'
    });
  }
})

// 개별 사용자 수정
app.put('/users/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  // 각 id별 사용자 정보
  let user = userDB.get(id);
  // 해당 id의 기존 이름 저장
  let oldName = user.name;
  if(user === undefined) {
    res.status(404).json({
      error: `id가 ${id}인 사용자를 찾을 수 없습니다.`
    });
  } else {
    let newName = req.body.name;
    user.name = newName;
    // userDB.get(id)로 얻은 user 객체는 실제 userDB에 저장된 객체의 복사본이 아니라 참조
    // 따라서 userDB.set(id, user)와 같이 명시적으로 userDB에 변경된 user 객체를 다시 저장해야 한다. (덮어쓰기)
    userDB.set(id, user);   
    res.json({
      message: `${oldName}님의 이름이 ${newName}으로 수정 완료되었습니다.`
    });
  }
})
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

// 전체 사용자 조회, 삭제 & 개별 사용자 등록
app
  .route('/users')
  // 전체 사용자 조회
  .get((req, res) => {
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
  // 개별 사용자 등록
  .post((req, res) => {
    let userName = req.body.name;
    // 사용자 등록
    if(userName) {
      userDB.set(id++, req.body);
      res.status(201).json({
        // 위에서 지정한 이름이 아닌, 실제 객체 안에 들어가는 key인 name이 들어가야 한다. (userName X , name O)
        message: `${userDB.get(id-1).name}님, 사용자 등록이 완료되었습니다.`
      });
    } else {
      res.status(400).json({
        error: '요청 값을 모두 입력해주세요.'
      })
    }
  })
  // 전체 사용자 삭제
  .delete((req, res) => {
    if(userDB.size > 0) {
      userDB.clear()
      res.json({
        message: '전체 사용자 삭제가 완료되었습니다.'
      });
    } else {
      res.status(404).json({
        error: '삭제할 사용자가 존재하지 않습니다.'
      })
    }
  })

// 개별 사용자 조회, 삭제, 수정
app.route('/users/:id')
// 개별 사용자 조회
.get((req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  // 각 id에 해당하는 사용자 정보
  let user = userDB.get(id);
  if(user) {
    res.json(user);
  } else {
    res.status(404).json({
      error: '해당 사용자를 찾을 수 없습니다.'
    });
  }
})
// 개별 사용자 삭제
.delete((req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  // 각 id에 해당하는 사용자 정보
  let user = userDB.get(id);
  if(user) {
    let name = user.name;
    userDB.delete(id);
    res.json({
      message: `${name}님의 계정 삭제가 완료되었습니다.`
    });
  } else {
    res.status(404).json({
      error: '해당 사용자를 찾을 수 없습니다.'
    })
  }
})
// 개별 사용자 수정
.put((req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let user = userDB.get(id);
  let oldName = user.name;
  if(user) {
    let newName = req.body.name;
    user.name = newName;
    res.json({
      message: `${oldName}님의 이름이 ${newName}으로 수정 완료되었습니다.`
    });
  } else {
    res.status(404).json({
      error: `요청하신 사용자를 찾을 수 없습니다.`
    });
  }
})
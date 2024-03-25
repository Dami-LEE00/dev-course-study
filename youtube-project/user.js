const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());

const userDB = new Map();
let id = 1;

// 로그인
app.post('/login', (req, res) => {
  // userId가 DB에 저장된 회원인지 확인
  const { userId, password, name } = req.body;
  userDB.forEach((user, id) => {
    if(user.userId === userId) {
      if(user.password === password) {
        res.json({
          message: `${name}님, 로그인에 성공하셨습니다.`
        })
      } else {
        res.json({
          error: '비밀번호가 틀렸습니다. 다시 시도해주세요.'
        })
      }
    } else {
      res.json({
        error: '없는 id입니다. 회원가입을 진행해주세요.'
      })
    }
  })
});

// 회원가입
app.post('/join', (req, res) => {
  if(req.body) {
    userDB.set(id++, req.body);
    res.status(201).json({
      message: `${userDB.get(id-1).name}님 환영합니다.`
    });
  } else {
    res.status(400).json({
      error: `입력 값을 다시 확인해주세요.`
    });
  }
});

app
  .route('/users/:id')
  // 회원 정보 개별 조회
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
  
    const user = userDB.get(id);
    if(user) {
      res.status(200).json({
        userId: user.userId,
        name: user.name
      });
    } else {
      res.status(404).json({
        error: `회원 정보가 없습니다.`
      });
    }
  })
  // 회워 정보 개별 삭제
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
  
    const user = userDB.get(id);
    if(user) {
      userDB.delete(id);
      res.status(200).json(`${user.name}님, 다음에 또 뵙겠습니다.`);
    } else {
      res.status(404).json({
        error: `회원 정보가 없습니다.`
      });
    }
  })

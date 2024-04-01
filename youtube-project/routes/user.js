const express = require('express')
const router = express.Router()
const conn = require('../mariadb')

router.use(express.json())

const userDB = new Map()

// 로그인
router.post('/login', (req, res) => {
  // userId가 DB에 저장된 회원인지 확인
  const { userId, password } = req.body
  userDB.forEach((user, id) => {
    if(user.userId === userId) {
      if(user.password === password) {
        res.json({
          message: `${userId}님, 로그인에 성공하셨습니다.`
        })
      } else {
        res.status(401).json({
          error: '비밀번호가 틀렸습니다. 다시 시도해주세요.'
        })
      }
    } else {
      res.status(401).json({
        error: '존재하지 않는 id입니다. 회원가입 먼저 진행해주세요.'
      })
    }
  })
});

// 회원가입
router.post('/join', (req, res) => {
  const { userId, password, name } = req.body
  if(userId && password && name) {
    userDB.set(userId, req.body)
    res.status(201).json({
      message: `${name}님 환영합니다.`
    });
  } else {
    res.status(400).json({
      error: 'id, password, name을 모두 입력해주세요.'
    });
  }
});

router
  .route('/users')
  // 회원 정보 전체 & 개별 조회
  .get((req, res) => {
    let { userId } = req.body
    // req.body가 비어있을 경우 전체 조회
    if(!userId) {
      let users = []
      userDB.forEach((value) => {
        users.push({
          userId: value.userId,
          name: value.name
        })
      })
      res.status(200).json(users)
      // req.body에 userId가 있는 경우 해당 회원 개별 조회
    } else {
      const user = userDB.get(userId)
      if(user) {
        res.status(200).json({
          userId: user.userId,
          name: user.name
        })
      } else {
        notFoundUser(res)
      }
    }
  
  })
  // 회워 정보 개별 삭제
  .delete((req, res) => {
    let { userId } = req.body
  
    const user = userDB.get(userId)
    if(user) {
      userDB.delete(userId)
      res.status(200).json({
        message: `${user.name}님, 다음에 또 뵙겠습니다.`
      })
    } else {
      notFoundUser(res)
    }
  })

const notFoundUser = (res) => {
  res.status(404).json({
    error: '회원 정보를 찾을 수 없습니다.'
  })
}

module.exports = router
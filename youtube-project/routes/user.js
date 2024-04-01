const express = require('express')
const router = express.Router()
const conn = require('../mariadb')

router.use(express.json())

// 로그인
router.post('/login', (req, res) => {
  const { email, password } = req.body

  let sql = `SELECT * FROM users WHERE email = ?`
  conn.query(sql, email,
    function (err, results) {
      let loginUser = results[0] // 첫 번째 사용자 정보만 가져옴

      if (results.length) {
        if (loginUser.password === password) {
          res.status(200).json({
            message: `${loginUser.name}님, 로그인에 성공하였습니다.`
          })
        } else {
          res.status(401).json({
            error: '비밀번호가 틀렸습니다. 다시 시도해주세요.'
          })
        }
      } else {
        notFoundUser(res)
      }
    }
  )
})

// 회원가입
router.post('/join', (req, res) => {
  if(req.body) {
    const { email, password, name, contact } = req.body

    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
    let values = [email, name, password, contact]
    conn.query(sql, values,
      function (err, results) {
        res.status(201).json(results)
      }
    )
  } else {
    res.status(400).json({
      error: 'email, password, name, phone 항목을 모두 입력해주세요.'
    })
  }
})

router
  .route('/users')
  // 회원정보 전체 & 개별 조회
  .get((req, res) => {
    const { email } = req.body

    if(!email) {
      let sql = `SELECT * FROM users`
      conn.query(sql,
        function (err, results) {
          results.length ? res.status(200).json(results) : notFoundUser(res)
        }
      )
    } else {
      let sql = `SELECT * FROM users WHERE email = ?`
      conn.query(sql, email,
        function (err, results) {
          results.length ? res.status(200).json(results) : notFoundUser(res)
        }
      )
    }
  })
  // 회원정보 개별 삭제
  .delete((req, res) => {
    const { email } = req.body

    let sql = `DELETE FROM users WHERE email = ?`
    conn.query(sql, email,
      function (err, results) {
        results.affectedRows ? res.status(200).json(results) : notFoundUser(res)
      }
    )
  })

const notFoundUser = (res) => {
  res.status(404).json({
    error: '회원 정보를 찾을 수 없습니다.'
  })
}

module.exports = router
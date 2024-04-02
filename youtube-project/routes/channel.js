// express 모듈 셋팅
const express = require('express')
const router = express.Router();
const conn = require('../mariadb')
const { body, param, validationResult } = require('express-validator')

router.use(express.json()) 

const validate = (req, res) => {
  const err = validationResult(req)

  if(!err.isEmpty()) {
    return res.status(400).json(err.array())
  }
}

router
  .route('/')
  // 채널 전체 & 각 사용자마다 조회
  .get((req, res) => {
    const { userId } = req.body

    if(!userId) {
      let sql = `SELECT * FROM channels`
      conn.query(sql,
        function (err, results) {
          results.length ? res.status(200).json(results) : notFoundChannel(res)
        }
      )
    } else {
      let sql = `SELECT * FROM channels WHERE user_id = ?`
      conn.query(sql, userId,
        function (err, results) {
          results.length ? res.status(200).json(results) : notFoundChannel(res)
        }
      )
    }
  })
  // 채널 개별 생성
  .post(
    [
      body('name').notEmpty().isString().withMessage('채널명은 문자열로 입력해주세요.'),
      body('userId').notEmpty().isInt().withMessage('채널id는 숫자로 입력해주세요.')
    ],
    (req, res) => {
      validate(req, res)

      const { name, userId } = req.body

      let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`
      let values = [name, userId]
      conn.query(sql, values,
        function (err, results) {
          if(err) {
            return res.status(400).end()
          } else {
            res.status(201).json(results)
            res.status(201).json({
              message: `${userId}님, ${name} 채널 개설을 환영합니다!`
            })
          }
        }
      )
  })

router
  .route('/:id')
  // 채널 개별 조회
  .get(
    param('id').notEmpty().isInt().withMessage('채널 id가 필요합니다.'),
    (req, res) => {
      validate(req, res)

      let { id } = req.params
      id = parseInt(id)

      let sql = `SELECT * FROM channels WHERE id = ?`
      conn.query(sql, id,
        function (err, results) {
          if(err) {
            return res.status(400).end
          }
          
          results.length ? res.status(200).json(results) : notFoundChannel(res)
        }
      )
  })
  // 채널 개별 수정
  .put(
    [
      param('id').notEmpty().isInt().withMessage('채널 id가 필요합니다.'),
      body('name').notEmpty().isString().withMessage('채널명을 형식에 맞게 입력해주세요.')
    ],
    (req, res) => {
      validate(req, res)

      let { id } = req.params
      id = parseInt(id)
      let { name } = req.body

      let sql = `UPDATE channels SET name = ? WHERE id = ?`
      let values = [name, id]
      conn.query(sql, values,
        function (err, results) {
          if(err) {
            return res.status(400).end
          }
          
          results.affectedRows ? res.status(200).json(results) : res.status(400).end()
        }
      )
  })
  // 채널 개별 삭제
  .delete(
    param('id').notEmpty().isInt().withMessage('채널 id가 필요합니다.'),
    (req, res) => {
      validate(req, res)

      let { id } = req.params
      id = parseInt(id)

      let sql = `DELETE FROM channels WHERE id = ?`
      conn.query(sql, id,
        function (err, results) {
          if(err) {
            return res.status(400).end
          }

          results.affectedRows ? res.status(200).json(results) : res.status(400).end()
        }
      )
  })

const notFoundChannel = (res) => {
  res.status(404).json({
    error: '채널 정보를 찾을 수 없습니다.'
  })
}

module.exports = router
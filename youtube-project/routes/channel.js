// express 모듈 셋팅
const express = require('express')
const router = express.Router();
const conn = require('../mariadb')

router.use(express.json()) 

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
  .post((req, res) => {
    const { name, userId } = req.body

    if(name && userId) {
      let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`
      let values = [name, userId]
      conn.query(sql, values,
        function (err, results) {
          res.status(201).json(results)
          res.status(201).json({
            message: `${userId}님, ${name} 채널 개설을 환영합니다!`
          })
        }
      )
    } else {
      res.status(400).json({
        error: '요청 값을 제대로 보내주세요.'
      })
    }
  })

router
  .route('/:id')
  // 채널 개별 조회
  .get((req, res) => {
    let { id } = req.params
    id = parseInt(id)

    let sql = `SELECT * FROM channels WHERE id = ?`
    conn.query(sql, id,
      function (err, results) {
        results.length ? res.status(200).json(results) : notFoundChannel(res)
      }
    )
  })
  // 채널 개별 수정
  .put((req, res) => {
    let { id } = req.params
    id = parseInt(id)

    let channel = channelDB.get(id)
    let oldTitle = channel.channelTitle

    if(channel) {
      let newTitle = req.body.channelTitle
      channel.channelTitle = newTitle
      
      channelDB.set(id, channel)
      res.json({
        message: `채널명이 ${oldTitle}에서 ${newTitle}로 변경되었습니다.`
      })
    } else {
      notFoundChannel(res)
    }
  })
  // 채널 개별 삭제
  .delete((req, res) => {
    let { id } = req.params
    id = parseInt(id)

    let sql = `DELETE FROM channels WHERE id = ?`
    conn.query(sql, id,
      function (err, results) {
        results.affectedRows ? res.status(200).json(results) : notFoundChannel(res)
      }
    )
  })

const notFoundChannel = (res) => {
  res.status(404).json({
    error: '채널 정보를 찾을 수 없습니다.'
  })
}

module.exports = router
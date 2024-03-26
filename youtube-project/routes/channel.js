// express 모듈 셋팅
const express = require('express')
const router = express.Router();

router.use(express.json())  // http 외 모듈 'json'

const channelDB = new Map()
let id = 1; // 하나의 객체를 유니크하게 구별하기 위함

router
  .route('/')
  // 채널 전체 조회
  .get((req, res) => {
    const { userId } = req.body
    let channels = []
    let channels_id = []

    if (!channelDB.size) {
      return notFoundChannel(res);
    }
    
    channelDB.forEach((value) => {
      // userId가 요청되었을 때 해당 userId의 채널만 반환
      if (userId && value.userId === userId) {
        channels_id.push(value);
      } else {
        channels.push(value);
      }
    });
    
    // channels_id가 존재하면 해당 채널 반환, 없으면 모든 채널 반환
    const resultChannels = channels_id.length ? channels_id : channels;
    
    res.status(200).json(resultChannels);

    // if(channelDB.size) {
    //   channelDB.forEach((value) => {
    //     channels.push(value)
    //   })
    //   // channels 배열에 값이 들어있으면 정상 반환 / 없으면 오류 반환
    //   if(channels.length) {
    //     // req.body에 userId가 따로 지정되어있는 경우, 해당 userId가 생성한 채널만 반환
    //     if(userId) {
    //       channelDB.forEach((value) => {
    //         if(value.userId === userId) {
    //           channels_id.push(value)
    //         }
    //       })
    //       res.status(200).json(channels_id)
    //     // userId를 따로 요청하지 않은 경우, 모든 채널 반환
    //     } else {
    //       res.status(200).json(channels)
    //     }
    //   } else {
    //     notFoundChannel(res)
    //   }
    // } else {
    //   notFoundChannel(res)
    // }
  })
  // 채널 개별 생성
  .post((req, res) => {
    let { channelTitle, userId } = req.body

    if(channelTitle && userId) {
      channelDB.set(id++, req.body)
      res.status(201).json({
        message: `${userId}님, ${channelTitle} 채널 개설을 환영합니다!`
      })
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

    let channel = channelDB.get(id)
    if(channel) {
      res.status(200).json(channel)
    } else {
      notFoundChannel(res)
    }
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

    let channel = channelDB.get(id)
    if(channel) {
      channelDB.delete(id)
      res.status(200).json({
        message: `${channel.channelTitle} 채널이 정상적으로 삭제되었습니다.`
      })
    } else {
      notFoundChannel(res)
    }
  })

const notFoundChannel = (res) => {
  res.status(404).json({
    error: '채널 정보를 찾을 수 없습니다.'
  })
}

module.exports = router
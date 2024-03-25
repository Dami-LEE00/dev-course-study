// express 모듈 셋팅
const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());  // http 외 모듈 'json'

const channelDB = new Map();
let id = 1; // 하나의 객체를 유니크하게 구별하기 위함

app
  .route('/channels')
  // 채널 전체 조회
  .get((req, res) => {
    let channels = [];

    if(channelDB.size) {
      channelDB.forEach((value, key) => {
        channels.push(value);
      })
      res.status(200).json(channels);
    } else {
      res.status(404).json({
        error: '조회할 채널이 없습니다.'
      })
    }

  })
  // 채널 개별 생성
  .post((req, res) => {
    if(req.body.channelTitle) {
      channelDB.set(id++, req.body);
      res.status(201).json({
        message: `${channelDB.get(id-1).channelTitle} 채널 개설을 환영합니다! `
      })
    } else {
      res.status(400).json({
        error: '요청 값을 제대로 보내주세요.'
      })
    }
  })

app
  .route('/channels/:id')
  // 채널 개별 조회
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let channel = channelDB.get(id);
    if(channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({
        error: '채널 정보를 찾을 수 없습니다.'
      })
    }
  })
  // 채널 개별 수정
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let channel = channelDB.get(id);
    let oldTitle = channel.channelTitle;

    if(channel) {
      let newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;
      
      channelDB.set(id, channel);
      res.json({
        message: `채널명이 ${oldTitle}에서 ${newTitle}로 변경되었습니다.`
      })
    } else {
      res.status(404).json({
        error: '채널 정보를 찾을 수 없습니다.'
      })
    }
  })
  // 채널 개별 삭제
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let channel = channelDB.get(id);
    if(channel) {
      channelDB.delete(id);
      res.status(200).json({
        message: `${channel.channelTitle} 채널이 정상적으로 삭제되었습니다.`
      })
    } else {
      res.status(404).json({
        error: '채널 정보를 찾을 수 없습니다.'
      })
    }
  })


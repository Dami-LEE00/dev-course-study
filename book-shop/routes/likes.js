// 240415_E조_이다미
const express = require('express');
const router = express.Router();
const { addLike, removeLike } = require('../controller/LikeController');

router.post('/:id', addLike); // 좋아요 추가
router.delete('/:id', removeLike);  // 좋아요 취소(삭제)

module.exports = router;
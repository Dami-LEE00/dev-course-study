// 240415_E조_이다미
const express = require('express');
const router = express.Router();
const { order, getOrders, getOrderDetail } = require('../controller/OrderController');

router.post('/', order);  // 주문하기(=주문등록)
router.get('/', getOrders); // 주문 목록 조회
router.get('/:id', getOrderDetail); // 주문 상세 (상품) 조회

module.exports = router;
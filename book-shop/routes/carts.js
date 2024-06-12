const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeCartItem } = require('../controller/CartController');

router.post('/', addToCart);  // 장바구니 담기
router.get('/', getCartItems);  // 장바구니 아이템 목록 조회 & 장바구니에서 선택한 아이템 목록 조회
router.delete('/:id', removeCartItem);  // 장바구니 도서 삭제

module.exports = router;
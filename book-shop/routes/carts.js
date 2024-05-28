const express = require("express");
const router = express.Router();
const {
	addToCart,
	getCartItems,
	removeCartItems,
} = require("../controller/CartController");
router.use(express.json());

//장바구니 담기
router.post("/", addToCart);

//장바구니 아이템 목록 조회
router.get("/", getCartItems);

//장바구니 삭제
router.delete("/:id", removeCartItems);

//장바구니에서 선택한 주문 예상 상품 목록 조회
router.get("/,");

module.exports = router;

const express = require("express");
const router = express.Router();

router.use(express.json());

//장바구니 담기
router.get("/", (_req, res) => {
	res.json("전체조회");
});
//장바구니 조회
router.get("/", (req, res) => {
	const { id } = req.params;
});
//장바구니 도서 삭제
router.delete("/", (req, res) => {
	const { id } = req.params;
});

//장바구니에서 선택한 주문 예상 상품 목록 조회
router.get("/,", (req, res) => {
	res.json("장바구니 조회");
});

module.exports = router;

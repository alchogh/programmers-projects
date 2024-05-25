const express = require("express");
const router = express.Router();

router.use(express.json());

//전체 도서 조회
router.get("/", (_req, res) => {
	res.json("전체조회");
});
//개별 도서 조회
router.get("/:id", (req, res) => {
	const { id } = req.params;
});
//카테고리별 도서 조회
// router.get("/:id", (req, res) => {
// 	const { id } = req.params;
// });

module.exports = router;

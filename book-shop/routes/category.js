const express = require("express");
const allCategory = require("../controller/CategoryController");
const router = express.Router();

router.use(express.json());

//전체 도서 조회 & 카테고리별 도서 조회
router.get("/", allCategory);

module.exports = router;

const express = require("express");
const router = express.Router();

router.use(express.json());

//좋아요 추가
router.post("/id", () => {});

//좋아요 취소
router.post("/id", () => {});

module.exports = router;

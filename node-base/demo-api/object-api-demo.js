const express = require("express");
const app = express();

app.listen(8888);

let youtuber1 = {
  channelTitle: "십오야",
  sub: "452명",
  videoNum: "993개",
};

let youtuber2 = {
  channelTitle: "침착",
  sub: "45132명",
  videoNum: "21.3개",
};

app.get("/:nickname", function (req, res) {
  const { nickname } = req.params;

  if (nickname === "15ya") {
    res.json(youtuber1);
  } else if (nickname === "chim") {
    res.json(youtuber2);
  } else {
    res.json({ message: "오류입니다" });
  }
});

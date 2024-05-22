const express = require("express");
const app = express();

app.listen(8888);

let book = {
  title: "node",
  price: 20000,
  description: "가나다라",
};

app.get("/products/:n", function (req, res) {
  // : => 어? 나한테 URL로 매개변수를 전달해줄 건 가보다
  //products/--빈칸에 오는 값ㅇ르 n이라는 변수에 담아줘

  if (parseInt(req.params.n) > 10) {
    console.log("10보다 큼");
  }

  res.json({
    num: req.params.n,
  });
});
// app.get("/:nickname", function (req, res) {
//   const param = req.params.nickname;
//   res.json({
//     channel: param,
//   });
// });

app.get("/watch", function (req, res) {
  const query = req.query;
  const { v, t } = query;

  res.json({
    video: v,
    timeline: t,
  });
});

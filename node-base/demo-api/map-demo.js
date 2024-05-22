const express = require("express");
const app = express();
app.listen(1234);

// app.get("/", function (req, res) {
//   res.send("hello world");
// });

app.get("/:id", function (req, res) {
  let { id } = req.params;

  id = parseInt(id);

  if (db.get(id) == undefined) {
    res.json({
      message: "없는 상품입니다.",
    });
  } else {
    let product = db.get(id);
    product["id"] = id;
    res.json(product);
  }
});

let db = new Map();

let notebook = {
  productName: "asdf",
  price: 200000,
};

let cup = {
  productName: "cup",
  price: 200,
};

db.set(1, notebook); //키로 벨류를 찾을 수 있는 한 쌍을 저장
db.set(2, cup);

// console.log(db);
// console.log(db.get(1));

//신입 사원 역량 반드시 알아야 하는 자료구조
//Map. List

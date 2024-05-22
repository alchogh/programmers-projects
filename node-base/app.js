const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());

app.post("/test", (req, res) => {
  res.send(req.body.message);

  console.log(req.body);
});

app.listen(port, () => {
  console.log(`${port}`);
});

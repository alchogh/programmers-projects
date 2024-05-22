const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { body, param, validationResult } = require('express-validator');
router.use(express.json()); //http 외 모듈 'json'

function notFound(res) {
  res.status(404).json({
    message: '조회할 채널이 없습니다. 채널을 만들어주세요',
  });
}

const isError = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  } else {
    next();
  }
};

let sql_select = `SELECT * FROM channels WHERE id = ?`;
let sql_selects = `SELECT * FROM channels WHERE user_id = ?`;
let sql_insert = `INSERT INTO channels(name, user_id) VALUES(?,?)`;
let sql_update = `UPDATE channels SET name = ? WHERE id = ?`;
let sql_delete = `DELETE FROM channels WHERE id = ?`;
router
  .route('/')
  //채널 전체 조회
  .get(
    [body('userId').notEmpty().isInt().withMessage('후엥'), isError],
    (req, res, next) => {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ error: err.array() });
      }
      const { userId } = req.body;

      conn.query(sql_selects, userId, (_err, results) => {
        if (!results.length) return notFound(res);

        return res.status(201).json(results);
      });
    },
  )
  //채널 개별 생성
  .post(
    [
      body('userId').notEmpty().isInt().withMessage('userId는 숫자여야합니다'),
      body('name').notEmpty().isString().withMessage('name 똑바로 적어라'),
      isError,
    ],
    (req, res) => {
      const { userId, name } = req.body;

      let values = [name, userId];
      conn.query(sql_insert, values, (err, results) => {
        if (err) {
          return res.status(500).json({ message: '서버 오류', error: err });
        }
        res.status(201).json(results);
      });
    },
  );

router
  .route('/:id')
  //채널 개별 조회
  .get(
    [param('id').notEmpty().withMessage('채널 id 필요'), isError],
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);

      conn.query(sql_select, id, (err, results) => {
        //error가 있을 때
        if (err) {
          return res.status(500).end();
        }
        //result가 없을 때
        if (!results.length) {
          return notFound(res);
        }
        //잘 들어올 때
        res.status(200).json(results);
      });
    },
  )
  //채널 개별 수정
  .put(
    [
      param('id').notEmpty().withMessage('id필요쓰'),
      body('name').notEmpty().isString().withMessage('name적어라'),
      isError,
    ],
    (req, res) => {
      let { id } = req.params;
      let { name } = req.body;
      id = parseInt(id);
      let values = [name, id];

      conn.query(sql_update, values, (err, results) => {
        if (err) {
          return res.status(500).json({ message: '서버 오류', error: err });
        }
        if (results.affectedRows === 0) {
          return res.status(400).end();
        }

        return res.status(200).json(results);
      });
    },
  )
  //채널 개별 삭제
  .delete(
    [param('id').notEmpty().withMessage('id 적어라'), isError],
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);

      conn.query(sql_delete, id, (err, results) => {
        if (err) {
          return res.status(400).json({ message: '서버 오류', error: err });
        }
        if (results.affectedRows === 0) {
          return res.status(400).end();
        } else {
          return res.status(200).json(results);
        }
      });
    },
  );

module.exports = router;

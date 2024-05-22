const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

const isError = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  } else {
    next();
  }
};

let sql_select = `SELECT * FROM users WHERE email = ?`;
let sql_insert = `INSERT INTO users(email, name, password, contact)
VALUES(?,?,?,?)`;
let sql_delete = `DELETE * FROM users WHERE email=?`;
//로그인
router.post(
  '/login',
  [
    body('email').notEmpty().isEmail().withMessage('이메일확인필요'),
    body('password').notEmpty().isString().withMessage('비번확인필요'),
    isError,
  ],
  (req, res) => {
    const { email, password } = req.body;

    conn.query(sql_select, email, (_err, results) => {
      let loginUser = results[0];

      //아이디 없을 때
      if (!loginUser)
        return res.status(404).json({ message: '회원정보가 없습니단' });

      //아이디 있을 때
      if (loginUser.password === password) {
        const token = jwt.sign(
          {
            email: loginUser.email,
            password: loginUser.password,
          },
          process.env.PRIVATE_KEY,
        );
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({
          message: `${loginUser.email}님 성공적으로 로그인이 되셨습니다`,
        });
      } else {
        res.status(403).json({ message: '비밀번호를 다시 확인해주세요' });
      }
    });
  },
);

//회원가입
router.post(
  '/join',
  [
    body('email').notEmpty().isEmail().withMessage('이메일확인필요'),
    body('name').notEmpty().isString().withMessage('name확인필요'),
    body('password').notEmpty().isString().withMessage('비번확인필요'),
    body('contact').notEmpty().isString().withMessage('contact확인필요'),
    isError,
  ],
  (req, res) => {
    const { email, name, password, contact } = req.body;
    conn.query(
      sql_insert,
      [email, name, password, contact],
      (_err, results) => {
        res.status(201).json(results);
      },
    );
  },
);

//회원 개별 조회
router
  .route('/users')
  .get(
    [body('email').notEmpty().isEmail().withMessage('이메일확인필요'), isError],
    (req, res) => {
      let { email } = req.body;
      conn.query(sql_select, email, (_err, results) => {
        res.status(200).json(results);
      });
    },
  )

  //회원 개별 탈퇴
  .delete(
    [body('email').notEmpty().isEmail().withMessage('이메일확인필요'), isError],
    (req, res) => {
      let { email } = req.body;
      conn.query(sql_delete, email, (_err, results) => {
        res.status(200).json(results);
      });
    },
  );
module.exports = router;

const jwt = require("jsonwebtoken");
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();

function ensureAuthorization(req, res) {
	try {
		let receivedJwt = req.headers["authorization"];
		let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
		return decodedJwt;
	} catch (err) {
		console.log(err.name);
		console.log(err.message);
		return err;
	}
}

//장바구니 담기
const addToCart = (req, res) => {
	const { book_id, quantity } = req.body;
	let authorization = ensureAuthorization(req);

	let sql =
		"INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?,?)";
	let values = [authorization.id, book_id, quantity];

	conn.query(sql, values, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}
		return res.status(StatusCodes.OK).json(results);
	});
};

//장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
	const { selected } = req.body;
	let authorization = ensureAuthorization(req, res);

	if (authorization instanceof jwt.TokenExpiredError) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "다시 로그인 해라" });
	} else {
		let sql =
			"SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems LEFT JOIN books ON cartItems.book_id=books.id WHERE user_id=? AND cartItems.id IN (?)";
		let values = [authorization.id, selected];
		conn.query(sql, values, (err, results) => {
			if (err) {
				return res.status(StatusCodes.BAD_REQUEST).end();
			}
			return res.status(StatusCodes.OK).json(results);
		});
	}
};

//장바구니 삭제
const removeCartItems = (req, res) => {
	const cartItemId = req.params.id;

	let sql = "DELETE FROM cartItems WHERE id = ?";

	conn.query(sql, cartItemId, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}
		return res.status(StatusCodes.OK).json(results);
	});
};

module.exports = { addToCart, getCartItems, removeCartItems };

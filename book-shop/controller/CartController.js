const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

//장바구니 담기
const addToCart = (req, res) => {
	const { user_id, book_id, quantity } = req.body;
	//좋아요 추가
	let sql =
		"INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?,?)";
	let values = [user_id, book_id, quantity];

	conn.query(sql, values, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}
		return res.status(StatusCodes.OK).json(results);
	});
};

//장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
	const { user_id, selected } = req.body;
	let sql =
		"SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems LEFT JOIN books ON cartItems.book_id=books.id WHERE user_id=? AND cartItems.id IN (?)";
	let values = [user_id, selected];
	conn.query(sql, values, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}
		return res.status(StatusCodes.OK).json(results);
	});
};

//장바구니 삭제
const removeCartItems = (req, res) => {
	const { id } = req.params;

	let sql = "DELETE FROM cartItems WHERE id = ?";

	conn.query(sql, id, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}
		return res.status(StatusCodes.OK).json(results);
	});
};

const select = (req, res) => {
	res.json("장바구니 조회");
};

module.exports = { addToCart, getCartItems, removeCartItems };

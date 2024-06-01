const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const order = (req, res) => {
	const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
		req.body;
	let delivery_id;
	let order_id;

	let sql = "INSERT INTO delivery (address, receiver, contact) VALUES(?,?,?)";
	let values = [delivery.address, delivery.receiver, delivery.contact];
	conn.query(sql, values, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}
		delivery_id = results.insert_id;

		res.status(StatusCodes.OK).json(results);
	});

	sql =
		"INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES(?,?,?,?,?)";
	values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
	conn.query(sql, values, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}
		order_id = results.insert_id;

		res.status(StatusCodes.OK).json(results);
	});

	sql = "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?";
	values = [];
	items.forEach((item) => {
		values = [...values, [order_id, item.book_id, item.quantity]];
	});
	conn.query(sql, [values], (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}

		return res.status(StatusCodes.OK).json(results);
	});
};

const getOrders = (req, res) => {
	res("주문");
};

const getOrderDetail = (req, res) => {
	res("주문");
};

module.exports = {
	order,
	getOrders,
	getOrderDetail,
};

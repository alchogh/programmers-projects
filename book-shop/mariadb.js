const mariadb = require("mysql2");
// const fs = require("fs");
// const path = require("path");
const conn = mariadb.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "Bookshop",
	dateStrings: true,
});

// // SQL 파일 경로
// const filePath = path.join(__dirname, "data.sql");

// // SQL 파일 읽기
// fs.readFile(filePath, "utf8", (err, sql) => {
// 	if (err) {
// 		console.error("SQL 파일 읽기 실패:", err);
// 		return;
// 	}

// 	// SQL 쿼리 실행
// 	conn.query(sql, (err, results) => {
// 		if (err) {
// 			console.error("SQL 쿼리 실행 실패:", err);
// 			return;
// 		}
// 		console.log("SQL 쿼리 실행 성공:", results);

// 		// 데이터베이스 연결 종료
// 		conn.end((err) => {
// 			if (err) {
// 				console.error("데이터베이스 연결 종료 실패:", err);
// 				return;
// 			}
// 			console.log("데이터베이스 연결 종료 성공");
// 		});
// 	});
// });

module.exports = conn;

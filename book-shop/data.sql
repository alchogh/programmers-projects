INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date) 
VALUES ("어린왕자들", "종이책", 0, "어리다..", "많이 어리다..", "김어림", 100, "목차입니다.", 20000, "2024-01-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date) 
VALUES ("신데렐라들", "종이책", 1, "유리구두..", "투명한 유리구두..", "김구두", 100, "목차입니다.", 20000, "2024-12-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date) 
VALUES ("백설공주들", "종이책", 2, "사과..", "빨간 사과..", "김사과", 100, "목차입니다.", 20000, "2024-11-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date) 
VALUES ("흥부와 놀부들", "종이책", 3, "제비..", "까만 제비..", "김제비", 100, "목차입니다.", 20000, "2024-12-08");


SELECT * FROM books LEFT JOIN category ON books.category_id = category_id WHERE book.id=1;
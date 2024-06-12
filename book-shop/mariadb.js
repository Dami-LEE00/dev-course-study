// mysql 모듈 불러오기
const mysql = require('mysql2');

// DB와 연결 통로 생성
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'Bookshop',
  dateStrings: true
});

module.exports = connection;
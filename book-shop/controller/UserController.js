// 240410_E조_이다미
const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // crypto 모듈: 암호화
const dotenv = require('dotenv');
dotenv.config();

// 회원가입
const join = (req, res) => {
  const { email, password } = req.body;

  let sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;

  // 비밀번호 암호화 (회원가입 시 입력한 비밀번호가 INSERT 되기 전에! 암호화해야 한다.)
  // 회원가입 시 비밀번호를 암호화해서, 암호화된 비밀번호와 salt값을 같이 DB에 저장
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

  // 로그인 시 이메일과 비밀번호(날 것) 받기 => salt값 꺼내서 비밀번호 암호화 => DB 비밀번호와 비교
  let values = [email, hashPassword, salt];
  conn.query(sql, values,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if(results.affectedRows) {
        return res.status(StatusCodes.CREATED).json(results);
      } else {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
  });
};

// 로그인
const login = (req, res) => {
  const { email, password } = req.body;

  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email,
    (err, results) => {
      if(err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      
      const loginUser = results[0];

      // salt값 꺼내서 날 것으로 들어온 비밀번호 암호화 => DB 비밀번호와 비교
      const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

      // DB 비밀번호와 비교
      if(loginUser && loginUser.password === hashPassword) {
        // 토큰 발행
        const token = jwt.sign(
          {
            id: loginUser.id,
            email: loginUser.email
          },
          process.env.PRIVATE_KEY,
          {
          expiresIn: '100000m',
          issuer: 'dami'
          }
        );

        // 토큰 쿠키에 담기
        res.cookie('token', token, {
          httpOnly: true,
        });
        console.log(token);

        return res.status(StatusCodes.OK).json({
          ...results[0],
          token: token
        });
      } else {
        // 401: Unauthorized, 403: Forbidden(접근 권리 없음)
        return res.status(StatusCodes.UNAUTHORIZED).end();
      }
  });
};

// 비밀번호 초기화 요청
const passwordResetRequest = (req, res) => {
  const { email } = req.body;

  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      // email로 user가 존재하는지 찾아본다.
      const user = results[0];
      if(user) {
        return res.status(StatusCodes.OK).json({
          email: email
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).end();
      }
  });
};

// 비밀번호 초기화
const passwordReset = (req, res) => {
  const { email, password } = req.body;

  let sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;

  // 암호화된 비밀번호와 salt값을 같이 DB에 저장
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

  let values = [hashPassword, salt, email];
  conn.query(sql, values,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if(results.affectedRows) {
        return res.status(StatusCodes.OK).json(results);
      } else {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
  });
};

module.exports = {
  join,
  login,
  passwordResetRequest,
  passwordReset
};

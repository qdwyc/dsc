// 先下载mysql模块
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost', //域名或者ip地址
  user: 'root', //mysql数据库的用户名
  password: '', //mysql数据库的密码
  database: 'shop', //要连接的数据库的名字
  port: 3307,
});

// console.log(connection);

// const userSql = 'SELECT * FROM dscmall_users';

// connection.query(userSql, (err, data) => {
//   if (!err) {
//     console.log(data);
//   }
// });

// connection.end();

// 封装查询方法，给不同的sql查询对应的数据
function requestQuery(sql, sqlArr) {
  return new Promise((resolve, reject) => {
    connection.query(sql, sqlArr, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// 暴露
module.exports = {
  connection,
  requestQuery, //requestQuery: requestQuery
};

// 引入db模块
const { requestQuery, connection } = require('../database/db');

// 引入格式化时间模块
const moment = require('moment');

// 下载引入字符串随机数模块
const stringRandom = require('string-random');

// 下载引入加密模块
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const JWT = require('./token');
// console.log(JWT);

//下载引入IHuyi模块
const { iHuyi } = require('./HUAQIAN');

// 下载引入验证码模块
const svgCaptcha = require('svg-captcha');

//定义一个变量来临时存储手机号
var tempPhone = null;
//定义一个变量来存储临时手机验证码
var tempCode = null;
// 定义一个变量来存储随机验证码
var tempCaptcha = null;

// 用户列表
exports.UserList = async (req, res) => {
  const userSql = 'SELECT * FROM dscmall_users WHERE is_show=1';
  const userList = await requestQuery(userSql);
  res.json({
    data: userList,
  });
};

// 用户注册
exports.UserRegister = (req, res) => {
  // 需要post发送数据
  // console.log(req.body); // { user_name: 'admin' }
  let user_name = req.body.user_name;
  let login_password = req.body.login_password;
  let phone = req.body.phone;

  let sql_name =
    'SELECT user_name FROM dscmall_users WHERE user_name=? AND is_show=1';

  // 获取当前时间 格式：2020-12-07 20:28:30
  let nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
  // console.log(nowDate);
  connection.query(sql_name, user_name, (err, result_name) => {
    if (err) {
      return res.json({
        msg: '用户注册失败',
        status: 1001,
        data: err,
      });
    }

    //需求：如果用户名存在则不能注册，用户名不存在、但是手机号存在也不能注册
    //如果result_name为空，说明该用户不存在，则说明用户名可以使用
    if (result_name == '') {
      //条件成立则说明输入的用户名不存在
      //验证一下手机号是否存在
      let sql_phone =
        'SELECT phone FROM dscmall_users WHERE phone=? AND is_show=1';
      connection.query(sql_phone, phone, (err, result_phone) => {
        if (err) {
          return res.json({
            msg: '用户注册失败',
            status: 1002,
            data: err,
          });
        }
        //result_phone为空，说明该手机号可用
        if (result_phone == '') {
          //条件成立则说明输入的手机号可用
          // INSERT INTO dscmall_users SET user_name="admin4"
          let sql_register = `INSERT INTO dscmall_users SET user_name=?,login_password=?, phone=?,is_show=1,create_time="${nowDate}"`;

          // 给密码加密
          const hashpassword = bcrypt.hashSync(login_password, salt);
          connection.query(
            sql_register,
            [user_name, hashpassword, phone],
            (err, result) => {
              if (err) {
                return res.json({
                  msg: '用户注册失败',
                  status: 1002,
                  data: err,
                });
              }
              if (result.affectedRows == 1) {
                return res.json({
                  msg: '恭喜您注册成功，可以登录',
                  status: 200,
                  data: result,
                });
              } else {
                return res.json({
                  msg: '用户注册失败',
                  status: 1003,
                  data: err,
                });
              }
            }
          );
        } else {
          return res.json({
            msg: '该手机号已经存在，请更换手机号注册',
            status: 500,
          });
        }
      });
    } else {
      return res.json({
        msg: '该用户名已经存在，请更换用户名注册',
        status: 500,
      });
    }
  });
};

// 用户登录
exports.UserLogin = async (req, res) => {
  // 需要post发送数据
  const user_name = req.body.user_name;
  const captcha = req.body.captcha.toLowerCase();

  if (captcha != tempCaptcha) {
    return res.json({
      status: 4004,
      msg: '随机验证码不正确',
    });
  }
  // 先判断用户名是否存在
  const sql = `SELECT user_name,login_password FROM dscmall_users WHERE user_name=? AND is_show=1`;
  connection.query(sql, [user_name], (err, result) => {
    if (err) {
      return res.json({
        msg: '数据库查询失败',
        status: 500,
      });
    }
    if (result == '') {
      return res.json({
        msg: '该用户不存在，快去注册一个吧~',
        status: 1004,
      });
    } else {
      // console.log(result);
      const login_password = bcrypt.compareSync(
        req.body.login_password,
        result[0].login_password
      );
      console.log(login_password); //是一个布尔值 true or false
      if (login_password !== true) {
        return res.status(500).json({
          msg: '密码错误，请重新输入',
        });
      } else {
        let token = JWT.createToken({
          login: true,
          user_name: user_name,
        });
        // console.log(JWT.verifyToken(token));
        return res.json({
          status: 200,
          msg: '登录成功',
          data: result,
          token: token,
        });
      }
    }
  });
};

//获取验证码接口
exports.GetIdentifyingCode = async (req, res) => {
  //第一步：输入正确的手机号
  //第二步：点击获取验证码，发送请求
  //第三步：短信的内容+随机验证码
  // console.log(req.body);
  for (var phoneattr in req.body) {
    var phone = phoneattr;
    tempPhone = phoneattr; //临时手机号变量赋值
  }

  // Math.random() 0-1
  // Math.floor(Math.random()*999999)
  var identCode = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
  console.log(identCode); //打印验证码
  tempCode = identCode; //把验证码赋值给临时验证码变量

  let MessageContent =
    '您的验证码是：' + identCode + '。请不要把验证码泄露给其他人。';
  iHuyi.send(phone, MessageContent, (err, smsId) => {
    if (err) {
      console.log(err.message);
    } else {
      res.json({
        msg: '发送成功',
        status: 200,
        data: identCode,
      });
      console.log('SMS sent, and smsId is ' + smsId);
    }
  });

  // res.json({
  //   msg: '发送成功',
  //   status: 200,
  //   data: identCode,
  // });
};

// 短信登录
exports.PhoneLogin = async (req, res) => {
  console.log(req.body.phone); //手机号
  console.log(req.body.code); //验证码
  var phone = req.body.phone;
  var code = req.body.code;
  var captcha = req.body.captcha.toLowerCase();
  if (code != tempCode) {
    return res.json({
      status: 4002,
      msg: '短信验证码不正确',
    });
  } else if (phone != tempPhone) {
    return res.json({
      status: 4003,
      msg: '手机号不正确',
    });
  } else if (captcha != tempCaptcha) {
    return res.json({
      status: 4004,
      msg: '随机验证码不正确',
    });
  } else {
    //判断手机号是否存在
    //1.手机号不存在，将该手机号注册成为用户
    const sql_phone = 'SELECT * FROM dscmall_users WHERE phone=? AND is_show=1';
    const phone_result = await requestQuery(sql_phone, phone);
    console.log(phone_result); //如果手机号存在则得到一个数组
    if (phone_result.length == 0) {
      //如果条件成立说明手机号不存在
      //手机号不存在要注册一个账号
      //1.需要随机生成一个用户名
      const user_name = 'hg' + stringRandom(10);
      console.log(user_name);
      let nowDate = moment().format('YYYY-MM-DD HH:mm:ss'); //获取当前时间
      let sql_register = `INSERT INTO dscmall_users (user_name, phone, is_show, create_time) VALUES ("${user_name}", "${phone}", "1", "${nowDate}")`;
      // let sql_register = `INSERT INTO dscmall_users SET user_name=?,login_password=?, phone=?,is_show=1,create_time="${nowDate}"`;
      // 注册
      let phoneRegister = await requestQuery(sql_register);
      let result = await requestQuery(sql_phone, phone);
      console.log(phoneRegister);
      console.log(result);

      if (phoneRegister.affectedRows == 1) {
        //注册成功
        let token = JWT.createToken({
          login: true,
          phone: result[0].phone,
        });
        return res.json({
          status: 200,
          msg: '登录成功',
          data: result,
          token,
        });
      } else {
        return res.json({
          status: 500,
          msg: '服务器错误',
        });
      }
    } else {
      //2.如果手机号存在，则直接登录
      let token = JWT.createToken({
        login: true,
        phone: phone_result[0].phone,
      });
      return res.json({
        status: 200,
        msg: '登录成功',
        data: phone_result,
        token: token,
      });
    }
  }
};

// 生成验证码
exports.SvgCaptcha = async (req, res) => {
  var captcha = svgCaptcha.create({
    size: 4, // 字符串的长度
    ignoreChars: '0o1i', // 排除的字符
    noise: 3, // 线条
    color: true, // 文字颜色
    background: '#fff',
  });
  // 把验证码赋值给全局变量 tempCaptcha
  tempCaptcha = captcha.text.toLowerCase();
  // 将验证码转换为图片格式
  res.type('svg');
  res.status(200).send(captcha.data);
  console.log(captcha.text);
};

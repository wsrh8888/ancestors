const express = require('express')
const mongoose = require('mongoose')
//请求的中间件.解析post
const bodyParser = require('body-parser');
// 生成token
const passport = require('passport')
const app = express()

// 跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/**
 * bodyParser
 * 请求的中间件.解析post
 */ 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


/**
 * 使用路由。来设置接口
 * 
 */
const users = require("./routers/api/user")
const games = require("./routers/api/game")

/**
 * /api/users  和用户有关的接口
 */
app.use('/api/users', users);
app.use('/api/games', games);

/**
 * 数据库的连接
*/
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
  .then(() => {
    console.log("数据库连接成功")
  })
  .catch(err => {
    console.log(err)
    console.log("失败")
  })

  // 使用中间件。进行token的验证
  app.use(passport.initialize());
  require('./config/passport')(passport)

/**
 * 设置端口
 */
const port = process.env.PORT || 8081
app.listen(port,() => {console.log('服务器启动成功')})
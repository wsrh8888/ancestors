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
  next();
});

/**
 * @name bodyParser 
 * 请求的中间件.解析post
 */ 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



/**
 * @name 使用路由。来设置接口
 * 
 */
const users = require("./routers/api/user")
const games = require("./routers/api/game")
const gamebasic = require('./routers/api/game/basic')
const gameImg = require('./routers/api/game/gameImg')
const gameinstall = require('./routers/api/game/install')
const gamelog = require('./routers/api/game/log')
const types = require('./routers/api/type')
const articles = require('./routers/api/article')
/**
 * 
 * /api/users  和用户有关的接口
 */
app.use('/static',express.static('static'));
app.use('/api/users', users);
app.use('/api/games', games);
app.use('/api/games', gamebasic);
app.use('/api/games', gameImg);
app.use('/api/games', gameinstall);
app.use('/api/games', gamelog);
app.use('/api/types', types);
app.use('/api/articles', articles);


/**
 * @name 使用session中间件
 */
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

var k = {
  dxddd: 'dddddd'
}
app.get('/test', (req,res) => {
  k.vcalue = '567'
  res.json(k)
})

app.get('/test2',(req,res) => {
  k.ll = 'wwwww'
  res.json(k)
})


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
const port = process.env.PORT || 8085
app.listen(port,() => {console.log('服务器启动成功')})
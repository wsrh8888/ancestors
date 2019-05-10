/**
 * 注册。登录
 * express node的服务器框架
 * gravatar 全球头像
 * Passport 是一个扩展性很强的认证中间件，
*/
const express = require('express');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const md5 = require('md5')
const passport = require('passport');
const querystring = require('querystring')
const request = require('request')
const {URL} = require('../../config/keys')
const router = express.Router()
//导入数据库的视图
const User = require('../../models/User')

/**
 * @author Robert
 * @name 发送请求返回验证码
 * @method get
 * @url /api/users/code
 * @data 
 *     phone 手机号码
 * @return
 *    1.success: false,msg: '手机号码已被注册'
 *    2.success: true, msg: `6位数的验证码`
 */
var verification = {}
router.post('/code', (req, res) => {
  User.findOne({phone: req.body.phone})
    .then(data => {
      if (data) {
        res.json({success: false,msg: '手机号码已被注册'})
      }
      else {
        let code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
        verification[req.body.phone] = code
        var queryData = querystring.stringify({
          mobile: req.body.phone, // 接受短信的用户手机号码
          tpl_id: '141390', // 您申请的短信模板ID，根据实际情况修改
          tpl_value: `#code#=${code}`, // 您设置的模板变量，根据实际情况修改
          key: '91ec1c4e22487da63a23d7ee90374f2a' // 应用APPKEY(应用详细页查询)
        });

        var queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;

        request(queryUrl, function(error, response, body) {
          if (!error && response.statusCode == 200) {

            var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
            res.json({success: true, msg: '短信发生成功'})
          } else {
            console.log('请求异常');
          }
        });
      }
    })
});


/**
 * @name 注册接口
 * @author Robert
 * @method post
 * @url /api/users/register
 * @data
 *      code 验证码
 *      phone 电话号码
 *      name 昵称
 *      password 密码
 * @returns
 *      success: false,msg: '手机号已被注册'
 *      success: false,msg:'验证码错误'
 *      success: true,msg:'注册成功'
 */
router.post('/register',(req,res) => {
  if (req.body.code != verification[req.body.phone]){
    return res.json({success: false,msg:'验证码错误'})
  } else {
    User.find({phone: req.body.phone})
    .then(user => {
      if (user.length!=0) {
        return res.json({success: false,msg: '手机号已被注册'})
      } else {
        // console.log('fg')
        const newUser = new User({
          name: req.body.name,
          phone: req.body.phone,
          password: md5(req.body.password)
        })
        newUser.save()
         .then(user => res.json({success: true,msg:'注册成功'}))
         .catch(err => console.log(err))
      }
    })
  }
})

/**
 * @name 页面的登录
 * @author Robert
 * @method post
 * @url api/users/login
 * @data
 *    email: 邮箱或者手机
 *    password: 密码
 * @returns 
 *    success:false,msg:'密码错误'
 *    success: true,token
 */
router.post('/login', (req,res) => {
  console.log(req.body.email)
  //判断数据库中是否有email
  User.findOne({$or: [{email:req.body.email},{phone: req.body.email}]})
    .then(user => {
      if (!user) res.json({success: false, msg: '账号不存在'})
      else {
        if ( user.password == md5(req.body.password)) {
          const rule = ({
              id: user.id,
              name:user.name,
              grade: user.grade,
              avatar: URL + user.avatar,
              });
          //  jwt.sign('规则','加密名字','过期时间','箭头函数') session的规则
          jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600} ,(err,token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
        } else {
          return res.json({success:false,msg:'密码错误'})
        }
      }
    })
})


/**
 * @name 显示所有的用户
 * @author Robert
 * @method get
 * @url api/users/alls/:id
 * @params
 *      id 用户id
 * @returns
 *    success: false, msg: '权限不够'
 * 
 *    success: true,result: 集合
 *    _id	用户的id	
 *    name	用户的名字	
 *    email	用户绑定邮箱	
 *    password	用户密码	
 *    phone	绑定的手机号	
 *    grade	权限等级	

 *    
 */
router.get('/alls/:id',passport.authenticate('jwt', { session: false }),(req,res)=> {
  User.findOne({_id:req.params.id})
    .then(user => {
      if (user.grade >= 9999) {
        User.find({"grade": {'$lt': user.grade}})
        .then(users => {
          date = []
          for(let i=0;i<users.length; ++i) {
            let list = {
              _id: users[i]._id,
              name: users[i].name,
              email: users[i].email,
              password: users[i].password,
              phone: users[i].phone,
              grade: users[i].grade
            }
            date.push(list)
          }
          res.json({success: true,result:date})
        })
      } else {
        res.json({success: false, msg: '权限不够'})
      }
    })
})

/**
 * @name 修改用户的信息
 * @author Robert
 * @method post
 * @url api/users/update
 * @data
 *    name	用户的名字	
 *    email	用户邮箱	
 *    grade	用户的权限等级	
 *    _id	用户的id值	
 *    phone	用户电话	
 *    password	用户密码
 * @returns 
 *    success: true, msg: '数据更新成功'
 */
router.post('/update', (req,res) => {
  var list = {}
  console.log(req.body)
  if (req.body.password) {
    list = {
      name: req.body.name,
      email: req.body.email,
      grade: req.body.grade,
      _id: req.body._id,
      phone: req.body.phone,
      password: md5(req.body.password)
    }
  } else {
    list = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      grade: req.body.grade,
      _id: req.body._id
    }
  }
  
  User.update({_id: req.body._id},list)
    .then(user => {
      res.json({success: true, msg: '数据更新成功'})
    })
    .catch(err => {
      res.json({success: false, msg: '数据更新失败'})
    })
})

/**
 * @name 修改用户的信息
 * @author Robert
 * @method delete
 * @url api/users/delete
 * @param
 *     id   被修改用户的id
 * @returns
 *    success: true, msg: '删除成功'
 */
router.delete('/delete/:id', (req, res) => {
  User.remove({_id: req.params.id})
    .then(user => {
      res.json({success: true, msg: '删除成功'})
    })
    .catch(err => {
      res.json({success: false, msg: '删除失败'})
    })
})

module.exports = router;

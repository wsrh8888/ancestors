/**
 * 注册。登录
 * express node的服务器框架
 * gravatar 全球头像
 * Passport 是一个扩展性很强的认证中间件，
*/
const express = require('express');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const md5 = require('md5')
const passport = require('passport');

const router = express.Router()
//导入数据库的视图
const User = require('../../models/User')

/**
 * 1.注册接口
 * 请求方式: post
 * 路由: api/users/register
 * 参数: name(名字) password(密码) email(邮箱) 
 * access  Public
 */
router.post('/register',(req,res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({email: '邮箱已经被注册'})
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        })
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: md5(req.body.password),
          avatar: avatar
        })
        newUser.save()
         .then(user => res.json({success: true,msg:'注册成功'}))
         .catch(err => console.log(err))
      }
    })

})

/**
 * 2.页面的登录
 * 请求方式: post
 * api/users/login
 * 参数:
 *  email(邮箱) password(密码)
 * access  Public
 */
router.post('/login', (req,res) => {
  const email = req.body.email
  const password = req.body.password
  
  //判断数据库中是否有email
  User.findOne({email})
    .then(user => {
      if (!user) res.status(400).json({email: '用户不存在'})
      if ( user.password == md5(password)) {
        const rule = ({
             id: user.id,
             name:user.name,
             email: user.email,
             grade: user.grade,
             avatar:user.avatar,
             phone: user.phone
            });
        //  jwt.sign('规则','加密名字','过期时间','箭头函数') session的规则
        jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600} ,(err,token) => {
          if (err) throw err;
          res.json({
            sucess: true,
            token: 'Bearer ' + token
          })
        })
      } else {
        return res.json("密码错误")
      }
    })
})

/**
 * 3.显示所有的用户
 * 请求方式: get
 * api/users/alls
 * access  Private
 * passport.authenticate('jwt', { session: false }),
 */
router.get('/alls/:id',(req,res)=> {
  // res.json(req.params.id)
  User.findOne({_id:req.params.id})
    .then(user => {
      if (user.grade >= 90) {
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
 * 4.修改用户的信息
 * 请求方式: post
 * api/users/update
 * access  Private
 * passport.authenticate('jwt', { session: false }),
 */
router.post('/update', (req,res) => {
  const list = {
    name: req.body.name,
    email: req.body.email,
    grade: req.body.grade,
    _id: req.body._id,
    phone: req.body.phone,
    password: md5(req.body.password),
  }
  User.update({_id: req.body._id},list)
    .then(user => {
      res.json({success: true, msg: '数据更新成功'})
    })
})

/**
 * 5.修改用户的信息
 * 请求方式: delete
 * api/users/delete
 * access  Private
 * passport.authenticate('jwt', { session: false }),
 */
router.delete('/delete/:id', (req, res) => {
  User.remove({_id: req.params.id})
    .then(user => {
      res.json({success: true, msg: '删除成功'})
    })
})

module.exports = router;

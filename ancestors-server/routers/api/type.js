/**
 * 注册。登录
 * express node的服务器框架
 * gravatar 全球头像
 * Passport 是一个扩展性很强的认证中间件，
*/
const express = require('express');
const keys = require('../../config/keys');
const passport = require('passport');

const router = express.Router()
//导入数据库的视图
const Type = require('../../models/Type')



module.exports = router;

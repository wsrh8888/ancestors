const express = require("express")
const passport = require('passport');
const router = express.Router()
const Game = require('../../../models/Game')

/**
 * @author Robert
 * @name 获取游戏的下载信息
 * @methods get
 * @params id: 游戏所有者的id
 * @url /api/games/downloadlist
 * @return 
 *    success	true/false
 *    result	集合	集合
 *      _id	游戏的id	
 *      name	游戏的名称	
 *      install	下载信息	
 *      url1	完整版地址	
 *      password1	完整版密码	
 *      url2	独立版地址	
 *      password	独立版密码	
 *      msg1	完整版安装说明	
 *      msg2	独立版安装说明
 */
router.get('/downloadlist/:id',passport.authenticate('jwt', { session: false }), (req,res) => {
  Game.find({user_id: req.params.id},'name install')
   .then(download => {
     res.json({success: true,result:download})
   })
  
})

/**
 * @author Robert
 * @name 修改游戏的下载信息
 * @methods  post
 * @params  id: 游戏名字的id
 * @url api/games/updatedown/:id
 * @data 
 *    name	游戏名字	
 *_   id	游戏的id	
 *    user_id	游戏的所有者	
 *    url1	完整版地址	
 *    password1	完整版密码	
 *    url2	独立版地址	
 *    password	独立版密码	
 *    msg1	完整版安装说明	
 *    msg2	独立版安装说明	
 * @return 
 *    success	true/false	
 *    msg	返回信息	
 */
router.post('/updatedown',(req,res) => {
  const gameFile = {}
  let install = {
    msg1: req.body.msg1,
    url1: req.body.url1,
    password1: req.body.password1,
    msg2: req.body.msg2,
    url2: req.body.url2,
    password2: req.body.password2
  }
  gameFile.install = install
  gameFile.name = req.body.name
  Game.findOneAndUpdate({_id:req.body._id,user_id: req.body.user_id},{$set:gameFile})
    .then(date => res.json({success: true, msg: '更新成功'}))
    .catch(error => {console.log(error)})
})

module.exports = router
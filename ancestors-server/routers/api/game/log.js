const express = require("express")
const router = express.Router()
const Game = require('../../../models/Game')

/**
 * @author Robert
 * @name 游戏的更新日志
 * @methods get
 * @url /api/games/log/:id    游戏的id
 * @params id
 * @return 
 *      success	true/false	
 *      result	返回信息	
 */
router.get('/log/:id', (req, res) => {
  Game.find({user_id:req.params.id},['log','name'])
    .then(logs => {
      res.json({success: true,result:logs})
    })
}
)


/**
 * @author Robert
 * @name 添加游戏的更新日志
 * @method post
 * @url /api/games/addlog
 * @data 
 *    title	更新日志的名称	
 *    _id	游戏的id	
 *    user_id	游戏的所有者	
 *    content	字符串	以,分隔   更新的内容
 * @return 
 *    success	true/false	
 *    msg	返回信息	
 */
router.post('/addlog', (req, res) => {
let log = [{
  title: req.body.title,
  content: req.body.content.split(",")
}]
let logs = {log}
Game.update({_id:req.body._id,user_id:req.body.user_id},
{'$push':logs})
  .then(logs => {
    return res.json({success: true,msg: '添加成功'})
  })
})


/**
 * 
 * @author Robert
 * @name 修改游戏的更新日志
 * @method post
 * @url /api/games/updatelog
 * @data 
 *    title	日志的名称	
 *    game_id	游戏的id	
 *    user_id	游戏的所有者	
 *    _id	更新日志的id	
 *    content	字符串	以,分隔

 */
router.post('/updatelog', (req, res) => {
let log = {
  title: req.body.title,
  content: req.body.content.split(",")
}
// let logs = {log}
Game.updateOne({_id:req.body._id,user_id:req.body.user_id,"log._id": req.body.msg_id},{
  $set:{"log.$.title":log.title,"log.$.content":log.content}
})
  .then(logs => {
    return res.json({success: true,msg: '添加成功'})
  })
})


/**
 * @author Robert
 * @name 删除游戏的某一个更新日志
 * @method post
 * @url /api/games/deletelog
 * @data 
 *    _id	游戏的id	
 *    user_id	游戏的所有者	
 *    msg_id	删除日志的id
 * @returns
 *     success: true,
 *      msg: '删除成功'
 */
router.post('/deletelog', (req, res) => {
Game.updateOne({_id:req.body._id,user_id:req.body.user_id,"log._id": req.body.msg_id},
{$pull:{"log": {_id: req.body.msg_id}}})
  .then(logs => {
    return res.json({success: true,msg: '删除成功'})
  })
})

module.exports = router
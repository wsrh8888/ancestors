const express = require("express")
const passport = require('passport');
const router = express.Router()
const Game = require('../../../models/Game')
const User = require('../../../models/User')
const {URL} = require('../../../config/keys')
var multiparty = require('multiparty');


/**
 * @author Robert
 * @name 新增一个游戏的Logo
 * @method post
 * @url /api/games/addlogo
 * @return 图片的地址
 * */
router.post('/addlogo', (req, res) => {
  var form = new multiparty.Form();
  form.uploadDir = "static/img/logo"
  form.parse(req, function(err, fields, files) {
    var path = files.logo[0].path.split("\\")
    path = path.join('/')
    var result = URL + path
    res.json(result)
  });
})


/**
 * @author Robert
 * @name 获取游戏的基础信息
 * @method 请求方式: get
 * @url /api/games/gamelist
 * @params 参数: id 用户id
 * @return 
 *      _id	游戏的id	
 *       name	游戏的名字	
 *      author	作者	
 *      versions	版本	
 *      size	大小	
 *      studio	工作室	
 *      prince	价格	
 *      declaration	游戏声明	
 *      date	游戏的创建日期	
 *      Logo	游戏logo	
 */
router.get('/gamelist/:id',passport.authenticate('jwt', { session: false }), (req,res) => {
  User.findOne({_id: req.params.id})
    .then(user => {
      if (user.grade == 0) {
        res.json({success: false, msg: '您的权限不够'})
      } else{
        Game.find({user_id: req.params.id})
          .then(games => {
            if (!games) {
              return res.status(404).json({success: false,msg: '您还未添加游戏'})
            }
            var result = []
            for (let i=0;i<games.length;++i) {
              let data = {}
              data._id = games[i]._id
              data.name = games[i].name
              data.author = games[i].basics.author
              data.versions = games[i].basics.versions     
              data.size = games[i].basics.size     
              data.prince = games[i].basics.prince     
              data.declaration = games[i].basics.declaration     
              data.date = games[i].basics.date
              data.studio = games[i].basics.studio
              data.logo = URL + games[i].basics.logo
              result.push(data)
            }
            
            res.json({success: true,result})
          })
          .catch((err) => {
            res.status(404).json(err)
          })
      }
    })
})



/**
 * @author Robert
 * @name 新增一个游戏
 * @methods 请求方式: post
 * @url api/games/add
 * @data 
 *    author	作者
 *    name	游戏名字
 *    logo	游戏的图标
 *    versions	版本
 *    size	大小
 *    studio	工作室
 *    price	价格
 *    declaration	游戏声明
 *    date 游戏的更新时间
 * @return 
 *    success: true
 *    msg: '添加成功'
 */
router.post("/add", (req,res) => {

  let basics = {
    author: req.body.author,
    size: req.body.size,
    versions: req.body.versions,
    date: req.body.date,
    studio: req.body.studio,
    prince: req.body.prince,
    declaration: req.body.declaration,
  }
  basics.logo = "static" + req.body.logo.split("static")[1]
  const newGame = new Game({
    name: req.body.name,
    basics,
    user_id: req.body.user_id,
  })
  newGame.save()
    .then(game => res.json({success: true,msg: '添加成功'}))
    .catch(err => {
    })

})


/**
 * @author Robert
 * @name 修改游戏的基本信息
 * @methods 请求方式: post
 * @url api/games/updatebasics/:id
 * @data 
 *    name	游戏名字	
 *    _id	游戏的id	
 *    user_id	游戏的所有者	
 *    basics	 集合	
 *    author	作者	
 *    version	版本	
 *    size	大小	
 *    studio	工作室	
 *    price	价格	
 *    decalaration	游戏声明
 * @return 
 *    success: true/false
 *    msg: '修改成功
 */
router.post('/updatebasics',(req,res) => {
  const gameFile = {
    name: req.body.name
  }
  let basics = {
    author: req.body.author,
    size: req.body.size,
    versions: req.body.versions,
    date: req.body.date,
    studio: req.body.studio,
    prince: req.body.prince,
    declaration: req.body.declaration,
  }
  basics.logo = "static" + req.body.logo.split("static")[1]
  gameFile.basics = basics
  Game.update({_id:req.body.id},{$set:gameFile},{new:true})
    .then(date => res.json({success: true,msg: '修改成功'}))
    .catch(error => {console.log(error)})
})




/**
 * @author Robert
 * @name 删除一个游戏
 * @methods 请求方式: post
 * @params 参数 id: 游戏名字的id
 * @url api/games/delete/:id
 * @return 
 *      success: true
 *       mgs: '删除成功'
 */
router.delete('/delete/:id',(req,res) => {
  Game.remove({_id:req.params.id})
  .then(games => {
    if (games.n == 0) {
      res.json({success: false, mgs: '没有该数据'})
    }
    res.json({success: true, mgs: '删除成功'})
  })
  .catch((err) => {
    res.status(404).json('删除失败')
  })
})

module.exports = router
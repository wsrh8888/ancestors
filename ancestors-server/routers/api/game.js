const express = require("express")
const router = express.Router()
const Game = require('../../models/Game')

/**
 * 获取游戏的基础信息
 * 请求方式: get
 * /api/games/gamelist
 * 参数: id
 */
router.get('/gamelist/:id', (req,res) => {
  // console.loh('ffffffff')
  Game.find({user_id: req.params.id})
  .then(games => {
    if (!games) {
      return res.status(404).json({success: false,msg: '您还未添加游戏'})
    }
    var result = []
    // console.log(games)
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
      result.push(data)
    }
    res.json({success: true,result})
  })
  .catch((err) => {
    res.status(404).json(err)
  })
})



/**
 * 新增一个游戏
 * 请求方式: post
 * api/games/add
 * access  Private
 */
router.post("/add/:id", (req,res) => {
  console.log(req.body)
  console.log(req.params.id)
  let basics = {
    author: req.body.author,
    size: req.body.size,
    user_id: req.params.id,
    versions: req.body.versions,
    date: req.body.date,
    studio: req.body.studio,
    prince: req.body.prince,
    declaration: req.body.declaration,
    name: req.body.name
  }
  const newGame = new Game({
    name: req.body.name,
    basics,
    user_id: req.params.id
  })
  newGame.save()
    .then(game => res.json(game))
    .catch(err => {
      // console.log(err)
    })
})

/**
 * 删除一个游戏
 * 请求方式: post
 * 参数 id: 游戏名字的id
 * api/games/delete/:id
 * access  Private
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

/**
 * 修改游戏的基本信息
 * 请求方式: post
 * 参数 id: 游戏名字的id
 * api/games/updatebasics/:id
 * access  Private
 */
router.post('/updatebasics/:id',(req,res) => {
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
  gameFile.basics = basics
  Game.findOneAndUpdate({_id:req.params.id},{$set:gameFile},{new:true})
    .then(date => res.json(date))
    .catch(error => {console.log(error)})
})

/**
 * 获取游戏的下载信息
 * 请求方式: get
 * 参数: id: 游戏所有者的id
 * /api/games/downloadlist
 */
router.get('/downloadlist/:id', (req,res) => {
  Game.find({user_id: req.params.id},'name install')
   .then(download => {
     res.json({success: true,result:download})
   })
  
})

/**
 * 修改游戏的下载信息
 * 请求方式: post
 * 参数 id: 游戏名字的id
 * api/games/updatedown/:id
 * access  Private
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
  console.log(gameFile)
  Game.findOneAndUpdate({_id:req.body._id,user_id: req.body.user_id},{$set:gameFile})
    .then(date => res.json({success: true, msg: '更新成功'}))
    .catch(error => {console.log(error)})
})


/**
 * 游戏的更新日志
 * 请求方式: get
 * /api/games/log
 * access  Private
 */
router.get('/log/:id', (req, res) => {
    Game.find({user_id:req.params.id},['log','name'])
      .then(logs => {
        res.json({success: true,result:logs})
      })
  }
)


/**
 * 添加游戏的更新日志
 * 请求方式: post
 * /api/games/addlog
 * access  Private
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
* 修改游戏的更新日志
* 请求方式: post
* /api/games/updatelog
* access  Private
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
* 删除游戏的某一个更新日志
* 请求方式: post
* /api/games/deletelog
* access  Private
*/
router.post('/deletelog', (req, res) => {
  Game.updateOne({_id:req.body._id,user_id:req.body.user_id,"log._id": req.body.msg_id},
  {$pull:{"log": {_id: req.body.msg_id}}})
    .then(logs => {
      return res.json({success: true,msg: '添加成功'})
    })
})



















/**
 * 前端的页面
 * 获取所有的游戏列表
 * 请求方式: get
 * api/games/gamelist
 * access  Public
 */
router.get('/gamelist',(req,res) => {
  Game.find()
  .then(games => {
    if (!games) {
      return res.status(404).json("没有任何内容")
    }
    let gamelist = []
    for(let i =0;i<games.length;++i) {
      let date = {
        _id: games[i]._id,
        name: games[i].name,
        prince: games[i].basics.prince
      }
      gamelist.push(date)
    }
    res.json({status: true,gamelist})
  })
  .catch((err) => {
    res.status(404).json(err)
  })
})

/**
 * 前端的页面
 * 获取某一个游戏的详细信息
 * 请求方式: get
 * api/games/gameminute
 * 参数: id这个游戏的id
 * access  Public
 */
router.get('/gameminute/:id', (req,res) => {
  Game.findOne({_id:req.params.id})
    .then(data => {
      res.json(data)
    })
})

module.exports = router
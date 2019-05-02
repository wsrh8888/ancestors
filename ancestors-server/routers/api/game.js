const express = require("express")
const router = express.Router()
const Game = require('../../models/Game')
const {URL} = require('../../config/keys')
var multiparty = require('multiparty');


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
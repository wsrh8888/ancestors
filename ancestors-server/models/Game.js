var mongoose = require('mongoose')
var Schema = mongoose.Schema

const GameSchema = new Schema({
  // 游戏名字
  name: {
    type: String,
    required: true
  },
  //游戏属于
  user_id: {
    type: String,
    default: ''
  },
  // 基础信息
  basics: {
    // 作者
    author: {
      type: String
    },
    logo: {
      type: String
    },
    // 版本
    versions: {
      type: String
    },
    // 大小 
    size: {
      type: String
    },
    //日期
    date: {
      type: String
    },
    // 工作室
    studio: {
      type: String
    },
    // 价格
    prince: {
      type: String
    },
    // 声明
    declaration: {
      type: String
    }
  },
  // 下载信息
  install: {
    url1: {
      type: String,
      default: ''
    },
    msg1:{
      type: String,
      default: ''
    },
    password1: {
      type: String,
      default: ''
    },
    url2: {
      type: String,
      default: ''
    },
    password2: {
      type: String,
      default: ''
    },
    msg2:{
      type: String,
      default: ''
    },
  },
  // 游戏截图
  gameImg: [{
    url : {
      type: String,
      default: ''
    }
  }],
  // 更新日志
  log: [{
    // 更新的名字
    title: {
      type: String,
      default: ''
    },
    content: []
  }],
  // 评论
  message: [{
    // 评论者的id
    _id: {
      type: String
    },
    // 评论的内容
    msg: {
      type: String
    }
  }],
  // 创建日期
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = Game = mongoose.model('game',GameSchema)
var mongoose = require("mongoose")
var Schema = mongoose.Schema

const ArticleSchema = new Schema({
  // 游戏属于的类型
  title: {
    type: String,
    default: " "
  },
  author: {
    type: String,
    default: " "
  },
  type: {
    type : String,
    default:''
  },
  content: {
    type: String,
    default: " "
  },
  user_id: {
    type: String,
    default: ""
  },
  date: {
    type:Date,
    default: Date.now()
  }
})
module.exports = User = mongoose.model('article',ArticleSchema)
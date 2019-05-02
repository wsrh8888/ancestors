var mongoose = require("mongoose")
var Schema = mongoose.Schema

const TypeSchema = new Schema({
  // 游戏属于的类型
  belong: {
    type: String,
    default: " "
  },
  // 类型的名字
  info: [{
    name: String
  }]
})
module.exports = User = mongoose.model('types',TypeSchema)
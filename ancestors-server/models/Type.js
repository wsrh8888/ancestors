var mongoose = require("mongoose")
var Schema = mongoose.Schema

const TypeSchema = new Schema({
  // 游戏属于的类型
  name: {
    type: String,
    default: ""
  },
  children: [{
    name: {
      type: String,
      default: ""
    }
  }]
})
module.exports = User = mongoose.model('types',TypeSchema)
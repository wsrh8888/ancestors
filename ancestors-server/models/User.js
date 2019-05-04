var mongoose = require("mongoose")
var Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    default: Math.random().toString(36).substr(2)
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: '未绑定邮箱'
  },
  phone: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: 'static/img/user/logo.jpg'
  },
  grade: {
    type: Number,
    default: 0
  },
  date: {
    type:Date,
    default: Date.now()
  }
})
module.exports = User = mongoose.model('users',UserSchema)
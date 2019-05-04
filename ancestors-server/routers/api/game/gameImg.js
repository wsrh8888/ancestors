const express = require("express")
const router = express.Router()
const Game = require('../../../models/Game')
const {URL} = require('../../../config/keys')
var multiparty = require('multiparty');


// 给图片添加水印
var images = require('images');
var path = require('path');

/**
 * @author Robert
 * @name 上传一个或多个图片
 * @method post
 * @url /api/games/addimg
 * @return 
 *      path: 图片的路径
 */
router.post('/addimg', (req, res) => {
  var form = new multiparty.Form();
  form.uploadDir = "static/img/screenshot"
  form.parse(req, function(err, fields, files) {
    let result = []
    for(var i=0;i<files.screen.length;++i) {
      var path = files.screen[i].path.split("\\")
      path =  URL + path.join('/')
      var screenurl = {}
      screenurl.url = path
      result.push(screenurl)
    }
    var watermarkImg = images("static/img/water/water_img.png");
    var sourceImg = images(files.screen[0].path);
    var sWidth = sourceImg.width();
    var sHeight = sourceImg.height();

    watermarkImg.size(sWidth,sHeight)

    images(sourceImg)

    // 设置绘制的坐标位置，右下角距离 40px
    .draw(watermarkImg, 0, 0)
    .save(files.screen[0].path);
    // 保存格式会自动识别
    res.json(result)
  });
})

/**
 * @author Robert
 * @name 获取游戏截图列表
 * @method get
 * @param  id: 用户的id
 * @url
 *    id  用户id
 * @return
 *    success: true
 *    result  数组的集合
 */
router.get('/gameImg/:id'  , (req, res) => {
  Game.find({user_id:req.params.id},['gameImg','name'])
    .then(logs => {
      for(var i = 0; i<logs.length;++i) {
        for(var j=0;j<logs[i].gameImg.length;++j) {
          logs[i].gameImg[j].url = URL + logs[i].gameImg[j].url
        }
      }
      res.json({success: true,result:logs})
    })
}
)


/**
 * @author Robert
 * @name 保存游戏截图
 * @data
 *    user_id 用户id  
 *    game_id 游戏id
 *    screen 游戏的路径，以字符串分割
 * @return 
 *    success: true
 *    msg: '截图上传成功'
 */
router.post('/screenshot', (req, res) => {
  var game = {}
  if (req.body.screen) {
    var img = req.body.screen.split(',')
    game.gameImg = img.map(value => {
      var img = {}
      img.url = "static" + value.split("static")[1]
      return img
    })
  } else {
    game.gameImg = []
  }
 
  
  Game.update({user_id:req.body.user_id,_id: req.body.id}, 
    {$set: game})
  .then((date) => {
    res.json({success: true,msg: '图片保存成功'})
  })
  .catch(error => {console.log(error)})
})




module.exports = router
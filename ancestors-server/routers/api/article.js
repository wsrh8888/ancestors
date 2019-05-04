// 文章

const express = require('express');
const multiparty = require('multiparty')
const {URL} = require('../../config/keys')
var images = require('images');
const router = express.Router()
//导入数据库的视图
const Article = require('../../models/Article ')
const Type = require('../../models/Type')
const User = require('../../models/User')
/**
 * @author Robert
 * @name 上传一个或多个图片到服务器
 * @method post
 * @url /api/articles/addimg
 * @data 图片的数据集合
 * @return 
 *      path: 图片的路径
 */
router.post('/addimg', (req, res) => {
  var form = new multiparty.Form();
  form.uploadDir = "static/img/article"
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
 * @name 文章的发表
 * @method post
 * @url /api/articles/add
 * @data 
 *    title   文章的标题
 *    author  文章的作者
 *    type    文章的类型id
 *    content 文章的内容
 *    id      发布者的id
 * @return 
 *      success: true
 *      msg: '添加成功'
 */
router.post('/add', (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    type: req.body.type,
    content: req.body.content,
    user_id: req.body.id
  })
  newArticle.save()
    .then(game => res.json({success: true,msg: '添加成功'}))
    .catch(err => {
    })
})



/**
 * @author Robert
 * @name 获取该用户的所有文章
 * @method get
 * @url /api/articles/all/:id
 * @param id 用户的id
 * @returns  [{}]
 *    author:   文章作者
 *    content:  文章内容
 *    date:     文章的发表时间
 *    title:    文章的标题
 *    type:     文章的类型
 *    user_id:  发布者的id
 *    _id: "5cc9c2e25e12333c60f1de76"
 */
router.get('/all/:id', (req, res) => {
  User.findOne({_id: req.params.id})
    .then(user => {
      if (user.grade == 0) {
        res.json({success: false, msg: '您的权限不够'})
      } else {
        Article.find({user_id: req.params.id})
          .then(data => {
            var datas = data
            Type.find()
              .then(type => {
                for(i=0;i<datas.length;++i){
                  type.forEach(ele => {
                    ele.children.forEach(key => {
                      if (key._id = datas[i].type){
                        data[i].type = key.name
                      }
                    })
                  })
                }
                res.json({success: true,data})
              })
          })
            }
          })
  // Article.find()
  //   .populate({
  //     path: 'type'
  //   })
  //   .exec((err,data) => {
  //     console.log(data)
  //     console.log(err)
  //   })
})



/**
 * @author Robert
 * @name 删除某篇文章
 * @method delete
 * @url /api/articles/delete/:id
 * @param id 文章的id
 * @returns 
 *    success:   
 *    msg: 
 */
router.delete('/delete/:id', (req, res) => {
  Article.remove({_id: req.params.id})
    .then(data => {
      res.json({success: true,msg: '删除成功'})
    })
})
module.exports = router;

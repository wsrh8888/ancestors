/**
 * 注册。登录
 * express node的服务器框架
 * Passport 是一个扩展性很强的认证中间件，
*/
const express = require('express');
const keys = require('../../config/keys');
const router = express.Router()
//导入数据库的视图
const Type = require('../../models/Type')
const User = require('../../models/User')

/**
 * @name 查询所以的类型
 * @author Robert
 * @url /api/types/alls/:id
 * @method get
 * @param
 *    id 用户的id
 * @returns
 *    {success: false, msg: '权限不够'}
 *    success: true, result:
 *    _id 一级分类
 *    name 名字
 *    children
 *      _id   二级id
 *      name  二级名字
 */
router.get('/alls/:id', (req, res) => {
  User.findOne({_id:req.params.id})
    .then(user => {
      if (user.grade==0) {
        res.json({success: false, msg: '权限不够'})
      } else {
        Type.find()
          .then(type => {
            res.json({success: true, result: type})
          })
      }
    })
    
})



/**
 * @name 创建类型
 * @author Robert
 * @method posy
 * @url /api/types/add
 * @data
 *    name	一级类型名字	
 *    children	数组，类型的名字	选填
 * @returns
 *    {success: true,msg: '创建成功'}
 *    {success: false,msg: '创建失败'}
*/
router.post("/add", (req, res) => {
  var children
  if (req.body.children) {
    var name  = req.body.children.split(",")
    children = name.map(value => {
      var tile = {}
      tile.name = value
      return tile
    })
  }
  const types = new Type({
    name: req.body.name,
    children
  })
  types.save()
    .then(type => {
      res.json({success: true,msg: '创建成功'})
    })
    .catch(err => {
      res.json({success: false,msg: '创建失败'})
    })
})


/**
 * @name 增加子类型
 * @author Robert
 * @method post
 * @url /api/types/addchildren
 * @data
 *    content 数组
 *    _id 一级类型的id
 * @returns
 *    success: true, msg: '增加成功'
 *    success: false, msg: '增加失败'
 */
router.post('/addchildren',(req, res) => {
  console.log(req.body)
  var name  = req.body.content.split(",")
  var children = name.map(value => {
    var tile = {}
    tile.name = value
    return tile
  })
  Type.update({_id: req.body.id}, {
    $push: {
      children
    }
  })
  .then(type => {
    res.json({success: true, msg: '增加成功'})
  })
  .catch(err => res.json({success: false, msg: '增加失败'}))
})





/**
 * @name 修改一级分类
 * @author Robert
 * @method post
 * @url /api/types/update
 * @data
 *    id    一级分类的id
 *    name  一级分类的名字
 * @returns
 *    success: true, msg: '修改成功'
 */
router.post('/update', (req, res) => {
  Type.update({_id: req.body.id},{
    $set: {
      name: req.body.name
    }
  })
    .then(type => {
      res.json({success: true, msg: '修改成功'})
    })
    .catch(err => {
      res.json({success: false, msg: '修改失败'})
    })
})


/**
 * @name 修改数组中的某子分类的值
 * @author Robert
 * @method post
 * @url /updatechildren
 * @data
 *    id: 修改数组的children里的id值
 *    name: 修改后的值
 * @returns
 *    success: true, msg: '修改成功'
 */
router.post('/updatechildren', (req,res) => {
  Type.updateOne({"children._id": req.body.id}, {
    $set: {
      "children.$.name": req.body.name
    }
  })
    .then(types => {
      res.json({success: true, msg: '修改成功'})
    })
    .catch(err => {
      res.json({success: true, msg: '修改失败'})
    })
})


/**
 * @name 删除总分类
 * @author Robert
 * @method delete
 * @url /api/types/delete/:id
 * @params
 *      id 一级类型的id
 * @returns
 *      success: true,msg: '删除成功'
 */
router.delete('/delete/:id',(req, res) => {
  Type.remove({_id: req.params.id})
    .then(type => {
      res.json({success: true,msg: '删除成功'})
    })
    .catch(err => {
      res.json({success: false,msg: '删除失败'})
    })
})



/**
 * @name 删除子分类中的某条
 * @author Robert
 * @method delete
 * @url /api/types/children/:id
 * @param 
 *    id 子分类的id
 * @returns
 *    success: true, msg: '删除成功'
 * 
 */
router.delete('/children/:id', (req,res) => {
  Type.updateOne({"children._id": req.params.id}, {
    $pull: {
      children: {_id: req.params.id}
    }
  })
    .then(types => {
      console.log(types)
      res.json({success: true, msg: '删除成功'})
    })
    .catch(err => {
      console.log(err)
    })
})



module.exports = router;

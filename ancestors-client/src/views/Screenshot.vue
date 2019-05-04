<template>
<!-- 游戏截图 --> 
<div> 
  <div v-if="jurisdiction">
    <div style="padding:20px 0;margin-left:20px;">
      <el-select v-model="gameId" placeholder="请选择">
        <el-option
          v-for="(item,key) in imgUrl"
          :key="key"
          :label="item.name"
          :value="item._id"
          >
        </el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" @click="checkGame">确定</el-button>
      <el-button style="float:right;margin-right:50px;" type="success" @click="saveImg">保存</el-button>
      <el-button style="float:right;margin-right:10px;" type="danger" @click="updateImg">{{name}}</el-button>
    </div>
    <div style="margin:0 20px;">
      <el-upload
        :action="addimgurl"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :file-list="showUrl"
        :disabled="isshow?true: false"
        :before-upload="beforeAvatarUpload"
        name="screen"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog> -->
  </div>
  <div v-else class="nullData">您的权限不够，请联系管理员</div>
</div>
</template>

<script>
import {gameImg,screenshot} from '../api/userHT'
import {addimg} from '../api/url'
  export default {
    data() {
      return {
        imgUrl: [],
        dialogImageUrl: '',
        showUrl: [],
        dialogVisible: false,
        gameId: '',
        isshow: true,
        name: '修改',
        deltete: [],
        addimgurl: '',
        jurisdiction: false
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.showUrl = fileList
      },

      // 图片上传成功返回的地址
      handleAvatarSuccess(res, file) {
        this.showUrl.push(file.response[0])
      },

      // 像服务器发生获取所以的图片
      getAllImg() {
        gameImg(this.user.id)
          .then(res => {
            this.jurisdiction = res.data.success
            if (res.data.success) {
              this.imgUrl = res.data.result
              if (res.data.result.length != 0) {
                this.showUrl = res.data.result[0].gameImg
                this.gameId =  res.data.result[0]._id
              }
            }
          })
      },

      // 像服务器发送要保存的图片
      saveImg() {
        var data = {}
        data.user_id = this.user.id
        // 游戏id
        data.id = this.gameId
        var screen = []
        this.showUrl.forEach(element => {
            screen.push(element.url)
        });
        data.screen = screen
        screenshot(data)
          .then(res => {
            if (res.success) {
              this.isshow = true
              this.name = '修改'
              this.getAllImg()
            }
          })
      },

      // 右上角取消与修改
      updateImg() {
        if (this.name == '修改') {
          this.isshow = false
          this.name = '取消'
        } else if (this.name == '取消'){
          this.isshow = true
          this.name = '修改'
          // var imgList = this.imgUrl.filter(res => {
          //   return res._id == this.gameId
          // })
          // this.showUrl = imgList[0].gameImg
          this.getAllImg()
        }
      },

      checkGame() {
        var imgList = this.imgUrl.filter(res => {
            return res._id == this.gameId
          })
        this.showUrl = imgList[0].gameImg
        
      },

      // 图片上传前大小的验证
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    created() {
      this.getAllImg()
      this.addimgurl = addimg
      // console.log()
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    }
  }
</script>
<style scoped>
.nullData {
  color: #cccccc;
  font-size: 30px;
  text-align: center;
  padding: 40px 0;
}
</style>

<template>
  <div>
    <div class="contaniner" v-if="isshow.show">
      <el-form
        ref="form"
        :model="form"
        :rules ="form_rules"
        label-width="60px"
        style="display:flex;width:100%;padding:20px 0;position:relative;z-index:9999999999;paddint-bottom:100px;">
        <el-form-item prop="title" label="题目" style="flex:2;margin:0;">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item prop="author" label="作者" style="flex:1;margin:0;margin-right:20px;">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="类型" style="flex:1;margin:0;margin-right:20px;">
          <el-select v-model="form.type" placeholder="请选择" style="z-index:99999999;">
            <el-option
              v-for="item in options"
              :key="item.type"
              :label="item.type"
              :value="item.type"
              style="z-index:99999999;"
              >
            </el-option>
          </el-select>
        </el-form-item>
          <el-button style="margin-left:10px;" type="primary" @click='submit("form")'>发表</el-button>
          <el-button style="margin-left:10px;" type="primary">添加类型</el-button>
          <el-button style="margin-right:30px;" type="error" @click="cancel">取消</el-button>
        
      </el-form>
      <div id="father">
        <wangeditor :catchData="catchData"></wangeditor>
      </div>
    </div>
  </div>
  
</template>
<script>
import {articleadd} from '../api/userHT'
import wangeditor from "../components/wangeditor";
export default {
  props: {
    isshow: Object
  },
  data() {
    return {
      form_rules: {
        title: [
          { required: true, message: "文章题目不能为空！", trigger: "blur" }
        ],
        author: [
          {required: true, message: "作者不能为空！", trigger: "blur" }
        ],
        type: [{
          required: true, message: "类型不能为空！", trigger: "blur" 
        }]
      },
      form: {
        title: '',
        author: '',
        type: '',
        content: ""
      },
      options: [{
        type: '攻略',
      },{
        type: '日志',
      },{
        type: '补丁',
      },{
        type: '常见为题',
      }]
    };
  },
  methods: {
    catchData(value) {
      this.form.content = value; //在这里接受子组件传过来的参数，赋值给data里的参数
    },
    // 向后台发送文章
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // console.log(this.form)
          this.form.id = this.user.id
          articleadd(this.form)
            .then(res => {
              if (res.success) {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.$emit("update");
                this.isshow.show =false
                
              }
            })
        }
      })
    },
    // 取消发表
    cancel() {
      this.isshow.show = false
    }
  },
  computed: {
    user(){
      return this.$store.getters.user;
    }
  },
  components: {
    wangeditor
  }
};
</script>
<style scoped>
#father {
  height: 500px;
}

.el-popper {
  z-index: 99999 !important;
}
</style>

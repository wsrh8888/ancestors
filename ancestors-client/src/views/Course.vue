<template>
  <div v-if="isshow.show">
    <div class="nullData" v-if="this.typeList.length==0">
      请添加完类型后再次发表
      <el-button style="margin-right:30px;position:absolute;top:20px;right:0;" type="warning" @click="cancel">返回</el-button>
    </div>
    <div v-else class="contaniner">
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
          <div class="block" style="z-index:99999999;">
            <el-cascader
              v-model="typeValue"
              :options="typeList"
              :props="props"
              :show-all-levels="false"
              style="z-index:99999999;"
              >
            </el-cascader>
          </div>
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
import {typeList} from "../api/type";
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
      typeList: [],
      typeValue: [],
      options: [{
        type: '攻略',
      },{
        type: '日志',
      },{
        type: '补丁',
      },{
        type: '常见为题',
      }],
      props: {
        value: '_id',
        children: 'children',
        label: 'name'
      },
    };
  },
  methods: {
    catchData(value) {
      this.form.content = value; //在这里接受子组件传过来的参数，赋值给data里的参数
    },
    // 向后台发送文章
    submit(form) {
      this.form.type = this.typeValue[1]
      this.$refs[form].validate(valid => {
        if (valid) {
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
    },
    // 获取所有的类型
    getType() {
      typeList(this.user.id)
        .then(res => {
          if (res.data.success) {
            this.typeList = res.data.result
          }
        })
    }
  },

  created() {
    this.getType();
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
.contaniner {
  height: 500px;
}
#father {
  height: 500px;
}
.nullData {
  color: #cccccc;
  font-size: 30px;
  text-align: center;
  padding: 40px 0;
  height: 500px;
}

.el-popper {
  z-index: 99999 !important;
}
</style>

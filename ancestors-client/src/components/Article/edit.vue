<template>
  <div>
    <div class="contaniner" v-if="edit.show">
      <el-form ref="form" :model="form" label-width="80px" style="display:flex;width:80%;padding:20px 0;position:relative;z-index:9999999999;paddint-bottom:100px;">
        <el-form-item label="文章题目" style="flex:1;margin:0;">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章作者" style="flex:1;margin:0;margin-right:20px;">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
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
        <el-button style="margin-left:10px;" type="primary" @click="hhhhhh">修改完成</el-button>
        <el-button style="margin-left:10px;" type="error" @click="cancel">取消</el-button>
      </el-form>
      <div id="father">
        <wangeditor :catchData="catchData"></wangeditor>
      </div>
    </div>
  </div>
  
</template>
<script>
import {articleadd} from '../../api/userHT'
import wangeditor from "../wangeditor";
export default {
  props: {
    edit: Object,
    datas: Object
  },
  data() {
    return {
      form: {},
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
    hhhhhh() {
      this.form.id = this.user.id
      articleadd(this.form)
        .then(res => {
          alert(res)
          this.isshow.show =false
        })
    },
    // 取消发表
    cancel() {
      this.edit.show = false
    }
  },
  computed: {
    user(){
      return this.$store.getters.user;
    }
  },
  components: {
    wangeditor
  },
  created() {
    this.form = this.datas
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

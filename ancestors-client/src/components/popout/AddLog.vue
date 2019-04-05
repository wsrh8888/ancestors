<template>
<div>
  <el-dialog
    :title="dialog.title" 
    :visible.sync="dialog.show"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
  >
    <el-form
      :model="form"
      ref="form"
      label-width="100px"
      class="demo-dynamic"
      :rules ="form_rules"
    >
      <el-form-item prop="_id" label="游戏名称">
        <el-select  v-model="form._id" placeholder="请选择游戏">
          <el-option
            :key="item._id"
            v-for="item of gameList"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop='title' label="更新名">
        <el-input class="input"  v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(item,value) in form.content"
        :key="value"
        :label="'更新' + (value+1)"
      >
        <el-input class="input"  v-model="form.content[value]"></el-input>
        <el-button @click.prevent="removeDomain(value)">删除</el-button>
      </el-form-item>
    </el-form>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDomain">增加更新内容</el-button>
      <el-button @click="dialog.show = false">取 消</el-button>
      <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import {addLog,updateLog} from '../../api/userHT'
  export default {
    data() {
      return {
        form_rules: {
          _id: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          title: [{
            required: true, message: '请输入更新标题', trigger: 'blur'
          }]
        }
      };
    },
    props: {
      dialog: Object,
      gameList: Array,
      form: Object
    },
    methods: {
      // 新增更新行
      addDomain() {
        this.form.content.push('');
      },
      // 新增游戏日志提交
      addGameLog() {
        addLog(this.form)
          .then(res => {
            if (res.success) {
              this.$message({
                message: "信息增加成功",
                type: "success"
              });
              this.dialog.show = false
              this.dialog.title = ''
              this.$emit("update");
            }
          })
      },
      // 确认提交
      onSubmit() {
        this.form.user_id = this.users.id
        if (!this.form._id) {
          this.$message({
            message: "游戏名称不能为空",
            type: "error"
          });
        } else {
          if (this.dialog.option == 'add') {
            this.addGameLog()
          } else if(this.dialog.option == 'update') {
            this.updateLog()
          }
        }
      },
      // 删除某行更新日志
      removeDomain(item) {
        this.form.content.splice(item,1)
      },
      
      // 提交修改后的日志
      updateLog() {
        updateLog(this.form)
          .then(res => {
             if (res.success) {
              this.$message({
                message: "信息修改成功",
                type: "success"
              });
              this.dialog.show = false
              this.dialog.title = ''
              this.$emit("update");
            }
          })
      }
    },
    computed: {
      users() {
        return this.$store.getters.user;
      }
    }
  };
</script>
<style scoped>
.input {
  width: 80%;
}
</style>

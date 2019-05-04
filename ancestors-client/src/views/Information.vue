<template>
  <div class="fillcontain">
    <el-table
      :data="userList"
      style="width: 100%"
      :border="true"
      :highlight-current-row = 'true'
      class="infotable"
    >
      <el-table-column
        type="index"
        label="序号"
        align='center'
        width="70"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        align='center'
        width="150">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align='center'
        width="250">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="权限等级"
        align='center'
        width="100">
      </el-table-column>
      <el-table-column label="操作" align='center' width="200" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UpdateUser :dialog="dialog" :form="form" @update="getAllUser"></UpdateUser>
  </div>
</template>

<script>
import {allusers,deleteUser} from '../api/userHT'
import UpdateUser from '../components/UpdateUser.vue';
  export default {
    data() {
      return {
        userList: [],
        dialog: {
          show: false,
          title: "",
          option: "edit"
        },
        form: {}
      }
    },
    components: {
      UpdateUser
    },
    computed: {
      user(){
        return this.$store.getters.user;
      }
    },
    methods: {
      // 获取低于自己权限的所有用户
      getAllUser() {
        allusers(this.user.id)
        .then(res => {
          if (res.data.success) {
            this.userList = res.data.result
          }
          else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
      },
      // 修改用户接口
      handleEdit(index,row) {
        row.password = ''
        this.dialog = {
          show: true,
          title: "修改用户信息",
          option: "edit"
        };
        this.form = row
      },
      // 删除某一个用户
      handleDelete(index,row) {
        deleteUser(row._id)
          .then(res => {
            if (res.data.success) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            }
            this.getAllUser()
          })
      }
    },
    created() {
      this.getAllUser()
    }
  }
</script>
<style scoped>
.information {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.infotable {
  width: 70%;
  margin: 0 auto;
}
</style>

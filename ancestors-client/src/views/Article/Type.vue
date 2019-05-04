<template>
<div>
<div v-if="jurisdiction">
  <div class="updateLog">
  <div class="update-header">
    <!-- 游戏的选择 -->
    <el-select style="margin:0 5px;" v-model="typeId" placeholder="请选择">
      <el-option
        v-for="item in datas"
        :key="item._id"
        :label="item.name"
        :value="item._id">
      </el-option>
    </el-select>
    <el-button  v-if="this.typeId" type="success" @click="enter">确定</el-button>
    <el-button style="float:right;margin-right:60px;" v-if="this.typeId" type="danger" @click="deletetype">删除分类</el-button>
    <el-button style="float:right;" type="primary" @click="createtype">创建分类</el-button>
  </div>

  <!-- 更新日子的表格 -->
  <div>
    <div v-if="!this.datas" class="nullData">暂无数据请添加数据</div>
    <el-table
      :data="showList"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        label="类型"
        align="center"
        width="880">
        <template slot-scope="scope">
          <span style="margin-left: 10px;color: #333;">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>

  <div v-if="this.typeId" style="text-align:right;margin:20px 100px; 0 0">
    <el-button type="primary" @click="update">增加内容</el-button>
    <el-button v-if="this.showList.length!=0" type="danger" @click="removeVersion">删除</el-button>
  </div>

</div>
<div v-else class="nullData">您的权限不够。请联系管理员</div>
<UpdateDown :dialog="this.dialog" @update="getdata()"></UpdateDown>
<AddChildren :dialog="this.updateChildren" @update="getdata()"></AddChildren>
</div>

</template>

<script>
import {typeList,typeDleteChildren,typedelete} from '../../api/type'
import UpdateDown from '../../components/type/updateChildren'
import AddChildren from '../../components/type/AddChildren'
  export default {
    components: {
      UpdateDown,
      AddChildren
    },
    data() {
      return {
        // 总数据
        datas: [],
        showList: [],
        dialog: {
          title: '',
          isshow: false,
          id: ''
        },
        updateChildren: {
          title: '',
          isshow: false,
          id: ''
        },
        typeId: '',
        jurisdiction: false
      }
    },
    methods: {
      // 向服务器发送请求获取所有的类型
      getdata() {
        var data = this.user.id
        typeList(data)
          .then(res => {
            this.jurisdiction = res.data.success
            if (res.data.success) {
              this.datas = res.data.result
              if (!this.typeId) {
                if (!res.data.result.length==0) {
                  this.showList = res.data.result[0].children
                  this.typeId = res.data.result[0]._id
                }
              } else {
                let temp = this.datas.filter(data => {
                  return data._id == this.typeId
                })
                this.showList = temp[0].children
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'danger'
              })
            }
          })
      },
      removeVersion() {

      },

      // 选择大类型确定
      enter() {
        var k = this.datas.filter(data => {
          return this.typeId == data._id
        })
        this.showList = k[0].children
      },
      // 创建分类
      createtype() {
        this.dialog = {
          title: '创建分类',
          isshow: true
        }
      },
      //  新增加子元素的内容
      update() {
        this.updateChildren = {
          title: '增加',
          isshow: true,
          id: this.typeId
        }
      },
      // 修改某个子类型
      handleUpdate(index, row) {
        this.dialog = {
          title: '修改名字',
          isshow: true,
          id: row._id
        }
      },
      // 删除某个大分类
      deletetype() {  
        typedelete(this.typeId)
          .then(res => {
            if (res.data.success) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.typeId = ''
              this.showList = []
              this.getdata();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
              this.getdata();
            }
          })
          
      },
      // 删除某个子类型
      handleDelete(index, row) {
       typeDleteChildren(row._id)
        .then( res => {
          if (res.data.success) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.getdata();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            this.getdata();
          }
        })
      }
    },
    created() {
      // 向服务器发送请求
      
      this.getdata();
    },
    computed: {
      // 获取帐号信息
      user(){
        return this.$store.getters.user;
      }
    }
  }
</script>
<style scoped>
.update-header {
  padding: 10px 0;
}
.updateLog {
  columns: red;
  padding: 10px;
  margin-top: 10px;
}
.title {
  text-align: center;
  font-weight: bold;
  font-size: 40px;
}
.nullData {
  color: #cccccc;
  font-size: 30px;
  text-align: center;
  padding: 40px 0;
}

.updateTable {
  margin-top: 5px;
}
</style>

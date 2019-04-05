<template>
<div>
  <div class="updateLog">
  <div class="update-header">
    <!-- 游戏的选择 -->
    <el-select style="margin:0 5px;" v-model="gameId" clearable placeholder="请选择" @change="clearName">
      <el-option
        v-for="item in datas"
        :key="item._id"
        :label="item.name"
        :value="item._id">
      </el-option>
    </el-select>
    <!--版本的选择 -->
    <el-select v-if="gameLog" v-model="logId" placeholder="请选择">
      <el-option
        v-for="item in this.gameLog.log"
        :key="item._id"
        :label="item.title"
        :value="item._id">
      </el-option>
    </el-select>
    <el-button style="margin-left:10px;"  size="medium " type="success" :disabled="!logId?true: false" @click="changeLog">确认</el-button>
    <el-button style="position: absolute;right:30px;"   size="medium"  type="primary" @click="addVersion">添加版本</el-button>
  </div>

  <!-- 更新日子的表格 -->
  <div class="updateTable">
    <div v-if="!this.logList" class="nullData">暂无数据请添加数据</div>
    <el-table
      v-else
      :data="logList.content"
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
        label="更新内容"
        align="center"
        width="880">
        <template slot-scope="scope">
          <span style="margin-left: 10px;color: #333;">{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div  v-if="this.logList"  style="text-align:right;margin:20px 100px; 0 0">
    <!-- <el-button type="primary" @click="update">增加更新内容</el-button> -->
    <el-button type="primary" @click="updateLog">修改</el-button>
    <el-button type="danger" @click="removeVersion">删除</el-button>
    <!-- <el-button type="primary" @click="removeVersion">新增版本</el-button> -->
  </div>
  <AddLog :form="form" :dialog="dialog" :gameList="datas" @update="getdata"></AddLog>
</div>
</div>
</template>

<script>
import AddLog from '../components/popout/AddLog.vue';
import {getLog,deleteLog,updateLog} from '../api/userHT'
  export default {
    components: {
      AddLog
    },
    data() {
      return {
        // 游戏的总数据
        datas: [],
        // 游戏名字的id
        gameId: '',
        // 游戏日志的id
        logId: '',
        // 选择游戏对应版本的数据
        logList: [],
        dialog: {
          show: false,
          title: "",
          option: ''
        },
        // 传入增家和修改页面的数据
        form: {
          _id: '',
          title: '',
          content: []
        },
      }
    },
    methods: {
      // 向服务器发送请求获取更新日志数据
      getdata() {
        getLog(this.user.id)
          .then(res => {
            if (res.data.result.length!=0) {
              this.datas = res.data.result;
              if (!res.data.result){
                return;
              }
              if (res.data.result[0]) {
                this.logList = res.data.result[0].log[0]
                this.gameId = res.data.result[0]._id
              } else {
                this.gameId = ''
              }
              if (res.data.result[0].log[0]) {
                this.logId = res.data.result[0].log[0]._id
              } else {
                this.logId = ''
              }
              this.form = {
                _id: '',
                title: '',
                content: []
              }
            }
          })
      },
      // 每次点击游戏名字，则清空选本
      clearName() {
        this.logId = ''
      },
      // 修改日志的信息
      changeLog() {
        let logdata = {}
         this.gameLog.log.forEach(element => {
            if (element._id==this.logId) {
              logdata = element
            }
          })
        this.logList = logdata
      },
      // 添加新的版本
      addVersion() {
        this.dialog = {
          show: true,
          title: '新增游戏版本',
          option: 'add'
        };
      },
      updateLog() {
        this.dialog = {
          show: true,
          title: '修改游戏信息',
          option: 'update'
        };
        this.form = this.logList
        this.form.game_id = this.gameId
      },
      //删除游戏的某条更新日志
      removeVersion() {
        let data = {
         _id: this.gameId,
         user_id: this.user.id,
         msg_id: this.logId
        }
        deleteLog(data)
          .then(res => {
            if (res.success) {
              this.$message({
                message: '删除成功',
                type: "success"
              });
              this.getdata()
            }
          })
      },
      // 删除某行日志
      handleDelete(res) {
        this.form = this.logList
        this.form.game_id = this.gameId
        this.form.user_id = this.user.id
        this.form.content.splice(res,1)
        updateLog(this.form)
          .then(res => {
             if (res.success) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
          })
      },

      
    },
    created() {
      // 向服务器发送请求
      this.getdata();
    },
    computed: {
      // 获取帐号信息
      user(){
        return this.$store.getters.user;
      },
      // 通过计算属性来得到版本信息
      gameLog() {
        let gameLog = {}
        this.datas.forEach(element => {
          if (element._id==this.gameId) {
            gameLog = element
          }
        });
        return gameLog
      },
    }
  }
</script>
<style scoped>
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

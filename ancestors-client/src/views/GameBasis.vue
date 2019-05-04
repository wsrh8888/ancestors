<template>
  <div>
  <div class="fillcontain" v-if="jurisdiction">
    <div style="text-align:right;">
      <el-button
        size="small"
        icon="view"
        type="primary"
        @click='onAddMoney()'
      >添加</el-button>
    </div>
    <div class="table_container">
      <el-table
        v-if="gameData.length > 0"
        :data="gameData"
        max-height='450'
        border
      >
        <el-table-column
          type="index"
          label=" "
          align='center'
          width="40">
        </el-table-column>

        <el-table-column
          prop="name"
          label="游戏名字"
          align='center'
          width="120">
        </el-table-column>
        <el-table-column
          prop="logo"
          label="LOGO"
          align='center'
          width="100">
          <template slot-scope="scope" v-if="scope.row.logo">  
            <img :src="scope.row.logo" alt="" srcset="" style="width:100%;">
          </template>
        </el-table-column>
        <el-table-column
          prop="author"
          label="游戏作者"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小"
          align='center'
          width="70"> 
          <template slot-scope="scope">  
            <span style="color:#00d053">{{ scope.row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="versions"
          label="版本"
          align='center'
          width="70">
          <template slot-scope="scope">  
            <span style="color:#f56767">{{ scope.row.versions}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="更新时间"
          align='center'
          width="110">
          <template slot-scope="scope">  
            <span style="color:#4db3ff">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="studio"
          label="工作室"
          align='center'
          width="125">
        </el-table-column>
        <el-table-column
          prop="prince"
          label="价格"
          align='center'
          width="80">
        </el-table-column>
        <el-table-column
          prop="declaration"
          label="声明"
          align='center'
          width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click='onEditBasic(scope.$index, scope.row)'>编辑基本</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)">删除游戏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_container">
      <!-- <el-table>
        
      </el-table> -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <moduleName class="addgame" :form="form" :dialog="dialog" @update="getProfile"></moduleName>
    
    <!-- 新增游戏 -->
    <AddGame :dialog="diadown" @update="getProfile"></AddGame>
  </div>
  <div v-else class="nullData">您的权限不够。请联系管理员</div>
  </div>
</template>
<script>
import moduleName from '../components/DialogFound.vue';
import AddGame from '../components/AddGame.vue';
import {profiles, deletes} from '../api/userHT'
export default {
  name: 'fundList',
  components: {
    moduleName,
    AddGame
  },
  data() {
    return {
    
      paginations: {
        page_index:1,  //当前位于哪页,
        total: 0, //总数
        page_size: 5,  //一页显示多少条
        page_sizes: [5,10,15,20],  //每页显示多少条
        layout: 'total,sizes,prev,pager,next,jumper' //翻页属性
      },
      gameData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      diadown: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {},
      jurisdiction: false
    }
  },
  created() {
    this.getProfile()
  }, 
  computed: {
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
    // 获取游戏的所有基本信息
    getProfile() {
      //获取表格数据
        profiles(this.user.id)
        .then( res => {
          this.jurisdiction = res.data.success
          if (!res.data.success) {
             this.$message({
                message: res.data.msg,
                type: "danger"
            });
            return;
          }
          this.gameData = res.data.result
          // 设置分页数据
          this.allTableData = res.data.result;
          this.filterTableData = res.data.result;
          this.setPaginations();
        })
    },
    // 修改游戏的基本信息
    onEditBasic(index,row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改游戏基本信息",
        option: "edit"
      };
      this.form = {
        id: row._id,
        author: row.author,
        size: row.size,
        versions: row.versions,
        date: row.date,
        studio: row.studio,
        prince: row.prince,
        declaration: row.declaration,
        name: row.name,
        logo: row.logo
      };
    },
    // 删除游戏
    handleDelete(index,row) {
      deletes(row._id)
      .then(res => {
        if (res.data) {
          this.$message("删除成功");
          this.getProfile();
        }
      });
    },
    onAddMoney() {
      // 添加信息
      this.diadown = {
        show: true,
        title: "添加新游戏",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remarkn: "",
        id: ""
      };
    },
     setPaginations() {
      // 分页属性
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认的分页数据
      this.gameData = this.allTableData.filter((item,index) => {
        return index < this.paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size

      this.gameData  = this.allTableData.filter((item,index) => {
        return index  < page_size;
      })
    },
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.paginations.page_size * (page-1)
      //  数据总数
      let numbers = this.paginations.page_size * page
      // 容器
      let tables = []

      for(let i = index; i<numbers;i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i])
        }
        this.gameData = tables
      }
    }
  }
}
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px 5px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.el-button+.el-button{
  margin-left: 0;
  margin-top: 5px;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.nullData {
  color: #cccccc;
  font-size: 30px;
  text-align: center;
  padding: 40px 0;
}


</style>
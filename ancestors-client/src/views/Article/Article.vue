<template>
<div>
<div v-if="jurisdiction">
  <div>
    <el-button style="float:right;margin:10px;margin-right:40px;" type="primary" @click="published">发表文章</el-button>
  </div>
  <el-table
    :data="datas"
    style="width: 98%;margin-left:10px; padding: 30px 10px;box-sizing: border-box;;"
    border
  >
   <el-table-column
      type="index"
      >
    </el-table-column>
    <el-table-column
      label="题目"
      width="280"
      prop="title"
      align="center"
    >
    </el-table-column>
    <el-table-column
      label="作者"
      width="150"
      prop="author"
      align="center"
    >
    </el-table-column>
    <el-table-column
      label="类型"
      width="150"
      prop="type"
      align="center"
    >
    </el-table-column>
     <el-table-column
      label="发表时间"
      align="center"
      width="230">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作"
      align="center"
      width="250"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleshow(scope.$index, scope.row)">查看</el-button>
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table >
  <ShowArticle :dialog="diadown" :content="content"></ShowArticle>
  <Course class="isshow" :isshow="isshow" @update="getAll"></Course>
  <EditArticle class="isshow" :edit="editshow" :datas="editcontent" ></EditArticle>
</div>
<div v-else class="nullData">您的权限不够。请联系管理员</div>
</div>
</template>

<script>
import {articlelist,articledelete} from '../../api/userHT'
import ShowArticle from '../../components/Article/showArticle'
import EditArticle from '../../components/Article/edit'
import Course from '../Course'
  export default {
    components: {
      ShowArticle,
      Course,
      EditArticle
    },
    data() {
      return {
        datas: [],
        diadown: {
          showlist: false
        },
        content: '',
        isshow: {
           show: false
        },
        editshow: {
          show: false
        },
        editcontent: {},
        jurisdiction: false
      }
    },
    methods: {
      // 修改文章
      handleEdit(index, row) {
        this.editshow.show = true
        this.editcontent = row
      },
      // 点击发表文章
      published() {
        this.isshow = {
          show: true
        }
      },
      handleshow(index, row) {
         this.diadown = {
          showlist: true
        };
        this.content = row.content
      },
      handleDelete(index, row) {
        articledelete(row._id)
          .then(res => {
            if (res.data.success) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.getAll()
            }
          })
      },
      /**
       * @name 获取所以的数据
       */
      getAll() {
        articlelist(this.user.id)
          .then(res => {
            this.jurisdiction =  res.data.success
            if (res.data.success) {
              this.datas = res.data.data
            }
          })
      }
    },
    created() {
      this.getAll()
    },
    computed: {
      user(){
        return this.$store.getters.user;
      }
    }
  }
</script>
<style scoped>
.isshow {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width:100%;
  background: #fff;
}
.nullData {
  color: #cccccc;
  font-size: 30px;
  text-align: center;
  padding: 40px 0;
}
</style>

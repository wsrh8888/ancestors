<template>
<div class="downloadlist">
  <el-table
    :data="downloadList"
    style="width: 100%"
    border
    max-height="450px"
    highlight-current-row
    empty-text="暂无数据-请先添加游戏" 
  >
    <el-table-column
      type="index"
      label="序号"
      align='center'
      width="70">
    </el-table-column>
     <el-table-column
      label="游戏名字"
      width="100"
      align="center"
      prop="name"
    >
    </el-table-column>
    <el-table-column
      label="完整版说明"
      width="150"
      align="center"
      prop="install.msg1"
    >
    </el-table-column>
    <el-table-column
      label="完整版地址"
      width="120"
      align="center"
      prop="install.url1"
    >
    </el-table-column>
    <el-table-column
      label="完整版密码"
      width="100"
      align="center"
      prop="install.password1"
    >
    </el-table-column>
    <el-table-column
      label="独立版说明"
      width="180"
      align="center"
      prop="install.msg2"
    >
    </el-table-column>
    <el-table-column
      label="独立版地址"
      width="150"
      align="center"
      prop="install.url2"
    >
    </el-table-column>
    <el-table-column
      label="独立版密码"
      width="100"
      align="center"
      prop="install.password2"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="110"
    >
      <template slot-scope="scope">
        <el-button
          size="small"
          type="danger"
          @click="clickOption(scope.$index, scope.row)"
          >编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <UpdateDown :dialog="diadown" :form="form" @update="showUpdownload"></UpdateDown>
</div>
</template>
<script>
// 显示游戏下信息里修改数据页面
import UpdateDown from '../components/popout/UpdateDown.vue';
// 导入下载信息列表的接口
import {downloadlist} from '../api/userHT'
export default {
  //
  components: {
    UpdateDown
  },
  data() {
    return {
      downloadList: [],
      diadown: {
        show: false
      },
      // 出入子页面的数据
      form: {}
    }
  },
  methods: {
    // 点击编辑按钮对游戏展示更新页面
    clickOption(index, row) {
      this.diadown = {
        show: true
      };
      this.form = {
        _id: row._id,
        name: row.name,
        msg1: row.install.msg1,
        url1: row.install.url1,
        password1: row.install.password1,
        msg2: row.install.msg2,
        url2: row.install.url2,
        password2: row.install.password2,
        user_id: this.user.id
      }
    },
    // 展示游戏下载数据
    showUpdownload() {
      downloadlist(this.user.id)
      .then(res => {
        if (res.data.success) {
          this.downloadList = res.data.result
        }
      })
    }
  },
  created() {
    this.showUpdownload()
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>
<style scoped>
.downloadlist {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
</style>

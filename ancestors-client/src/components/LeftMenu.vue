<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff" 
        class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template  v-for="item in items" >
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin '+item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" 
              :to="citem.path" :key="cindex">
              <el-menu-item 
                  :index='citem.path'>
                  <span slot="title">{{citem.name}}</span>
              </el-menu-item> 
            </router-link>
          </el-submenu> 
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "el-icon-document",
          name: "游戏",
          path: "fund",
          children: [
            { path: "gamebasis", name: "游戏基础信息" },
            { path: "download", name: "游戏下载信息" },
            { path: "update", name: "游戏更新日志" },
            { path: "screenshot", name: "游戏截图" }]
        },
        {
          icon: "el-icon-edit-outline",
          name: "信息",
          path: "article",
          children: [
            { path: "type", name: "类型" },
            { path: "article", name: "发表文章" }
          ]
        },
        {
          icon: "el-icon-setting",
          name: "信息管理",
          path: "info",
          children: [
            { 
              path: "information", name: "用户信息" 
            },{ 
              path: "infoshow", name: "个人信息" 
            }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
  font-size: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>

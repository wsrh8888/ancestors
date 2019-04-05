<template>
  <div class="index">

    <!-- 网页头部导航 -->
    <Headers></Headers>

    <!-- 网页左边的导航 -->
    <LeftMenu></LeftMenu>

    <!-- 网页的核心内容，中间部分 -->
    <div class="rightContainer">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>

//  网页上面的导航
import Headers from "../components/Headers";

// 网页左边的导航
import LeftMenu from "../components/LeftMenu";

export default {
  name: 'index',
  components: {
    Headers,
    LeftMenu
  }
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>

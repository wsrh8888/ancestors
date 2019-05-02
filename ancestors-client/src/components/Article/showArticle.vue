<template>
<div>
  <div
    class="container"
    v-if="dialog.showlist"
  >
    <i class="el-icon-close close" title="关闭" @click="colsesarticle"></i>
    <div class="content" v-html="content"></div>
  </div>
</div>
</template>
<script>
  export default {
    props: {
      dialog: Object,
      content: String
    },
    methods: {
      colsesarticle() {
        this.dialog.showlist= false
      }
    }
  };
</script>
<style scoped>
.input {
  width: 80%;
}
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  top: 0;
  background: #fff;
  left: 0;
}
.close {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 30px;
}
.content {
  box-sizing: border-box;
  height: 94%;
  margin: 20px;
  margin-right: 0;
  padding-right: 30px;
  font-size: 18px;
  padding-bottom: 20px;
  overflow: auto;
  text-indent:2em;
  line-height: 34px;
}
</style>

<style scoped>
.grid-frame-c {
  width: 100%;
  background-color: #544848;
  /* background-image: url("../assets/top_bg.png"); */
  overflow: hidden;
  background-repeat: no-repeat;
}
</style>
<template>
  <!--这是一个框架-->
  <div class="grid-frame-c">
    <div>模板C</div>
    <div>标题1</div>
    <grid-div :item="gridArr[0]"></grid-div>
    <div>标题2</div>
    <grid-div :item="gridArr[1]"></grid-div>
    <div>图片</div>
    <grid-div :item="gridArr[2]"></grid-div>
    <grid-div :item="gridArr[3]"></grid-div>
    <grid-div :item="gridArr[4]"></grid-div>
    <grid-div :item="gridArr[5]"></grid-div>
  </div>
</template>
<script>
export default {
  name: "grid-frame-c",
  props: {
    gridArr: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>
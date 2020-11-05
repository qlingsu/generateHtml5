<style scoped>
.grid-frame-d {
  width: 100%;
  background-color: gray;
  overflow: hidden;
}
</style>
<template>
  <!--这是一个框架-->
  <div class="grid-frame-d">
    <div>模板D</div>
    <div>输入框</div>
    <div style="display: flex;">
      <grid-div :item="gridArr[0]" style="width: 45%"></grid-div>
      <grid-div :item="gridArr[1]" style="width: 45%"></grid-div>
    </div>
    <div>标题2</div>
    <div style="display: flex;">
      <grid-div :item="gridArr[2]" style="width: 30%"></grid-div>
      <grid-div :item="gridArr[3]" style="width: 30%"></grid-div>
      <grid-div :item="gridArr[4]" style="width: 30%"></grid-div>
    </div>
    <div>图片</div>
    <grid-div :item="gridArr[5]"></grid-div>
  </div>
</template>
<script>
export default {
  name: "grid-frame-d",
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
<style scoped>
.grid-frame-b {
  width: 100%;
  background-color: #e1e1e1;
  overflow: hidden;
}
</style>
<template>
  <!--这是一个框架-->
  <div class="grid-frame-b">
    <div>模板B</div>
    <grid-div
      :item="gridArr[0]"
      style="border: none; min-height: 40px"
    ></grid-div>
    <div>标题1</div>
    <div style="display: flex; justify-content: space-around; height: 300px">
      <div
        style="
          width: 45%;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        "
      >
        <grid-div :item="gridArr[1]" style="margin: 0"></grid-div>
        <grid-div :item="gridArr[2]" style="margin: 0"></grid-div>
      </div>
      <div style="width: 45%">
        <grid-div :item="gridArr[3]" style="height: 100%; margin: 0"></grid-div>
      </div>
    </div>

    <div>标题2</div>

    <div>图片</div>
    <grid-div :item="gridArr[4]"></grid-div>
  </div>
</template>
<script>
export default {
  name: "grid-frame-b",
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
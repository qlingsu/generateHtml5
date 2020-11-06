<style scoped>
.widget-frame-c {
  width: 100%;
  background-color: #544848;
  /* background-image: url("../assets/top_bg.png"); */
  overflow: hidden;
  background-repeat: no-repeat;
}
</style>
<template>
  <!--这是一个框架-->
  <div class="widget-frame-c">
    <div>模板C</div>
    <div>标题1</div>
    <widget-div :item="widgetArr[0]"></widget-div>
    <div>标题2</div>
    <widget-div :item="widgetArr[1]"></widget-div>
    <div>图片</div>
    <widget-div :item="widgetArr[2]"></widget-div>
    <widget-div :item="widgetArr[3]"></widget-div>
    <widget-div :item="widgetArr[4]"></widget-div>
    <widget-div :item="widgetArr[5]"></widget-div>
  </div>
</template>
<script>
export default {
  name: "widget-frame-c",
  props: {
    widgetArr: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>
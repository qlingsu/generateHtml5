<style scoped>
.widget-frame-d {
  width: 100%;
  background-color: gray;
  overflow: hidden;
}
</style>
<template>
  <!--这是一个框架-->
  <div class="widget-frame-d">
    <div>模板D</div>
    <div>输入框</div>
    <div style="display: flex;">
      <widget-div :item="widgetArr[0]" style="width: 45%"></widget-div>
      <widget-div :item="widgetArr[1]" style="width: 45%"></widget-div>
    </div>
    <div>标题2</div>
    <div style="display: flex;">
      <widget-div :item="widgetArr[2]" style="width: 30%"></widget-div>
      <widget-div :item="widgetArr[3]" style="width: 30%"></widget-div>
      <widget-div :item="widgetArr[4]" style="width: 30%"></widget-div>
    </div>
    <div>图片</div>
    <widget-div :item="widgetArr[5]"></widget-div>
  </div>
</template>
<script>
export default {
  name: "widget-frame-d",
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
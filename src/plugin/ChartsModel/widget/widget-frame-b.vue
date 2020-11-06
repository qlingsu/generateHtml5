<style scoped>
.widget-frame-b {
  width: 100%;
  background-color: #e1e1e1;
  overflow: hidden;
}
</style>
<template>
  <!--这是一个框架-->
  <div class="widget-frame-b">
    <div>模板B</div>
    <widget-div
      :item="widgetArr[0]"
      style="border: none; min-height: 40px"
    ></widget-div>
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
        <widget-div :item="widgetArr[1]" style="margin: 0"></widget-div>
        <widget-div :item="widgetArr[2]" style="margin: 0"></widget-div>
      </div>
      <div style="width: 45%">
        <widget-div :item="widgetArr[3]" style="height: 100%; margin: 0"></widget-div>
      </div>
    </div>

    <div>标题2</div>

    <div>图片</div>
    <widget-div :item="widgetArr[4]"></widget-div>
  </div>
</template>
<script>
export default {
  name: "widget-frame-b",
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
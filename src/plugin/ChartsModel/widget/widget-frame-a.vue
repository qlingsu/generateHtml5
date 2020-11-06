<style scoped>
.widget-frame-a {
  width: 100%;
  background-color: #eceff6;
  overflow: hidden;
  background-image: url("../assets/top_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
<template>
  <!--这是一个框架-->
  <div class="widget-frame-a">
    <div style="height:100px;">模板A</div>
    <widget-div
      :item="item"
      v-for="(item, index) in widgetArr"
      :key="index"
    ></widget-div>
  </div>
</template>
<script>
export default {
  name: "widget-frame-a",
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
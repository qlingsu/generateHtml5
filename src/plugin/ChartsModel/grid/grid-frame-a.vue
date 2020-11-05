<style scoped>
.grid-frame-a {
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
  <div class="grid-frame-a">
    <div style="height:100px;">模板A</div>
    <grid-div
      :item="item"
      v-for="(item, index) in gridArr"
      :key="index"
    ></grid-div>
  </div>
</template>
<script>
export default {
  name: "grid-frame-a",
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
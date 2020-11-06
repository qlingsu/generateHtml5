<style scoped>
.widget-div {
  width: 90%;
  min-height: 140px;
  background-color: #ffffff;
  margin: 10px auto;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
</style>
<template>
  <!--框架的输入框，用于装图表组件-->
  <div class="widget-div" :id="item.id">
    <element-list :components="item.components"></element-list>
  </div>
</template>
<script>
export default {
  name: "widget-div",
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          id: "",
          components: [
            {
              name: "div",
              style: {
                color: "#e1e1e1"
              },
              slot: "拖动到此处",
            },
          ],
        };
      },
    },
  },
};
</script>
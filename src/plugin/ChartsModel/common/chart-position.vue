<style scoped>
.chart-position {
  height: 0px;
}
/* .chart-position:hover {
  background-color: cornflowerblue;
} */
</style>
<template>
  <div class="chart-position" @mouseover="mouseoverHandler"></div>
</template>
<script>
export default {
  name: "chart-position",
  props: {
    height: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    mouseoverHandler() {
      let self = this;
    }
  }
};
</script>
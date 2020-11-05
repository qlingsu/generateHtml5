<style scoped>
.chart-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  border: 1px solid #e1e1e1;
  line-height: 20px;
  text-align: center;
  color: #e1e1e1;
  box-shadow: 0 0 4px 4px #e1e1e1;
  background-color: #ffffff;
}
</style>
<template>
  <div class="chart-close-btn" @click="clickHandler" :id="id">✖</div>
</template>
<script>
export default {
  name: "chart-close",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  methods: {
    clickHandler() {
      let self = this;
      if (self.id) {
        self.$emit("closeThisChart", self.id);
      }
    }
  }
};
</script>
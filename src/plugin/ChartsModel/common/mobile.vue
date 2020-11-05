<style scoped>
.a-mobile {
  background-color: black;
  border-radius: 60px;
  width: 425px;
  height: 760px;
  background-image: linear-gradient(to right, #161414, #6a6a5a);
  border: 3px solid #e1e1e1;
  margin: 20px auto;
}
.a-mobile-content {
  width: 375px;
  height: 667px;
  background-color: #ffffff;
  position: relative;
  top: 35px;
  margin: auto;
  overflow-y: auto;
  border-radius: 5px;
}
.a-mobile-sound {
  height: 10px;
  width: 70px;
  background-image: linear-gradient(to right, #6a6a5a, #161414);
  position: relative;
  margin: auto;
  top: 20px;
  border-radius: 5px;
}
.a-mobile-button {
  height: 10px;
  width: 70px;
  background-image: linear-gradient(to right, #6a6a5a, #161414);
  position: relative;
  margin: auto;
  bottom: -55px;
  /* left: 50%; */
  border-radius: 5px;
}
.a-mobile-content::-webkit-scrollbar {
  width: 0 !important;
}
.a-mobile-content {
  -ms-overflow-style: none;
}
.a-mobile-content {
  overflow: -moz-scrollbars-none;
}
</style>
<template>
  <div>
    <div class="a-mobile">
      <div class="a-mobile-sound"></div>
      <div class="a-mobile-content">
        <slot></slot>
      </div>
      <!-- <div class="a-mobile-button"></div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "a-mobile"
};
</script>
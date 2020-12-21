<style lang="scss">
$rulerColor: #707070;
$rulerMM: 5px;

.a-ruler-horizontal {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 15px;
  flex-wrap: nowrap;
  @mixin kedu {
    border-left: 1px solid $rulerColor;
    width: $rulerMM;
    min-width: $rulerMM;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .a-ruler-mm {
    @include kedu;
    height: 5px;
  }
  .a-ruler-halfcm {
    @include kedu;
    height: 10px;
  }
  .a-ruler-cm {
    @include kedu;
    border-left: 2px solid $rulerColor;
    height: 15px;
  }
}

.a-ruler-vertical {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 15px;
  flex-wrap: nowrap;

  @mixin kedu {
    border-top: 1px solid $rulerColor;
    height: $rulerMM;
    min-height: $rulerMM;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .a-ruler-mm {
    @include kedu;
    width: 5px;
  }
  .a-ruler-halfcm {
    @include kedu;
    width: 10px;
  }
  .a-ruler-cm {
    @include kedu;
    border-top: 2px solid $rulerColor;
    width: 15px;
  }
}
</style>
<template>
  <div :class="'a-ruler-' + direction" :style="scalePosition">
    <div v-for="mm in longMM" :key="mm.id" :class="mm.class"></div>
  </div>
</template>
<script>
export default {
  name: "a-ruler",
  props: {
    direction: {
      //方向
      type: String,
      default: "horizontal",
    },
    defineScalePos: {
      type: String,
      default: "",
    },
    long: {
      //这里设定的是像素px
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      mmPerCM: 5, //每个厘米间隔个毫米
      pxPerMM: 5, //每个间隔多少个像素
    };
  },
  computed: {
    //获取毫米的样式数组
    longMM() {
      let self = this;
      var result = [];
      for (var i = 0; i < self.long / self.pxPerMM - 1; i++) {
        if (i % self.mmPerCM == 0 && i % (self.mmPerCM * 2) == 0) {
          result.push({
            id: i,
            class: "a-ruler-cm",
          });
        } else if (i % self.mmPerCM == 0 && i % (self.mmPerCM * 2) != 0) {
          result.push({
            id: i,
            class: "a-ruler-halfcm",
          });
        } else {
          result.push({ id: i, class: "a-ruler-mm" });
        }
      }
      return result;
    },
    //根据设定位置返回ruler的内联样式
    scalePosition() {
      let self = this;
      if (
        self.direction == "horizontal" &&
        (self.defineScalePos == "top" || !self.defineScalePos)
      ) {
        return "";
      } else if (
        self.direction == "vertical" &&
        (self.defineScalePos == "left" || !self.defineScalePos)
      ) {
        return "float:left;";
      } else if (
        self.direction == "vertical" &&
        self.defineScalePos == "right"
      ) {
        return "flex-wrap: wrap-reverse;" + "float:right;";
      } else if (
        self.direction == "horizontal" &&
        self.defineScalePos == "bottom"
      ) {
        return "align-items: flex-end;";
      }
    },
  },
};
</script>
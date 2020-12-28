<style lang="scss">
$rulerColor: #96abcb;
$rulerMM: 5;

.a-ruler-horizontal {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 15px;
  flex-wrap: nowrap;
  @mixin kedu {
    border-left: 1px solid $rulerColor;
    width: $rulerMM+px;
    min-width: $rulerMM+px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .a-ruler-mm {
    @include kedu;
    height: $rulerMM+px;
  }
  .a-ruler-halfcm {
    @include kedu;
    height: 2*$rulerMM+px;
  }
  .a-ruler-cm {
    @include kedu;
    position: relative;
    border-left: 2px solid $rulerColor;
    height: $rulerMM+2+px;
  }

  .a-ruler-num-top {
    position: absolute;
    left: -3*$rulerMM+px;
    top: $rulerMM+px;
    font-size: 14px;
    color: $rulerColor;
  }
  .a-ruler-num-bottom {
    position: absolute;
    bottom: $rulerMM+px;
    left: -3*$rulerMM+px;
    font-size: 14px;
    color: $rulerColor;
  }
}

.a-ruler-vertical {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 2*$rulerMM+px;
  flex-wrap: nowrap;

  @mixin kedu {
    border-top: 1px solid $rulerColor;
    height: $rulerMM+px;
    min-height: $rulerMM+px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .a-ruler-mm {
    @include kedu;
    width: $rulerMM+px;
  }
  .a-ruler-halfcm {
    @include kedu;
    width: 2*$rulerMM+px;
  }
  .a-ruler-cm {
    @include kedu;
    position: relative;
    border-top: 2px solid $rulerColor;
    width: $rulerMM+2+px;
  }

  .a-ruler-num-left {
    position: absolute;
    top: -2*$rulerMM+px;
    left: 2*$rulerMM+px;
    font-size: 14px;
    color: $rulerColor;
  }
  .a-ruler-num-right {
    position: absolute;
    top: -2*$rulerMM+px;
    right: 2*$rulerMM+px;
    font-size: 14px;
    color: $rulerColor;
  }
}
</style>
<template>
  <div :class="'a-ruler-' + direction" :style="scalePosition">
    <div v-for="mm in longMM" :key="mm.id" :class="mm.class">
      <div v-show="mm.number" :class="'a-ruler-num-' + scalePos">
        {{ mm.number }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "a-ruler-with-num",
  props: {
    direction: {
      //方向
      type: String,
      default: "horizontal",
    },
    defineScalePos: {
      type: String,
      default: "top",
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
      scalePos:"top"
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
            number: i * 10,
          });
          // } else if (i % self.mmPerCM == 0 && i % (self.mmPerCM * 2) != 0) {
          //   result.push({
          //     id: i,
          //     class: "a-ruler-halfcm",
          //   });
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
        self.scalePos = "top";
        return "";
      } else if (
        (self.direction == "vertical" && self.defineScalePos!="right") ||
        (self.direction == "vertical" && (self.defineScalePos == "left" || !self.defineScalePos))
      ) {
        self.scalePos = "left";
        return "float:left;";
      } else if (
        self.direction == "vertical" &&
        self.defineScalePos == "right"
      ) {
        self.scalePos = "right";
        return "flex-wrap: wrap-reverse;" + "float:right;";
      } else if (
        self.direction == "horizontal" &&
        self.defineScalePos == "bottom"
      ) {
        self.scalePos = "bottom";
        return "align-items: flex-end;";
      }
    },
  },
};
</script>
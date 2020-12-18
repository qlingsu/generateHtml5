<style scoped>
.chart-move-div {
  opacity: 0.85;
  border: 2px solid #e1e1e1;
  background-color: #ffffff;
  position: fixed;
  width: 375px;
}
.group-source-list {
  width: 375px;
  border-right: 2px solid #e1e1e1;
  height: 800px;
  overflow-y: auto;
  display: inline-block;
  /* Chrome all / Safari all /opera15+*/
  -webkit-user-select: none;
  /* Firefox all */
  -moz-user-select: none;
  /* IE 10+ */
  -ms-user-select: none;
  /* 通用 */
  user-select: none;
}
.group-source-title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  color: #ffffff;
  background-image: linear-gradient(to bottom, #2b2f3a, #304156);
  display: flex;
  justify-content: space-between;
}
.group-source-content {
  overflow-y: auto;
  height: 710px;
}
.group-source-content::-webkit-scrollbar {
  width: 0 !important;
}
.group-source-content {
  -ms-overflow-style: none;
}
.group-source-content {
  overflow: -moz-scrollbars-none;
}
.target-list {
  display: inline-block;
  width: calc(100% - 575px);
  height: 800px;

  /* Chrome all / Safari all /opera15+*/
  -webkit-user-select: none;
  /* Firefox all */
  -moz-user-select: none;
  /* IE 10+ */
  -ms-user-select: none;
  /* 通用 */
  user-select: none;
}
</style>
<template>
  <div style="overflow-y: auto; height: 100vh; display: flex">
    <!-- 全部图表样例 -->
    <div class="group-source-list">
      <div class="group-source-title">
        <div>框架库，拖拽可操作</div>
        <div
          @click="switchSource(0, true)"
          v-show="!sourceList[0].show"
          style="cursor: pointer"
        >
          [展开]
        </div>
        <div
          @click="switchSource(0, false)"
          v-show="sourceList[0].show"
          style="cursor: pointer"
        >
          [折叠]
        </div>
      </div>
      <div class="group-source-content" v-show="sourceList[0].show">
        <element-list :components="frameArr"></element-list>
      </div>
      <div class="group-source-title">
        <div>图表组件库，拖拽可操作</div>
        <div
          @click="switchSource(1, true)"
          v-show="!sourceList[1].show"
          style="cursor: pointer"
        >
          [展开]
        </div>
        <div
          @click="switchSource(1, false)"
          v-show="sourceList[1].show"
          style="cursor: pointer"
        >
          [折叠]
        </div>
      </div>
      <div class="group-source-content" v-show="sourceList[1].show">
        <element-list :components="chartsArr"></element-list>
      </div>

      <div class="group-source-title">
        <div>普通组件库，拖拽可操作</div>
        <div
          @click="switchSource(2, true)"
          v-show="!sourceList[2].show"
          style="cursor: pointer"
        >
          [展开]
        </div>
        <div
          @click="switchSource(2, false)"
          v-show="sourceList[2].show"
          style="cursor: pointer"
        >
          [折叠]
        </div>
      </div>
      <div class="group-source-content" v-show="sourceList[2].show">
        <element-list :components="elementArr"></element-list>
      </div>
    </div>

    <!-- 生成结果用 -->
    <div class="target-list">
      <a-ruler :long="rulerWidth"></a-ruler>
      <a-ruler :direction="'vertical'" :long="800"></a-ruler>
      <a-ruler
        :direction="'vertical'"
        :defineScalePos="'right'"
        :long="800"
      ></a-ruler>
      <a-ruler
        :long="rulerWidth"
        :defineScalePos="'bottom'"
        style="position: absolute; bottom: 0"
      ></a-ruler>
      <a-mobile>
        <element-list :components="resultArr"></element-list>
      </a-mobile>
    </div>

    <div style="width: 200px; border-left: 1px solid #e1e1e1">
      <a-button @click="save">保存</a-button>
      <a-upload @click="open">读取</a-upload>
    </div>

    <!-- 模拟移动model -->
    <div class="chart-move-div" v-show="mousedownState">
      <element-list :components="moveArr"></element-list>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Utils from "@/plugin/ChartsModel/utils/utils.js";
import FileSaver from "file-saver";

window.clientWidth = 375; //设定宽度

var mobile = "a-mobile-content";
var chartMoveDiv = "chart-move-div";
var chartCloseBtn = "close-btn_"; //关闭按钮

var offsetX = 0;
var offsetY = 0;

export default {
  data() {
    return {
      sourceList: [
        {
          id: "frame",
          show: true,
        },
        {
          id: "chart",
          show: false,
        },
        {
          id: "element",
          show: false,
        },
      ],
      source: "", //点击来源标记

      mousedownState: false, //鼠标按下状态
      mouseMoveAction: false, //鼠标移动动作

      frameArr: [], //框架库
      chartsArr: [], //图表库
      elementArr: [], //普通组件库

      resultArr: [], //结果库
      moveArr: [],

      rulerWidth: 0,
    };
  },
  mounted() {
    let self = this;

    var data = require("@/plugin/ChartsModel/data/data.json");
    self.formatData(data);

    window.onmousemove = self.mousemoveEvent;
    window.onmouseup = self.mouseupEvent;

    window.onresize = function () {
      let targetDiv = document.getElementsByClassName("target-list")[0];
      let targetRectObj = targetDiv.getBoundingClientRect();
      self.rulerWidth = targetRectObj.width;
    };
    window.onresize();
  },
  methods: {
    switchSource(i, showFlag) {
      let self = this;
      if (showFlag) {
        self.sourceList.forEach((source, index) => {
          if (index == i) {
            source.show = true;
          } else {
            source.show = false;
          }
        });
      } else {
        self.sourceList.forEach((source, index) => {
          if (index == i) {
            source.show = false;
          }
        });
      }
    },
    mousedownEvent(e, index) {
      let self = this;
      if (self.source == "chart") {
        self.moveArr = [Utils.deepClone(self.chartsArr[index])];
      } else if (self.source == "frame") {
        self.moveArr = [Utils.deepClone(self.frameArr[index])];
      } else if (self.source == "element") {
        self.moveArr = [Utils.deepClone(self.elementArr[index])];
      }
      function getStyle(obj, attr) {
        return obj.currentStyle
          ? obj.currentStyle[attr]
          : getComputedStyle(obj, false)[attr];
      }
      //如果内容物有width，则chart-move-div的宽度与之一致
      if (self.moveArr[0].attrs && self.moveArr[0].attrs.width) {
        let moveDiv = document.getElementsByClassName(chartMoveDiv)[0];
        moveDiv.style.width = self.moveArr[0].attrs.width;
      }
      //计算偏移值---这里不能直接用e.offseX 和e.offsetY 因为要计算点击的外壳div，而不是内容物div
      let rect = e.currentTarget.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      self.moveModel(e);
      self.mousedownState = true;
    },
    mousemoveEvent(e) {
      let self = this;
      if (self.mousedownState) {
        self.mouseMoveAction = true;
        self.moveModel(e);
      }
    },
    moveModel(e) {
      let self = this;
      let moveDiv = document.getElementsByClassName(chartMoveDiv)[0];
      moveDiv.style.left = e.clientX - offsetX + "px";
      moveDiv.style.top = e.clientY - offsetY + "px";

      //在结果区域内松的鼠标 且在占位上
      let id = self.inFrameReturnId(e.clientX, e.clientY);
    },
    mouseupEvent(e) {
      let self = this;

      let mouseX = e.clientX;
      let mouseY = e.clientY;

      self.mouseMoveAction = false;
      //插入框架
      if (self.source == "frame" && self.inTargetContainer(mouseX, mouseY)) {
        self.insertFramentoResult();
      }
      //在结果区域内松的鼠标 且在占位上
      let id = self.inFrameReturnId(mouseX, mouseY);
      if ((self.source == "chart" || self.source == "element") && id) {
        self.insertChartntoResult(id);
      }

      offsetX = 0;
      offsetY = 0;
      self.mousedownState = false;

      //清空移动Model
      self.moveArr = [];
    },
    //从结果中删除一个样例
    deleteFromResult(id) {
      let self = this;
      self.resultArr.forEach((frame, i) => {
        frame.props.widgetArr.forEach((widgetDiv, j) => {
          if (widgetDiv.id == id) {
            widgetDiv.components = [];
          }
        });
      });
    },
    //判断坐标在不在手机模型结果框中
    inTargetContainer(x, y) {
      let self = this;
      //结果框坐标
      let targetDiv = document.getElementsByClassName(mobile)[0];
      let targetRectObj = targetDiv.getBoundingClientRect();
      if (
        x > targetRectObj.left &&
        x < targetRectObj.left + targetRectObj.width &&
        y > targetRectObj.top &&
        y < targetRectObj.top + targetRectObj.height
      ) {
        return true;
      } else {
        return false;
      }
    },
    //在框架中,返回框架的id，否则返回空
    inFrameReturnId(x, y) {
      let self = this;
      let targetDiv = document.getElementsByClassName(mobile)[0];
      let widgetDivs = targetDiv.getElementsByClassName("widget-div");
      let id = "";
      Array.prototype.forEach.call(widgetDivs, function (widgetDiv) {
        let rect = widgetDiv.getBoundingClientRect();
        widgetDiv.style.border = "none";
        // widgetDiv.style.backgroundColor = "#FFFFFF";
        if (
          x > rect.left &&
          x <= rect.left + rect.width &&
          y > rect.top &&
          y <= rect.top + rect.height
        ) {
          id = widgetDiv.id; //当前鼠标落点的id
          if (
            self.mouseMoveAction &&
            (self.source == "chart" || self.source == "element")
          ) {
            //如果鼠标在移动状态
            widgetDiv.style.border = "3px dotted #50a0f9";
            // widgetDiv.style.backgroundColor = "#50a0f9";
          }
        }
      });
      return id;
    },
    //插入框架到结果中
    insertFramentoResult() {
      let self = this;
      if (self.moveArr && self.moveArr.length == 1) {
        // self.resultArr.push(self.moveArr[0]);
        self.moveArr[0].nativeOn = {
          ...self.moveArr[0].nativeOn,
          mousedown: function () {},
        };
        self.resultArr = self.moveArr;
      }
    },
    //插入到结果中
    insertChartntoResult(insertId) {
      let self = this;
      if (!insertId) {
        return;
      }
      //要插入的虚拟dom结构
      let tempVNode = {
        name: "div",
        attrs: {
          id: "target-container_" + insertId,
        },
        children: [
          {
            name: "div",
            style: {
              position: "relative",
            },
            children: [
              self.moveArr[0],
              {
                name: "chart-close",
                on: {
                  closeThisChart: function (id) {
                    let deleteId = id.replace(chartCloseBtn, "");
                    self.deleteFromResult(deleteId);
                  },
                },
                props: {
                  id: chartCloseBtn + insertId,
                },
              },
            ],
          },
        ],
      };

      if (insertId && self.moveArr && self.moveArr.length == 1) {
        self.resultArr.forEach((frame, i) => {
          frame.props.widgetArr.forEach((widgetDiv, j) => {
            if (widgetDiv.id == insertId) {
              widgetDiv.components = [tempVNode];
            }
          });
        });
      }
    },
    formatData(data) {
      let self = this;
      if (
        data["employment001_head_10"].length > 0 &&
        data["employment001_body_10"].length > 0 &&
        data["employment001_body_20"].length > 0 &&
        data["employment001_body_30"].length > 0 &&
        data["employment001_body_40"].length > 0
      ) {
        var frames = require("@/plugin/ChartsModel/data/frame.js").default;
        self.frameArr = self.setNativeOn(frames, "frame");

        var sourceCharts = require("@/plugin/ChartsModel/data/charts.js").getData(
          data
        );
        self.chartsArr = self.setNativeOn(sourceCharts, "chart");

        var elementArr = require("@/plugin/ChartsModel/data/element").default;
        self.elementArr = self.setNativeOn(elementArr, "element");
      } else {
        // Toast.fail("没有获取到数据");
      }
    },
    //设置原生鼠标事件
    setNativeOn(arr, sourceVal) {
      let self = this;
      Array.isArray(arr) &&
        arr.map((component, i) => {
          if (component.nativeOn) {
            component.nativeOn = {
              ...component.nativeOn,
              mousedown: (e) => {
                self.source = sourceVal;
                self.mousedownEvent(e, i);
              },
            };
          } else {
            component.nativeOn = {
              mousedown: (e) => {
                self.source = sourceVal;
                self.mousedownEvent(e, i);
              },
            };
          }
        });
      return arr;
    },
    save() {
      let self = this;
      let result = JSON.stringify(self.resultArr);
      console.info(result);
      var blob = new Blob(new String(result), { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, new Date().getTime());
    },
    open(){
      let self = this;

    }
  },
};
</script>

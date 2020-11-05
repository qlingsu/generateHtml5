<template>
  <div class="statistics_header">
    <div class="st_title">
      <span>数据概览</span>
      <van-button type="primary" size="small" class="area_select" @click="showPicker=true">
        {{ value.text }}
        <van-icon name="arrow-down" />
      </van-button>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="getAreaCode"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
    <div class="info_panel">
      <div class="info_panel_con">
        <div class="info_item">
          <div class="info_item_num" style="color: #ffffff">{{data[0].value}}</div>
          <div class="info_item_text">{{data[0].name||当年新就业(人)}}</div>
        </div>
        <div class="info_item">
          <div class="info_item_num" style="color: #ed710d">{{data[1].value}}</div>
          <div class="info_item_text">{{data[1].name||完成目标(人)}}</div>
        </div>
        <div class="info_item">
          <div class="info_item_num" style="color: #abf03d">{{((data[2].value)).toFixed(2) }}%</div>
          <div class="info_item_text">{{data[2].name||同比增长}}</div>
        </div>
      </div>
      <div class="info_panel_bg"></div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
export default {
  name: "statistics-info-panel",
  // type:Array,Number,Boolean,String,Function,Object
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      showPicker: false,
      value: {}
    };
  },
  created() {},
  mounted() {
    // this.value = this.getAreaCode[0];
    // console.log("mounted value=",this.value);
  },
  methods: {
    getAreaCode(){

    },
    onConfirm(value) {
      //console.log(value);;
      this.value = value;
      this.showPicker = false;
    }
  },
  // computed: {
  //   ...mapState({
  //     session: state => state.sessionStore.session
  //   }),
  //   ...mapGetters("sessionStore", ["getAreaCode"])
  // }
};
</script>

<style scoped>
.statistics_header {
  background: #3d75dd;
  background: url("../assets/top_bg.png") 100% 100% no-repeat;
  background-size: cover;
  /*background-position:top center;*/
  padding-top: 20px;
}
.st_title {
  padding: 20px;
  font-size: 1.2rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info_panel {
  position: relative;
  margin: 0 20px;
  height: 128px;
}

.info_panel_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background: #fff;
  border-radius: 5px;
  z-index: 1;
  box-shadow: 0 0 5px 2px #000;
}

.info_panel_con {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
.info_item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info_item_num {
  font-size: 20px;
  padding-top: 40px;
  padding-bottom: 15px;
}
.info_item_text {
  font-size: 12px;
  color: #3f4144;
}
</style>

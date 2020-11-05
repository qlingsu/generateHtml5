<template>
  <div class="chart_box">
    <div class="chart_title">
      {{ title }}
    </div>
    <slot></slot>
    <div class="chart_panel">
      <v-chart :options="reloadOption" autoresize :style="{height:chartHeight+'px'}"/>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/line'
import Utils from '../utils/utils'

export default {
  name:"chart-model-f",
  components: {
    'v-chart': ECharts
  },
  // type:Array,Number,Boolean,String,Function,Object
  props: {
    'data': {
      type: Array,
      default: () => {
        return []
      }
    },
    'title': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chartHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40 + 100) * .7,
      // panelHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40) * 3 / 4,
      panelHeight: this.chartHeight,
      option: {}
    }
  },
  created () {
    // this.option.series.data = this.listData
    // this.setOptions()
  },
  methods: {
    setOptions () {
    },
    checkRadio (value) {
    }
  },
  computed: {
    sumNum () {
      let count = 0
      this.data.forEach((res) => {
        count += res.value
      })
      return count
    },
    reloadOption: function () {
      const colors = ['#0E8EFB', '#B8224E']
      let [nameList, countList, scaleList] = [[], [], []]
      this.data.forEach(res => {
        nameList.push(res.name)
        countList.push(res.count)
        scaleList.push(res.scale)
      })
      const titleList = ['失业新增人数', '失业减少人数']
      return {
        color: colors,
        // 此处无用
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        // 图形位置
        grid: {
          top: 20,
          right: 10,
          bottom: 40,
          left: 10,
          containLabel: true
        },
        // 图例组件配置
        legend: {
          data: titleList,
          bottom: 10, // 图例位置
          right: 0,
          itemWidth: 10, // 图例的宽度
          itemHeight: 10 // 图例的高度
        },
        // 横坐标
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true // 刻度线和标签对齐方式
            },
            data: nameList,
            axisLabel: {
              interval: 0,
              formatter: function (value) {

                return value.split('').join('\n')
              }
            }
          }
        ],
        yAxis: {
          type: 'value',
          name: titleList[0],
          splitNumber: 3,
          // boundaryGap: [0, 1],
          position: 'left',
          nameTextStyle: {
            padding: [0, 0, 5, 30]
          },
          axisLine: {
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: (value) => {
              return Utils.numberToUnits(value)
            },
          }
        },
        series: [
          {
            name: titleList[0],
            type: 'line',
            label: {
              show: true,
              position: 'top'
            },
            data: countList,
            areaStyle: {
              color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#0E8EFB'
              }, {
                offset: 1,
                color: '#ffe'
              }])
            },
          },
          {
            name: titleList[1],
            type: 'line',
            data: scaleList,
            symbol: 'circle',
            areaStyle: {
              color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#B8224E'
              }, {
                offset: 1,
                color: '#ffe'
              }])
            },
            symbolSize: 6,
            label: {
              show: true,
              position: 'top',
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .chart_box {
    background: #fff;
    margin-bottom: 20px;
  }

  .chart_title {
    padding: 12px;
  }

  .chart_panel {
    width: 100%;
    padding: 0 0px;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: space-between;*/
  }

  .echarts {
    width: 100%;
    height: 180px;
    text-align: center;
  }


</style>

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
  name:"chart-model-d",
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
      chartHeight: 0,
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
      this.chartHeight = (window.clientWidth || document.documentElement.clientWidth) / 2 + this.data.length * 20
      this.data.forEach(res => {
        nameList.push(res.name)
        countList.push(res.count)
        scaleList.push(res.scale)
      })
      const titleList = ['数据值']
      return {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '0',
          right: '40',
          bottom: '50',
          top: '20',
          containLabel: true
        },
        // 图例组件配置
        legend: {
          data: titleList,
          bottom: 10, // 图例位置
          left: 10,
          itemWidth: 10, // 图例的宽度
          itemHeight: 10 // 图例的高度
        },
        xAxis: [
          {
            type: 'value',
            name: titleList[0],
            splitNumber: 3,
            position: 'bottom',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            nameLocation: 'end',
            nameTextStyle: {
              padding: [60, 0, 0, -50]
            }
          },
          {
            type: 'value',
            name: titleList[1],
            splitLine: {
              show: false
            },
            position: 'top',
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: (value) => {
                return Utils.accMul(value, 100) + '%'
              }
            },
            nameLocation: 'end',
            nameTextStyle: {
              padding: [-60, 0, 0, -50]
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: false // 刻度线和标签对齐方式
            },
            data: nameList,
            axisLabel: {
              formatter: (value) => {
                const st = value.split('')
                st.length > 5 && st.splice(5, 0, '\n')
                return st.join('')
              }
            }
          }
        ],
        series: [
          {
            name: titleList[0],
            type: 'bar',
            barWidth: 10,
            data: countList,
            label: {
              show: true,
              position: 'right'
            }
          },
          {
            name: titleList[1],
            type: 'line',
            data: scaleList,
            symbol: 'circle',
            symbolSize: 6,
            xAxisIndex: 1,
            label: {
              show: true,
              position: 'right',
              fontSize: 10,
              formatter: value => {
                return Utils.accMul(value.value, 100) + '%'
              }
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
    padding: 0 0 0 10px;
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

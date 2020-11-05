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

export default {
  name:"chart-model-w",
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
      this.chartHeight = (window.clientWidth || document.documentElement.clientWidth) / 2 + this.data.length * 40
      this.data.forEach(res => {
        nameList.push(res.name)
        countList.push(res.count)
        scaleList.push(res.scale)
      })
      const titleList = ['业务经办累计数量', '风险触发数量']
      return {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10',
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
            name: '',
            splitNumber: 3,
            position: 'bottom',
            axisLine: {
              lineStyle: {
                color: '#000000'
              }
            },
            nameLocation: 'end',
            nameTextStyle: {
              padding: [60, 0, 0, -50],
              color: '#000000'
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
              inside: true,
              verticalAlign: 'bottom',
              lineHeight: 35,
              margin: 3,
              formatter: (value) => {
                // const st = value.split('')
                // st.length > 5 && st.splice(5, 0, '\n')
                // return st.join('')
                return value
              }
            }
          }
        ],
        series: [
          {
            name: titleList[0],
            type: 'bar',
            barWidth: 8,
            data: countList,
            label: {
              show: true,
              position: 'right'
            }
          },
          {
            name: titleList[1],
            type: 'bar',
            barGap: '80%',
            barWidth: 8,
            data: scaleList,
            label: {
              show: true,
              position: 'right'
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

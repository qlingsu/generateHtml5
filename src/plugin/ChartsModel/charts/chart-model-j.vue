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
  import Utils from "../utils/utils";

  export default {
    name:"chart-model-j",
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
        chartHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40 + 160) * .5,
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
        const titleList = ['数据值', '增长比']
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
            top: 10,
            right: 10,
            bottom: 30,
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
          yAxis: [
            {
              type: 'value',
              name: titleList[0],
              splitNumber: 3,
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
            {
              type: 'value',
              name: titleList[1],
              splitNumber: 3,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              nameTextStyle: {
                padding: [0, 0, 5, 0]
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                formatter: (value) => {
                  return value + '%'
                }
              }
            }
          ],
          series: [
            {
              name: titleList[0],
              type: 'bar',
              barWidth: 10,
              label: {
                show: true,
                position: 'top'
              },
              data: countList
            },
            {
              name: titleList[1],
              type: 'line',
              data: scaleList,
              yAxisIndex: 1,
              symbol: 'circle',
              symbolSize: 6,
              label: {
                show: true,
                position: 'top',
                formatter: value => {
                  // return value.value + '%'
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

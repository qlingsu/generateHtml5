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
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import Utils from '../utils/utils'

export default {
  name:"chart-model-p",
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
      chartHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40 + 100) * .5,
      // panelHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40) * 3 / 4,
      panelHeight: this.chartHeight,
      option: {}
    }
  },
  created () {
    // this.option.series.data = this.listData
    // this.setOptions()
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
      return {
        color: ['#50A0F9', '#B8224E', '#9BD23C'],
        legend: {
          orient: 'vertical',
          right: 0,
          top: 0,
          itemWidth: 10,//图例的宽度
          itemHeight: 10,//图例的高度
          data: this.data,
          formatter: (name) => {
            let b = ''
            let a = ''
            let count = 0
            this.data.forEach((res) => {
              if (res.name === name) {
                b = res.scale
                a = res.value
              }
            })
            // 无比例数据时自行计算
            // return ['{a|' + name + '}', '{b|就业人数' + b + '人 占比：' + (b / this.sumNum * 100).toFixed(2) + '%}'].join('\n')
            return ['{a|' + name + '}', '{b|' + a + ' 件 占：' + Utils.accMul(b, 100) + '%}'].join('\n')
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                align: 'left',
                verticalAlign: 'bottom',
                padding: [0, 0, 16, 0]
              },
              b: {
                fontSize: 12,
                align: 'left',
                verticalAlign: 'top',
                padding: [-2, 0, 6, 2]
              }
            }
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: [(window.clientWidth || document.documentElement.clientWidth) * .25, (window.clientWidth || document.documentElement.clientWidth) * .25],
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 12,
              fontWeight: 'bold',
              verticalAlign: 'bottom',
              show: true,
              position: 'inside',
              formatter: value => {
                //console.log(value);
                return Utils.accMul(value.data.scale, 100) + '%'
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            data: this.data
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

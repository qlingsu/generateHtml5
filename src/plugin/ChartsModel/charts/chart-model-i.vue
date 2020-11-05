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

export default {
  name:"chart-model-i",
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
      chartHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40 + 100) * 0.5,
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
      return {
        color: ['#50A0F9', '#B8224E', '#9BD23C'],
        // 图形位置
        grid: {
          top: 40,
          right: 0,
          bottom: 30,
          left: 0,
          containLabel: true
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            roseType: 'radius',
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 12,
              fontWeight: 'bold',
              verticalAlign: 'bottom',
              show: true,
              position: 'outside',
              formatter: value => {
                if (value.value === 0) {
                  return value.name + '\n' + '0%'
                } else {
                  return value.name + '\n' + (value.value / this.sumNum * 100).toFixed(2) + '%'
                }
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
    padding: 0 10px;
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

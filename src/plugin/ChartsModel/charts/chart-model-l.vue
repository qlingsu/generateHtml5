<template>
  <div class="chart_box">
    <div class="chart_title">
      {{ title }}
    </div>
    <slot></slot>
    <div class="chart_panel">
      <v-chart ref="chart" :options="reloadOption" autoresize :style="{height:chartHeight+'px'}"/>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/sankey'
import 'echarts/lib/component/legend'
import Utils from '../utils/utils'

export default {
  name:"chart-model-l",
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
      // chartHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40 + 100) * 1,
      chartHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40 + 240),
      // panelHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40) * 3 / 4,
      panelHeight: this.chartHeight,
      option: {}
    }
  },
  created () {
    // this.option.series.data = this.listData
    // this.setOptions()

  },
  mounted () {
    this.$nextTick(() => {
      console.log('666======', this.$refs.chart)
      this.$refs.chart.dispatchAction({
        type: 'downplay'
      })
    })
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
      // debugger
      const num = 8
      // const num = 18
      // const color = ['#54D023', '#F0E028', '#F05828', '#CA22B1', '#222CC8', '#227DC8', '#22C89A', '#CA22B0', '#54D023', '#F0E028', '#F05828', '#CA22B1', '#222CC8', '#227DC8', '#22C89A', '#CA22B0','#54D023', '#F0E028']
      const color = ['#54D023', '#F0E028', '#F05828', '#CA22B1', '#222CC8', '#227DC8', '#22C89A', '#CA22B0']
      let dataListLeft = []
      let dataListRight = []
      let linkList = []
      let count = 0
      this.data.forEach((res, i) => {
        count += res.value
      })
      console.log(count)
      this.data.forEach((res, i) => {
        dataListLeft.push({
          name: res.name,
          value: res.value,
          'itemStyle': {
            'normal': {
              borderWidth: num,
              color: color[i],
              borderColor: color[i]
            }
          }
        })
        dataListRight.push({
          name: res.name + ',' + res.value + '人,占:' + Utils.accMul(res.value / count, 100).toFixed(2) + '%',
          value: res.value,
          label: {
            fontSize: 12,
            position: 'right'
          },
          itemStyle: {
            normal: {
              color: color[i],
              borderWidth: 0
            }
          }
        })
        linkList.push({
          source: res.name + ',' + res.value + '人,占:' + Utils.accMul(res.value / count, 100).toFixed(2) + '%',
          value: res.value,
          target: '湖\n北\n省\n',
          lineStyle: {
            color: color[i]
          }
        })
      })
      console.log('dataListLeft', dataListLeft.concat(dataListRight))
      console.log('linkList', count)
      dataListRight.push({
        name: '湖\n北\n省\n',
        value: count,
        'itemStyle': {
          'normal': {
            color: '#ccc',
            borderWidth: 0
          }
        },
        label: {
          fontSize: 12,
          position: 'inside',
          lineHeight: 20
        },
      })
      return {
        series: [
          {
            type: 'sankey',
            nodeGap: 12,
            layout: 'none',
            left: 0,
            top: 10,
            right: 10,
            bottom: 20,
            focusNodeAdjacency: false,
            draggable: false,
            data: dataListRight,
            links: linkList,
            lineStyle: {
              color: 'source',
              curveness: .5
            },
            label: {
              color: 'rgba(0,0,0,0.7)',
              fontFamily: 'Arial',
              fontSize: 12
            }
          }
        ],
        tooltip: {
          trigger: 'item'
        }
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
    padding: 0 0px 0 10px;
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

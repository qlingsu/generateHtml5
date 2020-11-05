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
import 'echarts/lib/chart/sankey'
import 'echarts/lib/component/legend'

export default {
  name:"chart-model-n",
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
      chartHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40 + 300),
      // panelHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40) * 3 / 4,
      panelHeight: this.chartHeight,
      option: {},
      count: 0,
      maxNum: 0
    }
  },
  created () {
    // this.option.series.data = this.listData
    // this.setOptions()
  },
  methods: {
    sumNum () {
      let count = 0
      this.data.forEach((res) => {
        res.value > this.maxNum && (this.maxNum = res.value)
        count += res.value
      })
      return count
    }
  },
  computed: {
    reloadOption: function () {
      this.sumNum()
      // debugger
      // const num = 8
      console.log(this.maxNum)
      const defaultHeight = this.maxNum > 500 ? this.maxNum / 20 : 3
      let maxNum = 0
      const num = 18
      const color = ['#54D023', '#F0E028', '#F05828', '#CA22B1', '#222CC8', '#227DC8', '#22C89A', '#CA22B0', '#54D023', '#F0E028', '#F05828', '#CA22B1', '#222CC8', '#227DC8', '#22C89A', '#CA22B0', '#54D023', '#F0E028']
      // const color = ['#54D023', '#F0E028', '#F05828', '#CA22B1', '#222CC8', '#227DC8', '#22C89A', '#CA22B0']
      let [nameList, countList] = [[], []]
      this.data.forEach(res => {
        nameList.push(res.name)
        countList.push(res.count)
      })
      let dataListLeft = []
      let dataListRight = []
      let linkList = []
      let count = 0
      this.data.forEach((res, i) => {
        count += res.value
        res.value < 0 && (count += defaultHeight)
        // res.value === 0
      })
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
        const setBorder = {
          normal: {
            color: '#fff',
            borderWidth: 1
          }
        }
        const setItemStyle = {
          normal: {
            color: color[i],
            borderWidth: 0
          }
        }

        dataListRight.push({
          name: res.name + ',' + res.value + '人,占:' + (res.value / count * 100).toFixed(0) + '%',
          value: res.value,
          label: {
            fontSize: 12,
            position: 'right'
          },
          itemStyle: res.value === 0 ? setBorder : setItemStyle

        })
        linkList.push({
          source: res.name + ',' + res.value + '人,占:' + (res.value / count * 100).toFixed(0) + '%',
          value: res.value,
          target: '困\n难\n人\n员\n类\n别',
          lineStyle: {
            color: color[i]
          }
        })
      })
      dataListRight.push({
        name: '困\n难\n人\n员\n类\n别',
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
            layout: 'none',
            left: 0,
            top: 10,
            right: 10,
            bottom: 20,
            nodeGap: 16,
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

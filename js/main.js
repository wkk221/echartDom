// ajax 通信
window.$http = axios
var baseURL = 'https:127.0.0.1:9090'
$http.defaults.baseURL = baseURL;
Mock.mock(baseURL + '/bar1', {
  'data|7': [/[1-9][0-9]{3}/]
})
Mock.mock(baseURL + '/abc', {
  'data|7': [/[1-9][0-9]{3}/]
});

// 
(function () {
  var myChart = echarts.init(document.querySelector('.bar1 .chart'))
  var option = {
    tooltip: {
      trigger: 'axis',
      showContent: true,
      axisPointer: {
        type: 'shadow',
      }
    },

    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(225,225,225.6)',
        fontSize: 10
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,.2)",
          width: 1
        }
      },
      axisTick: { show: false }
    },
    xAxis: {
      type: 'category',
      data: ['旅游行业', '教育培训', '游戏行业', '医疗行业', '电商行业', '社交行业', '金融行业'],
      axisLabel: {
        color: 'rgba(225,225,225,.6)',
        fontSize: 10
      },
      axisPointer: {
        show: true
      },
      axisTick: { show: false },
      // 画布刻度线主线。
      axisLine: {
        show: true,
        lineStyle: {
          color: 'red',
          width: 1,
        }
      },
      splitLine: {
        show: false
      }
    },
    grid: {
      show: true,
      left: '10%',
      top: '12%',
      right: '0',
      bottom: '12%',
      containLabel: false
    },
    series: [{
      color: ['rgb(75, 127, 214)'],
      data: [],
      type: 'bar',
      barWidth: '35%',
      itemStyle: {
        barBorderRadius: 5
      }
    }]
  }

  $http.get('/bar1').then(function (res) {
    console.log(res)
    var result = res.data.data
    // option.series[0].data = result
    option.series[0].data = [200, 300, 300, 900, 1500, 1200, 600]
    myChart.setOption(option)
    //myChart2.setOption(option)
  })

  // 浏览器发生调整
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})();

(function () {
  var colors = [
    'rgb(54, 137, 230)',
    'rgb(237, 113, 114)',
    'rgb(106, 209, 227)',
    'rgb(242, 179, 74)',
    'rgb(140, 118, 244)']
  var myChart = echarts.init(document.querySelector('.bar2 .chart'))
  var option = {

    grid: {
      left: '22%',
      // right: '4%',
      bottom: '10%',
      top: '10%',
      containLabel: false
    },
    xAxis: {
      show: false,
      type: 'value',
      
    },
    yAxis: [
      {
        inverse: true,
        axisTick: { show:false},
        axisLine: { show: false},
        axisLabel: { color: '#fff' },
        type: 'category',
        data: ['html5','css3','javascript','vue','node']
      },
      {
        inverse: true,
        axisTick: { show:false},
        axisLine: { show: false},
        axisLabel: { color: '#fff' },
        type: 'category',
        data: [702, 350, 610, 793, 664]
      }
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        yAxisIndex: 0,
        data: [70, 34, 60, 78, 69],
        itemStyle: {
          color: function(item){
            return colors[item.dataIndex %colors.length]
          },
          barBorderRadius: 20,
        },
        barWidth: 10,
        barCategoryGap: 10,
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%'
        }
      },
      {
        name: '框',
        type: 'bar',
        yAxisIndex: 1,
        data: [100, 100, 100, 100, 100],
        itemStyle: {
          barBorderRadius: 20,
          color: 'transparent',
          borderWidth: 3,
          borderColor: 'rgba(65, 194, 222,1)'
        },
        barWidth: 15,
        barCategoryGap: 50,
      }
    ]
  };
  myChart.setOption(option)
  // 浏览器发生调整
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})();

$http.get('/abc').then(function (res) {
  console.log(res)
})
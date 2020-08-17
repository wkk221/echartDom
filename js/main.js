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
(function(){
  var myChart = echarts.init(document.querySelector('.bar1 .chart'))
  var option = {
      tooltip: {
        trigger: 'axis',
        showContent: true,
        axisPointer: {
          type: 'none',
          type: 'shadow',
        }
      },
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: {
            color: '#fff'
          },
          axisPointer: {
            show: true
          },
          axisLine: {
            show: false
          }
      },
      yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            lineStyle: {
              color: "rgba(241, 232, 232, .3)",
              width: 0.5
            }
          }
      },
      grid: {
          show: true,
          left: '12%',
          top: '5%',
          right: '0',
          bottom: '12%',
          containLabel: false
      },
      series: [{
        color: ['rgb(75, 127, 214)'],
          data: [],
          type: 'bar',
          barWidth: 25,
          itemStyle: {
            barBorderRadius: 5
          },
      }]
  }

  $http.get('/bar1').then(function(res) {
    console.log(res)
    var result = res.data.data
    option.series[0].data = result
    myChart.setOption(option)
    //myChart2.setOption(option)
  })
})();

(function(){
  var colors = [
    'rgb(54, 137, 230)',
    'rgb(237, 113, 114)',
    'rgb(106, 209, 227)',
    'rgb(242, 179, 74)',
    'rgb(140, 118, 244)']
  var myChart = echarts.init(document.querySelector('.bar2 .chart'))
  var option = {
    tooltip: {},
    legend: {
      show: false
    },
    grid: {
      top: 25,
      left: '15%',
      bottom: '10%',
      right: '3%'
    },
    yAxis: {
      data: ["HTML5", "CSS3", "JAVASCRIPT", "VUE", "NODE"],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      }
    },
    xAxis: {
      show: false
    },
    series: [{
      name: "Sale",
      type: "bar",
      data: [5, 20, 36, 10, 10],
      showBackground: true,
      barWidth: 8,
      backgroundStyle: {
        color: "rgba(237, 193, 193, 0)",
        borderColor: "rgba(65, 194, 222, 1)",
        borderWidth: 2,
        barBorderRadius: [40, 40, 40, 40],
      },
      itemStyle: {
        color: function(item){
          return colors[item.dataIndex] 
        },
        barBorderRadius: [15, 15, 15, 15]
      },
    }]
  }
  myChart.setOption(option)
})();

$http.get('/abc').then(function(res) {
  console.log(res)
})
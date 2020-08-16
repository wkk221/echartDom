(function(){
  console.log(document.querySelector('.bar1'), echarts)
  var myChart = echarts.init(document.querySelector('.bar1 .panel__bd'))
  option = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
      }]
  }

  myChart.setOption(option)

})()


window.$http = axios
console.log($http, 1)

$http.get('https:127.0.0.1:9090/abc').then(function(res) {
  console.log(res)
})

Mock.mock('https:127.0.0.1:9090/abc', {
  'list|1-10': [{
    'id|+1': 0
  }]
})
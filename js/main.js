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

// 柱状图1
(function () {
  var myChart = echarts.init(document.querySelector('.bar1 .chart'))
  var option = {
    tooltip: {
      trigger: 'axis',
      showContent: true,
      axisPointer: {
        type: 'shadow',
      },
      extraCssText:'background: pink;color:red;'
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
      show: false,
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

// 柱状图2
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
        },
        animationEasing: 'backOut',
        animationDelay: function(index) {
          console.log(index)
          return index * 50
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
        animationDuration: 0
      }
    ]
  };
  myChart.setOption(option)
  // 浏览器发生调整
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})();

// 折线图1
(function(){
  var myChart = echarts.init(document.querySelector('.line1 .chart'))
  var ajaxData =  [
    [Mock.mock({'data|12':[/^[1-2]\d{1,2}/]}).data, Mock.mock({'data|12':[/^[1-2]\d{1,2}/]}).data],
    [Mock.mock({'data|12':[/^[1-2]\d{1,2}/]}).data, Mock.mock({'data|12':[/^[1-2]\d{1,2}/]}).data]
  ]
  var option = {
    color: ['#00f1f2','#ed3f35'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        // data: ['新增粉丝','新增游客'],
        textStyle: {
          color: '#4c9bfd'
        },
        right: '5%'
    },
    grid: {
        top:'20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        show: true,
        borderColor: 'rgb(38, 42, 79)'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        axisTick: {show: false},
        splitLine: {show: false},
        axisLine: { show: false},
        axisLabel: {textStyle: {color: '#4c9bfd'}}
    },
    yAxis: {
        type: 'value',
        splitLine: {lineStyle: {color: '#012f4a'}},
        axisTick: {show: false},
        axisLine: { show: false},
        axisLabel: {textStyle: {color: '#4c9bfd'}}
    },
    series: [
        {
            name: '新增粉丝',
            type: 'line',
            smooth: true,
            //stack: '~',
            data: ajaxData[1][0],
        },
        {
            name: '新增游客',
            type: 'line',
            smooth: true,
            //stack: '~',
            data: ajaxData[1][1],
        }
    ]
};

  myChart.setOption(option)
  // 浏览器发生调整
  window.addEventListener('resize', function () {
    myChart.resize()
  })
  $('.line1 a').click(function(){
    var _idx = $(this).index()
    // console.log(_idx)
    option.series[0].data = ajaxData[_idx][0]
    option.series[1].data = ajaxData[_idx][1]
    myChart.setOption(option)
  })
})();
// 折线图2
(function(select){
  var myChart = echarts.init(document.querySelector('.line2 .chart'))
  var ajaxData =  [
    [Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data, Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data],
    [Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data, Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data]
  ]
  var option = {
    color: ['rgba(148,13,13,1)','rgba(34,193,195,1)'],
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top:'30',
      left: '10',
      right: '10',
      bottom: '10',
      containLabel: true,
    },
    legend: {
        textStyle: {
          color: '#4c9bfd',
          fontSize:12
        },
        top: '0'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '01','02','03','04','05','06','07','08','09','10',
          '11','12','13','14','15','16','17','18','19','20',
          '21','22','23','24','25','26','27','28','29','30',
      ] ,
        axisTick: {show: false},
        splitLine: {show: false},
        axisLine: {textStyle: {color: 'rgba(255,255,255,.1)'}},
        axisLabel: {textStyle: {color: 'rgba(255,255,255,.5)'}}
      },
      yAxis: {
        type: 'value',
        splitLine: {lineStyle: {color: 'rgba(255,255,255,.1)'}},
        axisTick: {show: false},
        axisLine: {textStyle: {color: 'rgba(255,255,255,.1)'}},
        axisLabel: {textStyle: {color: 'rgba(255,255,255,.5)'}}
      },
      series: [{
          name: '播放量',
          data: ajaxData[1][0],
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize:5,
          lineStyle: {
            width: 2,
            color:'rgba(148,13,13,1)'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,y: 0,x2: 0,y2: 1,
              colorStops: [{offset: 0, color: 'rgba(148,13,13,0.4)'}, { offset: 1, color: 'rgba(104,155,255,0.1)'}],
              global: false // 缺省为 false
            }
          },
          emphasis:{
            itemStyle: {
              color:'rgba(148,13,13,1)',
              borderWidth:12,
              borderColor:'rgba(221,220,107,.1)'
            }
          }
      },{
        name: '转发量',
        data: ajaxData[1][1],
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbolSize:5,
        lineStyle: {
          width: 2,
          color:'rgba(34,193,195,1)'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,y: 0,x2: 0,y2: 1,
            colorStops: [{offset: 0, color: 'rgba(34,193,195,.4)'}, { offset: 1, color: 'rgba(253,187,45,0.1)'}],
            global: false // 缺省为 false
          },
        },
        emphasis:{
          itemStyle: {
            color:'rgba(34,193,195,1)',
            borderWidth:12,
            borderColor:'rgba(221,220,107,.1)'
          }
        }
    }]
  };
  myChart.setOption(option)
  // 浏览器发生调整
  window.addEventListener('resize', function () {
    myChart.resize()
  })
  $('.line2 a').click(function(){
    var _idx = $(this).index()
    //alert(1)
    console.log(_idx)
    option.series[0].data = ajaxData[_idx][0]
    option.series[1].data = ajaxData[_idx][1]
    myChart.setOption(option)
  })
})();

// $http.get('/abc').then(function (res) {
//   console.log(res)
// })

// 饼状图1
(function(){
  var myChart = echarts.init(document.querySelector('.pie1 .chart'))
  var ajaxData =  [
    [Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data, Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data],
    [Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data, Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data]
  ]
  var option = {
    color:[
      'rgba(29, 82, 176,1)',
      'rgba(25, 99, 172,1)',
      'rgba(29, 116, 170,1)',
      'rgba(27, 135, 175,1)',
      'rgba(35, 143, 175,1)'
    ],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        bottom: '0%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: 12
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            //labelLine: {show: true},
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1, name: '0岁以下'},
                {value: 4, name: '20-29岁'},
                {value: 2, name: '30-39岁'},
                {value: 2, name: '40-49岁'},
                {value: 1, name: '50岁以上'}
            ]
        }
    ]
};

  myChart.setOption(option)
  // 浏览器发生调整
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})();

// 饼状图1
(function(){
  var myChart = echarts.init(document.querySelector('.pie2 .chart'))
  // var ajaxData =  [
  //   [Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data, Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data],
  //   [Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data, Mock.mock({'data|30':[/^[1-2]\d{0,1}/]}).data]
  // ]
  var option = {
    color:[
      'rgba(62, 93, 252,1)',
      'rgba(100, 190, 165,1)',
      'rgba(238, 145, 136,1)',
      'rgba(253, 167, 130,1)',
      'rgba(68, 134, 253,1)',
      'rgba(165, 216, 186,1)',
      'rgba(78, 181, 235,1)',
      'rgba(70, 143, 253,1)'
    ],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        bottom: '0%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: 12
        }
    },
    series: [
        {
            name: '地区分布',
            type: 'pie',
            radius: ['10%', '70%'],
            roseType: 'radius',
            avoidLabelOverlap: false,
            labelLine: {
              show: true,
              length: 6,
              length2: 8,
              smooth: true
            },
            label: {
                show: true,
            },
            data: [
                {value: 1, name: '云南'},
                {value: 4, name: '北京'},
                {value: 2, name: '山东'},
                {value: 2, name: '河北'},
                {value: 1, name: '江苏'},
                {value: 1, name: '浙江'},
                {value: 1, name: '深圳'},
                {value: 1, name: '广东'}
            ]
        }
    ]
};

  myChart.setOption(option)
  // 浏览器发生调整
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})();
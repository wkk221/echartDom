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

// 地图
(function(){
  var myChart = echarts.init(document.querySelector('.map .chart'))
  var geoCoordMap = {
    '上海': [121.4648,31.2891],
    '东莞': [113.8953,22.901],
    '东营': [118.7073,37.5513],
    '中山': [113.4229,22.478],
    '临汾': [111.4783,36.1615],
    '临沂': [118.3118,35.2936],
    '丹东': [124.541,40.4242],
    '丽水': [119.5642,28.1854],
    '乌鲁木齐': [87.9236,43.5883],
    '佛山': [112.8955,23.1097],
    '保定': [115.0488,39.0948],
    '兰州': [103.5901,36.3043],
    '包头': [110.3467,41.4899],
    '北京': [116.4551,40.2539],
    '北海': [109.314,21.6211],
    '南京': [118.8062,31.9208],
    '南宁': [108.479,23.1152],
    '南昌': [116.0046,28.6633],
    '南通': [121.1023,32.1625],
    '厦门': [118.1689,24.6478],
    '台州': [121.1353,28.6688],
    '合肥': [117.29,32.0581],
    '呼和浩特': [111.4124,40.4901],
    '咸阳': [108.4131,34.8706],
    '哈尔滨': [127.9688,45.368],
    '唐山': [118.4766,39.6826],
    '嘉兴': [120.9155,30.6354],
    '大同': [113.7854,39.8035],
    '大连': [122.2229,39.4409],
    '天津': [117.4219,39.4189],
    '太原': [112.3352,37.9413],
    '威海': [121.9482,37.1393],
    '宁波': [121.5967,29.6466],
    '宝鸡': [107.1826,34.3433],
    '宿迁': [118.5535,33.7775],
    '常州': [119.4543,31.5582],
    '广州': [113.5107,23.2196],
    '廊坊': [116.521,39.0509],
    '延安': [109.1052,36.4252],
    '张家口': [115.1477,40.8527],
    '徐州': [117.5208,34.3268],
    '德州': [116.6858,37.2107],
    '惠州': [114.6204,23.1647],
    '成都': [103.9526,30.7617],
    '扬州': [119.4653,32.8162],
    '承德': [117.5757,41.4075],
    '拉萨': [91.1865,30.1465],
    '无锡': [120.3442,31.5527],
    '日照': [119.2786,35.5023],
    '昆明': [102.9199,25.4663],
    '杭州': [119.5313,29.8773],
    '枣庄': [117.323,34.8926],
    '柳州': [109.3799,24.9774],
    '株洲': [113.5327,27.0319],
    '武汉': [114.3896,30.6628],
    '汕头': [117.1692,23.3405],
    '江门': [112.6318,22.1484],
    '沈阳': [123.1238,42.1216],
    '沧州': [116.8286,38.2104],
    '河源': [114.917,23.9722],
    '泉州': [118.3228,25.1147],
    '泰安': [117.0264,36.0516],
    '泰州': [120.0586,32.5525],
    '济南': [117.1582,36.8701],
    '济宁': [116.8286,35.3375],
    '海口': [110.3893,19.8516],
    '淄博': [118.0371,36.6064],
    '淮安': [118.927,33.4039],
    '深圳': [114.5435,22.5439],
    '清远': [112.9175,24.3292],
    '温州': [120.498,27.8119],
    '渭南': [109.7864,35.0299],
    '湖州': [119.8608,30.7782],
    '湘潭': [112.5439,27.7075],
    '滨州': [117.8174,37.4963],
    '潍坊': [119.0918,36.524],
    '烟台': [120.7397,37.5128],
    '玉溪': [101.9312,23.8898],
    '珠海': [113.7305,22.1155],
    '盐城': [120.2234,33.5577],
    '盘锦': [121.9482,41.0449],
    '石家庄': [114.4995,38.1006],
    '福州': [119.4543,25.9222],
    '秦皇岛': [119.2126,40.0232],
    '绍兴': [120.564,29.7565],
    '聊城': [115.9167,36.4032],
    '肇庆': [112.1265,23.5822],
    '舟山': [122.2559,30.2234],
    '苏州': [120.6519,31.3989],
    '莱芜': [117.6526,36.2714],
    '菏泽': [115.6201,35.2057],
    '营口': [122.4316,40.4297],
    '葫芦岛': [120.1575,40.578],
    '衡水': [115.8838,37.7161],
    '衢州': [118.6853,28.8666],
    '西宁': [101.4038,36.8207],
    '西安': [109.1162,34.2004],
    '贵阳': [106.6992,26.7682],
    '连云港': [119.1248,34.552],
    '邢台': [114.8071,37.2821],
    '邯郸': [114.4775,36.535],
    '郑州': [113.4668,34.6234],
    '鄂尔多斯': [108.9734,39.2487],
    '重庆': [107.7539,30.1904],
    '金华': [120.0037,29.1028],
    '铜川': [109.0393,35.1947],
    '银川': [106.3586,38.1775],
    '镇江': [119.4763,31.9702],
    '长春': [125.8154,44.2584],
    '长沙': [113.0823,28.2568],
    '长治': [112.8625,36.4746],
    '阳泉': [113.4778,38.0951],
    '青岛': [120.4651,36.3373],
    '韶关': [113.7964,24.7028]
};

var XAData = [
    [{name:'西安'}, {name:'北京',value:100}],
    [{name:'西安'}, {name:'上海',value:100}],
    [{name:'西安'}, {name:'广州',value:100}],
    [{name:'西安'}, {name:'西宁',value:100}],
    [{name:'西安'}, {name:'韶关',value:100}]
];

var XNData = [
    [{name:'西宁'}, {name:'北京',value:100}],
    [{name:'西宁'}, {name:'上海',value:100}],
    [{name:'西宁'}, {name:'广州',value:100}],
    [{name:'西宁'}, {name:'西安',value:100}],
    [{name:'西宁'}, {name:'银川',value:100}]
];

var YCData = [
    [{name:'银川'}, {name:'北京',value:100}],
    [{name:'银川'}, {name:'广州',value:100}],
    [{name:'银川'}, {name:'上海',value:100}],
    [{name:'银川'}, {name:'西安',value:100}],
    [{name:'银川'}, {name:'西宁',value:100}],
];

var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
//var planePath = 'arrow';
var convertData = function (data) {
    
    var res = [];
    for (var i = 0; i < data.length; i++) {
      
        var dataItem = data[i];

        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                value: dataItem[1].value
            });
        }
    }
    return res;
};

var color = ['#a6c84c', '#ffa022', '#46bee9'];//航线的颜色
var series = [];
[['西安', XAData], ['西宁', XNData], ['银川', YCData]].forEach(function (item, i) {  
    series.push({
        name: item[0] + ' Top3',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 5,
            trailLength: .8,
            color: 'red',   //arrow箭头的颜色
            symbolSize: 3
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0] + ' Top3',
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 1,
                opacity: 0.6,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0] + ' Top3',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[2] / 8;
        },
        itemStyle: {
          normal: {
            color: color[i],
          },
          emphasis: {
              areaColor: '#2B91B7'
          }
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
        })
    });
});
var option = {
    // backgroundColor: '#000',
    title : {
        text: '模拟航线',
        subtext: '数据纯属虚构',
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item', 
        formatter:function(params, ticket, callback){
            if(params.seriesType=="effectScatter") {
                return "线路："+params.data.name+""+params.data.value[2];
            }else if(params.seriesType=="lines"){
                return params.data.fromName+">"+params.data.toName+"<br />"+params.data.value;
            }else{
                return params.name;
            }
        } 
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data:['西安 Top3', '西宁 Top3', '银川 Top3'],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'multiple'
    },
    geo: {
        map: 'china',
        zoom: 1.2,
        label: {
            emphasis: {
                show: true,
                color:'#fff'
            }
        },
        roam: true,
        itemStyle: {
          normal: {
              areaColor: '#00186E',
              borderColor: '#195BB9',
              borderWidth: 1,
          },
          emphasis: {
              areaColor: 'red'
          }
        }
    },
    series: series
};
  

  myChart.setOption(option)
  // 浏览器发生调整
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})();
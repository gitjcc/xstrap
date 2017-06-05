# chart

> 规则
1. 柱状图调用barChart函数、饼图调用cirChart函数、折线图调用linesChart函数
2. 函数的参数options

### 共有参数

| 共有参数 | 说明  | 默认值 |
|----|:---:| --:|
| conId  | divId |  |
| title | 图形标题  | 标题 |
| titleAlign | 标题位置  | center |
| isLegend | 是否显示图例  | true |
| legendOrient | 图例排列方式  | 默认纵向排列 horizontal(横向),vertical（纵向） |
| legendAlignx | 图例X轴显示位置  | left、right,像素值 |
| legendAligny | 图例Y轴显示位置  | top、bottom,像素值 |
| legendArray | 图例数据数组  |  |
| colorArray | 颜色数组  |  ||

### 柱状图示例
````html
    <div id="x-chart1" style="width:100%;height: 400px"></div>
````
````js
XChart.barChart({
        conId:'x-chart1',
        title:'标题',
        xArray:['星期一星期', '星期二星期', '星期三星星期', '星期四星星期'],
        colorArray:['#3398DB','#61a0a8'],
        legendOrient:'horizontal',
        legendArray:['利润','支出'],
        textrotate:30,
        xTextStyle:{color: function (val) {
            if (val == '星期一星期') {
                return "blue";
            } else {
                return "black";
            }
        },fontSize:14},
        dataArray:[
            {data:[200, 170, 240, 244]},
            {data:[320, 302, 341, 374]}
        ],
        fn:function (param) {
            alert(param.value);
        }
    });
````

| 柱状图属性（部分折线图） | 说明  | 示例 |
|----|:---:| --:|
| xArray | X轴数据 | ['星期一星期', '星期二星期', '星期三星星期', '星期四星星期'] |
| dataArray | 数据数组  | [{data:[200, 170, 240, 244]}, {data:[210, 202, 441, 274]}] |
| barwidth | 柱子宽度  |  |
| tooltipType | 坐标指示器类型  | 默认line,可选shadow |
| textrotate（折线图通用）| X轴旋转度数 | 如图度数为30 |
| yaxisType（折线图通用）| Y轴坐标轴线的条数 | 默认一条，两条设置方法：{type:'value'},{type:'value'} |
| xTextStyle（折线图通用）| X轴文本样式 | {color:'',fontSize:''} |
| serLabelText| 柱子文本标签是否显示 | 默认true |
| serTextPos| 柱子文本标签的显示位置 | 值分别有：top，left，right，bottom，inside，insideTop等等，默认insideTop |
| fn| 点击柱子的执行方法 | {color:'',fontSize:''} |

### 饼图示例

````html
    <div id="x-chart2" style="width:100%;height: 400px;"></div>
 ````
````js
XChart.cirChart({
     conId:'x-chart2',
     title:'饼图',
     seriesType:'pie',
     legendArray:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
     dataArray:[
         {value:335},
         {value:310},
         {value:234},
         {value:135},
         {value:1548}
     ]
 });
 ````
 
 | 饼图属性 | 说明  | 示例 |
 |----|:---:| --:|
 | seriesLabel | 文字标签是否显示 |  |
 | radius | 饼图大小 | 默认值为60%, 环形图的设置方法：['50%', '70%'] |
 | dataArray | 数据数组 | dataArray:[ {value:335}, {value:310}, {value:234}, {value:135}, {value:1548} ] |
 
 ### 环形图示例 
 
````html
 <div id="x-chart3" style="width: 100%;height: 400px"></div>
````

````js
 XChart.cirChart({
          conId:'x-chart3',
          title:'环形图',
          seriesType:'pie',
          radius: ['50%', '70%'],
          legendArray:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          dataArray:[
              {value:335},
              {value:310},
              {value:234},
              {value:135},
              {value:1548}
          ]
      });
````

 ### 折线图示例
 
````html
 <div id="x-chart4" style="width:100%;height: 400px;"></div>
````
````js
 XChart.linesChart({
         conId:'x-chart4',
         title:'折线图',
         legendArray:['最高气温','最低气温'],
         xArray:['周一','周二','周三','周四','周五','周六','周日'],
         dataArray:[
             {data:[11, 11, 15, 13, 12, 13, 10]},
             {data:[1, -2, 2, 5, 3, 2, 0]}
         ]
     })
````

 |折线图属性 | 说明  | 示例 |
 |----|:---:| --:|
 | symbol | 标志图形类型 | 默认'circle'，不显示可设为'none',值分别有'emptyCircle' 'emptyRectangle''heart'（心形）、'droplet'（水滴）、'pin'（标注）、'arrow'（箭头）和'star'（五角星）等 |

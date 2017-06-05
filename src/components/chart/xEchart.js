/**
 * Created by Administrator on 2017/2/17.
 */
//柱状图
function barChart(options) {
    var defaultOption={
        conId:'', //内容id
        title:'', //标题
        titleAlign:'center', //标题位置
        isLegend:true, //是否显示图例
        legendOrient:'', //legend的排列方式  'horizontal'(横向) 'vertical'（纵向）默认纵向排列
        legendAlignx:'left', //图例的X轴显示位置
        legendAligny:'top', //图例的Y轴显示位置
        legendArray:[],
        xArray:[], //X轴
        yName:[],  //Y轴
        colorArray:[], //颜色
        dataArray:[], //series数据
        barwidth:'30px', //柱子的宽度
        tooltipType:'line', //坐标指示器类型，默认line,可选shadow
        textrotate:0, //X轴旋转度数，默认为0
        yaxisType:[{type:'value'}],  //Y轴坐标轴线默认一条
        xTextStyle:'',  //X轴文本样式
        serLabelText:true, //柱子文本标签是否显示
        serTextPos:'insideTop', //柱子文本标签的显示位置,值分别有：top，left，right，bottom，inside，insideTop等等
        fn:function () {}
    };

    options = $.extend(false,defaultOption,options);

    //获取图例
    if(options.isLegend){
        var legendData=[];
        for(var i=0;i<options.legendArray.length;i++){
            legendData.push(options.legendArray[i]);
        }
    }
    //获取bardata
    var barData=[];
    for(var i=0;i<options.dataArray.length;i++){
        barData.push({
            name:options.legendArray[i],
            type:'bar',
            itemStyle:{
                normal:{
                    label:{
                        show:options.serLabelText,
                        position:options.serTextPos
                    }
                }
            },
            data:options.dataArray[i].data
        });
    }


    var option={
        title:{
            text:options.title,
            x:options.titleAlign
        },
        tooltip:{
            trigger:'axis', //axis用于柱状图和折线图
            axisPointer:{
                type:options.tooltipType
            }
        },
        color:options.colorArray,
        legend:{
            orient:options.legendOrient,
            x:options.legendAlignx,
            y:options.legendAligny,
            data:legendData
        },
        xAxis:[{
            type:'category',
            data:options.xArray,
            axisLabel:{
                rotate:options.textrotate,
                textStyle:options.xTextStyle
            }
        }],
        yAxis: options.yaxisType,
        series: barData
    };

    var myChart = echarts.init(document.getElementById(options.conId));// 图表初始化的地方，在页面中要有一个地方来显示图表
    myChart.setOption(option); //显示图形

    myChart.on('click',options.fn);
}

//饼图
function cirChart(options) {
    var defaultOption={
        conId:'', //内容id
        title:'', //标题
        titleAlign:'center', //标题位置
        legendArray:[], //legend
        colorArray:[], //颜色
        dataArray:[], //数据
        isLegend:true, //是否显示图例
        legendOrient:'', //legend的排列方式  'horizontal'(横向) 'vertical'（纵向）
        legendAlignx:'left', //图例的X轴显示位置
        legendAligny:'top', //图例的Y轴显示位置
        seriesLabel:true, //标签是否显示，默认true
        radius:'60%' //饼图大小
    };
    options = $.extend(false,defaultOption,options);

    //获取图例
    if(options.isLegend){
        var data=[];
        for(var i=0;i<options.legendArray.length;i++){
            data.push(options.legendArray[i]);
        }
    }
    //获取数据
    var pieData=[];
    for(var i=0;i<options.dataArray.length;i++){
        pieData.push({
            value:options.dataArray[i].value,
            name:options.legendArray[i]
        });
    }

    var option={
        title:{
            text:options.title,
            x:options.titleAlign
        },
        tooltip:{
            trigger:'item' //item用于饼图
        },
        legend:{
            orient:options.legendOrient,
            x:options.legendAlignx,
            y:options.legendAligny,
            data:data
        },
        series : [
            {
                name:options.nameArray,
                type: options.seriesType,
                radius :options.radius,
                label:{
                    normal:{
                        show:options.seriesLabel
                    }
                },
                data:pieData

            }
        ]
    };
    var myChart = echarts.init(document.getElementById(options.conId));// 图表初始化的地方，在页面中要有一个地方来显示图表
    myChart.setOption(option); //显示图形
}

//折线图
function linesChart(options) {
    var defaultOption={
        conId:'', //内容id
        title:'', //标题
        titleAlign:'center', //标题位置
        legendArray:[], //legend
        colorArray:[], //颜色
        dataArray:[], //数据
        nameArray:[], //series的name
        seriesType:'', //servies的type：bar 、pie
        isLegend:true, //是否显示图例
        legendOrient:'', //legend的排列方式  'horizontal'(横向) 'vertical'（纵向）
        legendAlignx:'left', //图例的X轴显示位置
        legendAligny:'top', //图例的Y轴显示位置
        textrotate:0, //X轴旋转度数，默认为0
        yaxisType:[{type:'value'}],  //Y轴坐标轴线默认一条
        xTextStyle:''  //X轴文本样式

    };
    options = $.extend(false,defaultOption,options);

    //获取图例
    if(options.isLegend){
        var data=[];
        for(var i=0;i<options.legendArray.length;i++){
            data.push(options.legendArray[i]);
        }
    }
    //获取数据
    var lineData=[];
    for(var i=0;i<options.dataArray.length;i++){
        lineData.push({
            type:'line',
            symbol:options.symbol,
            name:options.legendArray[i],
            data:options.dataArray[i].data
        })
    }

    var option={
        title:{
            text:options.title,
            x:options.titleAlign
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            orient: options.legendOrient,
            x:options.legendAlignx,
            y:options.legendAligny,
            data:data
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : options.xArray,
                axisLabel:{
                    rotate:options.textrotate
                }
            }
        ],
        yAxis : options.yaxisType,
        series : lineData

    };

    var myChart = echarts.init(document.getElementById(options.conId));// 图表初始化的地方，在页面中要有一个地方来显示图表
    myChart.setOption(option); //显示图形
}


window.XChart ={
  barChart:barChart,
  cirChart:cirChart,
  linesChart:linesChart
};

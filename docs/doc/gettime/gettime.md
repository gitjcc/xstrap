# 获取时间


## 示例
````html

````


````js
var xttt = xTime();
toDate('',xttt);

function toDate(key,time) {
    if(typeof time === 'object'){
        $.each(time,function (index,item) {
            toDate(key+index,item);
        })
    }else{
        console.log(key,(new Date(time)));
    }
}
````
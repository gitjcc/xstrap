# 格式化


## 示例
console.log(     xFormat.str2time('2016-06-06 11:11:11')   );

console.log(     xFormat.str2time('2016-06-06')   );

console.log(     xFormat.str2time('16/06/06 11:11')   );

console.log(     xFormat.str2time('20160606')   );

console.log(     xFormat.str2time('160606')   );

console.log(     xFormat.str2time('11:11')   );

console.log(     xFormat.time2str(1465182671)   );

console.log(     xFormat.number2money(1231234.123)   );

## 结果

````html
<div>
1465182671
</div>
````

````js
console.log(     xFormat.str2time('2016-06-06 11:11:11')   );
console.log(     xFormat.str2time('2016-06-06')   );
console.log(     xFormat.str2time('16/06/06 11:11')   );
console.log(     xFormat.str2time('20160606')   );
console.log(     xFormat.str2time('160606')   );
console.log(     xFormat.str2time('11:11')   );
console.log(     xFormat.time2str(1465182671)   );
console.log(     xFormat.number2money(1231234.123)   );
````
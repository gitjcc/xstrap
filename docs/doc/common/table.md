# 表格



````html
<table class="x-table">
        <thead align="center">
        <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>类型</th>
            <th>日期<i class="x-table-arrow"></i></th>
            <th>部门<i class="x-table-arrow"></i></th>
            <th>操作<i class="x-table-arrow"></i></th>
        </tr>
        </thead>
        <tbody align="center">
        <tr>
            <td>1</td>
            <td>Alisa</td>
            <td>Write</td>
            <td>2016-1-1</td>
            <td>小步创想科技</td>
            <td>
                <div class="x-button">编辑</div>
                <div class="x-button">删除</div>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Alisa</td>
            <td>Write</td>
            <td>2016-1-1</td>
            <td>小步创想科技</td>
            <td>
                <div class="x-button">编辑</div>
                <div class="x-button">删除</div>
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>Alisa</td>
            <td>Write</td>
            <td>2016-1-1</td>
            <td>小步创想科技</td>
            <td>
                <div class="x-button">编辑</div>
                <div class="x-button">删除</div>
            </td>
        </tr>
        </tbody>
    </table>

````

````js
var count = 0;
$('.x-table th').click(function(){
    var iconDom = $(this).find('i');
    if(count % 3 == 0){
        iconDom.removeClass('x-table-arrow').addClass('x-table-arrowUp')
    }else if(count % 3 == 1){
        iconDom.removeClass('x-table-arrowUp').addClass('x-table-arrowDown');
    }else{
        iconDom.removeClass('x-table-arrowDown').addClass('x-table-arrow')
    }
    count++;
});
````
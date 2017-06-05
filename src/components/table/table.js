/**
 * Created by Administrator on 2017/2/28.
 */

require('./table.scss');

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



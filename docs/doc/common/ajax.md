# ajax封装

## 示例

````html
<span class="x-ajax-del x-button-middle x-button x-button-cadetblue"  data-url="./index.php" data-refresh=".x-table">删除</span>
<span class="x-ajax-op x-button-middle x-button x-button-cadetblue"  data-id="11">操作</span>
````

````js
    $('body').on('click','.x-ajax-del',function(){
        $(".x-ajax-del").attr("disabled","disabled");
        var url = $(this).data('url');
        $.ajax({
            url: url,
            success: function(data){
                $(".x-ajax-del").removeAttr("disabled");
                if(data === 'ok'){//操作成功
                    xPopUp('prompt',{content:'操作成功'},2000);

                    var refreshDomStr;
                    if($(this).data('refresh')){
                        refreshDomStr =$(this).data('refresh');
                    }else{
                        refreshDomStr ='.x-table';
                    }
                    var refreshUrl = location.href;
                    $.get(refreshUrl,function(data){
                        $(refreshDomStr).html($(data).find(refreshDomStr).html());
                    });
                }else{
                    xPopUp('prompt',{content:'操作失败'},2000);
                }
            },
            error: function (data){
                $(".x-ajax-del").removeAttr("disabled");
                xPopUp('prompt',{content:'操作失败'},2000);
            }
        });
    });
    $('body').on('click','.x-ajax-op',function(){
        $(".x-ajax-del").attr("disabled","disabled");
        var url = $(this).data('url');
        $.ajax({
            url: url,
            success: function(data){
                $(".x-ajax-del").removeAttr("disabled");

                if(data === 'ok'){
                    xPopUp('prompt',{content:'操作成功'},2000);
                }else{
                    $(".x-ajax-del").removeAttr("disabled");
                    xPopUp('prompt',{content:'操作失败'},2000);
                }
            },
            error: function (){
                $(".x-ajax-del").removeAttr("disabled");
                xPopUp('prompt',{content:'操作失败'},2000);
            }
        });
    });
````

## API
- (1)有 x-ajax-del ,这个class 的 元素会绑定事件,点击之后发去请求 data-url,且成功后会刷新 data-refresh 的dom,默认值是 .x-table
- (2)有 x-ajax-op ,这个class 的 元素会绑定事件,点击之后发去请求 data-url
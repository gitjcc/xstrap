# 表单

````html
<div class="x-form">
    <h4 class="x-form-title">基本信息</h4>
    <form class="x-form-content">
        <div class="x-form-item">
            <span class="x-form-key">输入框: </span>
            <div class="x-form-value"><input type="text" name="userName"></div>
        </div>
        <div  class="x-form-item">
            <span class="x-form-key">密码:</span>
            <div class="x-form-value"><input type="password" name="passWord"></div>
        </div>
        <div  class="x-form-item">
            <span class="x-form-key">文本框:</span>
            <div class="x-form-value"><textarea></textarea></div>
        </div>
        <div  class="x-form-item">
            <span class="x-form-key">单选框:</span>
            <div class="x-form-value">
                <label class="x-form-input"><input name="radio" type="radio" value="1" checked="checked"><span>男</span></label>
                <label class="x-form-input"><input name="radio" type="radio" value="2"><span>女</span></label>
            </div>
        </div>
        <div  class="x-form-item">
            <span class="x-form-key">多选框:</span>
            <div class="x-form-value">
                <label class="x-form-input"><input name="checkbox" type="checkbox" value="1" checked="checked">1</label>
                <label class="x-form-input"><input name="checkbox" type="checkbox" value="2">2</label>
                <label class="x-form-input"><input name="checkbox" type="checkbox" value="3">3</label>
            </div>
        </div>

        <div class="x-form-item">
            <span class="x-form-key">开关:</span>
            <div class="x-form-value">
                <label class="x-form-switch x-form-onswitch">
                    <input type="checkbox" name="switch" value="on" checked="checked">
                    <span>ON</span>
                    <i></i>
                </label>
            </div>
        </div>

        <div class="x-form-item">
            <span class="x-form-key">选择框:</span>
            <div class="x-form-value">
                <select class="x-form-select" name="select">
                    <option value="1">普通用户</option>
                    <option value="2">特殊用户</option>
                    <option value="3">VIP</option>
                </select>
                <span>~</span>
                <select class="x-form-select" name="select">
                    <option value="1">普通用户</option>
                    <option value="2">特殊用户</option>
                    <option value="3">VIP</option>
                </select>
            </div>
        </div>
        <div class="x-form-item">
            <span class="x-form-key">品牌类型: </span>
            <div class="x-form-value">
                <lable class="x-form-radio x-checked">
                    <input type="radio" name="radio1" value="选项1" checked="checked">选项1
                </lable>
                <lable class="x-form-radio">
                    <input type="radio" name="radio1" value="选项2">选项2
                </lable>
            </div>
        </div>
        <div class="x-form-item">
            <span class="x-form-key">价格范围: </span>
            <div class="x-form-value">
                <label class="x-form-checkbox x-checked">
                    <input type="checkbox" name="checkbox1" value="选项1" checked="checked">选项1
                </label>
                <label class="x-form-checkbox">
                    <input type="checkbox" name="checkbox1" value="选项2">选项2
                </label>
                <label class="x-form-checkbox x-checked">
                    <input type="checkbox" name="checkbox1" value="选项3" checked="checked">选项3
                </label>

            </div>
        </div>
        <div class="x-form-item">
            <span class="x-form-key"></span>
            <div class="x-form-value">
                <a class="x-form-submit">提交</a>
                <a class="x-form-cancel">取消</a>
            </div>

        </div>
    </form>
</div>
````

````js
$('.x-form-radio').click(function(){
    $(this).addClass('x-checked').siblings().removeClass('x-checked');
});


$('.x-form-checkbox').click(function(){
    if($(this).find("input").is(':checked')){
        $(this).addClass('x-checked');
    }else{
        $(this).removeClass('x-checked')
    }
});


$('.x-form-switch').click(function(){
    if($(this).find("input").is(':checked')){
        $(this).addClass('x-form-onswitch');
        $(this).find('span').text('ON');
    }else{
        $(this).removeClass('x-form-onswitch');
        $(this).find('span').text('OFF');
    }
});

````
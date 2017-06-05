# 表单验证

## 示例

````html
<form action="" class="x-form-v" id="commentForm">
    <fieldset>
        <legend>示例一：提交评论(校验规则写在标签里)</legend>
        <p>
            <label class="x-form-label" for="cname">姓名(*)</label>
            <input id="cname" name="name" minlength="2" maxlength="6" type="text" required>
        </p>
        <p>
            <label class="x-form-label" for="cemail">E-Mail(*)</label>
            <input id="cemail" type="email" name="email" required>
        </p>
        <p>
            <label class="x-form-label" for="curl">个人网址</label>
            <input id="curl" type="url" name="url">
        </p>
        <p>
            <label class="x-form-label" for="ccomment">评论内容(*)</label>
            <textarea id="ccomment" name="comment" minlength="6" maxlength="6" required></textarea>
        </p>
        <p>
            <input class="x-submit" type="submit" value="提交">
            <label class="x-form-error"></label>
        </p>
    </fieldset>
</form>
````

````js
$(document).ready(
    $("#commentForm").validate({
        invalidHandler: function(event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1
                    ? 'You missed 1 field. It has been highlighted'
                    : 'You missed ' + errors + ' fields. They have been highlighted';
                $(".x-form-error").html(message).show();
            } else {
                $(".x-form-error").hide();
            }
        }
    })
);
````

````html
<form action="" class="x-form-v" id="xcommentForm">
    <fieldset>
        <legend>示例二：提交评论（校验规则写在js中）</legend>
        <p>
            <label class="x-form-label" for="xname">姓名</label>
            <input type="text" id="xname" name="name">
        </p>
        <p>
            <label class="x-form-label" for="xemail">邮箱</label>
            <input type="email" id="xemail" name="email">
        </p>
        <p>
            <label class="x-form-label" for="xurl">网址</label>
            <input type="url" id="xurl" name="url">
        </p>
        <p>
            <label class="x-form-label" for="xcomment">评论</label>
            <textarea id="xcomment" name="comment"></textarea>
        </p>
        <p>
            <input class="x-submit" type="submit" value="提交">
        </p>
    </fieldset>
</form>
````

````js
$(document).ready(function () {
    $("#xcommentForm").validate({
        rules:{
            name: {
                required: true,
                minlength: 2,
                maxlength: 6,
                xuser:true
            },
            email: {
                required: true,
                xemail: true
            },
            url: {
                url:true
            },
            comment: {
                required: true,
                minlength: 6,
                maxlength: 6
            }
        },
        messages:{
            name:{
                minlength:'你名字太短了',
                maxlength:'太长了'
            }
        }
    });
});
````

````html
<form action="" class="x-form-v" id="xsignupForm">
    <fieldset>
        <legend>示例三：用户注册（校验规则写在js中）</legend>
        <p>
            <label class="x-form-label" for="xusername">用户名</label>
            <input type="text" id="xusername" name="user">
        </p>
        <p>
            <label class="x-form-label" for="xpassword">密码</label>
            <input type="password" id="xpassword" name="password">
        </p>
        <p>
            <label class="x-form-label" for="xconfirm_password">确认密码</label>
            <input type="password" id="xconfirm_password" name="confirm_password">
        </p>
        <p>
            <label class="x-form-label" for="xlastname">姓</label>
            <input type="text" id="xlastname" name="name">
        </p>
        <p>
            <label class="x-form-label" for="xfirstname">名</label>
            <input type="text" id="xfirstname" name="name">
        </p>
        <p>
            <label class="x-form-label" for="xid">身份证号</label>
            <input type="text" id="xid" name="idcn">
        </p>
        <p>
            <label class="x-form-label" for="xage">年龄</label>
            <input type="text" id="xage" name="age">
        </p>
        <p>
            <label class="x-form-label">性别</label>
            <label for="xfemale"><input type="radio" id="xfemale" name="gender">男</label>
            <label for="xmale"><input type="radio" id="xmale" name="gender">女</label>
            <label for="xother"><input type="radio" id="xother" name="gender">未知</label>
            <label for="gender" class="error"></label>
        </p>
        <p>
            <label class="x-form-label" for="xuseremail">邮箱</label>
            <input type="email" id="xuseremail" name="email">
        </p>
        <p>
            <label class="x-form-label" for="xuserurl">网址</label>
            <input type="url" id="xuserurl" name="url">
        </p>
        <p>
            <label class="x-form-label" for="xuserphone">手机</label>
            <input type="text" id="xuserphone" name="phone">
        </p>
        <p>
            <label class="x-form-label" for="xusertel">固定电话</label>
            <input type="text" id="xusertel" name="tel">
        </p>
        <p>
            <label class="x-form-label" for="xusertel">地址</label>
            <input type="text" id="xuseraddr" name="address">
        </p>
        <p>
            <label class="x-form-label" for="xpostid">邮编</label>
            <input type="text" id="xpostid" name="postid">
        </p>
        <p>
            <label class="x-form-label">特点一</label>
            <input type="checkbox" id="xspeciality1" name="checkbox1">
            <label for="xspeciality1">php</label>
            <label for="checkbox1" class="error"></label>

        </p>
        <p>
            <label class="x-form-label">特点二</label>
            <label for="iality21"><input type="checkbox" id="speciality21" name="checkbox2">手抓羊肉</label>
            <label for="speciality22"><input type="checkbox" id="speciality22" name="checkbox2">老酸奶</label>
            <label for="speciality23"><input type="checkbox" id="speciality23" name="checkbox2">霸王肥肠</label>
            <label for="speciality24"><input type="checkbox" id="speciality24" name="checkbox2">土豆丝</label>
            <label for="checkbox2" class="error"></label>
        </p>
        <p>
            <label class="x-form-label" for="xselect3">特点三</label>
            <select id="xselect3" name="select3" >
                <option value =""></option>
                <option value ="正则">正则</option>
                <option value ="表达式">表达式</option>
                <option value ="Reg">Reg</option>
                <option value ="Exp">Exp</option>
            </select>
        </p>
        <p>
            <label class="x-form-label" for="xselect4">特点四</label>
            <select id="xselect4" multiple="multiple" name="select4" >
                <option value ="JavaScript">JavaScript</option>
                <option value ="Java">Java</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="C#">C#</option>
                <option value="C++">C++</option>
                <option value="Ruby">Ruby</option>
                <option value="CSS">CSS</option>
                <option value="C">C</option>
                <option value="Objective-C">Objective-C</option>
                <option value="Shell">Shell</option>
                <option value="R">R</option>
                <option value="Perl">Perl</option>
                <option value="Scala">Scala</option>
                <option value="Go">Go</option>
                <option value="Haskell">Haskell</option>
                <option value="Swift">Swift</option>
                <option value="Matlab">Matlab</option>
                <option value="Visual Basic">Visual Basic</option>
                <option value="Groovy">Groovy</option>
            </select>
        </p>
        <p>
            <label class="x-form-label" for="xmessage">附加信息</label>
            <textarea id="xmessage" name="message"></textarea>
        </p>
        <p>
            <input class="x-submit" type="submit" name="signup" value="提交">
        </p>
    </fieldset>
</form>
````

````js
$(document).ready(function () {
    $("#xsignupForm").validate({
        rules:{
            user:{
                required: true,
                minlength: 2,
                maxlength: 12,
                xuser: true
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 12,
                xpwd: true
            },
            confirm_password: {
                required: true,
                minlength: 8,
                maxlength: 12,
                xpwd: true,
                equalTo:'#xpassword'
            },
            name: {
                required: true,
                minlength: 2,
                maxlength: 8,
                xname:true
            },
            idcn: {
                required: true,
                xidcn: true
            },
            age: {
                required: true,
                range:[0,99]
            },
            gender: {
                required: true
            },
            email: {
                required: true,
                xemail: true
            },
            url: {
                required: true,
                xurl: true
            },
            phone: {
                required: true,
                xphone: true
            },
            tel: {
                required: true,
                xtel: true
            },
            address: {
                required: true,
                xname: true
            },
            postid: {
                required: true,
                xpostid: true
            },

            checkbox1: {
                required: true,
            },
            checkbox2: {
                required: true,
                minlength: 2,
                maxlength: 3
            },
            select3: {
                required: true,
                minlength: 2
            },
            select4: {
                required: true,
                minlength: 2,
                maxlength: 3
            },
            message: {
                minlength: 6,
                maxlength: 8
            }
        }
    });
});
````

## API

````html
<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th width="10%">校验规则</th>
        <th width="30%">规则说明</th>
        <th width="30%">正则表达式</th>
        <th width="30%">错误提示</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>required:true</td>
        <td>必须输入的字段</td>
        <td>内置校验</td>
        <td>这里不能为空</td>
    </tr>

    <tr>
        <td>remote:"check.php"</td>
        <td>使用 ajax 方法调用 check.php 验证输入值。</td>
        <td>内置校验</td>
        <td>请修正此字段</td>
    </tr>
    <tr>
        <td>email:true</td>
        <td>必须输入正确格式的电子邮件。</td>
        <td>内置校验</td>
        <td>请提供有效的邮箱, 格式name@domain.com</td>
    </tr>
    <tr>
        <td>url:true</td>
        <td>必须输入正确格式的网址。</td>
        <td>内置校验</td>
        <td>请输入有效的网址</td>
    </tr>
    <tr>
        <td>date:true</td>
        <td>必须输入正确格式的日期。日期校验 ie6 出错，慎用。</td>
        <td>内置校验</td>
        <td>请输入有效的日期</td>
    </tr>
    <tr>
        <td>dateISO:true</td>
        <td>必须输入正确格式的日期（ISO），例如：2009-06-23，1998/01/22。只验证格式，不验证有效性。</td>
        <td>内置校验</td>
        <td>请输入有效的日期 (YYYY-MM-DD)</td>
    </tr>
    <tr>
        <td>number:true</td>
        <td>必须输入合法的数字（负数，小数）。</td>
        <td>内置校验</td>
        <td>请输入有效的信用卡号码</td>
    </tr>
    <tr>
        <td>digits:true</td>
        <td>必须输入整数。</td>
        <td>内置校验</td>
        <td>只能输入整数数字</td>
    </tr>
    <tr>
        <td>creditcard:true</td>
        <td>必须输入合法的信用卡号。</td>
        <td>内置校验</td>
        <td>必须输入合法的信用卡号。</td>
    </tr>
    <tr>
        <td>equalTo:"#field"</td>
        <td>输入值必须和 #field 相同, "#field"为CSS选择器。</td>
        <td>内置校验</td>
        <td>两次输入不相同</td>
    </tr>
    <tr>
        <td>accept:</td>
        <td>输入拥有合法后缀名的字符串（上传文件的后缀）。</td>
        <td>内置校验</td>
        <td>请检查后缀</td>
    </tr>
    <tr>
        <td>maxlength:5</td>
        <td>输入长度最多是 5 的字符串（汉字算一个字符）。</td>
        <td>内置校验</td>
        <td>最多可以输入 {0} 个字符</td>
    </tr>
    <tr>
        <td>minlength:10</td>
        <td>输入长度最小是 10 的字符串（汉字算一个字符）。</td>
        <td>内置校验</td>
        <td>最少要输入 {0} 个字符</td>
    </tr>
    <tr>
        <td>rangelength:[5,10]</td>
        <td>输入长度必须介于 5 和 10 之间的字符串（汉字算一个字符）。</td>
        <td>内置校验</td>
        <td>请输入长度在 {0} 到 {1} 之间的字符串</td>
    </tr>
    <tr>
        <td>range:[5,10]</td>
        <td>输入值必须介于 5 和 10 之间。</td>
        <td>内置校验</td>
        <td>请输入范围在 {0} 到 {1} 之间的数值</td>
    </tr>
    <tr>
        <td>max:5</td>
        <td>输入值不能大于 5。</td>
        <td>内置校验</td>
        <td>请输入不大于 {0} 的数值</td>
    </tr>
    <tr>
        <td>min:10</td>
        <td>输入值不能小于 10。</td>
        <td>内置校验</td>
        <td>请输入不小于 {0} 的数值</td>
    </tr>
    <tr>
        <td>xname:true</td>
        <td>姓名可以包含字母、数字、下划线或汉字</td>
        <td>/^(\w+|[\u4e00-\u9fa5]+)$/</td>
        <td>姓名可以包含字母、数字、下划线或汉字</td>
    </tr>
    <tr>
        <td>xuser:true</td>
        <td>用户名可以包含字母、数字、'_'和汉字，不允许以数字或'_'开头</td>
        <td>/^(?![\d_])[\w\u4e00-\u9fa5]+$/</td>
        <td>用户名可以包含字母、数字、'_'和汉字，不允许以数字或'_'开头</td>
    </tr>
    <tr>
        <td>xpwd:true</td>
        <td>密码最少6位，可以包含任何非空白字符</td>
        <td>/^\S+$/</td>
        <td>密码最少6位，可以包含任何非空白字符</td>
    </tr>
    <tr>
        <td>xphone:true</td>
        <td>请输入正确的手机号码</td>
        <td>/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}$/</td>
        <td>请输入正确的手机号码</td>
    </tr>
    <tr>
        <td>xemail:true</td>
        <td>请输入正确的Email地址，格式: name@domain</td>
        <td>/^[\w.]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/</td>
        <td>请输入正确的Email地址，格式: name@domain</td>
    </tr>
    <tr>
        <td>xurl:true</td>
        <td>请输入正确的url地址</td>
        <td>/^((http|ftp|https):\/\/)?[\w_.]+(\/[\w_]+)*\/?$/</td>
        <td>请输入正确的url地址</td>
    </tr>
    <tr>
        <td>xip:true</td>
        <td>请输入正确的ip地址</td>
        <td>/^([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])$/</td>
        <td>请输入正确的ip地址</td>
    </tr>
    <tr>
        <td>xpostid:true</td>
        <td>请输入正确的邮政编码</td>
        <td>/^[1-9]\d{5}(?!\d)$/</td>
        <td>请输入正确的邮政编码</td>
    </tr>
    <tr>
        <td>xtel:true</td>
        <td>请输入正确的固定电话</td>
        <td>/^(\w+|[\u4e00-\u9fa5]+)$/</td>
        <td>请输入正确的固定电话</td>
    </tr>
    <tr>
        <td>xidcn:true</td>
        <td>请输入正确的身份证</td>
        <td>/^\d{17}([0-9]|X|x)$/</td>
        <td>请输入正确的身份证</td>
    </tr>
    </tbody>
</table>
<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th>.validate([options])</th>
        <th>Type</th>
        <th>说明</th>
        <th>Example</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>[options]</td>
        <td>Object</td>
        <td>可选项</td>
        <td>{rules:{name:{required:true,xname:true}},message:{name:{require:'填',xname:'xia名字'}}</td>
    </tr>
    <tr>
        <td>debug(default: false)</td>
        <td>Boolean</td>
        <td></td>
        <td>$(".selector").validate({debug: true});</td>
    </tr>

    <tr>
        <td>submitHandler (default: native form submit)</td>
        <td>Function()</td>
        <td></td>
        <td>$(".selector").validate({
            submitHandler: function(form) {
            $(form).ajaxSubmit();
            }
            });</td>
    </tr>
    <tr>
        <td>invalidHandler</td>
        <td>Function()</td>
        <td></td>
        <td>$(".selector").validate({invalidHandler: function(){}});</td>
    </tr>
    <tr>
        <td>rules (default: rules are read from markup (classes, attributes, data))</td>
        <td>Object</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>messages (default: the default message for the method used)</td>
        <td>Object</td>
        <td></td>
        <td></td>
    </tr>
    </tbody>
</table>
<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th>.validate([options])</th>
        <th>Type</th>
        <th>说明</th>
        <th>Example</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>[options]</td>
        <td>Object</td>
        <td>可选项</td>
        <td>{rules:{name:{required:true,xname:true}},message:{name:{require:'填',xname:'xia名字'}}</td>
    </tr>
    <tr>
        <td>debug(default: false)</td>
        <td>Boolean</td>
        <td></td>
        <td>$(".selector").validate({debug: true});</td>
    </tr>

    <tr>
        <td>submitHandler (default: native form submit)</td>
        <td>Function()</td>
        <td></td>
        <td>$(".selector").validate({
            submitHandler: function(form) {
            $(form).ajaxSubmit();
            }
            });</td>
    </tr>
    <tr>
        <td>invalidHandler</td>
        <td>Function()</td>
        <td></td>
        <td>$(".selector").validate({invalidHandler: function(){}});</td>
    </tr>
    <tr>
        <td>rules (default: rules are read from markup (classes, attributes, data))</td>
        <td>Object</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>messages (default: the default message for the method used)</td>
        <td>Object</td>
        <td></td>
        <td></td>
    </tr>
    </tbody>
</table>
````
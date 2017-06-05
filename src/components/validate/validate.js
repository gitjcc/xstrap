/**
 * Created by Administrator on 2017/1/9.
 */

require('./jquery.validate.js');

//自定义validator --begin
$.validator.setDefaults({
    debug: true,
    submitHandler: function () {
        alert("验证通过，提交成功!");
    }
});
//自定义validator --end

//自定义messages --begin
$.extend($.validator.messages, {
    required: "这里不能为空",
    remote: "请修正此字段",
    email: "请提供有效的邮箱, 格式name@domain.com",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入有效的数字",
    digits: "只能输入整数数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请检查后缀",
    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
    minlength: $.validator.format("最少要输入 {0} 个字符"),
    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
    max: $.validator.format("请输入不大于 {0} 的数值"),
    min: $.validator.format("请输入不小于 {0} 的数值")
});
//自定义messages --end


//自定义校验规则 --begin
$.validator.addMethod( "xlower", function( value, element ) {
    return /[a-z]/.test( value );
}, "请包含小写字母" );

$.validator.addMethod( "xcapital", function( value, element ) {
    return /[A-Z]/.test( value );
}, "请包含大写字母" );

$.validator.addMethod( "xdigit", function( value, element ) {
    return /\d/.test( value );
}, "请包含数字" );

$.validator.addMethod( "xspecial", function( value, element ) {
    return /\W/.test( value );
}, "请包含特殊字符" );

$.validator.addMethod( "xchars2", function( value, element ) {
    var val=0;
    if(/[a-z]/.test( value )){
        val++;
    }
    if(/[A-Z]/.test( value )){
        val++;
    }
    if(/\d/.test( value )){
        val++;
    }
    if(/\W/.test( value )){
        val++;
    }
    return val>=2;
}, "请至少包含2种字符" );


$.validator.addMethod( "xname", function( value, element ) {
    return /^(\w+|[\u4e00-\u9fa5]+)$/.test( value );
}, "姓名可以包含字母、数字、下划线或汉字" );

$.validator.addMethod( "xuser", function( value, element ) {
    return /^(?![\d_])[\w\u4e00-\u9fa5]+$/.test( value );
}, "用户名可以包含字母、数字、'_'和汉字，不允许以数字或'_'开头" );

$.validator.addMethod( "xpwd", function( value, element ) {
    return /^\S+$/.test( value );
}, "密码最少6位，可以包含任何非空白字符" );

$.validator.addMethod( "xphone", function( value, element ) {
    return /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/.test(value);
}, "请输入正确的11位手机号码, 支持13[0-9], 14[5,7], 15[0, 1, 2, 3, 5, 6, 7, 8, 9], 17[0, 1, 6, 7, 8], 18[0-9]");//支持13[0-9], 14[5,7], 15[0, 1, 2, 3, 5, 6, 7, 8, 9], 17[0, 1, 6, 7, 8], 18[0-9]

$.validator.addMethod( "xemail", function( value, element ) {
    return /^[\w.]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/.test( value );
}, "请输入正确的Email地址，格式: name@domain" );

$.validator.addMethod( "xurl", function( value, element ) {
    return /^((http|ftp|https):\/\/)?[\w_.]+(\/[\w_]+)*\/?$/.test( value );
}, "请输入正确的url地址" );

$.validator.addMethod( "xip", function( value, element ) {
    return /^([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])$/.test( value );
}, "请输入正确的ip地址" );

$.validator.addMethod( "xpostid", function( value, element ) {
    return /^[1-9]\d{5}(?!\d)$/.test( value );
}, "请输入正确的邮政编码" );

$.validator.addMethod( "xtel", function( value, element ) {
    return /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test( value );
}, "请输入正确的固定电话" );

$.validator.addMethod( "xidcn", function( value, element ) {
    return /^\d{17}([0-9]|X|x)$/.test( value );
}, "请输入正确的身份证" );
//自定义校验规则 --end




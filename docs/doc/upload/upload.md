
# 文件上传
调用webuploader.js  百度上传插件

## 图片上传

````html

<script>

</script>

 <div class="x-uploader">
            <div class="x-queueList">
                <div  class="x-placeholder  x-dndArea">
                    <div class="x-filePicker"></div>
                </div>
            </div>
            <div class="x-imgFile"></div>
            <div class="x-statusBar" style="display:none;">
                <div class="x-progress-wrap x-progress-upload" style="width: 200px;" ></div>
                <div class="x-info"></div>
                <div class="x-upload-btns">
                    <div class="x-filePicker-add"></div><div class="x-uploadBtn">开始上传</div>
                </div>
            </div>
        </div>

````

```js


   var xP8 = xProgress({
            wrap: '.x-progress-upload',
            pclass: 'x-progress-bar x-progress-yellow x-progress-striped x-progress-animated',
            tclass: 'x-progress-text',
            percentage:'0%',
            onchange:function () {console.log('xP8',xP8.percentage);}
        });

console.log("222");

 var upload = xUpload({
            dom: $(".x-uploader"),
            fileType :2,                             //   1 头像     2 文件
            fileNumLimit: 300,                       //总共能上传多少个文件
            fileSizeLimit: 200 * 1024 * 1024,        //   多个文件大小
            fileSingleSizeLimit: 100 * 1024 * 1024,   //   单个文件大小
            formData: {
                uid: 123
            },                                       //传给后台的数据
            fileVal:'x-file',                        //input框 name
            fileButton: {
                id :'.x-filePicker',
                label: '批量上传',                     //按钮名字和id   可以点击的按钮的id和name
                multiple:true
            },
            addButton:{
                id: '.x-filePicker-add',
                label: '继续添加'
            },
            server: '_uploadFileServer.php',          //服务器地址
            success:function(file,data){
                console.log(data);
                console.log(file);
//            alert('上传成功');
            },
            progress:function(schedu){
                console.log('当前进度：',schedu);
                xP8.percentage = schedu;
            }
        })

```


## 多文件上传


## 说明

<table class="x-table x-table-interval">
            <thead>
            <tr><th>属性</th><th>类型</th><th>说明</th><th>默认值</th></tr></thead>
            <tbody>
            <tr>
                <td>fileType</td>
                <td>Number</td>
                <td>区分文件上传和头像上传，1、头像上传(单张)，2、文件上传（批量）,优先级高于accept属性，如果为1的话默认支持gif,jpg,jpeg,bmp,png等格式</td>
                <td>2</td>
            </tr>
            <tr>
                <td>fileNumLimit</td>
                <td>Number</td>
                <td>验证文件总数量的值，超出不能加入队列（多文件上传）</td>
                <td>300</td>
            </tr>
            <tr>
                <td>fileSizeLimit</td>
                <td>number  单位：字节</td>
                <td>所有文件的大小限制</td>
                <td>200M</td>
            </tr>
            <tr>
                <td>fileSingleSizeLimit</td>
                <td>number  单位：字节</td>
                <td>单个文件的大小</td>
                <td>50M</td>
            </tr>
            <tr>
                <td>formData</td>
                <td>Array</td>
                <td>传递给服务器的参数</td>
                <td>无</td>
            </tr>
            <tr>
                <td>fileVal</td>
                <td>String</td>
                <td>上传文件input框的name</td>
                <td>file</td>
            </tr>
            <tr>
                <td>accept</td>
                <td>Array</td>
                <td>允许上传的文件类型，1、title： 文字描述
                    2、extensions：允许的文件后缀，不带点，多个用逗号分割。
                </td>
                <td>无（所有类型）</td>
            </tr>
            <tr>
                <td>fileButton</td>
                <td>Array</td>
                <td>文件上传按钮属性 ，1、id:dom //按钮ID/DOM容器 2、label:String //按钮文本内容,3、multiple:Boolean //是否开起同时选择多个文件能力</td>
                <td> {
                     id: '.x-filePicker',
                     label: '批量上传'
                     multiple:true,
                     }
                </td>
            </tr>
            <tr>
                <td>addButton</td>
                <td>Array</td>
                <td>添加文件按钮属性 ，1、id:dom：//按钮ID/DOM容器 、label:String //按钮文本内容</td>
                <td> {
                     id: '.x-filePicker-add',
                     label: '继续添加'
                     }
                </td>
            </tr>
            <tr>
                <td>servers</td>
                <td>String</td>
                <td>服务器地址</td>
                <td> 无</td>
            </tr>
            </tbody>
        </table>
        <table class="x-table x-table-interval">
            <thead>
            <tr><th>方法</th><th>返回值</th><th>参数</th><th>说明</th></tr></thead>
            <tbody>
            <tr>
                <td>success</td>
                <td>无</td>
                <td>1、file: file对象， 2、data:服务返回的数据 </td>
                <td>上传成功后的回调</td>
            </tr>
            <tr>
                <td>progress</td>
                <td>无</td>
                <td>1、schedu:当前上传进度 ,  多文件时表示当前总进度</td>
                <td>文件上传时进度的实时返回</td>
            </tr>
            </tbody>
        </table>


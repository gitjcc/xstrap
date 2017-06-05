
var WebUploader = require('./webuploader.js');

// 当domReady的时候开始初始化
(function($) {
    var $wrap = $('.x-uploader'),

    // 图片容器   多文件的时候
        $queue = $( '<ul class="x-filelist"></ul>' )
            .appendTo( $wrap.find( '.x-queueList' ) ),
    // 状态栏，包括进度和控制按钮
        $statusBar = $wrap.find( '.x-statusBar' ),

    // 文件总体选择信息。
        $info = $statusBar.find( '.x-info' ),

    // 上传按钮
        $upload = $wrap.find( '.x-uploadBtn' ),

    // 没选择文件之前的内容。
        $placeHolder = $wrap.find( '.x-placeholder' ),

        $progress = $statusBar.find( '.progress' ).hide(),


    // 添加的文件数量
        fileCount = 0,

    // 添加的文件总大小
        fileSize = 0,

    // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

    // 缩略图大小
        thumbnailWidth = 110 * ratio,
        thumbnailHeight = 110 * ratio,

    // 可能有pedding, ready, uploading, confirm, done.
        state = 'pedding',

    // 所有文件的进度信息，key为file id
        percentages = {},
    // 判断浏览器是否支持图片的base64

    // WebUploader实例
        uploader;

    //图片上传和文件上传区分 参数
    var opt_file = {
        dom:'',
        fileButton: {
            id: '.x-filePicker',
            label: '批量上传'
        },
        addButton:{
            id: '.x-filePicker-add',
            label: '继续添加'
        },
        dnd: '.x-dndArea',
        paste: '.x-uploader',
        swf: '../../dist/Uploader.swf',
        chunked: false,
        chunkSize: 512 * 1024,
        server: '?m=Admin&c=Upload&a=upload',
        compress:false,
        // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
        disableGlobalDnd: true,
        fileNumLimit: 300,
        fileSizeLimit: 200 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
    };


    // 实例化
    window.xUpload = function (opt) {
        return new upload(opt);
    };

    var defaultOption = opt_file;
    var upload=function(opt,dom){
        this.opt = $.extend(true,{},defaultOption,opt);
        if(this.isFlash){
            this.init(this.opt);
        }
        return this;
    };

    upload.prototype ={
        isSupportBase64:( function() {
            var data = new Image();
            var support = true;
            data.onload = data.onerror = function() {
                if( this.width != 1 || this.height != 1 ) {
                    support = false;
                }
            };
            data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            return support;
        } )(),
        //检测是否已经安装flash，检测flash的版本
        flashVersion : ( function() {
            var version;
            try {
                version = navigator.plugins[ 'Shockwave Flash' ];
                version = version.description;
            } catch ( ex ) {
                try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                        .GetVariable('$version');
                } catch ( ex2 ) {
                    version = '0.0';
                }
            }
            version = version.match( /\d+/g );
            return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
        } )(),

        supportTransition : (function(){
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
            s = null;
            return r;
        })(),
        isFlash:function(){
            if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {

                // flash 安装了但是版本过低。
                if (this.flashVersion) {
                    (function(container) {
                        window['expressinstallcallback'] = function( state ) {
                            switch(state) {
                                case 'Download.Cancelled':
                                    alert('您取消了更新！');
                                    break;

                                case 'Download.Failed':
                                    alert('安装失败');
                                    break;

                                default:
                                    alert('安装已成功，请刷新！');
                                    break;
                            }
                            delete window['expressinstallcallback'];
                        };

                        var swf = './expressInstall.swf';
                        // insert flash object
                        var html = '<object type="application/' +
                            'x-shockwave-flash" data="' +  swf + '" ';

                        if (WebUploader.browser.ie) {
                            html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                        }

                        html += 'width="100%" height="100%" style="outline:0">'  +
                            '<param name="movie" value="' + swf + '" />' +
                            '<param name="wmode" value="transparent" />' +
                            '<param name="allowscriptaccess" value="always" />' +
                            '</object>';

                        container.html(html);

                    })($wrap);

                    // 压根就没有安转。
                } else {
                    $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
                }

                return;
            } else if (!WebUploader.Uploader.support()) {
                alert( 'Web Uploader 不支持您的浏览器！');
                return;
            }
        },
        init:function(opt){

            var fileType = opt.fileType;
            var addButton = opt.addButton;

            opt.pick = opt.fileButton;
            var _that = this;
            if(fileType == 1){
                opt['accept'] = {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes:'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                };
                opt['fileButton']['multiple'] = false;
            }
            uploader = WebUploader.create(opt);
            // 添加“添加文件”的按钮，
            uploader.addButton(addButton);


            uploader.on('ready', function() {
                window.uploader = uploader;
            });

            uploader.onUploadProgress = function( file, percentage ) {
                //进度条回调
                if(fileType==2) {
                    var $li = $('#' + file.id),
                        $percent = $li.find('.progress span');

                    $percent.css('width', percentage * 100 + '%');
                    percentages[file.id][1] = percentage;
                    updateTotalProgress();
                }else if(fileType == 1){

                    $statusBar.show();
                    this.options.progress(Math.round( percentage * 100 ) + '%');
                }

            };

            uploader.onUploadSuccess = function(file){
                //上传成功后调用
                if(fileType ==1){
                    $wrap.find('.x-info').text('头像上传成功，总大小：'+getSize(file.size));
                }
            };

            uploader.onUploadAccept = function(object,ret){
                this.options.success(object,ret);
            };

            uploader.onFileQueued = function( file ) {
                //添加到队列
                if(fileType == 2){
                    fileCount++;
                    fileSize += file.size;

                    if ( fileCount === 1 ) {
                        $placeHolder.addClass( 'element-invisible' );
                        $statusBar.show();
                        //$statusBar.css({'display':'block'})
                    }
                    addFile( file );
                    setState( 'ready' );
                    updateTotalProgress();
                }else if(fileType ==1){
                    //单张图片

                    addFileImg(file);
                    if ( state === 'ready' ) {

                        uploader.upload(file);

                    } else if ( state === 'paused' ) {
                        uploader.upload(file);
                    } else if ( state === 'uploading' ) {
                        uploader.stop(file);
                    }
                }
            };
            uploader.onUploadError = function(file,reason){
                if(reason =='http'){
                    console.log("服务器错误");
                }
                return;
            };
            uploader.onFileDequeued = function( file ) {
                //文件从队列中移除
                if(fileType==2){
                    fileCount--;
                    fileSize -= file.size;

                    if ( !fileCount ) {
                        setState( 'pedding' );
                    }

                    removeFile( file );
                    updateTotalProgress();
                }


            };
            uploader.onUploadFinished = function(){
                if(fileType == 2){
                    setState( 'confirm' );
                }
            };
            uploader.onStartUpload = function(file){
                setState( 'uploading' );

            };
            uploader.onStopUpload = function(){
                console.log("暂停");
                setState( 'paused' );
            };

            uploader.onError = function( code ) {
                //错误信息
                switch (code) {
                    case 'Q_TYPE_DENIED' :
                        alert('不符合的文件类型');
                        break;
                    case 'Q_EXCEED_SIZE_LIMIT':
                        alert('文件总大小超出，请重新设置');
                        break;
                    case 'Q_EXCEED_NUM_LIMIT':
                        alert('文件数量过多，请分批上传');
                        break;
                }
            };



            $upload.on('click', function() {
                //点击上传按钮
                console.log("开始上传");
                if ( $(this).hasClass( 'disabled' ) ) {
                    return false;
                }

                if ( state === 'ready' ) {
                    uploader.upload();
                } else if ( state === 'paused' ) {
                    uploader.upload();
                } else if ( state === 'uploading' ) {
                    uploader.stop();
                }
            });

            $wrap.on( 'click', '.retry', function() {

                uploader.retry();
            } );



            $upload.addClass( 'state-' + state );
            function addFile( file ) {
                //html文件列表

                var $li = $( '<li id="' + file.id + '">' +
                        '<p class="title">' + file.name + '</p>' +
                        '<p class="imgWrap"></p>'+
                        '<p class="progress"><span></span></p>' +
                        '</li>' ),

                    $btns = $('<div class="file-panel">' +
                        '<span class="cancel">删除</span>' +
                        '<span class="rotateRight">向右旋转</span>' +
                        '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
                    $prgress = $li.find('p.progress span'),
                    $wrap = $li.find( 'p.imgWrap' ),
                    $info = $('<p class="error"></p>'),
                    text = '',
                    showError = function( code ) {
                        switch( code ) {
                            case 'exceed_size':
                                text = '文件大小超出';
                                break;

                            case 'interrupt':
                                text = '上传暂停';
                                break;

                            default:
                                text = '上传失败，请重试';
                                break;
                        }
                        console.log(text);
                        $info.text( text ).appendTo( $li );
                    };


                if ( file.getStatus() === 'invalid' ) {
                    showError( file.statusText );
                    console.log(file.getStatus());
                } else {
                    // @todo lazyload
                    $wrap.text( '预览中' );
                    uploader.makeThumb( file, function( error, src ) {
                        var img;
                        if ( error ) {
                            $wrap.text( '不能预览' );
                            return;
                        }
                        if( _that.isSupportBase64 ) {
                            img = $('<img src="'+src+'">');
                            $wrap.empty().append( img );
                        } else {
                            console.log("预览出错");
                        }
                    }, thumbnailWidth, thumbnailHeight );

                    percentages[ file.id ] = [ file.size, 0 ];
                    file.rotation = 0;
                }

                file.on('statuschange', function( cur, prev ) {
                    //状态改变
                    if ( prev === 'progress' ) {
                        $prgress.hide().width(0);
                    } else if ( prev === 'queued' ) {
                        $li.off( 'mouseenter mouseleave' );
                        $btns.remove();
                    }

                    // 成功
                    if ( cur === 'error' || cur === 'invalid' ) {
                        console.log( file.statusText );
                        showError( file.statusText );
                        percentages[ file.id ][ 1 ] = 1;
                    } else if ( cur === 'interrupt' ) {
                        showError( 'interrupt' );
                    } else if ( cur === 'queued' ) {
                        $info.remove();
                        $prgress.css('display', 'block');
                        percentages[ file.id ][ 1 ] = 0;
                    } else if ( cur === 'progress' ) {
                        $info.remove();
                        $prgress.css('display', 'block');
                    } else if ( cur === 'complete' ) {
                        $prgress.hide().width(0);
                        $li.append( '<span class="success"></span>' );
                    }

                    $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
                });

                $li.on( 'mouseenter', function() {
                    $btns.stop().animate({height: 30});
                });

                $li.on( 'mouseleave', function() {
                    $btns.stop().animate({height: 0});
                });

                $btns.on( 'click', 'span', function() {
                    var index = $(this).index(),
                        deg;
                    switch ( index ) {
                        case 0:
                            uploader.removeFile( file );
                            return;

                        case 1:
                            file.rotation += 90;
                            break;

                        case 2:
                            file.rotation -= 90;
                            break;
                    }

                    if ( supportTransition ) {
                        deg = 'rotate(' + file.rotation + 'deg)';
                        $wrap.css({
                            '-webkit-transform': deg,
                            '-mos-transform': deg,
                            '-o-transform': deg,
                            'transform': deg
                        });
                    } else {
                        $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                    }


                });

                $li.appendTo($queue);




            }

            // 负责view的销毁
            function removeFile( file ) {
                var $li = $('#'+file.id);

                delete percentages[ file.id ];
                updateTotalProgress();
                $li.off().find('.file-panel').off().end().remove();
            }

            function updateTotalProgress() {
                var loaded = 0,
                    total = 0,
                    spans = $progress.children(),
                    percent;

                $.each( percentages, function( k, v ) {
                    total += v[ 0 ];
                    loaded += v[ 0 ] * v[ 1 ];
                } );

                percent = total ? loaded / total : 0;

                opt.progress(Math.round( percent * 100 ) + '%');
                spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
                spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
                if(fileType == 2){
                    updateStatus();
                }

            }

            function updateStatus() {
                var text = '', stats;

                if ( state === 'ready' ) {
                    text = '选中' + fileCount + '个文件，共' +
                        WebUploader.formatSize( fileSize ) + '。';
                } else if ( state === 'confirm' ) {
                    stats = uploader.getStats();
                    if ( stats.uploadFailNum ) {
                        text = '已成功上传' + stats.successNum+ '个文件，'+
                            stats.uploadFailNum + '个文件上传失败，<a class="retry" href="#">重新上传</a>失败文件';
                    }

                } else {
                    stats = uploader.getStats();
                    text = '共' + fileCount + '张（' +
                        WebUploader.formatSize( fileSize )  +
                        '），已上传' + stats.successNum + '张';

                    if ( stats.uploadFailNum ) {
                        text += '，失败' + stats.uploadFailNum + '张';
                    }
                }

                $info.html( text );
            }

            function setState( val ) {
                var file, stats;

                if ( val === state ) {
                    return;
                }

                $upload.removeClass( 'state-' + state );
                $upload.addClass( 'state-' + val );
                state = val;

                switch ( state ) {
                    case 'pedding':
                        $placeHolder.removeClass( 'element-invisible' );
                        $queue.hide();
                        $statusBar.addClass( 'element-invisible' );
                        uploader.refresh();
                        break;

                    case 'ready':
                        $placeHolder.addClass( 'element-invisible' );
                        $( addButton.id ).removeClass( 'element-invisible');
                        $queue.show();
                        $statusBar.removeClass('element-invisible');
                        uploader.refresh();
                        break;

                    case 'uploading':
                        $( addButton.id ).addClass( 'element-invisible' );
                        $progress.show();
                        $upload.text( '暂停上传' );
                        break;

                    case 'paused':
                        $progress.show();
                        $upload.text( '继续上传' );
                        break;

                    case 'confirm':
                        $progress.hide();
                        $( addButton.id ).removeClass( 'element-invisible' );
                        $upload.text( '开始上传' );

                        stats = uploader.getStats();
                        if ( stats.successNum && !stats.uploadFailNum ) {
                            setState( 'finish' );
                            return;
                        }
                        break;
                    case 'finish':
                        stats = uploader.getStats();
                        if ( stats.successNum ) {
                            console.log( '上传成功' );
                        } else {
                            // 没有成功的图片，重设
                            state = 'done';
                            location.reload();
                        }
                        break;
                }
                if(fileType == 2){
                    updateStatus();
                }
            }
            function getSize(size){
                var str;
                if(size/1024>1){
                    size = size/1024;
                    str = 'KB';
                }

                if(size/1024>1){
                    size = size/1024;
                    str = 'MB';
                }
                if(size/1024 >1){
                    size = size/1024;
                    str = 'GB';
                }
                size =   size.toFixed(2);
                str = size + str;
                return str;
            }

            function addFileImg(file){
                var html = '<div class="imgFile">' +
                    '<img src="">' +
                    '</div>';
                var img;
                var   $info = $('<p class="error"></p>');
                var   text = '';
                var  showError = function( code ) {
                    switch( code ) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;

                        case 'interrupt':
                            text = '上传暂停';
                            break;

                        default:

                            text = '上传失败，请重试 '+'<a class="retry" href="#">重新上传</a>';
                            break;
                    }



                    $info.html( text ).appendTo( $wrap );

                };

                if ( file.getStatus() === 'invalid' ) {
                    showError( file.statusText );
                } else {
                    uploader.makeThumb(file, function (error, src) {

                        if (error) {
                            //$wrap.text( '不能预览' );
                            //return;
                        }
                        if (_that.isSupportBase64) {
                            img = $('<img src="' + src + '"><span class="x-fileName">' + file.name + '</span>');
                            $wrap.find(".x-imgFile").append(img);
                        } else {
                            console.log("预览出错");
                        }
                    }, thumbnailWidth, thumbnailHeight);
                }



                file.on('statuschange', function( cur, prev ) {
                    //状态改变
                    // 成功
                    if ( cur === 'error' || cur === 'invalid' ) {
                        console.log( file.statusText );
                        showError( file.statusText );
                    } else if ( cur === 'interrupt' ) {
                        showError( 'interrupt' );
                    } else if ( cur === 'queued' ) {
                        $info.remove();
                    } else if ( cur === 'progress' ) {
                        $info.remove();
                    } else if ( cur === 'complete' ) {

                    }

                });



                setState( 'ready' );

                $(".x-statusBar .x-upload-btns").remove();
                //$wrap.append($progress);
                //$(".x-queueList").remove();
            }

            updateTotalProgress();
        }
    };
    //uploader = WebUploader.create(opt_img);


    // 当有文件添加进来时执行，负责view的创建



})( $ );

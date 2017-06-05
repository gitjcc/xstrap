/**
 * Created by Administrator on 2016/12/29.
 */
require('./progress.scss');

;(function (window, $) {

    window.xProgress2 = function (option) {
        return new xProgress(option);
    };

    var xProgress = function (option) {

        this._init(option);

        return this;
    };

    xProgress.prototype = {
        defaultOpt: {
            wrap: '.x-progress-wrap',
            pclass: 'x-progress-bar',
            tclass: 'x-progress-only',
            percentage: '0%',
            onchange: function () {console.log('onchange')}
        },
        _init: function (option) {
            this.option = $.extend(true, {}, this.defaultOpt, option);

            if(typeof this.option.wrap === "string"){
                this.wrap = $(this.option.wrap);
            }else{
                this.wrap = this.option.wrap;
            }

            if(typeof this.option.percentage === 'string'){
                this._makeprogress();
            }else{
                // var that = this;
                // $.each(this.percentage,function (index,item) {
                //     that._makeprogress();
                // });
            }
        },

        _makeprogress: function () {

            this.p = $('<div class="' + this.option.pclass + '" ></div>');
            this.t = $('<span class="' + this.option.tclass + '" ></span>');
            this.p.append(this.t);
            this.percentage = this.option.percentage;

            this.wrap.append(this.p);

            this._observer(this,'percentage');
            this._progress(this.percentage);
        },

        _observer: function (obj, k) {
            var that = this;
            var old = obj[k];
            Object.defineProperty(obj, k, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return old;
                },
                set: function (next) {
                    if (next !== old) {
                        that._progress(next, old);
                    }
                    old = next;
                    this.option.onchange();
                }
            })
        },
        _progress: function (next, old) {
            this.p.stop(true,true);
            if(next==='0%'){
                this.p.css({width: next});
            }else{
                this.p.animate({width: next},1000);
            }
            // this.p.css({width: next});
            // this.p.width(next);
            this.t.text(next);
        },
        _p:function () {
        },
        _pp:function(obj, next, old){
            if(typeof obj.option.percentage === 'string'){
                obj._p(obj, next, old);
            }else{
                if(typeof obj.option.percentage === 'object'){
                    for (var i = 0, len = this.option.percentage; i < len; i++) {
                        obj._p(this.option, next, old);
                    }
                }
            }
        }
    };
})(window, jQuery);
/**
 * Created by jesse on 2017/2/16.
 */


function Marker(lnglatXY,img,x,y,opts){
    var defaultOpt={
        map:this.mapObj,
        position: lnglatXY,
        zIndex:9999
    };
    if(img){
        opts.icon=this.icon(img)
    }
    if(x  &&  y){
        opts.offset=this.pixel(x,y);
    }
    return new AMap.Marker(this._handlerOpt(defaultOpt,opts));
}
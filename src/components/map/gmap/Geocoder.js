
function Geocoder (options){
    return this;
}

Geocoder.prototype = new google.maps.Geocoder();

module.exports = Geocoder;
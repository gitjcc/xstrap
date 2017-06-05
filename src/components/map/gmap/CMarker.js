/**
 * Created by Administrator on 2017/3/27.
 */
var format = require('./util/formatOpt.js');

CMarker = function(options) {
  this.options = options;
  var newOpts = format.marker(options);
  google.maps.OverlayView.apply(this, newOpts);
  return this;
};
CMarker.prototype = new google.maps.OverlayView();

CMarker.prototype.onAdd = function() {
  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';
  div.style.cursor = 'pointer';
  div.appendChild(this.options.content);

  // Create the img element and attach it to the div.
  var span = document.createElement('div');
  div.appendChild(span);

  var that = this;
  google.maps.event.addDomListener(div, 'click', function(e) {
    google.maps.event.trigger(that, 'click', e);
  });

  google.maps.event.addDomListener(div, 'mousemove', function(e) {
    google.maps.event.trigger(that, 'mousemove', e);
  });

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayMouseTarget.appendChild(div);
};
CMarker.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var position = overlayProjection.fromLatLngToDivPixel(this.getPosition());

  // Resize the image's div to fit the indicated dimensions.
  this.div_.style.left = position.x + 'px';
  this.div_.style.top = position.y + 'px';
};
CMarker.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};
CMarker.prototype.getExtData = function() {
  return this.options.extData;
};
CMarker.prototype.getPosition = function() {
  return this.options.position._inner;
};
CMarker.prototype.setPosition = function(latlng) {
  if(!latlng){
    return;
  }
  this.options.position = latlng;
  this.draw();
};

CMarker.prototype.setIcon = function(icon) {
    // this.options.content = icon;
};

CMarker.prototype.setZIndex = function(ZIndex) {
  if(this.div_){
    this.div_.style.zIndex = ZIndex;
  }
};

// Set the visibility to 'hidden' or 'visible'.
CMarker.prototype.setVisible = function(visible) {
  if (this.div_) {
    // The visibility property must be a string enclosed in quotes.
    if (visible) {
      this.div_.style.visibility = 'visible';
    } else {
      this.div_.style.visibility = 'hidden';
    }
  }
};

module.exports = CMarker;
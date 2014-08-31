function toLatLng(uberDataPoint){
  var lat = uberDataPoint[1];
  var lng = uberDataPoint[2];
  return new google.maps.LatLng(lat,lng);
}

function toPolyLine(uberArray, map, color){
  // Initialize default arguments.
  if (color == undefined) {
    color = "#000000"; // Black
  }

  var arr = [];
  for (var i = 0; i < uberArray.length; i++) {
    var latlngobj = toLatLng(uberArray[i]);
    arr.push(latlngobj);      
  }
  return new google.maps.Polyline({
    path: arr,
    strokeColor: color,
    map: map
  });
}

function drawUberFileOnMap(map, fileLink, color){
  $.get( fileLink, function( data ) {
      console.log(fileLink + " was loaded successfully.");
      $.each(data, function(key, value) {
          var polyLine = toPolyLine(value, map, color);
          console.log(key, polyLine);
      });
  });
}

function initialize() {
    var map_canvas = document.getElementById('map_canvas');
    var map_options = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(map_canvas, map_options);

    var dayFile = "http://cs.unm.edu/~lnunno/uber-viz/json/sample_day.json";
    drawUberFileOnMap(map, dayFile);
}
google.maps.event.addDomListener(window, 'load', initialize);
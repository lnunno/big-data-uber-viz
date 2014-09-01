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

// A list of all lines that are drawn on the map.
var polyLineLs = [];

function drawUberFileOnMap(map, fileLink, color){
  $("#loading").show();
  $.get( fileLink, function( data ) {
      console.log(fileLink + " was loaded successfully.");
      $.each(data, function(key, value) {
          var polyLine = toPolyLine(value, map, color);
          polyLineLs.push(polyLine);
      });
      $("#loading").hide();
  });
}

function initialize() {
    $("#loading").hide(); // We're not loading right now...

    var sanFran = new google.maps.LatLng(37.7833, -122.4167);
    var map_canvas = document.getElementById('map_canvas');
    var map_options = {
      center: sanFran,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(map_canvas, map_options);

    var colorDict = {
                      "day":"#0000FF", 
                      "night":"#FF0000", 
                      "weekday":"#00FF00", 
                      "weekend":"#FF00FF", 
                      "monday":"#00FFFF", 
                      "tuesday":"#FF9933",
                      "friday": "#9900FF",
                      "friday_day": "#C266FF",
                      "friday_night": "#613380",
                      "saturday": "#1975FF",
                      "saturday_day": "#5E9EFF",
                      "saturday_night": "#385F99"
                    }
    var fileRoot = "http://cs.unm.edu/~lnunno/uber-viz/json/";

    $( "#vizFiles" ).change(function() {
      // Clear the previously plotted data.
      for (i = 0; i < polyLineLs.length; i++) {                           
        polyLineLs[i].setMap(null); //or line[i].setVisible(false);
      }

      // Clear the old array.
      // See: http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
      polyLineLs.length = 0;

      $( "#vizFiles option:selected" ).each(function() {
        var value = $( this ).val();
        var fileName = fileRoot + value +".json";
        drawUberFileOnMap(map, fileName, colorDict[value]);
      });
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
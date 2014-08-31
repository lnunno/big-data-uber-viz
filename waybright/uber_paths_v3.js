google.load("search", "1");
google.load("jquery", "1.4.2");
google.load("jqueryui", "1.7.2");
google.load("visualization", "1");

// Set a callback to run when the Google Visualization API is loaded.


// Global Variables Representing Cab
var cabCoordinates = {};
var cabPath = {};
var cabSymbol;


function initialize()
{ 
  var url = "http://cs.unm.edu/~lnunno/uber-viz/json/fileLoader.php?name=day.json";
  
  $.get(url,function(data){
    alert(data);
  });
  
  // Create our data table out of JSON data loaded from server.
  var myDataTable = new google.visualization.DataTable(data);

  var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(37.783333, -122.416667),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  cabCoordinates['878'] = [
	new google.maps.LatLng( 37.788023, -122.410054 ),
	new google.maps.LatLng( 37.788107, -122.409932 ),
	new google.maps.LatLng( 37.788170, -122.409863 ),
	new google.maps.LatLng( 37.788220, -122.409694 ),
	new google.maps.LatLng( 37.788298, -122.409288 ),
	new google.maps.LatLng( 37.788347, -122.408942 ),
	new google.maps.LatLng( 37.788357, -122.408866 ),
	new google.maps.LatLng( 37.788369, -122.408534 ),
	new google.maps.LatLng( 37.788339, -122.407893 ),
	new google.maps.LatLng( 37.788382, -122.407266 ),
	new google.maps.LatLng( 37.788409, -122.406983 ),
	new google.maps.LatLng( 37.788419, -122.406860 ),
	new google.maps.LatLng( 37.788454, -122.406523 ),
	new google.maps.LatLng( 37.788491, -122.406167 ),
	new google.maps.LatLng( 37.788536, -122.405806 ),
	new google.maps.LatLng( 37.788591, -122.405465 ),
	new google.maps.LatLng( 37.788655, -122.405306 ),
	new google.maps.LatLng( 37.788701, -122.405160 ),
	new google.maps.LatLng( 37.788729, -122.404940 ),
	new google.maps.LatLng( 37.788771, -122.404571 ),
	new google.maps.LatLng( 37.788774, -122.404156 ),
	new google.maps.LatLng( 37.788777, -122.403966 ),
	new google.maps.LatLng( 37.788784, -122.403831 ),
	new google.maps.LatLng( 37.788716, -122.403402 ),
	new google.maps.LatLng( 37.788688, -122.403261 ),
	new google.maps.LatLng( 37.788649, -122.402766 ),
	new google.maps.LatLng( 37.788491, -122.402445 ),
	new google.maps.LatLng( 37.788456, -122.402308 ),
	new google.maps.LatLng( 37.788594, -122.402116 ),
	new google.maps.LatLng( 37.788809, -122.401932 )
  ];
  
  // Define the symbol, using one of the predefined paths ('CIRCLE')
  // supplied by the Google Maps JavaScript API.
  cabSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: '#393',
    strokeOpacity: 1.0,
    strokWeight: 2
  };
  
  cabPath['878'] = new google.maps.Polyline
  ({
    path: cabCoordinates['878'],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    icons:
      [{
	icon: cabSymbol,
	offset: '0%'
      }],
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
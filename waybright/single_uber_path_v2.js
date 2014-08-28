function initialize() {
  var mapOptions = {
    zoom: 15,
	center: new google.maps.LatLng(37.8, -122.4),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
								mapOptions);

  var cabCoordinates = [
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
  
  var cabPath = new google.maps.Polyline({
    path: cabCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  cabPath.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

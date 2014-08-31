/*
var map;

function initialize() {
    var mapOptions = {
	zoom: 13,
	center: new google.maps.LatLng(37.77, -122.4),
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
		
    map = new google.maps.Map(document.getElementById('map_canvas'),
			      mapOptions);
		
    // Create a script tag and set the USGS URL as the source.
    // Append this tag to the document's <head>.
    var script = document.createElement('script');
    script.src = 'http://earthquake.usgs.gov/earthquakes/feed/geojsonp/2.5/week';
    document.getElementsByTagName('head')[0].appendChild(script);
}
		
window.eqfeed_callback = function(results) {
    var heatmapData = [];
    for (var i = 0; i < results.features.length; i++) {
	var coords = results.features[i].geometry.coordinates;
	var latLng = new google.maps.LatLng(coords[1], coords[0]);

	heatmapData.push(latLng);
    }
    var heatmap = new google.maps.visualization.HeatmapLayer({
	data: heatmapData,
	dissipating: false,
	map: map
    });
}
*/
/* Data points defined as an array of LatLng objects */

var map;

function success(data, textStatus, jqXHR) {
    var heatMapData;
    for (tripid in jsonData)
	for (i in jsonData[tripid])
	    heatmapData.push(new google.maps.LatLng(jsonData[tripid][i][0],
						    jsonData[tripid][i][1]))


    var heatmap = new google.maps.visualization.HeatmapLayer({
	data: heatmapData,
	map: map
    });


}

function initialize() {

    $.ajax({
        url: "http://cs.unm.edu/~lnunno/uber-viz/json/fileLoader.php?name=night.json",
        dataType:"json",
        async: true,
	success: success
    });


    var heatmapData = [
	new google.maps.LatLng(37.782, -122.447),
	new google.maps.LatLng(37.782, -122.445),
	new google.maps.LatLng(37.782, -122.443),
	new google.maps.LatLng(37.782, -122.441),
	new google.maps.LatLng(37.782, -122.439),
	new google.maps.LatLng(37.782, -122.437),
	new google.maps.LatLng(37.782, -122.437),
	new google.maps.LatLng(37.782, -122.437),
	new google.maps.LatLng(37.782, -122.437),
	new google.maps.LatLng(37.782, -122.437),
	new google.maps.LatLng(37.782, -122.435),
	new google.maps.LatLng(37.785, -122.447),
	new google.maps.LatLng(37.785, -122.445),
	new google.maps.LatLng(37.785, -122.443),
	new google.maps.LatLng(37.785, -122.441),
	new google.maps.LatLng(37.785, -122.439),
	new google.maps.LatLng(37.785, -122.437),
	new google.maps.LatLng(37.785, -122.435)
    ];

    var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
    
    map = new google.maps.Map(document.getElementById('map_canvas'), {
	center: sanFrancisco,
	zoom: 13,
	zoomControl: true,
	mapTypeId: google.maps.MapTypeId.TRAFFIC
    });

}

var map;
var SAMPLE_SIZE = 100000

// See https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    if (min < 0)
	min = 0
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function success(data, textStatus, jqXHR) {
    var heatMapData = [];
    console.log("got a success");
    for (tripid in data)
	for (i in data[tripid])
		heatMapData.push(new google.maps.LatLng(data[tripid][i][1],
							data[tripid][i][2]))
    sample = getRandomSubarray(heatMapData, SAMPLE_SIZE)
    var heatmap = new google.maps.visualization.HeatmapLayer({
	data: sample,
	radius: 7
    });
    heatmap.setMap(map)
}

function initialize() {
    Math.seedrandom('a better seed?')
    $.ajax({
        url: "http://cs.unm.edu/~lnunno/uber-viz/json/fileLoader.php?name=night.json",
        dataType:"json",
        async: true,
	success: success,
    });

    var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
    
    map = new google.maps.Map(document.getElementById('map_canvas'), {
	center: sanFrancisco,
	zoom: 13,
	zoomControl: true,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
}

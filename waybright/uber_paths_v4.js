google.load("search", "1");
google.load("visualization", "1");

// Global Variables Representing Cab Related things
var cabWatcher          = {};
var cabCoordinates      = {};
var cabPath             = {};
var map;
var count               = 0;

// Animation Global Variables
var startTimeInMinutes  = 5 * 60;   // Day starts at 5 AM
var endTimeInMinutes    = 17 * 60;  // Day ends at 5 PM
var stepIncrement       = 1;        // Every window.interval call simulates x minutes
var maxAnimationCount   = (endTimeInMinutes - startTimeInMinutes) / stepIncrement;
var animationCount      = 0;
var stepInterval        = 250;      // How often windows.interval called in milliseconds


// Define the symbol, using one of the predefined paths ('CIRCLE') supplied by the Google Maps JavaScript API.
function CabSymbol() {
    this.path           = google.maps.SymbolPath.CIRCLE;
    this.scale          = 8;
    this.strokeColor    = '#393';
    this.strokeOpacity  = 0.0;
    this.strokWeight    = 2;
    
    this.turnOpacityOn  = function() { this.strokeOpacity = 1.0; };
    this.turnOpacityOff = function() { this.strokeOpacity = 0.0; };
};


// Define the class used by cabWatcher to manage the animation
function CabStats(startStep, stopStep) {
    this.startStep  = startStep;
    this.stopStep   = stopStep;
    
    // Compute where offset in path should be.  Return string of "0%" - "100%".
    this.getOffsetPerc = function(step) {
        if ( step < startStep || step > stopStep ) {
            return "0%";
        }
        else {
            var s = (stopStep - step) / parseFloat(startStep);
            var x = parseInt(s * 100);
            
            return x + "%";
        }
    };
    
    // Returns true if this object requires animation, false otherwise
    this.animateMe  = function(step) {
        if ( step >= this.startStep && step <= this.stopStep ) { return true; }
        else { return false; }
    };
};


// First function called when loading script, pretty much just loads JSON file and Google Map
function initialize()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "day.json", true);
    xhr.onload = function () {
        loadCabs(this.responseText);
    };
    xhr.send();
    
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(37.783333, -122.416667),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}


// Begin Drawing of the map!
google.maps.event.addDomListener(window, 'load', initialize);


// Calculate the start/stop step used
function calcSteps(start, end) {
    var d, s, t, time, startStep, stopStep;
    
    // Start Time - NOTE:  Time Format is "2007-01-07T8:08:44-08:00" for Trip 7
    d = start.split("T");
    s = d[1].split("-");
    t = s[0].split(":");
    time = parseInt(t[0]) * 60 + parseInt(t[1]);
    startStep = (time - startTimeInMinutes) / stepIncrement;
    
    // End Time - NOTE:  Time Format is "2007-01-07T8:08:44-08:00" for Trip 7
    d = end.split("T");
    s = d[1].split("-");
    t = s[0].split(":");
    time = parseInt(t[0]) * 60 + parseInt(t[1]);
    stopStep = (time - startTimeInMinutes) / stepIncrement;
    
    return new CabStats(startStep, stopStep);
}


// This method is called after the JSON file is loaded into the data arg
function loadCabs(data)
{
    // parse the JSON object, then create our data table out of JSON data loaded from server.
    var tripTable = JSON.parse(data);
    
    // Load all cabs from Table
    for(var key in tripTable)
    {
        // Collect DateTime for first GPS hit of cab trip.
        var date = tripTable[key][0][0];
        var dt = date.split("T");
        
        // Only process cabs for this date/time
        if(dt[0] == "2007-01-07")
        {
            // Collect the LAST GPS collection point for a trip
            var date2 = tripTable[key][tripTable[key].length - 1][0];
            var dt2 = date2.split("T");
            
            // Create CabStats and put into Overwatch to monitor animation steps for this cab.
            cabWatcher[key] = calcSteps(date, date2);
            
            // Load cabPath and cabCoordinates
            var tempArray = [];
            
            for(var i = 0; i < tripTable[key].length; i++ )
            {
                tempArray.push(new google.maps.LatLng(tripTable[key][i][1], tripTable[key][i][2]));
            }
            
            cabCoordinates[key] = tempArray;
            
            cabPath[key] = new google.maps.Polyline
            ({
                path: cabCoordinates[key],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 0.0,
                strokeWeight: 2,
                map: map,
                icons:
                  [{
                    icon: new CabSymbol(),
                    offset: '0%'
                  }]
            });
        }
    }
    
    // Animate!
    beginIntervals();
}


// Use the DOM setInterval() function to change the offset of the symbol at fixed intervals.
function beginIntervals() {
    window.setInterval(animateCabs, stepInterval);
}


// This function is called at every interval defined above (milliseconds)
function animateCabs() {
    for( var key in cabWatcher )
    {
        var icons = cabPath[key].get('icons');
        
        if( cabWatcher[key].animateMe(animationCount) )
        {
            icons[0].icon.turnOpacityOn();
            icons[0].offset = cabWatcher[key].getOffsetPerc(animationCount);
        }
        else
        {
            icons[0].icon.turnOpacityOff();    
        }
        
        cabPath[key].set('icons', icons);
    }
    
    // Update animation count for next iteration
    animationCount = (animationCount + 1) % maxAnimationCount;
}
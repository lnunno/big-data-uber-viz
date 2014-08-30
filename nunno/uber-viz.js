// Place code here.
google.load('visualization', '1', { 'packages': ['map'] });
google.setOnLoadCallback(initialize);

function initialize() {
  var dayLink = "http://cs.unm.edu/~lnunno/uber-viz/json/sample_day.json";
  $.ajax({
      dataType: "json",
      url: dayLink,
      data: data,
      success: (function (data) {
          alert("data loaded.");
      })
  });
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Population'],
    ['China', 'China: 1,363,800,000'],
    ['India', 'India: 1,242,620,000'],
    ['US', 'US: 317,842,000'],
    ['Indonesia', 'Indonesia: 247,424,598'],
    ['Brazil', 'Brazil: 201,032,714'],
    ['Pakistan', 'Pakistan: 186,134,000'],
    ['Nigeria', 'Nigeria: 173,615,000'],
    ['Bangladesh', 'Bangladesh: 152,518,015'],
    ['Russia', 'Russia: 146,019,512'],
    ['Japan', 'Japan: 127,120,000']
  ]);

var options = { showTip: true, enableScrollWheel: true };

var map = new google.visualization.Map(document.getElementById('chart_div'));

map.draw(data, options);
}; 

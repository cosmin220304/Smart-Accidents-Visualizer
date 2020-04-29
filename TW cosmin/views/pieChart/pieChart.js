// Draw the chart and set the chart values
function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['State', 'Select'],
      ['AL', 10],
      ['AK', 120],
      ['AR', 10],
      ['AK', 10],
      ['AZ', 10],
      ['Colorado', 0],
      ['CO', 150],
      ['DE', 120],
      ['FL', 130],
      ['HI', 120],
      ['KS', 110],
      ['KY', 180],
      ['MI', 110],
      ['MO', 180],
      ['MS', 10],
      ['MT', 101],
      ['NE', 120],
      ['NJ', 1210],
      ['NM', 1210],
      ['NY', 1410],
      ['OR', 1310],
      ['PA', 1510],
      ['TX', 1610],
      ['UT', 1710],
      ['VA', 1810],
      ['WA', 1910],
      ['WV', 1910],
      ['WY', 1910],
    ]);
  
  var options = {
    backgroundColor: 'transparent',
    chartArea: {
      backgroundColor: 'transparent',
    },
    titleTextStyle:   {color: 'white'}, 
    legend: 'none',
    pieSliceText: 'label',
    is3D: true,
    
    
  };
  
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
  
  $(window).resize(function(){
    drawChart();
  });
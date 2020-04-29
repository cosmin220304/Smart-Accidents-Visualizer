    
    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([262.30, 38]),
        zoom: 4,
        minZoom: 4

      })
    });



      google.charts.load('current', {'packages':['geochart']});
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {

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
          colorAxis: {colors: ['#FEFFD2', '#EFFF00', '#910000']},
          region: 'US',
          displayMode: 'regions',
          resolution: 'provinces',
          backgroundColor: 'transparent',
          chartArea: {
            backgroundColor: 'transparent',
          }
          
     
         };

        var chart = new google.visualization.GeoChart(document.getElementById('geochart'));

        chart.draw(data, options);
      }


      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);



$(window).resize(function(){
  drawRegionsMap();
  });


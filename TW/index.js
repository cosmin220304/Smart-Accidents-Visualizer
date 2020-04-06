
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
          ['US-AL', 10],
          ['US-AK', 120],
          ['US-AR', 10],
          ['US-AK', 10],
          ['US-AZ', 10],
          ['US-Colorado', 0],
          ['US-CO', 150],
          ['US-DE', 120],
          ['US-FL', 130],
          ['US-HI', 120],
          ['US-KS', 110],
          ['US-KY', 180],
          ['US-MI', 110],
          ['US-MO', 180],
          ['US-MS', 10],
          ['US-MT', 101],
          ['US-NE', 120],
          ['US-NJ', 1210],
          ['US-NM', 1210],
          ['US-NY', 1410],
          ['US-OR', 1310],
          ['US-PA', 1510],
          ['US-TX', 1610],
          ['US-UT', 1710],
          ['US-VA', 1810],
          ['US-WA', 1910],
          ['US-WV', 1910],
          ['US-WY', 1910],
        ]);

        var options = {
          colorAxis: {colors: ['#FEFFD2', '#EFFF00', '#910000']},
          region: 'US',
          displayMode: 'regions',
          resolution: 'provinces',
          backgroundColor: 'rgb(51, 51, 51)' ,
         };

        var chart = new google.visualization.GeoChart(document.getElementById('geochart'));

        chart.draw(data, options);
      }
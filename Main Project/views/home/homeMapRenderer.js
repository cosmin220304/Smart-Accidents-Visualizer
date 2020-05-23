var map;
var startPosX = 260;
var startPosY = 38;
var startZoom = 3;
var mercatorProjection = `EPSG:3857`;
var worldGeodeticSystem = `EPSG:4326`; //datum featuring coordinates that change with time.
var isMoving = false;
var direction; 
var red = '#e22903',  orange = '#e29f03', yellow = '#d7e203', green = '#6fe203'; 
var colors = [green, yellow, orange, red]; 

function renderMap() {
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([startPosX, startPosY]),
      zoom: startZoom
    }),
    //controls: ol.control.defaults({ attribution: false, rotate: false }).extend([mousePositionControl])
    interactions: ol.interaction.defaults({ attribution: false, rotate: false }).extend([new ol.interaction.DragAndDrop()]),
  }); 
}


function addRandomPoints2() {
  var arr = []
  for (var i = 1; i <= 30; i++) {
    var R = Math.random() * 10;
    var posX = startPosX + R;
    R = Math.random() * 10;
    var posY = startPosY + R;
    var coord = [posX, posY];
    arr.push(coord);
  }
  R = Math.floor(Math.random() * 4);
  var color = colors[R]; 
  addPointsToMap(arr, color);
} 


function addPointsToMap(coordonates, color) {    
  //Get all coordonates and create points
  size = Object.keys(coordonates).length; 
  var features = new Array(size); 
  for (var i = 0; i < size; ++i) { 
    features[i] = new ol.Feature(new ol.geom.Point(coordonates[i]).transform(worldGeodeticSystem, mercatorProjection));
  }  

  //Add points to layer
  var points = new ol.layer.Vector({
    source: new ol.source.Cluster({
      distance: 20,
      source: new ol.source.Vector({
        features: features
        })
    }),
    style: function(feature) {
      var points_no = feature.get('features').length;

      var radius = points_no;
      if (radius > 15)
        radius = 15;
      if (radius < 8)
        radius = 8;

      var textColor = 'black';
      console.log(color)
      if (color == "rgb(0, 0, 0)")
        textColor = 'white';

      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: radius,
          fill: new ol.style.Fill({
            color : color
          }) 
        }),
        text: new ol.style.Text({
          text: points_no.toString(),
          fill: new ol.style.Fill({
            color: textColor
          })
        })
      });
    },
    name: "points"
  }); 

  //Add layer to map
  map.addLayer(points);
}


function removeAllPoints() {
  map.getLayers().getArray().filter(layer => layer.get('name') === 'points').forEach(layer => map.removeLayer(layer));
}


function updateMapView() {
  map.getView().setCenter(ol.proj.transform([startPosX, startPosY], worldGeodeticSystem, mercatorProjection)); 
}


function sleep(ms) {
  return new Promise(start => setTimeout(start, ms));
} 


function moveAround(dir) { 
  direction = dir;
  isMoving = true;
}


function stopMove() { 
  isMoving = false;
}


async function moving() {
  var force;
  do {
    if (isMoving) 
    {
      force = 2 * startZoom /  Math.exp(map.getView().getZoom());

      if (direction == "up") 
      {
        startPosY += 1 * force;
      } 

      else if (direction == "down") 
      {
        startPosY -= 1 * force;
      } 

      else if (direction == "right") 
      {
        startPosX += 1 * force;
      } 

      else 
      {
        startPosX -= 1 * force;
      }

      updateMapView();
    }
    await sleep(10);
  } while(1);
}
 

// var mousePositionControl = new ol.control.MousePosition({
//   coordinateFormat: ol.coordinate.createStringXY(1),
//   projection: mercatorProjection,
//   className: 'mousePos',
//   target: document.getElementById('mouse-position')
// });


renderMap();
addRandomPoints2();
moving();
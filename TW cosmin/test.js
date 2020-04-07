var map;
var startPosX = 260;
var startPosY = 38;
var startZoom = 3;
var mercatorProjection = `EPSG:3857`;
var worldGeodeticSystem = `EPSG:4326`; //datum featuring coordinates that change with time.
var isMoving = false;
var direction;

//MODIFICA AICI DACA VREI SA TESTEZI CUM ARATA PUNCTELE
var color = '#002500';
var radius = 2;
 
function renderMap() {
  map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({
      attribution: false,
      zoom: true,
      rotate: false
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([startPosX, startPosY]),
      zoom: startZoom
    })
  });
}

function addRandomPoints() {
  for (var i = 1; i <= 30; i++) {
    var R = Math.random() * 10;
    var posX = startPosX + R;
    R = Math.random() * 10;
    var posY = startPosY + R;
    addPointToMap(posX, posY);
  }
}

function addPointToMap(posX, posY) {
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([posX, posY])),
        })
      ]
    }),
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: radius,
        fill: new ol.style.Fill({
          color
        })
        //        stroke: new ol.style.Stroke({color, width: 1})
      })
    })
  });
  map.addLayer(layer);
}

function updateMapView() {
  map.getView().setCenter(ol.proj.transform([startPosX, startPosY], worldGeodeticSystem, mercatorProjection));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
      force = startZoom / map.getView().getZoom();

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

renderMap();
addRandomPoints();
moving();
//Contains ol.map
var map;

//Start variables for map
var startPosX = 260;
var startPosY = 38;
var startZoom = 3;

//Used for projection
var mercatorProjection = `EPSG:3857`;
var worldGeodeticSystem = `EPSG:4326`; //datum featuring coordinates that change with time.

//Used for moving buttons
var isMoving = false;
var direction;  

//Used for popup when hovering over point 
var coordArray = [];
var descArray = [];


function renderMap() {
  map = new ol.Map({
    target: 'map',
    layers: [ new ol.layer.Tile({source: new ol.source.OSM()})],
    view: new ol.View({
      center: ol.proj.fromLonLat([startPosX, startPosY]),
      zoom: startZoom
    }), 
    interactions: ol.interaction.defaults({ attribution: false, rotate: false }).extend([new ol.interaction.DragAndDrop()]),
  }); 
}


function addRandomPoints() {
  var colors = ['#6fe203', '#d7e203', '#e29f03', '#e22903']; 
  var arr = []
  var randomDesc = []
  for (var i = 1; i <= 30; i++) {
    var R = Math.random() * 10;
    var posX = startPosX + R;
    R = Math.random() * 10;
    var posY = startPosY + R;
    var coord = [posX, posY];
    arr.push(coord);
    randomDesc.push("Random Description No." + i);
  }
  R = Math.floor(Math.random() * 4);
  var color = colors[R]; 
  addPointsToMap(arr, randomDesc, color);
} 


function addPointsToMap(coordonates, desc, color) {  

  //Create openlayers features
  size = Object.keys(coordonates).length; 
  var points = new Array(size);  
  for (var i = 0; i < size; ++i) { 
    points[i] = new ol.Feature(new ol.geom.Point(coordonates[i]).transform(worldGeodeticSystem, mercatorProjection)); 
  }  

  //Save coordonates and descriptions in arrays
  coordArray = coordonates;
  descArray = desc;

  //Add points to layer
  var points = new ol.layer.Vector({
    source: new ol.source.Cluster({
      distance: 20,
      source: new ol.source.Vector({
        features: points
      })
    }),
    style: (feature) => {return stylePoints(feature, color)},
    name: "points"
  }); 

  //Add layer to map
  map.addLayer(points);
}


//Used to add color to points + also cluster them
function stylePoints(feature, color){
  //Get no of points
  var points_no = feature.get('features').length;

  //Limit size of point
  var radius = points_no * 3 + 2;
  const max = 16;
  if (radius > max)
    radius = max;  

  //Write cluster number over that point
  let textColor = 'black'; 
  if (color == "rgb(0, 0, 0)")
    textColor = 'white';

  var text = new ol.style.Text({
    text: points_no.toString(),
    fill: new ol.style.Fill({color: textColor})
  })

  //Our "points" are small circles
  var circle = new ol.style.Circle({
    radius: radius,
    fill: new ol.style.Fill({ color : color })
  });

  //Return the style
  return new ol.style.Style({
    image: circle,
    text: text
  });
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
        startPosY += 1 * force;
      else if (direction == "down") 
        startPosY -= 1 * force;
      else if (direction == "right") 
        startPosX += 1 * force;
      else 
        startPosX -= 1 * force;
      updateMapView();
    }
    await sleep(10);
  } while(1);
}


//Intialization funcitons
renderMap();
addRandomPoints();
moving();


// Popup showing the position the user clicked
var popup = document.getElementById('mouseTest');
var overlay = new ol.Overlay({
  element: popup,
  stopEvent : false
});
map.addOverlay(overlay);


//Event listeners
map.on('pointermove', (event) => {
  //Get feature at mouse pos
  var point = map.forEachFeatureAtPixel(event.pixel, (feature) => { return feature;});
  
  //Do something with that point(Show details)
  if (point) {    
    //Get map coord
    var coord = point.getGeometry().getCoordinates();

    //Transform in coord for our map
    coord = ol.proj.transform(coord, mercatorProjection, worldGeodeticSystem);  
    
    //Get index for description for that point
    let parsedCoord = []
    parsedCoord[0] = parseFloat(coord[0]).toFixed(6);  
    parsedCoord[1] = parseFloat(coord[1]).toFixed(6);   
    let index = -1;
    for (var i = 0; i < coordArray.length; i++)
    { 
      if (coordArray[i][0] == parsedCoord[0] && coordArray[i][1] == parsedCoord[1])
      {
        index = i;
        break;
      }
    } 

    //Check if we have a description
    if (index >= 0){ 
      if (descArray[index] == undefined || descArray[index] == "" || descArray[index] == " ")
        descArray[index] = "no data";

      //Add the description
      popup.innerHTML = descArray[index];

      //If box is too small make it bigger
      var textSize = descArray[index].length;
      var elemSize = textSize/10 + '.' + textSize%10 + 'em';
      popup.setAttribute('style', 'height:' + elemSize);

      //Show pop-up 
      overlay.setPosition(event.coordinate);
    }
  }
  //Don't show pop-up
  else {
    overlay.setPosition(undefined);
  }
});
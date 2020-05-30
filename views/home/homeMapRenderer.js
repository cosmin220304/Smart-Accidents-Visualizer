//Contains map and points
let map;
const clusterNumber = document.getElementById('clusterNumber'); 
let clusterNo = 0;
var test=[]

//Start variables for map
let startPosX = 260;
let startPosY = 38;
let startZoom = 3;

//Used for projection
const mercatorProjection = `EPSG:3857`;
const worldGeodeticSystem = `EPSG:4326`; //datum featuring coordinates that change with time.

//Used for moving buttons
let isMoving = false;
let direction;  

//Used for popup when hovering over point 
let coordArray = [];
let descArray = [];


//Creates the map at the id="map" element
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
renderMap(); 


function addPointsToMap(coordonates, desc, color) {  

  //Create openlayers features
  size = Object.keys(coordonates).length; 

  var points = new Array(size);  
  for (var i = 0; i < size; ++i) { 
    points[i] = new ol.Feature(new ol.geom.Point(coordonates[i]).transform(worldGeodeticSystem, mercatorProjection)); 

    //Save coordonates and descriptions in arrays
    coordArray.push(coordonates[i]);
    descArray.push(desc[i])
  }

  //Save cluster for later use
  var cluster = new ol.source.Cluster({
    distance: parseInt(clusterNumber.value, 10),
    source: new ol.source.Vector({
      features: points
    })
  })

  //Add points to layer
  var points = new ol.layer.Vector({
    source: cluster,
    style: (feature) => {return stylePoints(feature, color, true)},
    id: "points" + clusterNo,
    class: "points"
  });
  test.push(color) 
  clusterNo++;

  //Add layer to map
  map.addLayer(points);
}


//Used to add color to points + also cluster them
function stylePoints(feature, color, hasText){
  //Get no of points
  var points_no = feature.get('features').length;

  //Limit size of point
  var radius = Math.log2(points_no) + 5;

  //Write cluster number over that point
  let textColor = 'black'; 
  if (color == "rgb(0, 0, 0)")
    textColor = 'white';
  
  var textInside = points_no.toString();
  if (hasText == false)
    textInside = "";

  var text = new ol.style.Text({
    text: textInside,
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

//Removes all points from map
function removeAllPoints() {
  clusterNo = 0;
  test = [];
  descArray = [];
  coordArray = [];
  map.getLayers().getArray().filter(layer => layer.get('class') === 'points').forEach(layer => map.removeLayer(layer));
}

//Moves map to position startPosX, startPosY
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
moving();


// Popup showing the position the user clicked
var popup = document.getElementById('popup');
var overlay = new ol.Overlay({
  element: popup,
  stopEvent : false
});
map.addOverlay(overlay);


///Event listeners


//Popup over points
map.on('pointermove', (event) => {
  //Get feature at mouse pos
  var point = map.forEachFeatureAtPixel(event.pixel, (feature) => { return feature;});
  
  //Do something with that point(Show details)
  if (point) {    
    //Get map coord
    var coord = point.getGeometry().getCoordinates();

    //Transform in coord for our map
    coord = ol.proj.transform(coord, mercatorProjection, worldGeodeticSystem);  
    
    //Get index for description for that point (double parse so )
    let parsedCoord = []
    parsedCoord[0] = parseFloat(parseFloat(coord[0]).toFixed(6));  
    parsedCoord[1] = parseFloat(parseFloat(coord[1]).toFixed(6));  
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


//Cluster points
clusterNumber.addEventListener('input', function() { 
  map.getLayers().getArray().filter(layer => layer.get('class') === 'points').forEach(
    layer => { layer.getSource().setDistance(parseInt(clusterNumber.value, 10)) }
  );
});


//Used to enable/disable text on points
let styleRember = [];
let state = "on";
function OnOffText(){
  //Hide text
  if (state == "on"){ 
    styleRember = new Array(clusterNo);
    for (var i = 0; i < clusterNo; i++){
      map.getLayers().getArray().filter(layer => layer.get('id') === 'points'+i).forEach(
        layer => {
          //Remember the text + color for that cluster of points
          styleRember[i] = layer.getStyle();    

          //Change style of points
          // layer.setStyle((feature) => {return stylePoints(feature, test[i], false)});
        }
      );
    }
    state = "off";
  }

  //Show text
  else{ 
    for (var i = 0; i < clusterNo; i++){
      map.getLayers().getArray().filter(layer => layer.get('id') === 'points'+i).forEach(
        layer => {
          layer.setStyle(styleRember[i]);
        }
      );
    }
    state = "on";
  } 
}
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
    controls: ol.control.defaults({ attribution: false, rotate: false }).extend([mousePositionControl]),
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
 

var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(1),
  projection: mercatorProjection,
  className: 'mousePos',
  target: document.getElementById('mouse-position')
});


// Appends a new searchBlock to the last searchBlock
function createBlock(){
  //Get this element
  let createBlock = document.getElementById("createBlock");

  //Add color picker 
  let colorPicker = document.createElement("input"); 
  colorPicker.type = "color";
  colorPicker.name = "color";
  colorPicker.className = "colorPicker";

  //Replace createBlock button with color picker
  createBlock.parentNode.insertBefore(colorPicker, createBlock); 
  createBlock.remove();

  //When choosing color, color picker will create the actual search block and recreate the "createBlock" button
  colorPicker.onchange = function(){ 

    //Add the search block
    newSearchBlock = document.createElement("div");
    newSearchBlock.id = "searchBlock" + searchBlockNo;
    lastSearchBlock = searchBlocks[searchBlockNo]; 
    lastSearchBlock.parentNode.insertBefore(newSearchBlock, lastSearchBlock.nextSibling); 

    //Add to our array
    searchBlockNo += 1;
    searchBlocks.push(newSearchBlock);

    //Add the collor
    newSearchBlock.style.backgroundColor = colorPicker.value;

    //Add the "createBlock" button back
    let button = createBlock.cloneNode(true); 
    selectGenerator.parentNode.insertBefore(button, selectGenerator.nextSibling);

    //Remove color picker
    colorPicker.remove(); 
  }
}  


//Used when submit button is pressed
function makeSearch() { 
  //We make a different search for every searchBlock   
  for (var index = 0; index <= searchBlockNo; index++)
  {  
    //Get the block from searchBlocks list
    let block = searchBlocks[index]; 

    //If block is empty continue
    if (block.childNodes.length == 0)
      continue;

    //Copy each value from that searchBlock into queryString
    let queryString = "";
    for ( var i = 0; i < block.childNodes.length; i++ ) {
      //Get the elements from that block
      var e = block.childNodes[i];  

      //If checkbox we are interested in true/false value
      if (e.type == "checkbox")
      { 
        queryString = queryString + e.name + "=" + e.checked + "&";
        continue;
      }

      //If is a remove button/div/span we skip it
      if (e.className == "removeButton" || e.value == undefined)
      {
        continue;
      }

      //If is text area/date that was uncompleted we simply ignore it (and show a message)
      if (e.value == ""){
        alert("empty data in " + e.name + " will not be sent to server!");
        continue;
      }

      //We get the name and values and add it to our query string
      queryString = queryString + e.name + "=" + e.value + "&";
    } 
    //Add the color
    let color = "rgb(0, 0, 0)";
    if (searchBlocks[index].id != "searchBlockStart")
      color =  searchBlocks[index].style.backgroundColor; 

    //Print the result locally + send it to server
    console.log("For block number " + index + " we have: " + queryString);
    queryToPoints(queryString, color);
  }

  return false;
}  


//Get data from db
async function getReq(queryString) {
  return new Promise((resolve, reject) => {
    try {
        fetch("http://127.0.0.1:8128/home?" + queryString, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, */*',
            'Content-type': 'application/json'
          }, 
        })
        .then((res) => res.json())
        .then((data) => resolve(data));
    }
    catch (error){
        reject(error);
    }
  });
} 


async function queryToPoints(queryString, color){
  //Refresh the points on map
  removeAllPoints();
  //todo add loading

  //Get json from server
  var json = await getReq(queryString); 
  var coordonatesObject = Object.values(json);   

  //Transform object into array of coordonates
  var coordonatesArray = [];
  for (var i = 0; i< coordonatesObject.length; i++){
    var lat = coordonatesObject[i].Start_Lat;
    var long = coordonatesObject[i].Start_Lng;  
    coordonatesArray.push([long, lat])
  } 
  
  //Add coordonates to map
  console.log(coordonatesArray);
  addPointsToMap(coordonatesArray, color); 
  console.log("done");
}

renderMap();
addRandomPoints2();
moving();
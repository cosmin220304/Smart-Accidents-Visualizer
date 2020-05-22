// let searchBlock0 = document.getElementById('searchBlock0');
let searchBlocks = [document.getElementById('searchBlockStart')]
let searchBlockNo = 0;
let selectGenerator = document.getElementById('addSelect'); 
const selectMap = { 
  "Source" : ['MapQuest', 'Bing'],
  "Severity" : ['1', '2', '3', '4'],
  "Side" : ['L', 'R'],
  "State" : ["AZ","AL","AK","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AS","GU","MP","PR","VI","UM"],
  "Country" : ["US"],
  "Timezone" : ["US/Pacific", "US/Mountain", "US/Central", "US/Easter"]
}
const dateMap = {
  "Start_Time" : ["2015-03-09", "2020-01-01"],
  "End_Time" : ["2016-02-08", "2020-11-01"],
  "Weather_Timestamp" : ["2016-02-08", "2020-01-01"]
}
const sliderMap = {

}
const nameToFunc = { 
  "Source" : newSelect, 
  "Severity" : newSelect,
  "Side" : newSelect,
  "State" : newSelect,
  "Country" : newSelect,
  "Timezone" : newSelect,
  "Start_Time" : newDate,
  "End_Time" : newDate,
  "Weather_Timestamp" : newDate,
  "Amenity" : newCheckbox,
  "Bump" : newCheckbox,
  "Crossing" : newCheckbox,
  "Give_Way" : newCheckbox,
  "Junction" : newCheckbox,
  "No_Exit": newCheckbox,
  "Railway": newCheckbox,
  "Roundabout" : newCheckbox,
  "Station" : newCheckbox,
  "Stop" : newCheckbox,
  "Traffic_Calming" : newCheckbox,
  "Traffic_Signal" : newCheckbox,
  "Turning_Loop" : newCheckbox,
  "Sunrise_Sunset" : newCheckbox,
  "Civil_Twilight" : newCheckbox,
  "Nautical_Twilight" : newCheckbox,
  "Astronomical_Twilight" : newCheckbox
}


//Adds all options to "selectGenerator" select from nameToFunc map
function IntializeSelectGenerator(){ 
  for(var name in nameToFunc) {
    let option = document.createElement("option");
    option.value = name;
    option.text = name;
    selectGenerator.appendChild(option);
  }
}


//Collomn name + remove button to select
function addTextToElement(element, text){
  let span = document.createElement("span");
  let button = document.createElement("button"); 
  const br = document.createElement("br");

  //Text before field
  text = text.replace("_", " ") + " : ";
  span.innerHTML = text; 
  element.parentNode.insertBefore(span, element);

  //Remove button
  button.className = "removeButton";
  button.onclick = function(){
    span.remove();
    element.remove();
    br.remove();
    button.remove();
  }
  element.parentNode.insertBefore(button, element.nextSibling);

  //Break line
  element.parentNode.insertBefore(br, button.nextSibling);
} 


//Creates a new html select 
function newSelect(){
  //Intialize variable
  let select = document.createElement("select"); 
  select.name = addSelect.value;
  searchBlocks[searchBlockNo].appendChild(select);

  //Values of select
  var values = selectMap[addSelect.value]
 
  //Add data for that select
  for (var i = 0; i < values.length; i++) {
    let option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    select.appendChild(option);
  }

  //Add data around this input
  addTextToElement(select, select.name);
}


//Creates a new html date 
function newDate(){
  //Intialize variable
  let date = document.createElement("input");
  date.name = addSelect.value; 
  date.type = "date";

  //Add lower and upper bound based on dateMap map
  date.min = dateMap[date.name][0];
  date.max = dateMap[date.name][1];

  //Add it to current searchBlock
  searchBlocks[searchBlockNo].appendChild(date); 

  //Add data around this input
  addTextToElement(date, date.name);
}


//Creates a new html checkbox 
function newCheckbox(){
   //Intialize variable
  let checkBox = document.createElement("input");
  checkBox.name = addSelect.value; 
  checkBox.type = "checkbox"; 

  //Add it to current searchBlock 
  searchBlocks[searchBlockNo].appendChild(checkBox); 

  //Add data around this input
  addTextToElement(checkBox, checkBox.name);
}
 

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


// Event listeners 
selectGenerator.addEventListener('change', function() {
  console.log(addSelect.value)
  const func = nameToFunc[addSelect.value];
  func()
  addSelect.value='0';
});  


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


IntializeSelectGenerator();
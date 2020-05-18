let selectParent = document.getElementById('emptySelectParent');
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

function Intialize(){ 
  for(var name in nameToFunc) {
    let option = document.createElement("option");
    option.value = name;
    option.text = name;
    selectGenerator.appendChild(option);
  }
}

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
  element.parentNode.insertBefore(button, colorPicker.nextSibling);

  //Break line
  element.parentNode.insertBefore(br, button.nextSibling);
} 

//Creates a new html select 
function newSelect(){
  //Intialize variables
  let select = document.createElement("select"); 
  select.name = addSelect.value;
  selectParent.appendChild(select);

  //Values of select
  var values = selectMap[addSelect.value]
 
  //Add data for that select
  for (var i = 0; i < values.length; i++) {
    let option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    select.appendChild(option);
  }

  addTextToElement(select, select.name);
}

//Creates a new html date 
function newDate(){
  //Intialize variables
  let date = document.createElement("input");
  date.name = addSelect.value; 
  date.type = "date";
  date.min = dateMap[date.name][0];
  date.max = dateMap[date.name][1];
  selectParent.appendChild(date); 
  addTextToElement(date, date.name);
}

//Creates a new html checkbox 
function newCheckbox(){
  let checkBox = document.createElement("input");
  checkBox.name = addSelect.value; 
  checkBox.type = "checkbox"; 
  selectParent.appendChild(checkBox); 
  addTextToElement(checkBox, checkBox.name);
}
 
function createColorPicker(){
  //Get this element
  let todo = document.getElementById("todo");

  //Add color picker 
  let colorPicker = document.createElement("input"); 
  colorPicker.type = "color";
  colorPicker.name = "color";
  colorPicker.className = "colorPicker";
  colorPicker.onchange = function(){  
    //Add the button back
    let button = todo.cloneNode(true);
    
    selectGenerator.parentNode.insertBefore(button, selectGenerator.nextSibling);

    //Remove this element
    colorPicker.remove();

    //todo:
    //add this below
  }
  todo.parentNode.insertBefore(colorPicker, todo); 
 
  //Remove this element
  todo.remove();
}  

// Event listeners 
selectGenerator.addEventListener('change', function() {
  console.log(addSelect.value)
  const func = nameToFunc[addSelect.value];
  func()
  addSelect.value='0';
}); 

selectGenerator.addEventListener('change', function() {
  console.log(addSelect.value)
  const func = nameToFunc[addSelect.value];
  func()
  addSelect.value='0';
}); 

//Used when submit button is pressed
function makeSearch() {  
  //Get the form from html
  const form = document.getElementById('form');
  let values = '';
  
  //Copy each value from form into values
  for ( var i = 0; i < form.elements.length - 1; i++ ) {
    var e = form.elements[i]; 
    if (e.type == "checkbox")
    { 
      values = values + e.name + "=" + e.checked + "&";
      continue;
    }
    if (e.className == "removeButton")
      continue;
    values = values + e.name + "=" + e.value + "&";
  } 
  
  //Call function
  values = values.slice(0, -1);
  console.log(values);
  //getReq(values);
  return false;
}  

//Get data from db
function getReq(params) {
  fetch("http://127.0.0.1:8128/home?" + params, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, */*',
      'Content-type': 'application/json'
    }, 
  })
  .then((res) => res.json())
  .then((data) => console.log(data)) 
} 


Intialize();
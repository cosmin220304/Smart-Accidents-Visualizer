const selectMap = { 
  "Source" : ["MapQuest","Bing"],
  "Severity" : ["1","2","3","4"],
  "Side" : ["L","R"],
  "State" : ["AZ","AL","AK","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AS","GU","MP","PR","VI","UM"],
  "Country" : ["US","Romania","asd","Alabama"],
  "Timezone" : ["US/Pacific","US/Mountain","US/Central","US/Easter"]
}
const dateMap = {
  "Start_Time" : ["2015-03-09","2020-01-01"],
  "End_Time" : ["2016-02-08","2020-11-01"],
  "Weather_Timestamp" : ["2016-02-08","2020-01-01"]
}
const sliderMap = {
  "Temperature(F)" : ["-78","167"],
  "Wind_Chill(F)" : ["-54","115"],
  "Humidity(%)" : ["0","100"],
  "Pressure(in)" : ["0","33"],
  "Visibility(mi)" : ["0","111"],
  "Wind_Speed(mph)" : ["0","823"],
  "Precipitation(in)" : ["0","25"],
  "TMC" : ["200","406"],
  "Distance(mi)" : ["0","100"]
}
// END

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
  "Temperature(F)" : newSlider,
  "Wind_Chill(F)" : newSlider,
  "Humidity(%)" : newSlider,
  "Pressure(in)" : newSlider,
  "Visibility(mi)" : newSlider,
  "Wind_Speed(mph)" :newSlider,
  "Precipitation(in)": newSlider,
  "TMC" : newSlider,  
  "Distance(mi)" : newSlider,
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
  "Astronomical_Twilight" : newCheckbox,
  "City": newTextArea,
  "County": newTextArea,
  "Number": newTextArea,
  "Street": newTextArea,
  "Zipcode": newTextArea,
  "Airport_Code": newTextArea
}

//Variables for tool
let searchBlocks = [document.getElementById("searchBlockStart")]
let searchBlockNo = 0;
let selectGenerator = document.getElementById("addSelect"); 
let deleteSearchBlock = false;

//Adds all options to "selectGenerator" select from nameToFunc map
function IntializeSelectGenerator(){ 
  for(var name in nameToFunc) {
    let option = document.createElement("option");
    option.id = name;
    option.value = name;
    option.text = name;
    selectGenerator.appendChild(option);
  }
}

var idNumber = 1; 
//Adds collomn name + remove button to select
function addTextToElement(element, text){ 
  //get option 
  let option = document.getElementById(element.name);

  //Creating a random id
  let idElement = "SelectId" + idNumber;
  element.id = idElement;
  idNumber ++;

  //Creating label for that select
  let label = document.createElement("LABEL");
  label.setAttribute("for", idElement);
  element.parentNode.insertBefore(label, element);
  
  //Setting the text for label
  text = text.replace("_", " ") + " : ";
  label.innerHTML = text; 

  //Create remove button and line break
  let button = document.createElement("button"); 
  const br = document.createElement("br");

  //If element is a text add a slider text
  let sliderText = undefined;
  if (element.type == "range"){
    sliderText = element.nextSibling;
    sliderText.parentNode.insertBefore(button, sliderText);
  }
  else
    element.parentNode.insertBefore(button, element.nextSibling);

  //Remove button
  button.className = "removeButton";
  button.name = "Delete element";
  button.onclick = function(){
    label.remove();
    element.remove();
    br.remove();
    if (!(sliderText === undefined))
      sliderText.remove();
    if (deleteSearchBlock == true)
    {
      if (button.parentNode.childElementCount == 1)
        destroyBlock(button.parentNode);
    }
    button.remove();
  }

  //Break line
  if (sliderText === undefined)
    element.parentNode.insertBefore(br, button.nextSibling);
  else 
    element.parentNode.insertBefore(br, sliderText.nextSibling);
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

  return select;
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

  return date;
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

  return checkBox;
}

//Creates a new html slider 
function newSlider(){
  //Creating slider
  let slider = document.createElement("input");
  slider.type="range";
  slider.class="slider"; 
  slider.name = addSelect.value;
  slider.min= sliderMap[slider.name][0];
  slider.max= sliderMap[slider.name][1];
  slider.step="0.1"; 

  //Creating slider text displaying values
  let sliderText = document.createElement("span");   
  sliderText.setAttribute("name", addSelect.value); 
  sliderText.innerHTML = slider.value;
  slider.oninput = ()=> { sliderText.innerHTML = slider.value; }

  //Add it to current searchBlock 
  searchBlocks[searchBlockNo].appendChild(slider); 
  slider.parentNode.insertBefore(sliderText, slider.nextSibling);

  //Add data around this input
  addTextToElement(slider, slider.name);

  return slider;
}

//Creates a new html textarea 
function newTextArea(){
  let txtArea = document.createElement("textarea")
  txtArea.name = addSelect.value;

  //Add it to current searchBlock 
  searchBlocks[searchBlockNo].appendChild(txtArea); 

  //Add data around this input
  addTextToElement(txtArea, txtArea.name);

  return txtArea;
}

// Event listeners 
selectGenerator.addEventListener("change", function() {
  const func = nameToFunc[addSelect.value];
  func();
  addSelect.value="0";
});  

IntializeSelectGenerator();
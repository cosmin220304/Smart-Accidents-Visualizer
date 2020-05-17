const selectParent = document.getElementById('emptySelectParent');
let selectGenerator = document.getElementById('addSelect');

function makeSearch() {  
  //Get the form from html
  const form = document.getElementById('form');
  let values = '';
  
  //Copy each value from form into values
  for ( var i = 0; i < form.elements.length - 1; i++ ) {
    var e = form.elements[i]; 
    if (e.type == "checkbox" && e.checked == false) 
      continue; 
    values = values + e.name + "=" + e.value + "&";
  } 
  
  //Call function
  values = values.slice(0, -1);
  console.log(values);
  postReq(values);
  return false;
} 

//Add data to db
function postReq(params) {   
  fetch("http://127.0.0.1:8128/home", {
    method: 'POST',
    headers: {
      'Accept': 'application/json, */*',
      'Content-type': 'application/json'
    },
    body: params
  })
  .then((res) => res.json())
  .then((data) => console.log(data)) 
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

//Creates a new html select 
function newSelect(name){
  //Intialize variables
  let select = document.createElement("select"); 
  select.name = name;
  selectParent.appendChild(select);

  //Values of select
  var values = ["1","12","123","1234"];
 
  //Add data for that select
  for (var i = 0; i < values.length; i++) {
    let option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    select.appendChild(option);
  }
}

// Event listeners
selectGenerator.addEventListener('change', function() {
  addSelect.value='0';
  newSelect("da"); 
});
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
  values = values.slice(0, -3);
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
function makeSearch() {  
  var form = document.getElementById('form');
  var values = '';
  
  for ( var i = 0; i < form.elements.length - 1; i++ ) {
    var e = form.elements[i]; 
    if (e.type == "checkbox" && e.checked == false) 
      continue; 
    values = values + e.name + "=" + e.value + "&";
 } 
  
  values = values.slice(0, -1);
  console.log(values);
  postReq(values);
  return false;
} 

function postReq(param) {  
  fetch("http://127.0.0.1:8128/home" , {
    method: 'POST',
    headers: {
      'Accept': 'application/json, */*',
       'Content-type': 'application/json'
    },
    body: JSON.stringify(param)
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
}     
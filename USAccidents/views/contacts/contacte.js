function sendData(){ 
  var el = document.getElementsByTagName("input")
  var message = document.getElementsByTagName("textarea")[0].value
  var data = {
    "name" : el[0].value, 
    "email" : el[1].value, 
    "phone" : el[2].value, 
    "message" : message
  } 
  postData(data);
  return false;
}

function postData(data) {
  try{
    fetch('http://127.0.0.1:8001/', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: JSON.stringify(data) 
    });
  }
  catch(e){
    console.log("couldn't send contacts to email service")
  }
}
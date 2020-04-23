function test(){
  var day = document.getElementById("BeforeDay").value; 

  var month = document.getElementById("BeforeMonth").value;

  var year = document.getElementById("BeforeYear").value;
  var param = "";
  param = param + 'BeforeDay=' + day + '&' + 'BeforeMonth=' + month + '&' + 'BeforeYear=' + year;
  console.log(param);
  asdf1234(param)
}

function merge(){
  console.log("merge!");
} 

function asdf1234(param) {
  // var msgFromServer;
  // $.post( "http://127.0.0.1:8127/home", function( data ) {
  //     msgFromServer = data.text;
  //     alert(data.text );
  // }); 
  var xhr = new XMLHttpRequest();  
  xhr.open("post", "http://127.0.0.1:8127/home");  
  xhr.send(param); 
  xhr.onreadystatechange = function() { 
    // If the request completed, close the extension popup 
    if (xhr.readyState == 4)
      if (xhr.status == 200)
        alert(xhr.responseText);
  }
}  

function test(){
  var day = document.getElementById("BeforeDay").value; 

  var month = document.getElementById("BeforeMonth").value;

  var year = document.getElementById("BeforeYear").value;
  var param = "";
  param = param + 'BeforeDay=' + day + '&' + 'BeforeMonth=' + month + '&' + 'BeforeYear=' + year;
  console.log(param);
  asdf1234(param)
}

function merge(){
  console.log("merge!");
}
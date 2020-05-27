const http = require('http');
const model = require('./models/model')
const authController = require("./controllers/authController")

port = 8000;      

//Start the model
model.start();

//Start the server
http.createServer( (request, response) => {
    //See request
    console.log('request', request.method, request.url)
    
    if (request.method == "POST")
    {
        authController.postHandler(request, response)
    }else
    if (request.method == "GET")
    {
        authController.getHandler(request, response)
    }
    else{
        response.writeHead(401, { 'Content-Type': 'text/html' });
        response.end('Failed to get method');
    }

      
}).listen(port) 

//Show server running
serverRunningTxt = 'Server running at http://127.0.0.1:' + port + '/'
console.log(serverRunningTxt)
 
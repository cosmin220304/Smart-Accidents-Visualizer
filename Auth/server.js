const http = require('http');
const model = require('./models/model')
const port = process.env.PORT || 8000;      
const routes = require("../Auth/routes/route")

//Start the model
model.start();

//Start the server
http.createServer( (request, response) => {
    //See request
    console.log('request', request.method, request.url)
    
    if (request.method == "POST")
    {
        routes.route(request, response)
    }else
    if (request.method == "GET")
    {
        routes.route(request, response)
    }
    else{
        response.writeHead(401, { 'Content-Type': 'text/html' });
        response.end('Failed to get method');
    }

      
}).listen(port) 

//Show server running
serverRunningTxt = 'Server running at http://127.0.0.1:' + port + '/'
console.log(serverRunningTxt)
 
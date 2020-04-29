var http = require('http');
var homeModel = require('./models/homeModel')
var homeRoutes = require('./routes/homeRoutes');
port = 8128;      

//Start the model
//homeModel = new homeModel();
homeModel.start();

//Start the server
http.createServer(function (request, response) {
    //See request
    console.log('request', request.method, request.url);    

    //Routes to controllers
    let homeRetCode = homeRoutes.route(request, response); 
     //todo: add routes adi
    //todo: add routes alex
    
    //If nothing found return '404 not found'
    if (homeRetCode == 404){
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("<html><body><p>404 page not found</p></body></html>");
    }

}).listen(port); 

//Show server running
serverRunningTxt = 'Server running at http://127.0.0.1:' + port + '/';
console.log(serverRunningTxt);
 
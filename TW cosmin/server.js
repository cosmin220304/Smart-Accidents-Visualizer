var http = require('http');
var homeModel = require('./models/homeModel')
var homeRoutes = require('./routes/homeRoutes');
var heatMapRoutes = require('./routes/heatMapRoutes');
var pieChartRoutes = require('./routes/pieChartRoutes');

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
    let heatMapRetCode = heatMapRoutes.route(request, response); 
    let pieChartRetCode = pieChartRoutes.route(request, response);
     //todo: add routes adi
    
    //If nothing found return '404 not found'
    if (homeRetCode == 404){
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("<html><body><p>404 page not found</p></body></html>");
    }
    if (heatMapRetCode == 404){
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("<html><body><p>404 page not found</p></body></html>");
    }
    if (pieChartRetCode == 404){
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("<html><body><p>404 page not found</p></body></html>");
    }


 


}).listen(port); 

//Show server running
serverRunningTxt = 'Server running at http://127.0.0.1:' + port + '/';
console.log(serverRunningTxt);
 
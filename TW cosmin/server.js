const http = require('http');
const model = require('./models/model')
const homeRoutes = require('./routes/homeRoutes');
const heatMapRoutes = require('./routes/heatMapRoutes');
const pieChartRoutes = require('./routes/pieChartRoutes');
const authRoutes = require('./routes/authRoutes')
port = 8128;      

//Start the model
model.start();

//Map of routes 
const routesMap = {
    '/'  : homeRoutes,
    '/home' : homeRoutes,
    '/home.html' : homeRoutes, 
    '/homeMapRenderer.js' : homeRoutes, 
    '/homeViewModeler.js' : homeRoutes, 
    '/home.css' : homeRoutes  
}

//Start the server
http.createServer(function (request, response) {
    //See request
    console.log('request', request.method, request.url)
 
    if (request.method == "GET")
    {
        //Check if you can get that resource
        let routeFound = routesMap[request.url]
        if (routeFound)
        {
            routeFound.route(request, response)
        }
        else
        {
            response.writeHead(404, {'Content-Type' : 'text/html'})
            response.end("404 not found")
        }
    }
    else if (request.method == "POST")
    {
        //todo
    }
    else if (request.method == "PUT")
    {
        //todo
    }
    else if (request.method == "DELETE")
    {
        //todo
    }
    else {
        response.writeHead(404, {'Content-Type' : 'text/html'})
        response.end("unrecognized method")
    }
      
}).listen(port) 

//Show server running
serverRunningTxt = 'Server running at http://127.0.0.1:' + port + '/'
console.log(serverRunningTxt)
 
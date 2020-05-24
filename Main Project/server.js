const http = require('http');
const model = require('./models/model')
const homeRoutes = require('./routes/homeRoutes');
const heatMapRoutes = require('./routes/heatMapRoutes')
const pieChartRoutes = require('./routes/pieChartRoutes')
const authRoutes = require('./routes/authRoutes')
const barGraphRoutes =  require('./routes/barGraphRoutes')
const publicRoutes = require('./routes/publicRoutes')
port = 8128;      

//Start the model
model.start();

//Map of routes 
const routesMap = {
    '/'  : homeRoutes,
    '/home' : homeRoutes,
    '/home.html' : homeRoutes, 
    '/homeMapRenderer.js' : homeRoutes,
    '/home.css' : homeRoutes,
    '/heatMap' : heatMapRoutes,
    '/heatMap.html' : heatMapRoutes,
    '/heatMap.css' : heatMapRoutes,
    '/heatMap.js' : heatMapRoutes,
    '/pieChart' : pieChartRoutes,
    '/pieChart.html' : pieChartRoutes,
    '/pieChart.css' : pieChartRoutes,
    '/pieChart.js' : pieChartRoutes,
    '/barGraph' : barGraphRoutes,
    '/bar.css' : barGraphRoutes,
    '/barGraph.html' : barGraphRoutes,
    '/tool.html' : publicRoutes,
    '/tool.js' : publicRoutes,
    '/topNav.html' : publicRoutes,
    '/topNav.css' : publicRoutes,
    '/footer.html' : publicRoutes,
    '/footer.css': publicRoutes,
}

const endPointsMap = {
    '/' : '/home.html',
    '/home' : '/home.html',
    '/heatMap' : '/heatMap.html',
    '/pieChart' : '/pieChart.html'
}

//Start the server
http.createServer(function (request, response) {
    //See request
    console.log('request', request.method, request.url)
 
    if (request.method == "GET")
    {
        //Removing the query string
        resource = request.url.split('?')[0] 

        //Send to correct route
        let routeFound = routesMap[resource]
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
    else if (request.method == "PUT")
    {
        deleteThisLater(request, response)
    }
    else if (request.method == "PATCH")
    {
        deleteThisLater(request, response)
    }
    else if (request.method == "DELETE")
    {
        deleteThisLater(request, response)
    }
    else {
        response.writeHead(404, {'Content-Type' : 'text/html'})
        response.end("unrecognized method")
    }
      
}).listen(port) 

function deleteThisLater(request, response)
{
    response.writeHead(404, {'Content-Type' : 'text/html'})
    response.end("unrecognized method :" + request.method)
}

//Show server running
serverRunningTxt = 'Server running at http://127.0.0.1:' + port + '/'
console.log(serverRunningTxt)
 
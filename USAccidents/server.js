const http = require('http');
const model = require('./models/model')
const homeRoutes = require('./routes/homeRoutes');
const heatMapRoutes = require('./routes/heatMapRoutes')
const pieChartRoutes = require('./routes/pieChartRoutes')
const authRoutes = require('./routes/authRoutes')
const barGraphRoutes = require('./routes/barGraphRoutes')
const publicRoutes = require('./routes/publicRoutes')
const contactRoute = require('./routes/contactRoute')
const HtmlAux = require('./microservices/HtmlAux')
const publicController = require('./controllers/publicController')
const dataObserver = require('./microservices/data observer')
const port = process.env.PORT || 8128;

//Start the model
model.start()

//Start html templater
HtmlAux.start()

//Start dataObserver microservice
dataObserver.start()

//Map of routes 
const routesMap = {
    '/': homeRoutes,
    '/home': homeRoutes,
    '/home.html': homeRoutes,
    '/homeButtonEvents.js': homeRoutes,
    '/homeMapRenderer.js': homeRoutes,
    '/downloadButtons.js': homeRoutes,
    '/home.css': homeRoutes,
    '/heatMap': heatMapRoutes,
    '/heatMap.html': heatMapRoutes,
    '/heatMap.css': heatMapRoutes,
    '/heatMap.js': heatMapRoutes,
    '/pieChart': pieChartRoutes,
    '/pieChart.html': pieChartRoutes,
    '/pieChart.css': pieChartRoutes,
    '/pieChart.js': pieChartRoutes,
    '/barGraph': barGraphRoutes,
    '/bar.css': barGraphRoutes,
    '/barGraph.html': barGraphRoutes,
    '/barGraph.js': barGraphRoutes,
    '/tool.html': publicRoutes,
    '/tool.js': publicRoutes,
    '/topNav.html': publicRoutes,
    '/topNav.css': publicRoutes,
    '/footer.html': publicRoutes,
    '/footer.css': publicRoutes,
    '/usaSVG.txt': publicRoutes,
    '/404.html': publicRoutes,
    '/404.css': publicRoutes,
    '/404_1.jpeg': publicRoutes,
    '/404_2.jpeg': publicRoutes,
    '/404_3.jpeg': publicRoutes,
    '/contacts': contactRoute,
    '/contacte.css': contactRoute,
    '/contacte.html': contactRoute,
    '/contacte.js': contactRoute,
    '/404_4.jpeg': publicRoutes,
    '/icons/add.png' : publicRoutes,
    '/icons/closedEye.png' : publicRoutes,    
    '/icons/download.png' : publicRoutes,
    '/icons/eye.png' : publicRoutes,
    '/icons/history.png' : publicRoutes,
    '/icons/save.png' : publicRoutes,
    '/icons/search.png' : publicRoutes,
    '/icons/flag.svg.png' : publicRoutes,
    '/report.html' : publicRoutes,
}

const acceptedSecuredRequests = ["POST", "PATCH", "PUT", "DELETE"];

//Start the server
http.createServer(function (request, response) {
    //See request
    console.log('request', request.method, request.url)

    if (request.method == "GET") {
        if (request.url.includes("/records")) {
            publicController.handleRecords(request, response);
        }
        else {
            //Removing the query string
            resource = request.url.split('?')[0]

            //Send to correct route
            let routeFound = routesMap[resource]
            if (routeFound) {
                routeFound.route(request, response)
            }
            else {
                publicController.resourceNotFound(response)
            }
        }
    }
    else if (acceptedSecuredRequests.includes(request.method)) {
        publicRoutes.route(request, response)
    }
    else {
        response.writeHead(405, { 'Content-Type': 'text/html' })
        response.end("method is not supported")
    }

}).listen(port)

//Show server running
serverRunningTxt = 'Server running at http://127.0.0.1:' + port + '/'
console.log(serverRunningTxt)

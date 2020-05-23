const barGraphController = require("../controllers/barGraphController")

//View path
const path = require('path'); 
const barGraphViewPath = path.join(__dirname, '..', 'views', 'barGraph')
 
async function route(request, response){   
    //Get the url and the query string from request  
    let url = request.url.split('?')[0];
    const query = request.url.split('?')[1]; 
      
    //Find the resource
    if (url == '/barGraph' || url == '/') 
        url = '/barGraph.html' 
    const resource = barGraphViewPath + url
 
    //Send to controller the request
    if (query === undefined){ 
        barGraphController.getHandler(response, resource) 
    }  
    else {  
        barGraphController.getHandlerWithQuery(response, resource, query) 
    }
}    

module.exports.route = route;
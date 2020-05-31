const homeController = require("../controllers/homeController")

//View path
const path = require('path'); 
const homeViewPath = path.join(__dirname, '..', 'views', 'home')
 
async function route(request, response){   
    //Get the url and the query string from request  
    let url = request.url.split('?')[0];
    const query = request.url.split('?')[1]; 
      
    //Find the resource
    if (url == '/home' || url == '/') 
        url = '/home.html' 
    const resource = homeViewPath + url
 
    //Send to controller the request
    if (query === undefined){ 
        homeController.getHandler(request, response, resource) 
    }  
    else {  
        homeController.getHandlerWithQuery(request, response, resource, query) 
    }
}    

module.exports.route = route;
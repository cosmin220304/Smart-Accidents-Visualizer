const contactController = require("../controllers/contactController")

//View path
const path = require('path'); 
const contactViewPath = path.join(__dirname, '..', 'views', 'contacts')
 
async function route(request, response){   
    //Get the url and the query string from request  
    let url = request.url.split('?')[0];
      
    //Find the resource
    if (url == '/contacts' || url == '/') 
        url = '/contacte.html' 
    const resource = contactViewPath + url
 
    //Send to controller the request
    contactController.getHandler(response, resource) 
}    

module.exports.route = route;
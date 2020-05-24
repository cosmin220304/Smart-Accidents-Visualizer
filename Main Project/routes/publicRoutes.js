const publicController = require("../controllers/publicController")

//View path
const path = require('path'); 
const publicResources = path.join(__dirname, '..', 'public')
 
async function route(request, response){ 
    const resource = publicResources + request.url 
    publicController.getHandler(resource, response) 
}    

module.exports.route = route;
const publicController = require("../controllers/publicController")
const checkAuth = require("../middleware/checkAuth")

//View path
const path = require('path'); 
const publicResources = path.join(__dirname, '..', 'public')
 
async function route(request, response){ 
    if (request.method == "GET"){
        const resource = publicResources + request.url 
        publicController.getHandler(resource, response) 
    }

    else if (request.method == "POST"){ 
        checkAuth.verify(request, response,  publicController.postHandler)
    }
    
    else if (request.method == "PUT"){
        checkAuth.verify(request, response,  publicController.putHandler)
    }

    else if (request.method == "PATCH"){
        checkAuth.verify(request, response,  publicController.patchHandler)
    }
}    

module.exports.route = route;
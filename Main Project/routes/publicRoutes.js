const publicController = require("../controllers/publicController")

//View path
const path = require('path'); 
const publicResources = path.join(__dirname, '..', 'public')
 
async function route(request, response){ 
    if (request.method == "GET"){
        const resource = publicResources + request.url 
        publicController.getHandler(resource, response) 
    }

    else if (request.method == "POST"){
        if (verify(body) == true) //verify in middleware if right token
            publicController.postHandler(request, response) 
    }
}    

module.exports.route = route;
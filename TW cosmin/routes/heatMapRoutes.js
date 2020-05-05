const heatMapController = require("../controllers/heatMapController");

//Resources we handle  
const availableResources = ['/heatMap', '/heatMap.html',  '/heatMap.css' , '/heatMap.js' ]

async function route(request, response){    
    //Request response
    let retCode = 404
    //Check if we are responsible for that resource or return 404
    if ( availableResources.includes(request.url) == false){ 
        return retCode
    }
 
    //Send to controller the request
    switch (request.method) {
        case "GET":
            retCode = heatMapController.getHandler(request, response); 
            break
        case "POST":
            retCode = heatMapController.postHandler(request, response);
            break    
        default:
            retCode = 404
    } 

    //Return 200 if everything went as expected
    return retCode
}    

module.exports.route = route;
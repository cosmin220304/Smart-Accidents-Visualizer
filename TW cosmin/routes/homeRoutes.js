const homeController = require("../controllers/homeController");

//Resources we handle  
const availableResources = ['/', '/home', '/home.html', '/homeMapRenderer.js', '/homeViewModeler.js', '/home.css' ]

function route(request, response){    
    //Request response code
    let retCode = 404

    //Check if we are responsible for that resource or return 404
    const url = request.url.split('?')
    if ( availableResources.includes(url[0]) == false){ 
        return retCode
    }

    //Send to controller the request
    switch (request.method) {
        case "GET":
            retCode = homeController.getHandler(request, response);
            break

        case "POST":
            retCode = homeController.postHandler(request, response);
            break

        default:
            retCode = 404
    } 

    //Return 200 if everything went as expected
    return retCode
}    

module.exports.route = route;
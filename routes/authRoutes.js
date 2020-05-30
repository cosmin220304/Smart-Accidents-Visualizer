const authController = require("../controllers/authController"); 

 function route(request, response){      
    //Send to controller the request
    switch (request.method) { 
        case "POST":
            retCode = authController.postHandler(request, response);
            break     
    }  
}    

module.exports.route = route;
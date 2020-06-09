const authController = require("../controllers/authController")

async function route(request, response) {
    if (request.method == "GET") {
        authController.getHandler(request, response)
    }
    
    else if (request.method == "POST") {
        if (request.url === "/register") { // /register route for POST
            authController.postRegisterHandler(request, response)
        }
        else{ // POST on every other route
            authController.postHandler(request, response)
        }
    }
}

module.exports.route = route;
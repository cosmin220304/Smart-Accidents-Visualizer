const authController = require("../controllers/authController")


async function route(request, response) {
    if (request.method == "GET") {
        authController.getHandler(request, response)
    }

    else if (request.method == "POST") {
        if (request.url === "/register") {
            authController.postRegisterHandler(request, response)
        }
        else{
            authController.postHandler(request, response)
        }

    }

}

module.exports.route = route;
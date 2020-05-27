const jwt = require('jsonwebtoken');
const key = require("./values.js")
const publicController = require("../controllers/publicController")

async function verify (request, response, next) {
    try {
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, key.secretKey)
        next(request, response)
    }
    catch (e){
        console.log(e)
        response.writeHead(403, 'aplication/json')
        response.write(JSON.stringify({ "Response" : "Failed to auth" }))
        response.end()  
    }
}

module.exports.verify = verify;
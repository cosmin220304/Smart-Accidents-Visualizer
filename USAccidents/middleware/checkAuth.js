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
        response.writeHead(403, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ "Response": "Success!" }))
        response.end()  
    }
}

module.exports.verify = verify;
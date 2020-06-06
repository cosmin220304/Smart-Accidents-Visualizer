const jwt = require('jsonwebtoken')
const key = require("../values.js")

module.exports.verifyAuth = (token, response) => {
    try {
        var verif = jwt.verify(token, key.secretKey)
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ "Response" : "Auth successful" }))
        response.end()
    } catch (e) {
        response.writeHead(403, 'aplication/json')
        response.write(JSON.stringify({ "Response" : "Failed to auth" }))
        response.end()
    }
}

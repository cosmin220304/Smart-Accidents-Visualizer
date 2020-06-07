const jwt = require('jsonwebtoken')
const key = require("../values.js")

module.exports.verifyAuth = (token, response) => {
    try {
        var verif = jwt.verify(token, key.secretKey)
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ "Response" : "Auth successful" }))
    } catch (e) {
        response.writeHead(401, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ "Response": "Failed to auth. Invalid token." }))
    }
}

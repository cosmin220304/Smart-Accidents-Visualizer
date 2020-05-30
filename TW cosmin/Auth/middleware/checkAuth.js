const jwt = require('jsonwebtoken')
const key = require("../values.js")

module.exports.verifyAuth = (request, response) => {
    try {
        var verif = jwt.verify(token, key.secretKey)
    } catch (e) {
        res.writeHead(403, 'aplication/json')
        res.write(JSON.stringify({ "Response" : "Failed to auth" }))
        res.end()
    }
}

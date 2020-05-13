const jwt = require('jsonwebtoken');
const key = require("../values.js")

module.exports = (req, res, next) => {
    const JWT_TOKEN = key.secretKey;
    try {
        const userData = jwt.verify(req.body.token, JWT_TOKEN);
        req.userData = userData;
        next();
    } catch (e) {
        return res.status(401).json({
            message: 'AUTH FAILED'
        })
    }
}

module.exports.verifyAuth = (request, response) => {
    try {
        var verif = jwt.verify(token, key.secretKey)
    } catch (e) {
        res.writeHead(403, 'aplication/json')
        res.write(JSON.stringify({ "Response" : "Failed to auth" }))
        res.end()
    }
}

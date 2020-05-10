const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const JWT_TOKEN = 'YOUR secret';
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

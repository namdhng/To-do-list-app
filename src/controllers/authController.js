const jwt = require('jsonwebtoken');
const config = process.env;

async function authToken(req, res, next) {
    const token = req.headers['auth_token'];
    if (!token) {
        return "Access denied!";
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
    } catch(err) {
        return err;
    }

    return next();
}

module.exports = authToken;
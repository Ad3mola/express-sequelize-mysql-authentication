const { user, AuthToken } = require('../models');
module.exports = async function(req, res, next) {
    const token = req.cookies.auth_token || req.headers.authorization;
    if (token) {
        const authToken = await AuthToken.find({ where: { token }, include: user});
        if(authToken) {
            req.user = authToken.user;
        }
    }
    next();
}
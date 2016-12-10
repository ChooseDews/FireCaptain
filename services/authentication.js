var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


var auth = function(db, logger, config, exports) {


    exports.signToken = signToken = function(payload) {
        return jwt.sign(payload, config.jwtSecret, {
            expiresIn: 60 * 60 * 24 * 2 // expires in 48 hours
        });
    };

    exports.validateToken = validateToken = function(token) {
        return Promise.promisify(jwt.verify)(token, config.jwtSecret).then(function(decoded) {
            return decoded;
        }).catch(function(err) {
            if (err.name && err.name == "TokenExpiredError") throw "Authentication Token Expired";
            throw "Error Decoding Authentication Token";
        });
    };

    exports.authMiddle = function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token']; //Search for the token;
        validateToken(token).then(function(user) {
            req.user = user;
            next();
        }).catch(function() {
            return authMiddleError('Invalid or no token provided', res);
        });
    };

    exports.districtMiddle = function(req, res, next) {
        if (!req.user || !req.user.district) return res.send(401);
        db.District.findById(req.user.district).then(function(district) {
            req.district = district;
            next();
        }).catch(function(err) {
            return authMiddleError('No district found', res);
        });
    };

    exports.authMiddleError = authMiddleError = function(message, res) {
        return res.status(401).send({
            success: false,
            message: 'Invalid or no token provided'
        });
    };

    exports.authenticateUser = function(email, password) {
        return db.Users.findOne({
            email: email.toLowerCase()
        }).then(function(user) {
            if(!user) throw "User Not Found";
            if (user.validPassword(password)) {
                user = user.toObject();
                user.token = signToken(user);
                return user;
            }
            if (!user.validPassword(password)) throw "Invalid Password";
        });
    };






    return exports;
};


module.exports = auth;

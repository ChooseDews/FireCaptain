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

    exports.saturateUser = function(req, res, next){
      var userId = req.user._id;
      db.Users.lookup(userId).then(function(user){
        req.user = user;
        next();
      });
    };

    exports.saturateSchool = function(req, res, next) {
        var school = req.user.school || req.body.school || req.query.school || req.params.school; //Search for the token;
        if (!school) return res.send(401);
        db.Schools.findById(school).then(function(school) {
            req.school = school;
            next();
        }).catch(function(err) {
            return authMiddleError('No school found', res);
        });
    };

    exports.saturateDistrict = function(req, res, next) {
        if (!req.user || !req.user.district) return res.send(401);
        db.Districts.findById(req.user.district).then(function(district) {
            req.district = district;
            next();
        }).catch(function(err) {
            return authMiddleError('No district found', res);
        });
    };

    exports.authMiddleError = authMiddleError = function(message, res) {
        return res.status(401).send({
            success: false,
            message: message
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

    exports.isSudo = function(req, res, next){
      if(!req.user || !req.user.permission.sudo){
         return authMiddleError('Invalid Permission Level', res);
      }
      next();
    }

    exports.isDistrict = function(req, res, next){
      if(!req.user || !req.user.permission.district){
         return authMiddleError('Invalid Permission Level', res);
      }
      next();
    }

    exports.isSchool = function(req, res, next){
      if(!req.user || !req.user.permission.school){
         return authMiddleError('Invalid Permission Level', res);
      }
      next();
    }

    exports.isDrill = function(req, res, next){
      if(!req.user || !req.user.permission.drill){
         return authMiddleError('Invalid Permission Level', res);
      }
      next();
    }






    return exports;
};


module.exports = auth;

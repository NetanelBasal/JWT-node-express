var jwt    = require('jwt-simple'),
    secret = require('./getConfigFile')().jwtSecret,
    moment = require("moment");

/**
 * Create the jwt token for the authenticated user
 * @param userId - the user id
 * @returns {String}
 */
function createJWT( userId ) {
  return jwt.encode({
    iss: userId,
    exp: moment().add(7, 'days').valueOf()
  }, secret);
}

module.exports = createJWT;
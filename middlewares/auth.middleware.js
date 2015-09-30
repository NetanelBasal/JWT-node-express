var jwt    = require('jwt-simple'),
    secret = require('./../helpers/getConfigFile')().jwtSecret,
    moment = require("moment");

/**
 * auth middleware, check if the user has valid token before the require authenticate route
 * if yes put the id of the user in the request object for later use.
 * @param req
 * @param res
 * @param next
 */
function authMw( req, res, next ) {

  if( req.headers.authorization ) {
    // get the part of the token after the Bearer
    var token = req.headers.authorization.split(' ')[1];

    try {
      var decoded = jwt.decode(token, secret);
      if( decoded.exp <= Date.now() ) {
        return res.status(400).json({ err: 'Access token has expired' });
      } else {
        req.userId = decoded.iss;
        next();
      }

    } catch( err ) {
      return res.status(401).json({ err: 'Access token invalid' })
    }
  } else {
    return res.status(401).json({ err: 'You dont provide token' })
  }

}

module.exports = authMw;
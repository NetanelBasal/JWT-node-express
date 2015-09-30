var User      = require(require('app-root-path') + '/models/user.model'),
    createJwt = require(require('app-root-path') + '/helpers/jwt-creator');

/**
 *
 * @param req
 * @param res
 * @constructor
 */
function LoginController( req, res ) {
  var body = req.body;
  User.findOne({ email: body.email }, function( err, user ) {
    if( err ) {
      return next(err);
    }
    if( !user ) {
      return res.status(400).json({ message: 'User/password does not valid.' });
    }
    if( !user.validPassword(body.password) ) {
      return res.status(400).json({ message: 'User/password does not valid.' })
    }
    var token = createJwt(user.id);

    return res.status(200).json({
      user : user,
      token: token
    });
  });
}

module.exports = LoginController;
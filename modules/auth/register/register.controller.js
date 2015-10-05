var User = require(require('app-root-path') + '/models/user.model'),
  createJwt = require(require('app-root-path') + '/helpers/jwt-creator');

/**
 *
 * @param req
 * @param res
 * @constructor
 */
function RegisterController(req, res) {
  var body = req.body;

  new User({
    email: body.email,
    name: body.name,
    password: body.password
  }).save(function(err, user) {

    if (err) return res.status(400).json(err.errors);

    var token = createJwt(user.id);

    return res.status(200).json({
      user: user,
      token: token
    });

  });

}

module.exports = RegisterController;
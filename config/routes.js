/**
 *
 * @param app
 * @returns {*}
 */
function appRoutes( app ) {
  app.use('/auth', require(require('app-root-path') + '/modules/auth/register/register.routes'));
  app.use('/auth', require(require('app-root-path') + '/modules/auth/login/login.routes'));
  return app;
}

module.exports = appRoutes;

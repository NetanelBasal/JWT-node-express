module.exports = function() {
  if( process.NODE_ENV === 'production' ) {
    return require('./../config/production');
  } else {
    return require('./../config/dev');
  }
}
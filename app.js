var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    config       = require('./helpers/getConfigFile')(),
    cors         = require('cors'),
    initRoutes   = require('./config/routes'),
    mongoose     = require('mongoose');

mongoose.connect(config.mongo);

var app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initRoutes(app);

// catch 404 and forward to error handler
app.use(function( req, res, next ) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if( app.get('env') === 'development' ) {
  app.use(function( err, req, res, next ) {
    res.status(err.status || 500);
    console.log(err);

  });
}

// production error handler
// no stacktraces leaked to user
app.use(function( err, req, res, next ) {
  res.status(err.status || 500);
  console.log(err);

});

module.exports = app;

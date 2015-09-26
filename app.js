var express         = require('express'),
    sassMiddleware  = require('node-sass-middleware'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    morgan          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    routes          = require('./routes/index'),
    srcPath         = __dirname + '/assets/',
    destPath        = __dirname + '/public/',
    app             = express();
    balls = "test";

var loggerOptions = {
        skip: function (req, res) { return res.statusCode < 400 }
    },
    logger = morgan('combined', loggerOptions);

app.listen(8080);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Sass Middleware Setup
app.use(sassMiddleware({
    src: srcPath,
    dest: destPath,
    debug: false,
    force: true,
    outputStyle: 'expanded'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
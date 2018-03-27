'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

const Raven = require('raven');
Raven.config('https://6c8ba2737aae4d81908677e4dba9be3f:26c83aa1a38a42cdbf0beea41a82cacf@sentry.io/231031').install();

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};



// Raven try catch

try {
//try config

  // console.log(config);
} catch (err) {
  console.trace(err);
  Raven.captureException(err);
  process.exit(1); // fatal
};





// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

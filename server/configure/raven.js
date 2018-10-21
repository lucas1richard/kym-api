const Raven = require('raven');

function configureRaven(app) {
  if (process.env.NODE_ENV === 'production') {
    const DSN = 'https://f3ce03f31c85417db55bee6dfeaf2533@sentry.io/1278573';
    Raven.config(DSN).install();
    
    // The request handler must be the first middleware on the app
    app.use(Raven.requestHandler());
  
    // The error handler must be before any other error middleware
    app.use(Raven.errorHandler());
  }
}

module.exports = configureRaven;

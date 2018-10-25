const Raven = require('raven');

function configureRaven(app) {
  if (process.env.NODE_ENV === 'production') {
    const DSN = process.env.RAVEN_DSN;
    Raven.config(DSN).install();
    
    // The request handler must be the first middleware on the app
    app.use(Raven.requestHandler());
  
    // The error handler must be before any other error middleware
    app.use(Raven.errorHandler());
  }
}

module.exports = configureRaven;

const globalStyles = require('../global-styles');
const validate = require('./validation');

async function makeWelcome(config) {
  await validate(config);
  const { name } = config;

  const template = `
    <html>
      <head>
        <style>
          ${globalStyles}
        </style>
      </head>
      <body>
        <h1>Hi ${name}!</h1>
        <p>Welcome to KnowYourMacros.com</p>
      </body>
    </html>
  `;

  return template;
}

module.exports = makeWelcome;

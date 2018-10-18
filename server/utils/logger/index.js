const winston = require('winston');
const chalk = require('chalk');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log', level: 'verbose' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    // colorize: true,
    // prettyPrint: true,
    // format: function(options) {
    //   const message = "";

    //   if (options.message !== undefined) {
    //     message = options.message;
    //   }

    //   const meta = "";

    //   if (options.meta && Object.keys(options.meta).length) {
    //     meta = `\n\t${JSON.stringify(options.meta)}`;
    //   }

    //   const level = options.level.toUpperCase();
    //   switch (level) {
    //     case "INFO":
    //       level = chalk.cyan(level);
    //       break;

    //     case "WARN":
    //       level = chalk.yellow(level);
    //       break;

    //     case "ERROR":
    //       level = chalk.red(level);
    //       break;

    //     default:
    //       break;
    //   }

    //   var output = [
    //     `[${options.timestamp()}][${level}]`,
    //     message,
    //     meta
    //   ];

    //   return output.join(" ");
    // }
  }));
}

module.exports = logger;
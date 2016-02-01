var fs      = require('fs')
  , path    = require('path')
  , winston = require('winston')
  , validLogLevels = ['silly', 'debug', 'verbose', 'info', 'warn', 'error'];

// in-line polyfill for a non-existing function in older Node.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
Array.prototype.includes = Array.prototype.includes || function (searchElement) {
  return this.indexOf(searchElement) > -1;
};


// ### Configures console logging based on settings
function configureConsoleLogging (options) {
  var treshold, timestamp, logEnabled, colorize;
  options = options || {};

  treshold   = options.treshold;
  timestamp  = options.timestamp || true;
  colorize   = options.colorize || true;
  logEnabled = validLogLevels.includes(treshold);

  if (logEnabled) {
    winston.add(winston.transports.Console, { level: treshold, timestamp: timestamp, colorize: colorize });
  }
}

// ### Configures file logging based on settings
function configureFileLogging (options) {
  var treshold, timestamp, logEnabled, logfile;
  options = options || {};

  treshold   = options.treshold;
  timestamp  = options.timestamp || true;
  logfile    = options.logfile || 'log/scout-winston.log';
  logEnabled = arrIncludes(validLogLevels, treshold);

  if (logEnabled) {
    // prepare path for winston to write to and set logging file on path prepared successfully
    try { fs.mkdirSync(path.dirname(logfile)); }
    catch (err) {}

    winston.add(winston.transports.File, { level: treshold, filename: logfile, timestamp: timestamp });
  }
}


exports.init = function init(options) {
  options = options || {};

  // remove default console, and if console logging enabled, add new console with our custom settings
  // headless testing doesn't have console instance attached, try-catch to prevent failure
  try { winston.remove(winston.transports.Console); } catch (err) {}
  configureConsoleLogging(options.console);
  configureFileLogging(options.file);
};

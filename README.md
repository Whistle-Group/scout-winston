# scout-winston

A tiny custom configuration module around
[Winston logger](https://github.com/winstonjs/winston).

This Winston configuration module is a result of having the same custom
configuration logic over multiple backend services powering the
[Scout Finance](http://www.scoutfin.com/) app, which got abstracted
away to avoid repeating it over and over again.

Also, this module is pretty much not intended to have a wide public
adoption, it's a result of our custom needs. Still, if you like the
approach - feel free to use it.


## How to install

```
$ npm install scout-winston
```


## How to use

At your application startup, invoke this module passing it an options object,
containing general logger configuration, and specific configuration for each
of the supported loggers.

```
require('scout-winston').init({
  console: {
    treshold : 'error',
    timestamp: true,
    colorize : true,
  },
  file: {
    treshold : 'info',
    timestamp: true,
    logfile: '/path/to/logfile'
  }
});

var log = require('winston');
log.info('This is an "info" level log message');
```

Calling `init()` on the `scout-winston` module configures Winston logger according
to the custom configuration provided. Afterwards, all the logging is made by using
`winston` directly, as shown in the above example. Without the `scout-winston`
initialization, Winston will just work with its default configuration.

Log levels are [Winston's default](https://github.com/winstonjs/winston#logging-levels):
`silly`, `debug`, `verbose`, `info`, `warn`, `error`.

##### Supported options:

  * `console` - console logger options
    * `treshold` - minimum log level for messages to be logged; empty value, or any value outside of configured log levels disables the logger
    * `timestamp` - option to add timestamps to log messages; defaults to `true`
    * `colorize` - option to color the output; defaults to `true`
  * `file` - file logger options
    * `treshold` - _same as above_
    * `timestamp` - _same as above_
    * `logfile` - path to the log file; defaults to `log/scout-winston.log`


## Changelog

* 0.2.0 - Change Array.includes from a prototype to a helper function due to weird behaviour with Lodash
* 0.1.0 - Initial release

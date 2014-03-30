var _ = require("underscore");
var utils = require('../lib/utils');

var defaultOptions = {
    browsers: ['PhantomJS'],
    singleRun: true
};

/**
 * options
 *   config:    [string] path to karma config file
 *   browsers:  [array/string] list of browsers to run the tests
 *   singleRun: [boolean] run only once or watch files and run multiple times
 */

var karmaTask = function(options) {
    _.defaults(options, defaultOptions);

    utils.section('Running JavaScript tests');

    var browsers = options.browsers;
    var browsers = _.isArray(browsers) ? browsers.join(',') : browsers;

    utils.bin('karma', [
        'start',
        options.config,
        '--browsers ' + browsers,
        options.singleRun ? '--single-run' : ''
    ]);
};

karmaTask.description = "Js unit tests";

module.exports = karmaTask;
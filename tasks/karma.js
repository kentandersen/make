var path = require('path');
var _ = require('underscore');
var utils = require('../lib/utils');

var defaultOptions = {
    cms: 'start',
    browsers: ['PhantomJS'],
    singleRun: true
};

/**
 * options
 *   configFile:    [string] path to karma config file
 *   browsers:      [array/string] list of browsers to run the tests
 *   singleRun:     [boolean] run only once or watch files and run multiple times
 */

var karmaTask = function(opt) {
    _.defaults(opt, defaultOptions);

    utils.section('Running JavaScript tests');

    if(!_.isArray(opt.browsers)) {
        opt.browsers = [opt.browsers];
    }

    // add maks node_modules to node path to make karma-cli find the karma executable
    var nodeModules = path.join(__dirname, '..', 'node_modules');
    process.env.NODE_PATH += path.delimiter + nodeModules;

    var args = ['start', opt.configFile];
    if(opt.browsers) {
        args.push('--browsers ' + opt.browsers.join());
    }

    if(opt.singleRun) {
        args.push('--single-run');
    }

    utils.bin('karma', args);
};

karmaTask.description = "JavaScript unit tests";

module.exports = karmaTask;
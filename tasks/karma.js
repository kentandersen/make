var fs = require('fs');
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

    var localKarma = path.normalize(path.join(__dirname, '..', 'node_modules', 'karma'));

    if (fs.existsSync(localKarma)) {
        var karmaServer = require(path.join(localKarma, 'lib', 'server'));

        karmaServer.start(opt);
    } else {
        console.error('Cannot find local Karma!');
    }
};

karmaTask.description = "JavaScript unit tests";

module.exports = karmaTask;
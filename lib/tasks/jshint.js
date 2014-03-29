var path = require('path');
var _ = require("underscore");
var utils = require('../utils');

var defaultOptions = {
    config: path.join(__dirname, '..', 'config', 'jshint.json')
};

/**
 * options
 *   files:     [array] list of files to check
 *   config:    [string] path to json config file
 */

var jsHintTask = function(options) {
    _.defaults(options, defaultOptions);


    var files = options.files;
    var config = options.config;

    utils.section('Running JSHint ' + files.length + ' files');
    utils.bin('jshint', ['--config ' + config, files.join(' ')]);
};


module.exports = jsHintTask;
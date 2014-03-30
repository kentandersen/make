var path = require('path');
var _ = require("underscore");
var utils = require('../lib/utils');

var defaultOptions = {
    config: path.join(__dirname, '..', 'config', 'jshint.json')
};

/**
 * options
 *   files:     [array] list of files to check
 *   config:    [string] path to json config file
 *   exclude:   [string] part of file path to be excluded
 */

var jsHintTask = function(options) {
    _.defaults(options, defaultOptions);


    var files = options.files;
    var config = options.config;

    files = _.filter(files, function(file) {
        return file.indexOf(options.exclude) === -1;
    });

    utils.section('Running JSHint ' + files.length + ' files');
    utils.bin('jshint', ['--config ' + config, files.join(' ')]);
};

jsHintTask.description = "Jshint verification for all *.js files"

module.exports = jsHintTask;
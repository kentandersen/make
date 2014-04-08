var path = require('path');
var _ = require("underscore");
var utils = require('../lib/utils');

var defaultOptions = {
    configFile: path.join(__dirname, '..', 'config', 'jshint.json')
};

/**
 * options
 *   files:         [array] list of files to check
 *   configFile:    [string] path to json config file
 *   exclude:       [string] part of file path to be excluded
 */


var jsHintTask = function(options) {
    _.defaults(options, defaultOptions);

    var configFile = options.configFile;
    var files = options.files;
    var excludes = options.exclude;
    excludes = _.isArray(excludes) ? excludes : [excludes];


    files = _.filter(files, function(file) {
        return _.every(excludes, function(exclude) {
            return file.indexOf(exclude) === -1;
        });
    });

    utils.section('Running JSHint ' + files.length + ' files');
    utils.bin('jshint', ['--config ' + configFile, files.join(' ')]);
};

jsHintTask.description = "Jshint verification for all *.js files"

module.exports = jsHintTask;
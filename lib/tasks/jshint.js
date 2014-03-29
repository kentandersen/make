var utils = require("../utils");

/*
 * options
 *   files:     [array] list of files to check
 *   config:    [string] path to json config file
 */

var jsHintTask = function(options) {

    var files = options.files;
    var config = options.config;

    section('Running JSHint ' + files.length + ' files');
    utils.bin('jshint', ['--config ' + config, files.join(' ')]);
};


module.exports = jsHintTask;
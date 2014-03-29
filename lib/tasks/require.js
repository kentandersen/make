var utils = require("../utils");

/*
 * options
 *   outputFile:    [array] list of files to check
 *   config:        [string] path to rjs config file
 */

var requirejsTask = function(options) {
    var outputFile = options.file;
    var rjsConfig = options.config;

    section('Building JavaScript → ' + outputFile);
    utils.bin('r.js', ['-o ' + rjsConfig, 'out=' + outputFile]);
};


module.exports = requirejsTask;
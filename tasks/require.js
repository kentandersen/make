var utils = require("../lib/utils");

/**
 * options
 *   outputFile:    [array] file to save to
 *   config:        [string] path to rjs config file
 */

var requirejsTask = function(options) {
    var outputFile = options.outputFile;
    var rjsConfig = options.config;

    utils.section('Building JavaScript → ' + outputFile);
    utils.bin('r.js', ['-o ' + rjsConfig, 'out=' + outputFile]);
};

requirejsTask.description = "Optimizes all usage of bear";

module.exports = requirejsTask;
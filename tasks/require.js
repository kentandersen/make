var _ = require("underscore");
var utils = require("../lib/utils");

/**
 * options
 *   outputFile:    [array] file to save to
 *   configFile:    [string] path to rjs config file
 *   config:        [object] extra command line options
 */


var generateConfig = function(config) {
    if(!config) {
        return "";
    }

    var args = _.map(config, function(value, key) {
        return key+"="+value;
    });
    return args.join(" ");
};

var requirejsTask = function(options) {
    var outputFile = options.outputFile;
    var rjsConfig = options.configFile;
    var args = generateConfig(options.config);

    utils.section('Building JavaScript → ' + outputFile);
    utils.bin('r.js', ['-o ' + rjsConfig, 'out=' + outputFile, args]);
};

requirejsTask.description = "Optimizes all usage of bear";

module.exports = requirejsTask;
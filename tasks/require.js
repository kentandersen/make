var path = require("path")
var _ = require("underscore");
var utils = require("../lib/utils");

/**
 * options
 *   inputModule    [array/string] modules to build
 *   outputFile:    [string] path to save single built files, not in use with inputModule
 *   outputDir:     [string] path to save built files, only in use with inputModule
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

    if(options.inputModule) {
        var inputModule = options.inputModule;
        var inputModule = _.isArray(inputModule) ? inputModule : [inputModule];

        inputModule.forEach(function(module) {
            var outputFile = path.join(options.outputDir, path.basename(module) + '.js');
            utils.section('Building JavaScript → ' + outputFile);
            utils.bin('r.js', ['-o ' + rjsConfig, 'out=' + outputFile, 'name=' + module, args]);
        });
    } else {
        utils.section('Building JavaScript → ' + outputFile);
        utils.bin('r.js', ['-o ' + rjsConfig, 'out=' + outputFile, args]);
    }

};

requirejsTask.description = "Optimizes requirejs modules and produces one file";

module.exports = requirejsTask;
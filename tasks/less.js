var _ = require("underscore");
var utils = require("../lib/utils");

var defaultOptions = {
    inlineImages: true
};

/**
 * options
 *   inputFile:     [string] path to main less file
 *   outputFile:    [string] file to save to
 *   inlineImages:  [boolean] inline data-uri to image files,
 *   rootImagePath: [string] path to calculate root based image urls
 */

var lessjsTask = function(options) {
    _.defaults(options, defaultOptions);

    var inputFile = options.inputFile;
    var outputFile = options.outputFile;

    utils.section('Building Less → ' + outputFile);

    utils.bin('lessc', [
        '--relative-urls',
        '--yui-compress',
        inputFile,
        outputFile
    ]);

    if(options.inlineImages) {
        utils.bin('imageinliner', [
            '-i ' + outputFile,
            '--overwrite',
            '--compress',
            '--rootPath ' + options.rootImagePath
        ]);
    }
};

lessjsTask.description = "Compiles and compresses less into css";

module.exports = lessjsTask;

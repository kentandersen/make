var path = require("path");
var fs = require("fs");
var _ = require("underscore");
var UglifyJS = require("uglify-js");
var utils = require("../lib/utils");

var defaultOptions = {
    basePath: process.cwd()
};

/**
 * options
 *   inputFiles:    [array] js files to be minified
 *   outputFile:    [string] file to save to
 *   basePath:      [string] reference path for all js files
 */


var buildjsTask = function(options){
    _.defaults(options, defaultOptions);

    var inputFiles = options.inputFiles
    var outputFile = options.outputFile

    utils.section('Building JavaScript');

    var filesToBeCompressed = _.map(inputFiles, function(file) {
        return path.resolve(options.basePath, file);
    });

    var compressedJS = UglifyJS.minify(filesToBeCompressed);

     // save to file
    utils.ensureDir(path.dirname(outputFile));
    fs.writeFileSync(outputFile, compressedJS.code);
    utils.success();
};

buildjsTask.description = "Compresses js file";

module.exports = buildjsTask;
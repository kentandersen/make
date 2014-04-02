require('shelljs/global');
var path = require("path");
var fs = require("fs");
var utils = require("../lib/utils");
var imageinliner = require("imageinliner");

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
    var inputFile = options.inputFile;
    var outputFile = options.outputFile;
    var outputDir = path.dirname(outputFile);

    utils.section('Minifying CSS → ' + outputFile);

    var res = utils.bin('uglifycss', [inputFile], {silent: true});
    if(res.code === 0) {
        var minifiedCss = res.output;

        // inline background images
        if(options.inlineImages) {
            minifiedCss = inliner.css(minifiedCss, {
                maxImageFileSize:   10240,
                cssBasePath:        path.dirname(outputFile),
                rootImagePath:      options.rootImagePath,
                compressOutput:     true
            });
        }

        // write css to file
        utils.ensureDir(outputDir);
        fs.writeFileSync(outputFile, minifiedCss);
        //utils.success();
    } else {
        utils.fail();
    }
};

lessjsTask.description = "Compresses css file";

module.exports = lessjsTask;

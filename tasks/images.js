require('shelljs/global');
var glob = require("glob");
var path = require("path");
var utils = require("../lib/utils");

/**
 * options
 *   inputDir:      [string] directory with files to be optimized
 *   outputDir:     [string] directory to copy optimized image files
 */

var optimizePngImages = function(pngs) {
    if(pngs.length > 0) {
        utils.bin('optipng', ['-strip all', '-o7', '-zm1-9', '-clobber', pngs.join(' ')], {silent: true})
    }
};

var optimizeSvgImages = function(svgs) {
    if(svgs.length > 0) {
        svgs.forEach(function(svg) {
            utils.bin('svgo', svg, {silent: true});
        });
    }
};

var buildimages = function(options) {

    var inputDir = options.inputDir;
    var outputDir = options.outputDir;

    utils.section('Copying resources ' + inputDir + ' → ' + outputDir);

    cp('-rf', path.join(inputDir, '*'), outputDir);
    utils.success();

    utils.section('Optimizing images');

    var pngs = glob.sync(path.join(outputDir, '**', '*.png'), {nocase: true});
    optimizePngImages(pngs);

    var svgs = glob.sync(path.join(outputDir, '**', '*.svg'), {nocase: true});
    optimizeSvgImages(svgs);
};

buildimages.description = "Copies and optimizes png and svg images";

module.exports = buildimages;

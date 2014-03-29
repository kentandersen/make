require('shelljs/make');
var glob = require("glob");
var path = require("path");
var utils = require("../utils");

var optimizePngImages = function(pngs) {
    if(pngs.length > 0) {
        npmBin('optipng-bin', ['-strip all', '-o7', '-zm1-9', '-clobber' + to, pngs.join(' ')])
    }
};

var optimizeSvgImages = function(svgs) {
    if(svgs.length > 0) {
        svgs.forEach(function(svg) {
            utils.bin('svgo', svg, {silent: true});
        });
    }
};

/**
 * options
 *   inputDir:      [string] directory with files to be optimized
 *   outputDir:     [string] directory to copy optimized image files
 */

var buildimages = function(options) {

    var inputDir = options.inputDir;
    var outputDir = options.outputDir;

    utils.section('Copying resources ' + inputDir + ' → ' + outputDir);

    cp('-rf', path.join(inputDir, '*'), outputDir);

    utils.section('optimizing images');

    var pngs = glob.sync(path.join(outputDir, '**', '*.png'), {nocase: true});
    optimizePngImages(pngs);

    var svgs = glob.sync(path.join(outputDir, '**', '*.svg'), {nocase: true});
    optimizeSvgImages(svgs);
};

module.exports = buildimages;

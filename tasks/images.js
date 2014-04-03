require('shelljs/global');
var glob = require("glob");
var path = require("path");
var _ = require("underscore");
var npmBin = require("npm-bin");
var ProgressBar = require('progress');
var utils = require("../lib/utils");

var defaultOptions = {
    failOnError: true
};

/**
 * options
 *   inputDir:      [string] directory with files to be optimized
 *   outputDir:     [string] directory to copy optimized image files
 */
var buildimages = function(options) {
    _.defaults(options, defaultOptions);
    var inputDir = options.inputDir;
    var outputDir = options.outputDir;

    var done = function (isSuccess) {
        if(isSuccess) {
            utils.success();

        } else if(!options.failOnError) {
            utils.skipped();

        } else {
            utils.fail();
        }
    }


    var optimizePngImages = function(pngs) {
        if(pngs.length > 0) {
            console.log("Handeling pngs");
            var bar = new ProgressBar(':bar', { total: pngs.length });

            var success = _.every(pngs, function(png) {
                bar.tick();
                return npmBin('optipng', ['-strip all', '-o7', '-zm1-9', '-clobber', png], {silent: true}).code !== 0;
            });

            done(success);
        }
    };

    var optimizeSvgImages = function(svgs) {
        if(svgs.length > 0) {
            console.log("Handeling svgs");
            var bar = new ProgressBar(':bar', { total: svgs.length });

            var success = _.every(svgs, function(svg) {
                bar.tick();
                return npmBin('svgo', svg, {silent: true}).code === 0;
            });

            done(success);
        }
    };

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

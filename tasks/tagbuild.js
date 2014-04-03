#!/usr/bin/env node

require('shelljs/global');
var _ = require('underscore');
var versiony = require('versiony');
var utils = require('../lib/utils');

var defaultOptions = {
    buildBranch: 'master'
};

/**
 * options
 *   buildDir:          [string] build directory to be checked in
 *   masterVersionFile: [string] file holding current version
 *   slaveVersionFile:  [string/array] files to inherit version from masterVersionFile
 *   buildBranch:       [string] branch to push changes to
 */


var tagBuild = function(options) {
    _.defaults(options, defaultOptions);

    var buildBranch = options.buildBranch

    if(options.buildDir) {
        exec('git add ' + options.buildDir + ' -f');
        exec('git commit -m "added built files"');
    }

    // bump version number
    var version = versiony.from(options.masterVersionFile)
    var v = version.get();

    var slaveFiles = options.slaveVersionFile
    if(slaveFiles) {
        utils.section('Adding updated version files');

        slaveFiles = _.isArray(slaveFiles) ? slaveFiles : [slaveFiles];

        _.forEach(slaveFiles, function(slaveFile) {
            version.to(slaveFile);
            exec('git add ' + slaveFile);
        });
        exec('git commit -m "bumped version"');

        utils.success();
    }

    utils.section('Adding tag for version ' + v);

    exec('git tag '+ v +' -m "added version tag" --force');

    exec('git push --tags --force origin HEAD:' + options.buildBranch);
    exec('git push origin HEAD:' + options.buildBranch);

    utils.success();
};

tagBuild.description = "Creates tag for version number";

module.exports = tagBuild;
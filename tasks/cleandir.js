require('shelljs/global');
var utils = require("../lib/utils");

/**
 * options
 *   dir:       [string] path to director to be cleaned
 */

var cleanDirTask = function(options) {

    var dir = options.dir;

    utils.section('Cleaning directory ' + dir);

    if (test('-d', dir)) {
        rm('-rf', dir);
    }

    mkdir('-p', dir);

    utils.success();
};

cleanDirTask.description = "Cleans directory";

module.exports = cleanDirTask;



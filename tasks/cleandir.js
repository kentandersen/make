require('shelljs/global');

/**
 * options
 *   dir:       [string] path to director to be cleaned
 */

var cleanDirTask = function(options) {
    var dir = options.dir;

    if (test('-d', dir)) {
        rm('-rf', dir);
    }

    mkdir('-p', dir);

    return dir;
};

cleanDirTask.description = "Cleans directory";

module.exports = cleanDirTask;



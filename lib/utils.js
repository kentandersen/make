require('colors');
require('shelljs/make');

var npmBin = require('npm-bin');

module.bin = function(name, args, options) {
    var res = npmBin(name, args, options);
    module.done(res);
};


module.done = function(res) {
    if (res.code === 0) {
        module.success();
    } else {
        module.fail();
    }
};

module.success = function(text) {
    text = text || 'done';
    var s = isWin ? '»' : '✓';
    echo('    ' + s.green + ' ' + text.green);
};

module.fail = function(text) {
    text = text || 'failed';
    var s = isWin ? '×' : '✘';
    echo('    ' + s.red + ' ' + text.red);
    exit(1);
};
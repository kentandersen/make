require('colors');
require('shelljs/global');

var path = require('path');
var npmBin = require('npm-bin');
var isWin = (process.platform === 'win32');

exports.bin = function(name, args, options) {
    options = options || {};
    var res = npmBin(name, args, options);
    exports.done(res);

    return res;
};


exports.done = function(res) {
    if (res.code === 0) {
        exports.success();
    } else {
        exports.fail();
    }
};

exports.success = function(text) {
    text = text || 'done';
    var s = isWin ? '»' : '✓';
    echo(s.green + ' ' + text.green);
};

exports.fail = function(text) {
    text = text || 'failed';
    var s = isWin ? '×' : '✘';
    echo(s.red + ' ' + text.red);
    exit(1);
};

exports.skipped = function(text) {
    text = text || 'skipped';
    var s = '!';
    echo('    ' + s.yellow + ' ' + text.yellow);
};

exports.section = function(header) {
    echo();
    echo(header.bold);
};

exports.padStr = function(str, length) {
    if(str.length < length) {
        for (var i = str.length; i < length; i++) {
            str += " ";
        };
    }

    return str;
};

exports.ensureDir = function(dir) {
    mkdir('-p', dir);
};
var fs = require("fs");
var path = require("path");

var _ = require("underscore");

exports.addTask = function(file) {
    var fileName = path.basename(file, ".js");
    exports[fileName] = require(file);

};

exports.addTasksFromFolder = function(tasksFolder) {
    var tasksFiles = fs.readdirSync(tasksFolder);

    // adding tasks
    _.each(tasksFiles, function (file) {
        exports.addTask(path.join(tasksFolder, file));
    });
};
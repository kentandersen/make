var fs = require("fs");
var path = require("path");

var _ = require("underscore");

var tasksFolder = path.join(__dirname, "tasks");
var tasksFiles = fs.readdirSync(tasksFolder);


// adding tasks
_.each(tasksFiles, function (file) {
    var fileName = path.basename(file, ".js");
    exports[fileName] = require(path.join(tasksFolder, fileName));
});

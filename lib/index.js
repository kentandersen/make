var path = require("path");
var JobGroup = require("./group");
var tasks = require("./tasks");

var tasksFolder = path.join(__dirname, "..", "tasks");
tasks.addTasksFromFolder(tasksFolder);

module.exports = new JobGroup("all");
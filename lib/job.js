var _ = require("underscore");
var utils = require("./utils");
var tasks = require("./tasks");

var getTask = function() {
    var task = tasks[this.task];

    if(_.isFunction(task)) {
        return task
    } else {
        console.error("No task with the name of " + this.task);
        exit(1);
    }
};

var Job = function(name, task, options) {
    this.name = name;
    this.task = task;
    this.options = options;
};

_.extend(Job.prototype, {

    run: function() {
        var task = getTask.call(this);
        task.call(this, this.options);
    },

    print: function(prefix) {
        var task = getTask.call(this);
        var name = utils.padStr(this.name, 12);
        var description = this.options.description || task.description || "";

        console.log([prefix, name, description].join(" "));
    }

});



module.exports = Job;
var _ = require("underscore");
var utils = require("./utils");
var Job = require("./job");
var done = require("./done");

var JobGroup = function(name, options) {
    this.jobs = [];
    this.name = name;
    this.options = options || {};
};

_.extend(JobGroup.prototype, {

    addGroup: function(groupName, options) {
        // add group to job list, return new group;
        var group = new JobGroup(groupName, options);
        this.jobs.push(group);

        return group;
    },

    addJob: function(jobName, taskName, options) {
        // add job to internal job list
        this.jobs.push(new Job(jobName, taskName, options));
        return this;
    },

    run: function () {
        if(this.options.skip) {
            return;
        }
        _.invoke(this.jobs, "run");
    },

    done: function() {
        done.call(this);
    },

    print: function(indent) {
        indent = indent || "";
        var name = indent + " " + utils.padStr(this.name, 6);
        _.invoke(this.jobs, "print", name);
        console.log("");
    }

});


module.exports = JobGroup;

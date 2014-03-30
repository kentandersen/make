var _ = require("underscore");

module.exports = function() {

    if(process.argv[2] === "--help") {
        console.log("usage: make [group] [job]\n");

        _.invoke(this.jobs, "print");
        return;
    }


    var current = this;
    _.each(process.argv.slice(2), function(arg) {

        if(current.name === arg) {
            current = current;
        } else {

            current = _.find(current.jobs, function(job) {
                return job.name === arg;
            });

            if(!current) {
                console.error("No job with the name " + arg);
                exit(1);
            }
        }
    });

    current.run();
};
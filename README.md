## Make framework

Task based build framework for frontend apps


Usage:
```
var make = require('make');

make.addGroup('build')
    .addJob('cleandir', 'cleandir', {
        dir:    'build'
    })
    .addJob('jshint', 'jshint', {
        files:  glob.sync('webapp', 'js', '**', '*.js')),
        dir:    'build'
    });
    

make.addGroup('test')
    .addJob('js', 'karma', {
        config:     path.join('config', 'karma.conf.js')
    });

...

make.done();

```

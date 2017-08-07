var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');

var app = funnel('app', {
    include: ['index.html']
});

module.exports = merge([app]);

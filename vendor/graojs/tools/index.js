var config = require('./config')
	,GraoTools = require('./tools');

config.parseOptions();

var gen = new GraoTools(config);

console.log('GraoTools...');
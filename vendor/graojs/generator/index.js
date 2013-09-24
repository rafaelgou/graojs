var config = require('./config')
	,generator = require('./generator');

config.parseOptions();

var gen = new generator(config);

console.log('Generating bundle: '+gen.name);
gen.loadSchema();

if(config.route || config.all)
	gen.route();

if(config.control || config.all)
	gen.control();

if(config.model || config.all)
	gen.model();

if(config.publicJs || config.all)
	gen.publicJs();

if(config.view || config.all)
	gen.view();
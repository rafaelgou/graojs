var config = require('./GraoGeneratorConfig'),
	GraoGenerator = require('./GraoGenerator');

config.parseOptions();

var gen = new GraoGenerator(config);

console.log('Generating: '+gen.name);
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
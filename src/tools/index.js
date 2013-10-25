var GraoTools = require('./GraoTools');
var GraoCommands = require('../commands/GraoCommands');
var GraoServerCommands = require('../commands/GraoServerCommands');
var GraoGeneratorCommands = require('../commands/GraoGeneratorCommands');

try {	
	var tools = new GraoTools();
  tools.addCommands(new GraoCommands);
  tools.addCommands(new GraoGeneratorCommands);
  tools.addCommands(new GraoServerCommands);
  tools.init();
} catch(exception) {
	console.log('Error: '+exception);
	process.exit(-1);
}

module.exports = exports = tools;

var fs = require('fs-extra'), 
	lazy = require('lazy');

var GraoTools = function(config) {
	var self = this; // holder
	this.currentDir = process.cwd();
		
	this.newApp = function() {
		console.log('Generating a new GrãoJS application: '+config.name+"\n");
		var dirApp = this.currentDir+'/'+config.name;
		
		if(!fs.existsSync(dirApp))
		{
			fs.copy(__dirname+"/../../skeleton", dirApp, function(err){
				if(!err)
				{
					//fs.unlinkSync(dirApp+"/vendor/graojs");
					//fs.unlinkSync(dirApp+"/node_modules");
					fs.copy(__dirname+"/../../node_modules", dirApp+"/node_modules");
					fs.copy(__dirname+"/../../src", dirApp+"/vendor/graojs");
				}
			}); //fs.mkdirSync(dirApp, 0644);
		}
	};
	
	this.newBundle = function() {
		console.log('Generating a new bundle: '+config.name+"\n");
	};
	
	this.newSchema = function() {
		console.log('Generating a new schema: '+config.name+"\n");
	};
	
	this.generate = function() {
		console.log('Generating a new bundle of schema: '+config.name+"\n");
	};
};
module.exports = exports = GraoTools;
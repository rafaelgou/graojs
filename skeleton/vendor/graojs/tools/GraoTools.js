var fs = require('fs'), 
	lazy = require('lazy');

var GraoTools = function(config) {
	var self = this; // holder
		
	this.newApp = function() {
		console.log('Generating a new GrãoJS application: '+config.name+"\n");
		
		
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
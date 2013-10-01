var crypto = require("crypto"), 
	hash = crypto.createHash("sha256"), 
	mongoose = require('mongoose'), 
	validate = require('mongoose-validator').validate,
	styles = require('./styles'),
	states = require('./states'),
	stackTrace = require('stack-trace');

var GraoKernel = function(di) {
	
	this.config = di.config;
	this.grao = di.grao;
	this.express = di.express;
	
	this.logger = new require('./GraoLogger')(this.config);
	this.logger.info('{ ' + this.config.name + ' }');
	
	this.event = new (require('./GraoEvent'))({
		logger: this.logger,
		styles: styles,
		states: states,
		stackTrace: stackTrace,
		
		name: 'kernel', 
		message: 'loading...', 
		mandatory: true,
		style: styles.PRIMARY,
		state: states.INITIAL
	}).present().log('info');
	
	this.validators = new (require('./GraoValidator'))({
		event: this.event,
		mongoose : mongoose,
		validate : validate
	});
	
	this.schemas = new (require('./GraoSchema'))({
		event: this.event,
		mongoose : mongoose,
		validate : validate,
		validators : this.validators
	});

	this.models = new (require('./GraoModel'))({
		event: this.event,
		config : this.config,
		mongoose : mongoose,
		schemas : this.schemas,
		hash : hash
	});

	this.controllers = new (require('./GraoController'))({
		config : this.config,
		models : this.models,
		event: this.event
	});

	this.routes = function() {
		return new (require('./GraoRoute'))({
			event: this.event,
			grao : this.grao,
			controllers : this.controllers
		});
	};

	this.publics = require('./GraoPublicRoute');

};

module.exports = exports = GraoKernel;
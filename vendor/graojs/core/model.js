var GraoModel = function(di) {
	di.event.newEvent({
		name: 'kernel\.models', 
		message: 'Database Connection....'
	}).success().present().log('info');
	
	di.mongoose.connect(di.config.db);

	di.event.newEvent({
		name: 'kernel\.models', 
		message: 'Instance of {GRAO}{LOWER}{NAME} created.'
	}).success().present().log('info');

	this.user = new (require('../../../bundles/user/model'))(di);
};

module.exports = exports = GraoModel;
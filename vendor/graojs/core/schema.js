var GraoSchema = function(di) {
	di.event.newEvent({
		name: 'kernel\.schemas', 
		message: 'Instance of {GRAO}{LOWER}{NAME} created.'
	}).success().present().log('info');

	this.user = new (require('../../../bundles/user/schema'))(di);
};

module.exports = exports = GraoSchema;
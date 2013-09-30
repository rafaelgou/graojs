var GraoSchema = function(di) {
	di.event.newEvent({
		name: 'kernel\.schemas', 
		message: 'Instance created'
	}).success().present().log('info');

	this.user = new (require('../../../bundles/user/UserSchema'))(di);
};

module.exports = exports = GraoSchema;
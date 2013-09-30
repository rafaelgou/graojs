var GraoValidator = function(di) {
	di.event.newEvent({
		name: 'kernel\.validators', 
		message: 'Instance created'
	}).success().present().log('info');

	this.user = new (require('../../../bundles/user/UserValidator'))(di);
};

module.exports = exports = GraoValidator;
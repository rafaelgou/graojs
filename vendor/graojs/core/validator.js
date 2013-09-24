var GraoValidator = function(di) {
	di.event.newEvent({
		name: 'kernel\.validators', 
		message: 'Instance of {GRAO}{LOWER}{NAME} created.'
	}).success().present().log('info');

	this.user = new (require('../../../bundles/user/validator'))(di);
};

module.exports = exports = GraoValidator;
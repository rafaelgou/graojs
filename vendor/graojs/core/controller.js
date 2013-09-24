var GraoController = function(di) {
	di.event.newEvent({
		name: 'kernel\.controllers', 
		message: 'Instance of {GRAO}{LOWER}{NAME} created.'
	}).success().present().log('info');

	this.user = new (require('../../../bundles/user/controller'))(di);
};

module.exports = exports = GraoController;
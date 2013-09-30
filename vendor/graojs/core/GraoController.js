var GraoController = function(di) {
	di.event.newEvent({
		name: 'kernel\.controllers', 
		message: 'Instance created'
	}).success().present().log('info');

	this.user = new (require('../../../bundles/user/UserController'))(di);
};

module.exports = exports = GraoController;
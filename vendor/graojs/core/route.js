var GraoRoute = function(di) {
	di.event.newEvent({
		name: 'kernel\.routes', 
		message: 'Setting routes of controllers...'
	}).success().present().log('info');

	this.frontend = new require('../../../bundles/frontend/route')(di);
	this.user = new require('../../../bundles/user/route')(di);

};

module.exports = exports = GraoRoute;
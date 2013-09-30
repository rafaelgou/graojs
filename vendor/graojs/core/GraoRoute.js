var GraoRoute = function(di) {
	di.event.newEvent({
		name: 'kernel\.routes', 
		message: 'Setting routes of controllers...'
	}).success().present().log('info');

	this.frontend = new require('../../../bundles/frontend/FrontendRoute')(di);
	this.user = new require('../../../bundles/user/UserRoute')(di);

};

module.exports = exports = GraoRoute;
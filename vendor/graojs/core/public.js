var GraoPublicRoute = {
	enable : function(di) {
		di.event.newEvent({
			name: 'kernel\.publics\.enable', 
			message: 'Setting routes of static public content....'
		}).success().present().log('info');

		for (var publicRoute in this.publicRoutes) {
			di.grao.use(publicRoute, di.express.static(di.config.rootPath
					+ this.publicRoutes[publicRoute]));
		}
	},

	/**
	 * Need be automatic with nodejs fs package
	 */
	publicRoutes : {
		'/css/bootstrap' : '/vendor/bootstrap/public/css',
		'/js/bootstrap' : '/vendor/bootstrap/public/js',
		'/ui' : '/vendor/bootstrap/public/ui',

		'/css/font-awesome' : '/vendor/font-awesome/public/css',
		'/css/font' : '/vendor/font-awesome/public/font',

		'/js/angularjs' : '/vendor/angularjs/public/js',

		'/js' : '/bundles/frontend/public/js',
		'/css' : '/bundles/frontend/public/css',
		'/image' : '/bundles/frontend/public/image',
		'/font' : '/bundles/frontend/public/font',

		'/js/user' : '/bundles/user/public/js',
	}
};

module.exports = exports = GraoPublicRoute;
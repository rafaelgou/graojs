var UserRoute = function(di) {
	di.grao.get('/user/:id', di.controllers.user.service.get);
	di.grao.get('/user', di.controllers.user.service.query);
	di.grao.post('/user', di.controllers.user.service.create);
	di.grao.put('/user/:id', di.controllers.user.service.update);
	di.grao.del('/user/:id', di.controllers.user.service.del);

	di.grao.get('/admin/user', di.controllers.user.admin.dashboard);
	di.grao.get('/user/:username', di.controllers.user.service.get);
};

module.exports = exports = UserRoute;
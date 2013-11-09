var {{ schema | capitalize }}Route = function(di) {
	di.graoExpress.get('/{{ schema | lower }}/:id', di.controllers.{{ schema | lower }}.service.get);
	di.graoExpress.get('/{{ schema | lower }}', di.controllers.{{ schema | lower }}.service.query);
	di.graoExpress.post('/{{ schema | lower }}', di.controllers.{{ schema | lower }}.service.create);
	di.graoExpress.put('/{{ schema | lower }}/:id', di.controllers.{{ schema | lower }}.service.update);
	di.graoExpress.del('/{{ schema | lower }}/:id', di.controllers.{{ schema | lower }}.service.destroy);
	di.graoExpress.get('/admin/{{ schema | lower }}', di.controllers.{{ schema | lower }}.admin.dashboard);
};

module.exports = exports = {{ schema | capitalize }}Route;
var {{ name | capitalize }}Route = function(di) {
	di.graoExpress.get('/{{ name | lower }}/:id', di.controllers.{{ name | lower }}.service.get);
	di.graoExpress.get('/{{ name | lower }}', di.controllers.{{ name | lower }}.service.query);
	di.graoExpress.post('/{{ name | lower }}', di.controllers.{{ name | lower }}.service.create);
	di.graoExpress.put('/{{ name | lower }}/:id', di.controllers.{{ name | lower }}.service.update);
	di.graoExpress.del('/{{ name | lower }}/:id', di.controllers.{{ name | lower }}.service.destroy);
	di.graoExpress.get('/admin/{{ name | lower }}', di.controllers.{{ name | lower }}.admin.dashboard);
};

module.exports = exports = {{ name | capitalize }}Route;
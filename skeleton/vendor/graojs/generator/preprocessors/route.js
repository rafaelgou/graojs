var ofmRoute = function (ofm, controls) {
	// {GRAO}{LOWER}{NAME} routes
	ofm.get('/{GRAO}{LOWER}{NAME}/:id', controls.{GRAO}{LOWER}{NAME}.service.get);
	ofm.get('/{GRAO}{LOWER}{NAME}', controls.{GRAO}{LOWER}{NAME}.service.query);
	ofm.post('/{GRAO}{LOWER}{NAME}', controls.{GRAO}{LOWER}{NAME}.service.create);
	ofm.put('/{GRAO}{LOWER}{NAME}/:id', controls.{GRAO}{LOWER}{NAME}.service.update);
	ofm.del('/{GRAO}{LOWER}{NAME}/:id', controls.{GRAO}{LOWER}{NAME}.service.delete);
	ofm.get('/admin/{GRAO}{LOWER}{NAME}', controls.{GRAO}{LOWER}{NAME}.admin.dashboard);
};

module.exports = ofmRoute;
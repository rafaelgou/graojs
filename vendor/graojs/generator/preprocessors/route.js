var ofmRoute = function (ofm, controls) {
	// {GRAO}{LOWER}{BUNDLE_NAME} routes
	ofm.get('/{GRAO}{LOWER}{BUNDLE_NAME}/:id', controls.{GRAO}{LOWER}{BUNDLE_NAME}.service.get);
	ofm.get('/{GRAO}{LOWER}{BUNDLE_NAME}', controls.{GRAO}{LOWER}{BUNDLE_NAME}.service.query);
	ofm.post('/{GRAO}{LOWER}{BUNDLE_NAME}', controls.{GRAO}{LOWER}{BUNDLE_NAME}.service.create);
	ofm.put('/{GRAO}{LOWER}{BUNDLE_NAME}/:id', controls.{GRAO}{LOWER}{BUNDLE_NAME}.service.update);
	ofm.del('/{GRAO}{LOWER}{BUNDLE_NAME}/:id', controls.{GRAO}{LOWER}{BUNDLE_NAME}.service.delete);
	ofm.get('/admin/{GRAO}{LOWER}{BUNDLE_NAME}', controls.{GRAO}{LOWER}{BUNDLE_NAME}.admin.dashboard);
};

module.exports = ofmRoute;
var GraoRoute = function(di) {
	di.event.newEvent('Setting routes of controllers...').success().present().log('info');

	loads = di.loader.loading('route');
	console.log(loads);
	for(loadIndex in loads)
	{
		this[loadIndex] = new require(loads[loadIndex])(di);
	}
};

module.exports = exports = GraoRoute;

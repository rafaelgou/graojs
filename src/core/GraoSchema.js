var GraoSchema = function(di) {
	di.event.newEvent('Instance created').success().present().log('info');

	loads = di.loader.loading('schema');
	for(loadIndex in loads)
	{
		this[loadIndex] = new (require(loads[loadIndex]))(di);
	}
};

module.exports = exports = GraoSchema;

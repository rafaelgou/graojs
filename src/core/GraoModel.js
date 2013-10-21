var GraoModel = function(di) {
	di.event.newEvent('Database Connection....').success().present().log('info');
	
	di.mongoose.connect(di.config.db);

	di.event.newEvent('Instance created').success().present().log('info');

	loads = di.loader.loading('model');
	for(loadIndex in loads)
	{
		this[loadIndex] = new (require(loads[loadIndex]))(di);
	}
};

module.exports = exports = GraoModel;

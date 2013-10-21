var fs = require('fs');

var GraoLoader = function(di) {
	this.dirBundles = di.config.bundles;
	
	this.loading = function(loadType) {
		
		var bundles = fs.readdirSync(this.dirBundles);
		var load = new Array();
		
		switch(loadType)
		{
			case 'controller':
			case 'model':
			case 'route':
			case 'schema':
			case 'validator':
			case 'stress':
				for(bundleIndex in bundles)
				{
					bundle = bundles[bundleIndex];
					if(fs.existsSync(this.dirBundles+'/'+bundle+'/'+ucfirst(bundle)+((loadType == 'model') ? '' : ucfirst(loadType))+'.js'))
						load[bundle] = this.dirBundles+'/'+bundle+'/'+ucfirst(bundle)+((loadType == 'model') ? '' : ucfirst(loadType));
				}
				break;
			case 'publicRoute':
				for(bundleIndex in bundles)
				{
					bundle = bundles[bundleIndex];
					if(fs.existsSync(this.dirBundles+'/'+bundle+'/public/js'))
						load['/js'+((bundle == 'frontend') ? '' : '/'+bundle)] = '/bundles/'+bundle+'/public/js';
					if(fs.existsSync(this.dirBundles+'/'+bundle+'/public/css'))
						load['/css'+((bundle == 'frontend') ? '' : '/'+bundle)] = '/bundles/'+bundle+'/public/css';
					if(fs.existsSync(this.dirBundles+'/'+bundle+'/public/img'))
						load['/img'+((bundle == 'frontend') ? '' : '/'+bundle)] = '/bundles/'+bundle+'/public/img';
					if(fs.existsSync(this.dirBundles+'/'+bundle+'/public/font'))
						load['/font'+((bundle == 'frontend') ? '' : '/'+bundle)] = '/bundles/'+bundle+'/public/font';
					if(fs.existsSync(this.dirBundles+'/'+bundle+'/public/file'))
						load['/file'+((bundle == 'frontend') ? '' : '/'+bundle)] = '/bundles/'+bundle+'/public/file';
				}
				break;
			default:
				throw 'Invalid loadType!';
		}
		
		return load;
	};
};

function ucfirst(string)
{
	return string.toUpperCase().substr(0, 1)+string.substr(1).toLowerCase();	
}

/*teste = new GraoLoader();
t = new Array();
t['3213S'] = '123';
t.push(teste.loading('publicRoute'));
console.log(t);*/

module.exports = exports = GraoLoader;
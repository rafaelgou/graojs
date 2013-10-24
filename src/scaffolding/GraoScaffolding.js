var args = process.argv.slice(2);
var fs = require('fs');
var prompt = require('prompt');
var swig = require('swig');
var fs = require('fs');
var path = require('path');
var wrench = require('wrench');
var argv = require('optimist').argv;

//"pattern": "[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}",
//"message": "Invalid email",

var GraoScaffolding = function(){

  this.config = {};
  this.defaults = {};
  this.skelPath = null;
  this.skelFilename = null;
  this.skelDefaultFilename = 'skeleton.json';
  this.currentDir = process.cwd();
  this.defaultSkels = {
    "app": "skeletons/app",
    "modelbundle": "skeletons/modelbundle",
    "bundle": "skeletons/bundle"
  };

  this.usage = function() {
    console.log(
      "Usage: scaffolding [OPTION...] [NAME]".yellow + "\n" +
      "graoJS Scaffolding, options:" + "\n" +
      "  app\t\tCreate a new graoJS application" + "\n" +
      "  bundle\tCreate a new bundle" + "\n" +
      "  modelbundle\tCreate a new bundle related to a model" + "\n" +
      "  --verbose\tRunning on verbose mode" + "\n"
    );
    process.exit(-1);
  };

  this.parseOptions = function() {
    if (argv._.length > 0) {
      switch (argv._[0]) {

        case 'app':
          this.skelPath = argv.skeleton ? argv.skeleton : path.join(__dirname, '/../../', this.defaultSkels.app);
          break;

        case 'bundle':
          this.skelPath = argv.skeleton ? argv.skeleton : path.join(__dirname, '/../../', this.defaultSkels.bundle);
          break;

        case 'modelbundle':
          this.skelPath = argv.skeleton ? argv.skeleton : path.join(__dirname, '/../../', this.defaultSkels.modelbundle);
          break;

        default:
          this.usage();
      }

      this.generate();

    } else {
      this.usage();
    }
  };

  this.generate = function() {

    this.skelFilename = path.join(this.skelPath, this.skelDefaultFilename);
    this.config = JSON.parse(fs.readFileSync(this.skelFilename, 'utf8').toString().replace(/\n/g,''));
    this.defaults = fs.existsSync( process.cwd() + '/config/default.skeleton.json' )
      ? JSON.parse( fs.readFileSync( defaultFile )) : {};

    Object.keys(this.defaults).forEach(function(key){
      if(this.config.properties[key]) {
        this.config.properties[key]['default'] = defaults[key];
      }
    });

    console.log("\n" + this.config.meta.title.yellow);
    console.log(Array(100).join('-').yellow);
    console.log("\n" + ('Loading from: ' + this.skelFilename).green + "\n");

    prompt.override = argv;

    prompt.message = "";
    prompt.delimiter = ":".green;

    var scaffolding = this;
    var config = this.config;

    prompt.get(config, function (err, result ) {
      if (err) { return onErr(err); }

      var tpls = config.tpls || {};
      var tpls_conditional = config.tpls_conditional || {};

      for (var i in tpls_conditional) {
        if (eval(tpls_conditional[i].condition)) {
          for (var tpl_id in tpls_conditional[i].tpls) {
            tpls[tpl_id] = tpls_conditional[i].tpls[tpl_id];
          }
        }
      };

      scaffolding.writeTpls(tpls, result);

    });
  };

  this.writeTpls = function (tpls, result) {

    var skelPath = this.skelPath;

    Object.keys(tpls).forEach(function( tpl ) {
      var swig_result = { locals: result };
      var dist = swig.render( tpls[tpl], swig_result );
      var distDir = path.dirname(dist);

      if( fs.statSync(path.join(skelPath, tpl)).isFile() ){
        wrench.mkdirSyncRecursive( distDir );

        fs.exists('./' + dist, function (exists) {
          if (exists) {
            console.log(('! ' + './' + dist).red);
          } else {
            fs.writeFileSync(dist, swig.render(fs.readFileSync(path.join(skelPath, tpl), 'utf-8'), swig_result));
            console.log(('+ ' + './' + dist).green);
          }
        });

      } else {
        this.writeDir(distDir, tpl, dist);
      }
    });
  };

  this.writeDir = function (distDir, tpl, dist) {
    wrench.mkdirSyncRecursive( distDir );
    wrench.copyDirSyncRecursive( tpl, dist );
    wrench.readdirSyncRecursive(dist).forEach(function(file) {
      file = path.join( dist, file);
      fs.writeFileSync( file, swig.render( fs.readFileSync( file, 'utf-8'), swig_result), 'utf-8');
    });
  };

}

function onErr(err) {
  console.log(err);
  return 1;
}

module.exports = exports = GraoScaffolding;
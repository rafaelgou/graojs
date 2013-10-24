var args = process.argv.slice(2);
var fs = require('fs');
var prompt = require('prompt');
var swig = require('swig');
var fs = require('fs');
var path = require('path');
var wrench = require('wrench');

//"pattern": "[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}",
//"message": "Invalid email",

var GraoGenerator = function(){

  var self = this;

  this.config = {};
  this.defaults = {};
  this.skelPath = null;
  this.skelFilename = null;
  this.skelDefaultFilename = 'skeleton.json';
  this.currentDir = process.cwd();
  this.defaultSkels = {
    "app": "skeletons/app",
    "schemabundle": "skeletons/schemabundle",
    "bundle": "skeletons/bundle"
  };

  this.setSkeleton = function (type, skeleton) {
    this.skelPath = skeleton ? skeleton : path.join(__dirname, '/../../', this.defaultSkels[type]);
  }

  this.generate = function() {

    this.skelFilename = path.join(this.skelPath, this.skelDefaultFilename);
    config = this.config = JSON.parse(fs.readFileSync(this.skelFilename, 'utf8').toString().replace(/\n/g,''));
    this.defaults = fs.existsSync(path.join(process.cwd(), '/config/default.skeleton.json'))
      ? JSON.parse( fs.readFileSync(path.join(process.cwd(), '/config/default.skeleton.json')))
      : {};

    Object.keys(this.defaults).forEach(function(key){
      if(config.properties[key]) {
        config.properties[key]['default'] = defaults[key];
      }
    });

    console.log("\n" + ('Loading from: ' + this.skelFilename).green + "\n");

    prompt.message = "";
    prompt.delimiter = ":".green;

    prompt.get(config, function (err, result ) {
      if (err) { return onErr(err); }

      var tpls = config.tpls || {};
      var tpls_conditional = self.config.tpls_conditional || {};

      for (var i in tpls_conditional) {
        if (eval(tpls_conditional[i].condition)) {
          for (var tpl_id in tpls_conditional[i].tpls) {
            tpls[tpl_id] = tpls_conditional[i].tpls[tpl_id];
          }
        }
      };

      self.writeTpls(tpls, result);

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

module.exports = exports = GraoGenerator;
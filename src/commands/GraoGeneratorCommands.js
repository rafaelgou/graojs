var path   = require('path');
var fs     = require('fs-extra');
var prompt = require('prompt');
var generator = require('../generator');

var GraoGeneratorCommands = function(){

  var self = this;

  this.id = 'generate'
  this.title = 'graoJS Generator commands'
  this.actions = [
    {
      id: 'app',
      'method': 'runGenerateApp',
      'desc': 'Generate a new graoJS Application',
      'app_only': false
    },
    {
      id: 'bundle',
      'method': 'runGenerateBundle',
      'desc': 'Generate a new graoJS Bundle',
      'app_only': true
    },
    {
      id: 'schemabundle',
      'method': 'runGenerateSchemaBundle',
      'desc': 'Generate a new graoJS Bundle with a Schema',
      'app_only': true
    },
    {
      id: 'schema',
      'method': 'runGenerateSchema',
      'desc': 'Generate a new graoJS Mongoose Schema',
      'app_only': true
    }

  ];

  this.runGenerateApp = function(args) {
    var skeletton = null;
    generator.setSkeleton('app', skeletton);
    generator.generate(function(generator) {
      console.log(generator.promptArgs.app_name);
      console.log(process.cwd());
      if (generator.promptArgs.hasOwnProperty('app_name')) {
        self.copyGraoDeps(path.join(process.cwd(), generator.promptArgs.app_name));
      } else {
        console.log('Unable to copy graoJS node_modules');
      }
    });
  }

  this.runGenerateBundle = function(args) {
    console.log('-- TODO runGenerateBundle');
  }

  this.runGenerateSchemaBundle = function(args) {
    console.log('-- TODO runGenerateSchemaBundle');
  }

  this.runGenerateSchema = function(args) {
    console.log('-- TODO runGenerateSchema');
  }

  this.copyGraoDeps = function(appPath) {
    if (fs.existsSync(appPath)) {
      fs.mkdirSync(appPath+"/node_modules", 0755);
      //fs.unlinkSync(dirApp+"/vendor/graojs");
      //fs.unlinkSync(dirApp+"/node_modules");
      fs.copy(path.join(__dirname, "/../../node_modules"), path.join(appPath, "/node_modules/graojs/node_modules"), function(){
        console.log(('+ graoJS core and deps:' + path.join(appPath, "/node_modules/graojs")).green);
      });
    };
  }

}

function onErr(err) {
  console.log(err);
  return 1;
}

module.exports = exports = GraoGeneratorCommands;
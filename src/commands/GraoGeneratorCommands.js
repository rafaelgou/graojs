var path   = require('path');
var fs     = require('fs');
var prompt = require('prompt');
var generator = require('../generator');

var GraoGeneratorCommands = function(){

  this.id = 'generate'
  this.title = 'graoJS Generator commands'
  this.actions = [
    {
      id: 'app',
      'method': 'runGenerateApp',
      'desc': 'Generate a new graoJS Application'
    },
    {
      id: 'bundle',
      'method': 'runGenerateBundle',
      'desc': 'Generate a new graoJS Bundle'
    },
    {
      id: 'schemabundle',
      'method': 'runGenerateSchemaBundle',
      'desc': 'Generate a new graoJS Bundle with a Schema'
    },
    {
      id: 'schema',
      'method': 'runGenerateSchema',
      'desc': 'Generate a new graoJS Mongoose Schema'
    }

  ];

  this.runGenerateApp = function(args) {
    var skeletton = null;
    generator.setSkeleton('app', skeletton);
    generator.generate();

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

}

function onErr(err) {
  console.log(err);
  return 1;
}

module.exports = exports = GraoGeneratorCommands;
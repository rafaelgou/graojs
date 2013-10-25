var path   = require('path');
var fs     = require('fs');
var prompt = require('prompt');

var GraoServerCommands = function(){

  this.id = 'server'
  this.title = 'graoJS Server commands'
  this.actions = [
    {
      id: 'run:dev',
      'method': 'runRunDev',
      'desc': 'Run server on DEV environment (with node-supervisor)',
      'app_only': true
    },
    {
      id: 'run:prod',
      'method': 'runRunProd',
      'desc': 'Run server on PROD environment (with node-forever)',
      'app_only': true
    },
    {
      id: 'dump:nginx',
      'method': 'runDumpNginx',
      'desc': 'Dump Nginx configuration',
      'app_only': true
    },
    {
      id: 'dump:apache2',
      'method': 'runDumpApache2',
      'desc': 'Dump Apache2 configuration',
      'app_only': true
    }

  ];

  // TODO
  this.runRunDev = function(args) {
    console.log('TODO runRunDev');
  }

  // TODO
  this.runRunProd = function(args) {
    console.log('TODO runRunProd');
  }

  // TODO
  this.runDumpNginx = function(args) {
    console.log('TODO runDumpNginx');
  }

  // TODO
  this.runDumpApache2 = function(args) {
    console.log('TODO runDumpApache2');
  }

}

function onErr(err) {
  console.log(err);
  return 1;
}

module.exports = exports = GraoServerCommands;
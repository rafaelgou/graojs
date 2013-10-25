var path   = require('path');
var fs     = require('fs');
var prompt = require('prompt');

var GraoCommands = function(){

  this.id = 'main'
  this.title = 'Main graoJS commands'
  this.actions = [
    {
      id: 'version',
      'method': 'runVersion',
      'desc': 'Shows graoJS version',
      'app_only': false
    },
    {
      id: 'asciiart',
      'method': 'runAsciiart',
      'desc': 'Shows graoJS logo on ASCII Art',
      'app_only': false
    },
    {
      id: 'hello:world',
      'method': 'runHelloWorld',
      'desc': 'Sample hello world command',
      'app_only': false
    }
  ];

  this.runVersion = function(args) {
    var package = JSON.parse(fs.readFileSync(path.join(__dirname, '/../..',  'package.json'), 'utf8').toString().replace(/\n/g,''));
    console.log('>> ' + package.version);

  }

  this.runAsciiart = function(args) {
    console.log("\n" + fs.readFileSync(path.join(__dirname, '/../..',  'graojs.ascii'), { encoding: 'utf8' }));
  }

  this.runHelloWorld = function(args) {

    var promptOptions = {
      "properties": {
        "name": {
          "description": "Your Name (only letters)",
          "pattern": "^[a-zA-Z]+$",
          "message": "Must be only letters",
          "required": true
        }
      }
    }

    prompt.message = "";
    prompt.delimiter = ":".green;

    prompt.get(promptOptions, function (err, result ) {
      if (err) { return onErr(err); }

      console.log('Hello, ' + result.name);
    });

  }

}

function onErr(err) {
  console.log(err);
  return 1;
}

module.exports = exports = GraoCommands;
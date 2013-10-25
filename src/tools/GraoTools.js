var fs = require('fs');
var path = require('path');
var args = process.argv.slice(2);
var cmdId = (args.length > 0) ? args[args.length-1] : null;
var prompt = require('prompt');

var GraoTools = function() {
	var self = this; // holder
	this.currentDir = process.cwd();

  this.commands = {};
  this.actions  = {};

  this.usage = function(msg) {

    console.log(("\n" + fs.readFileSync(path.join(__dirname, '/../..',  'graojs.ascii'), { encoding: 'utf8' })).yellow);
    console.log("\n" +"Usage: grao [OPTION...] [NAME]".yellow + "\n" + Array(70).join('=').yellow);

    Object.keys(this.commands).forEach(function(commandId) {
      var command = self.commands[commandId];
      console.log("\n" + command.title + "\n" + Array(70).join('-'));
      for (var i in command.actions) {
        console.log(self.getActionDesc(command.id + ':' + command.actions[i].id));
      };
    });
    console.log("\n");

    if (msg != undefined) {
      console.log(msg);
    }
    process.exit(-1);
  };

  this.init = function() {
    if (cmdId != undefined) {
      this.run(cmdId, this.processArgs(args));
    } else {
      this.usage();
    }
  }

  this.addCommands = function(commands) {
    this.commands[commands.id] = commands;

    for (var i in commands.actions) {
      var action = commands.actions[i];
      var actionId = commands.id + ':' + action.id;
      this.actions[actionId] = action;
      this.actions[actionId].class = commands.id;
    };
  }

  this.getActionDesc = function(actionId) {
    if (this.actions.hasOwnProperty(actionId)) {
      var action = this.actions[actionId];
      return '  ' + actionId.green + Array(30 - actionId.length).join(' ') + action.desc;
    } else {
      return ("\n  !! Error: Action [" + fullId + "] doesn't exist!\n").red.inverse;
    }
  }

  this.run = function(actionId, args) {
    if (this.actions.hasOwnProperty(actionId)) {
      console.log("\n" + this.actions[actionId].desc.yellow);
      console.log(Array(70).join('-').yellow);
      var command = this.commands[this.actions[actionId].class];
      command[this.actions[actionId].method](args);
    } else {

      var msg = "  !! Error: Action [" + actionId + "] doesn't exist!";
      msg = msg + Array(70 - msg.length).join(' ')
      var line = Array(70).join(' ') + "\n";

      this.usage("\n" +( line + msg + "\n" + line).red.inverse);
    }
  }

  // TODO a better args processing, options (--blah, -b), like node-optimist??
  this.processArgs = function(args) {
    var argsProcessed = args.slice(1);
    return argsProcessed;
  }

  this.checkAppOnly = function() {

  }
};
module.exports = exports = GraoTools;
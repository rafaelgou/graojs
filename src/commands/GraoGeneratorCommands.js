var
  path = require( 'path' ) ,
  fs = require( 'fs-extra' ),
  prompt = require( 'prompt' ),
  generator = require( '../generator' );

var walk = function(dir) {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function(file) {
    file = dir + '/' + file
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) results = results.concat(walk(file))
    else results.push(file)
  })
  return results;
}

var GraoGeneratorCommands = function() {

  var self = this;

  this.id = 'generate';
  this.title = 'graoJS Generator commands';
  this.actions = [
    {
      id: 'app',
      method: 'runGenerateApp',
      desc: 'Generate a new graoJS Application',
      appOnly: false,
      promptSchema: {}
    },
    {
      id: 'bundle',
      method: 'runGenerateBundle',
      desc: 'Generate a new graoJS Bundle',
      appOnly: true,
      promptSchema: {}
    },
    {
      id: 'schemabundle',
      method: 'runGenerateSchemaBundle',
      desc: 'Generate a new graoJS Bundle with a Schema',
      appOnly: true,
      promptSchema: {}
    },
    {
      id: 'schema',
      method: 'runGenerateSchema',
      desc: 'Generate a new graoJS Mongoose Schema',
      appOnly: true,
      promptSchema: {}
    }
  ];

  this.runGenerateApp = function( argv, prompt, schema ) {

    this.prepareGenerator( 'app', argv );

    prompt.get( generator.config, function ( err, result ) {

      if ( err ) { return onErr( err ); }

      var force = argv.hasOwnProperty( 'force' )
                ? argv.force
                : false;

      generator.generate(
        result,
        force,
        self.copyGraoDeps
      );

    });

  }

  this.runGenerateBundle = function( argv, prompt, schema ) {

    console.log( '-- TODO runGenerateBundle' );

  }

  this.runGenerateSchemaBundle = function( argv, prompt, schema ) {

    console.log( '-- TODO runGenerateSchemaBundle' );

  }

  this.runGenerateSchema = function( argv, prompt, schema ) {

    this.prepareGenerator( 'schema', argv );

    prompt.get( generator.config, function ( err, result ) {

      if ( err ) { return onErr( err ); }

      var force = argv.hasOwnProperty( 'force' )
        ? argv.force
        : false;

      generator.generate(result, force, function() {
        console.log(
          "Edit the schema and add your fields" +
          "\nthen run " + "grao generate:schemabundle".blue +
          " to generate a CRUD bundle for your schema \n"
        )
      });

    });

  }

  this.prepareGenerator = function ( type, argv ) {

    // TODO accept --skeleton to override skeleton
    var skeleton = argv.hasOwnProperty( 'skeleton' )
      ? argv.skeleton
      : null;

    generator.init( type, skeleton );

  }

  this.copyGraoDeps = function( appPath, force ) {

    if ( fs.existsSync( appPath ) ) {

      console.log('EXISTS ' + appPath);

/*
      var nodeModulesTo = path.join(appPath, '/node_modules');
      if (!fs.existsSync(nodeModulesTo)) {
        fs.mkdirsSync(nodeModulesTo));
        console.log('CREATED ' + nodeModulesTo);
      } else {
        console.log('NOT CREATED ' + nodeModulesTo);
      }
*/

      var targets = {
        'src': {
          'from': path.join(__dirname, '/../../src'),
          'to': path.join(appPath, '/node_modules/graojs')
        },
        'modules': {
          'from': path.join(__dirname, '/../../node_modules'),
          'to': path.join(appPath, '/node_modules/graojs/node_modules')
        },
        'index': {
          'from': path.join(__dirname, '/../../index.js'),
          'to': path.join(appPath, '/node_modules/graojs/index.js')
        }
      }

      Object.keys( targets ).forEach( function( tid ) {
        var target = targets[tid];

        if (fs.statSync( target.from ).isDirectory()) {
          var from = walk(target.from);
        } else {
          var from = [target.from];
        }

        fs.exists( target.to, function ( exists )  {
          if (!exists || force) {
            for (var i in from) {

              var to = path.join(target.to, from[i].replace(target.from, ''));

              fs.copy(from[i] , to);
            }
            console.log( ( '+ graoJS ' + target.to ).green );
          } else {
            console.log( ( '! graoJS ' + target.to ).red );
          }
        });
      });

    } else {

      console.log('DOES NOT EXISTS ' + appPath);

    };

  }

}

function onErr( err ) {
  console.log( err );
  return 1;
}

module.exports = exports = GraoGeneratorCommands;
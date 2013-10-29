var
  path = require( 'path' ) ,
  fs = require( 'fs-extra' ),
  prompt = require( 'prompt' ),
  generator = require( '../generator' );

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

    this.prepareGenerator( 'schema', argv );

    prompt.get( generator.config, force,  function ( err, result ) {

      if ( err ) { return onErr( err ); }

      var force = argv.hasOwnProperty( 'force' );

      generator.generate(
        result,
        force,
        self.copyGraoDeps( path.join( process.cwd(), result['app-name'] ) )
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

      var force = argv.hasOwnProperty( 'force' );

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

  this.copyGraoDeps = function( appPath ) {

    if ( fs.existsSync( appPath ) ) {

      fs.mkdirSync( appPath+"/node_modules", 0755 );

      var srcFrom     = path.join( __dirname, '/../../src' );
      var srcc
      var srcTo       = path.join( appPath, '/node_modules/graojs' );
      var modulesFrom = path.join( __dirname, '/../../node_modules' );
      var modulesTo   = path.join( appPath, '/node_modules/graojs/node_modules' );
      var indexFrom   = path.join( __dirname, '/../../index.js' );
      var indexTo     = path.join( appPath, '/node_modules/graojs/index.js' );

      fs.copy( srcFrom, srcTo, function() {

        console.log( ( '+ graoJS src:' + srcTo ).green );
        fs.copy( modulesFrom, modulesTo, function() {

          console.log( ( '+ graoJS node_modules:' + modulesTo ).green );
          fs.copy( indexFrom, indexTo, function() {

            console.log( ( '+ graoJS index:' + indexTo ).green );

          } );

        } );

      } );

    };

  }

}

function onErr( err ) {
  console.log( err );
  return 1;
}

module.exports = exports = GraoGeneratorCommands;
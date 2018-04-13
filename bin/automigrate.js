
var path     = require('path');

let app      = require(path.resolve(__dirname, '../server/server'));

// We should really update that thing.
var database = app.datasources.reservationDS;


var lbTables = [

  'AccessToken',
  'ACL',
  
  'RoleMapping', 
  'Role',

  'campground', 
     
  'reservation', 
     
  'customer',
];

//creating loopback necessary tables if no exists
database.automigrate(lbTables, function(err) {
  if (err) throw err;

  console.log( 'Loopback tables [' + lbTables.toString() + '] created in ' + database.adapter.name );
  database.disconnect();

  // process.on('exit', function(code) {
  // 	return console.log(`Automigrate is competed`);
  // });
  // process.exit(22);
});

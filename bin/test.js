var services = require('./../services/services.js');

var db =  services.db;

// Example to create but email must be unqiue

db.Schools.create("Penis HS", "penis@example.com", '7274658501', '585098d682fadc2908d5ab80').then(function(user){
	console.log(user);
	console.log(valid);
});

var services = require('./../services/services.js');

var db =  services.db;

// Example to create but email must be unqiue

db.Users.create("John", "Dews", "John@example.com", "password", null, null, null).then(function(user){
	console.log(user);
	var valid = user.validPassword("password");
	console.log(valid);
});

var urlPath = '/api/auth';
module.exports = function (app, router, services) {

	var authentication = services.authentication;
	var payload = services.payload;

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Authentication API' });
  });

	router.post('/login', function(req, res, next) {
		//Login takes two params email and password on the body;
		var email = req.body.email;
		var password = req.body.password;

		if(!email || !password) return res.send(payload('Missing Credentials'));

		authentication.authenticateUser(email, password).then(function(user){
			res.send(payload(null, user));
		}).catch(function(err){
			res.send(payload(err));
		});
  });

	router.get('/logout', function(req, res, next) {

			//handle logout
	});


  app.use(urlPath, router);
};

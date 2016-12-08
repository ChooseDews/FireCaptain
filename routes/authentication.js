var urlPath = '/api/auth';
module.exports = function (app, router, services) {

	var authentication = services.authentication;

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Authentication API' });
  });

	router.post('/login', function(req, res, next) {

		//handle login

		var username = req.body.username;
		var password = req.body.password;


  });

	router.get('/logout', function(req, res, next) {

			//handle logout
	});


  app.use(urlPath, router);
};

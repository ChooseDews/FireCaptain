var urlPath = '/api/auth';
module.exports = function (app, router, services) {

	var authentication = services.authentication;

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Authentication API' });
  });

	router.get('/login', function(req, res, next) {

		//handle login


  });

	router.get('/logout', function(req, res, next) {

			//handle logout

	});


  app.use(urlPath, router);
};

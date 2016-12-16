var urlPath = '/api/school';
module.exports = function (app, router, services) {

	var auth = services.authentication;

  router.get('/', function(req,res){
      res.send('hello');
  });





  app.use(urlPath, auth.authMiddle, router);
};

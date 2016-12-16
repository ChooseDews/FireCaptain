var urlPath = '/api/school';
module.exports = function (app, router, services) {

	var auth = services.authentication;

	router.get(['/', '/:school'], auth.saturateSchool, function(req,res){
      res.send(req.school);
  });





  app.use(urlPath, auth.authMiddle, router);
};

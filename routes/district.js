var urlPath = '/api/district';
module.exports = function (app, router, services) {

	var auth = services.authentication;

  router.get('/', auth.saturateDistrict, function(req,res){
      res.send(req.district);
  });





  app.use(urlPath, auth.authMiddle, router);
};

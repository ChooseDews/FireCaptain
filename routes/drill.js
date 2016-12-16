var urlPath = '/api/drill';
module.exports = function (app, router, services) {

	var auth = services.authentication;

  router.get('/list', auth.saturateDistrict, function(req,res){

	
  });





  app.use(urlPath, auth.authMiddle, router);
};

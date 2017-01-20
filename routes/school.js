var urlPath = '/api/school';
module.exports = function (app, router, services) {

	var auth = services.authentication;

	router.get(['/', '/:school'], auth.saturateSchool, function(req,res){
      res.send(req.school);
  });


	router.get('/map', function(req,res){
		services.map.get(req.school._id).then(function(map){
			res.send(map);
		});
	});

	router.post('/map', function(req,res){
		services.map.update(req.school._id, req.body.map).then(function(map){
			res.send(map);
		});
	});





  app.use(urlPath, auth.authMiddle, router);
};

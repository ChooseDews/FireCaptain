var urlPath = '/api/school';
module.exports = function (app, router, services) {

	var auth = services.authentication;



	router.get('/map', auth.saturateSchool, function(req,res){
		services.map.get(req.school._id).then(function(map){
			res.send(map);
		});
	});


	router.get(['/', '/:school'], auth.saturateSchool, function(req,res){
      res.send(req.school);
  });


	router.post('/map', auth.saturateSchool, function(req,res){
		console.log(req.body.map);
		console.log(req.school._id)
		services.map.update(req.school._id, req.body.map).then(function(map){
			res.send(map);
		});
	});





  app.use(urlPath, auth.authMiddle, router);
};

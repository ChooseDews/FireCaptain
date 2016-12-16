var urlPath = '/api/drills';
module.exports = function (app, router, services) {

	var auth = services.authentication;
	var drill = services.drill;
	var payload = services.payload;

  router.get(['/list/district/:district', '/list/district'], auth.isDistrict, function(req,res){
		var district = req.user.district || req.params.district;
		drill.listByDistrict(district).then(function(drills){
			res.send(payload(null, drills));
		}).catch(payload);
  });

	router.get(['/list/school/:school', '/list/school'], auth.isSchool, function(req,res){
		var school = req.params.school || req.body.school || req.user.school;
		drill.listBySchool(school).then(function(drills){
			res.send(payload(null, drills));
		}).catch(payload);

  });

	router.post('/create', auth.saturateDistrict, function(req,res){


  });





  app.use(urlPath, auth.authMiddle, router);
};

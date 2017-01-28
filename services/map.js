var map = function(db, logger, config, exports) {

	exports.get = function(schoolId){
		return db.Maps.findOne({school: schoolId}).then(function(map){
			return map;
		});
	};

	exports.update = function(schoolId, mapObject){
		console.log(mapObject);
		return db.Maps.findOne({school: schoolId}).then(function(map){
			if(!map){
				return db.Maps.create(schoolId, mapObject);
			}else{
				map.zones = mapObject;
				return map.save();
			}
		});
	};


  return exports;
};


module.exports = map;

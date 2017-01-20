var map = function(db, logger, config, exports) {

	exports.get = function(schoolId){
		return db.Maps.find({school: schoolId}).then(function(map){
			return map;
		});
	};

	exports.update = function(schoolId, mapObject){
		return db.Maps.find({school: schoolId}).then(function(map){
			map.zones = mapObject;
			return map.save();
		});
	};


  return exports;
};


module.exports = map;

var district = function(db, logger, config, exports) {

	exports.get = function(_id){
		return db.District.findById(_id);
	};


  return exports;
};


module.exports = district;

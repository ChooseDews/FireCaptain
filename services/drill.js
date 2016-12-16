var drill = function(db, logger, config, exports) {

  exports.listByDistrict = function(districtId){
    return db.Drills.find({district: districtId});
  };

  exports.listBySchool = function(schoolId){
    return db.Drills.find({school: schoolId});
  };


  return exports;
};


module.exports = drill;

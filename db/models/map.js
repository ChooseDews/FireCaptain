module.exports = function(mongoose) {
  var model = {};
  var Schema = mongoose.Schema;
  model.name = 'Map';

  model.schema = mongoose.Schema({
		created: Date,
    zones: [{
        name: String,
        enabled: Boolean,
        rooms: [{
            name: String,
            enabled: Boolean,
            periods: [String]
        }]
    }],
    school: {
      type: Schema.Types.ObjectId,
      ref: 'School'
    }
  });


  model.schema.statics.create = function(school, mapObject) {
      var map = new this({
          school: school,
          zones: mapObject
      });
      return map.save();
  };


  model.schema.statics.update = function(mapId, mapObject){
      return this.findById(mapId).then(function(map){
          map.zones = map;
          return map.save();
      });
  };


  return model;
};

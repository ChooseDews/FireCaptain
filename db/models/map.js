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
            enabled: Boolean
        }]
    }],
    school: {
      type: Schema.Types.ObjectId,
      ref: 'School'
    }
  });


  return model;
};

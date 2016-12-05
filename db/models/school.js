module.exports = function(mongoose) {
  var model = {};
  var Schema = mongoose.Schema;
  model.name = 'School';

  model.schema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    zones: [{
        name: String,
        enabled: Boolean,
        rooms: [{
            name: String,
            enabled: Boolean
        }]
    }],
    district: {
      type: Schema.Types.ObjectId,
      ref: 'Districts'
    },
    location: Number, // zip code
    type: String //School | Company
  });

  return model;
};

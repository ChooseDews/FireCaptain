module.exports = function(mongoose) {
  var model = {};
  var Schema = mongoose.Schema;
  model.name = 'School';

  model.schema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    map: {
      type: Schema.Types.ObjectId,
      ref: 'Map'
    },
    periods: [{
      name: String //_id will automatically be added for identification.
    }],
    district: {
      type: Schema.Types.ObjectId,
      ref: 'District'
    },
    location: Number, // zip code
    type: String //School | Company
  });

  model.schema.statics.create = function(name, email, phone, district) {
      var school = new this({
          name: name,
          email: email,
          phone: phone,
          district: district
      });

      return school.save();
  };


  return model;
};

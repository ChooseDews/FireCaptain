module.exports = function(mongoose) {
  var model = {};
  var Schema = mongoose.Schema;
  model.name = 'District';

  model.schema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number
  });



  return model;
};

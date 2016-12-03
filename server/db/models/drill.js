module.exports = function(mongoose) {
  var model = {};
  var Schema = mongoose.Schema;
  model.name = 'Drill';

  model.schema = mongoose.Schema({
		district:  {
      type: Schema.Types.ObjectId,
      ref: 'Districts'
    },
    school:  {
      type: Schema.Types.ObjectId,
      ref: 'Schools'
    },
    start: Date,
    end: Date,
    goal: Number,
    status: String,
    analytics: {
        zones: {
            total: Number,
            completed: Number,
            percent: Number
        },
        rooms: {
            total: Number,
            completed: Number,
            percent: Number
        }
    },
    zones: [{
        name: String,
        completed: Date,
        rooms: [{
            name: String,
            completed: Date,
            user: {
				      type: Schema.Types.ObjectId,
				      ref: 'Users'
				    }
        }]
    }]
  });



  return model;
};

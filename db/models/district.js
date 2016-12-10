module.exports = function(mongoose) {
    var model = {};
    var Schema = mongoose.Schema;
    model.name = 'District';

    model.schema = mongoose.Schema({
        name: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        phone: Number
    });

    model.schema.statics.create = function(name, email, phone) {
        var district = new this({
            name: name,
            email: email,
            phone: phone
        });

        return district.save();
    };




    return model;
};

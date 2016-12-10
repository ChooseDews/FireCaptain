var bcrypt = require('bcrypt-nodejs');

module.exports = function(mongoose) {
    var model = {};
    var Schema = mongoose.Schema;
    model.name = 'User';

    model.schema = mongoose.Schema({
        district: {
            type: Schema.Types.ObjectId,
            ref: 'Districts'
        },
        school: {
            type: Schema.Types.ObjectId,
            ref: 'Schools'
        },
        drill: {
            type: Schema.Types.ObjectId,
            ref: 'Drills'
        },
        permission: {
            sudo: Boolean,
            district: Boolean,
            school: Boolean,
            drill: Boolean
        },
        name: {
            first: String,
            last: String
        },
        email: {
            type: String,
            unique: true
        },
        password: String,
        sss: {
            type: String,
            unique: true
        },
        expire: Date
    });

    model.schema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    model.schema.methods.validPassword = function(password) {
        if(!password) return false;
        return bcrypt.compareSync(password, this.password);
    };

    model.schema.statics.create = function(firstName, lastName, email, password, district, school, drill) {
        var user = new this({
            name: {
                first: firstName,
                last: lastName
            },
            district: district,
            school: school,
            email: email.toLowerCase()
        });

        if (drill) user.drill = drill;
        user.password = user.generateHash(password);
        return user.save();
    };


    return model;
};

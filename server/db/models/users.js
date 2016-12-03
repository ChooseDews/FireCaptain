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
        zone: String,
        permission: {
            drill: Boolean,
            manage: Boolean,
            admin: Boolean,
            sudo: Boolean
        },
        name: {
            first: String,
            last: String
        },
        username: String,
        password: String,
        sss: String,
        expire: Date
    });

    return model;
};

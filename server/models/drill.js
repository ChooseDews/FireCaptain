var drillSchema = {
    district: districtId,
    school: schoolId,
    start: time,
    end: time,
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
        completed: timestamp,
        rooms: [{
            name: String,
            completed: timestamp,
            user: userId
        }]
    }]
};

var districtSchema = {
    name: String,
    email: String,
    phone: Number
};

var schoolSchema = {
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
    district: districtId,
    location: Number, // zip code
    type: String //School | Company
};

var userSchema = {
    district: districtId,
    school: schoolId, //optional
    zone: zoneId, //optional
    permission: {
        drill: Boolean,
        manage: Boolean,
        admin: Boolean
    },
    username: String,
    password: String,
    sss: String
};

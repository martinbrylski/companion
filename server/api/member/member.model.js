'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
    drkEntry: Date,
    mrEntry: Date,
    gender: String,
    qualifications: Array,
    tags: Array,
    addresses: [{
        city: String,
        postal: String,
        street: String,
        type: String
    }],
    phones: [{
        number: String,
        type: String
    }],
    emails: [{
        email: String,
        type: String
    }],
    info: String,
    active: Boolean
});

module.exports = mongoose.model('Member', MemberSchema);

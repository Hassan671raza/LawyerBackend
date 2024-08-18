const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    exp: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    }
}, {timestamps: true});

module.exports = mongoose.model('lawyer', lawyerSchema);
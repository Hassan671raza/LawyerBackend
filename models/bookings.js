const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    lawyerWhatsapp:{
      type: String,
      required: true
    },
    from: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true
    },
    caseType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    caseDetails: {
        type: String,
        required: true
    },
    expectedDate: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {timestamps: true});


module.exports = mongoose.model('booking', bookingSchema);
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default:'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contact', contactSchema);
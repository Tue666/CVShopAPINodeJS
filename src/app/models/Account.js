const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        maxlength: 10,
        default: ''
    },
    address: {
        type: String,
        default: '',
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', Account);

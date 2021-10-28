const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Rating = new Schema({
    _ratingId: {
        type: Number
    },
    oneStar: {
        type: Number,
        default: 0,
        min: 0
    },
    twoStar: {
        type: Number,
        default: 0,
        min: 0
    },
    threeStar: {
        type: Number,
        default: 0,
        min: 0
    },
    fourStar: {
        type: Number,
        default: 0,
        min: 0
    },
    fiveStar: {
        type: Number,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        default: 0,
        min: 0
    },
    average: {
        type: Number,
        default: 0,
        min: 0
    }
});

Rating.plugin(AutoIncrement, {inc_field: '_ratingId'});

module.exports = mongoose.model('Rating', Rating);
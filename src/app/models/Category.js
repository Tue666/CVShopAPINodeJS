const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Category = new Schema({
    _id: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    image: {
        type: String,
        default: ''
    },
    parentId: {
        type: Number,
        default: null
    },
    displayOrder: {
        type: Number
    },
    banners: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: 'active'
    }
}, {
    _id: false
});

mongoose.plugin(slug);
Category.plugin(AutoIncrement);

module.exports = mongoose.model('Category', Category);
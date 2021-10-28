const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    categoryId: {
        type: Array,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    information: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    quantity: {
        type: Number,
        min: 0,
        required: true
    },
    viewed: {
        type: Number,
        default: 0
    },
    searched: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    rating: {
        type: Object,
        default: {
            "oneStar": 0,
            "twoStar": 0,
            "threeStar": 0,
            "fourStar": 0,
            "fiveStar": 0,
            "total": 0,
            "average": 0
        }
    },
    warranty: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    VATFee: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'active'
    },
    limit: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

mongoose.plugin(slug);

module.exports = mongoose.model('Product', Product);
const Rating = require('../models/Rating');

class RatingsAPI {
    // [POST] /products
    async addRating(req, res) {
        try {
            const rating = new Rating(req.body);
            await rating.save();
            res.json({
                status: 'success',
                message: 'Create rating successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new RatingsAPI;
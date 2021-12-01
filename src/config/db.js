const mongoose = require('mongoose');

const connect = async () => {
    try {
        const uri = process.env.NODE_ENV === 'dev' ? process.env.COMPASS_URI : process.env.ATLAS_URI
        await mongoose.connect(uri, () => {
            console.log('DB connection successful');
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connect };
const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI, () => {
            console.log('DB connection successful');
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connect };
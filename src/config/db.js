const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://pihe:lmht292001@cluster0.vviso.mongodb.net/cv_shop?retryWrites=true&w=majority', () => {
            console.log('DB connection successful');
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connect };
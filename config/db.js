const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');
const CONNECTION_URL = 'mongodb://localhost:27017/contactManager';
const options = { useNewUrlParser: true };

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL || db, options);
        console.log('MongoDB is Connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
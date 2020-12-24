const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: 'wazunga-blog-api'
}).catch(err => console.log(err));

const Schema = mongoose.Schema;

module.exports = {
    mongoose,
    Schema
};
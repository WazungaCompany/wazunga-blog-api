const mongoose = require("mongoose");

/* process.env.VARIABLE_ENTORNO, declaadas en el achivo .env */
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: process.env.MONGO_DB
}).catch(err => console.log(err));

const Schema = mongoose.Schema;

module.exports = {
    mongoose,
    Schema
};
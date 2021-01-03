const express = require("express");
require("dotenv").config(); // IMPORTANT: Importar este modulo antes que aquellos en donde se use .env
const db = require("./config/db");
const app = require("./app.js");

const PORT = process.env.PORT;

// Check if have an error on database connection
db.mongoose.connection.on('error', () => {
    console.log('>> Error on connect.');
});

// Successfully connection
db.mongoose.connection.on('connected', () => {
    console.log('>> Database connected.');
    // Server on-line
    app.listen(PORT, () => {
        console.log(`>> Server running at: http://localhost:${PORT}/`);
        console.log('>> Press Ctrl-C to terminate');
    }); 
});

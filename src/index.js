const express = require("express");
const db = require("./config/db");

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send("<h1> Welcome to wazunga blog API </h1>")
});

// Successfully connection
db.mongoose.connection.on('connected', () => {
  console.log('> Database connected.');
  // Server on-line
  app.listen(PORT, () => {
    console.log(`> Server running`);
    console.log('> Press Ctrl-C to terminate');
  });
});
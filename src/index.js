const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const host = process.env.HOST;
const app = express();
app.get('/', (req, res) => {
    res.send("<h1> Welcome to wazunga blog API </h1>")
});

app.listen(PORT, host, () => {
    console.log(`>> Serverrunnig at http://${host}:${PORT}/`);
});


"use strict";

const app = require("express")();

app.get('/', (req, res) => {
    res.send("Hello nodejs!");
}).listen(3000, 'localhost');
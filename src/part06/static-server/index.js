"use strict";

const http = require('http');
const server = http.createServer(); 
const fs = require('fs');
const path = require('path');

const template = require('art-template');

server.on('request', function (req, res) {
    let url = req.url;
    if(url === '/'){
        
    }
});
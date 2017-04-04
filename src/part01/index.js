"use strict";
const path = require('path');
require(path.resolve(__dirname, 'bar.js'));
let fooName = require(path.join(__dirname, 'foo.js'))();
console.log('fooName ' + fooName);
console.log('global.barVarible ' + global.barVarible);
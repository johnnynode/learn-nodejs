"use strict";

const path = require('path');
let calculator = require(path.resolve(__dirname,'calculator.js'));

let res_plus = calculator.plus(1,2);
console.log('res_plus: ' + res_plus);
let res_minus = calculator.minus(2,3);
console.log('res_minus: ' + res_minus);
let res_multiply = calculator.multiply(2,3);
console.log('res_multiply: ' + res_multiply);
let res_divide = calculator.divide(10,2);
console.log('res_divide: ' + res_divide);

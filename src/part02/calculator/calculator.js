"use strict";

let Cal = function(){};
Cal.prototype = {
    plus:function(a,b){
        return a + b;
    },
    minus:function(a,b){
        return a - b;
    },
    multiply:function(a,b){
        return a * b;
    },
    divide:function(a,b){
        return a / b;
    }
}
module.exports = new Cal();
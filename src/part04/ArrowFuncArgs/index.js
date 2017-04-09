"use strict";

function Person() {
  this.name = 'jack';
}

Person.prototype.sayHello = function () {
  setTimeout(() => {
    console.log(arguments); // {} // 在箭头函数内部没有arguments
    console.log(this); // Person { name: 'jack' } // 说明：箭头函数默认绑定了this
  });
};

var p1 = new Person();
p1.sayHello();
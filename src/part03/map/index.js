"use strict";

let arr = [1, 2, 3];
simpleMap();
normalMap();

function simpleMap() {
    let res = arr.map((item, index) => item + index);
    console.log("simpleMap, res: ");
    console.log(res); // [1, 3, 5]
}

function normalMap() {
    let res = arr.map((item, index) => {
        return item += index; // 这里一定要return
    });
    console.log('normalMap res: ');
    console.log(res);
}
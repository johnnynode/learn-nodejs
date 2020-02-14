"use strict";

process.nextTick(function(){
    let pid = process.pid;
    process.kill(pid);
});
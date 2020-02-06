const app = require('express')();
const db = require('./db');
/*
app.get('/',
    [function(req, res, next) {
        console.log(1);
        next();
    },
    function(req, res, next) {
        console.log(2);
        next();
    }],
    function(req, res) {
        console.log(3);
        res.send('Hello');
    }
);
*/

app.get('/user/:id', db.getUser, (req, res) => {
    res.send(req.user);
});

app.listen(3000);
const express = require('express');
const app = express();
const router = express.Router();

app.use('/', router);

// 此处定义router的param 不能写在下面，需要独立定义
router.param((key, value) => {
    console.log('key :', key); // 这里会调用两次
    console.log('value :', value); // 这里会调用两次
    
    return (req, res, next, v)=>{
        console.log('v: ', v);
        next();
    }
});

router.get('/user/:id/:name', (req, res) => {
    res.send(
        `
        user's name = ${req.params.name}
        user's id = ${req.params.id}
        `
    );
})
.param('id', '100')
.param('name', 'Joh');

app.listen(3000);
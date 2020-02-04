const express = require('express');
const router = express.Router();
const subRouter = express.Router();
const app = express();

// 测试中间件 自定义中间件
function testmiddle(req, res, next) {
    console.log('test middle');
    next();
}
function testmiddle2(req, res, next) {
    console.log('test middle2');
    next();
}
app.use(testmiddle);
router.use(testmiddle2); // 注意这个顺序，一定要在其他 app.use, router.use 之上

/* 直接使用中间件 */
app.use(function(req, res, next) {
    req.agent="test middleware"; // 此处挂载之后，在后面的每处req都可以获取
    next(); // 每个中间件的next都不能少
});

// 针对test路由进行特殊处理的中间件, 在/test下面的所有子路由都会执行该中间件函数，其他路由不会执行，也不影响其他路由
app.use('/test', function(req, res, next) {
    req.name='Joh';
    next();
});
// 也可以针对同一个路由，分别加上2个中间件, 都会执行, 相同的会被覆盖
app.use('/test', function(req, res, next) {
    req.name='Joh2'; // 这里会覆盖上面的值 变为 Joh2
    req.name3='Joh3';
    // res.send('...'); // 备注：这里是错误的, 会冲突, send不能在中间件中使用, 因为send之后不能有next其他中间件了
    next();
});

/* 路由测试部分 开始 */
// 直接访问 /
app.get('/', function(req, res) {
    res.send('hello index!');
});
// 根目录下的 test 也就是 /test 注意与router.get的不同之处
app.get('/test', function(req, res) {
    res.send('hello test! req.agent: ' + req.agent +  ' req.name: ' + req.name );
});
// res.send 和 next 不能同时执行
app.get('/test/abc', function(req, res, next) {
    // 下面这样是可以的，仅作为演示
    if(req.name === 'Joh2') {
        next();
    } else {
        res.send('hello test! req.agent: ' + req.agent +  ' req.name: ' + req.name );
    }
});

// /route1 下的 / 也就是 /route1/ 在这里req.name是无法获取的，因为它只针对 /test路由进行的中间件配置
router.get('/', function(req, res) {
    res.send('hello world route1! req.agent: ' + req.agent + " req.name: " + req.name);
});
// /route1 下的 /test 也就是 /route1/test
router.get('/test', function(req, res) {
    res.send('hello route1 test!');
});

// subRouter 访问：route1/sub 这是三级路由实现了路由嵌套
subRouter.get('/', function(req, res) {
    res.send('subRouter /');
});
router.use('/sub', subRouter); // 二级路由加入三级路由

// 将router指定到了/route1下 这个子路由其实就是一个中间件
app.use('/route1', router);

/* 路由测试部分 结束 */

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
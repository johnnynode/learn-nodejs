var express = require("express");
var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');

var app = express();
app.set("view engine","ejs");

//数据库连接的地址，最后的斜杠表示数据库名字
var db_url = 'mongodb://localhost:27017/db1';

app.get("/",function(req,res) {
    //先连接数据库，对数据库的所有操作，都要写在他的回调函数里面。
    MongoClient.connect(db_url, function(err, db) {
        if(err){
            //res.write("数据库连接失败");
            return;
        }
        //res.write("恭喜，数据库已经成功连接 \n");
        //查询数据库，cursor游标，游标可以用each方法遍历
        //每次表示一条document
        var result = [];
        var cursor = db.collection('teacher').find();
        cursor.each(function(err, doc) {
            if(err){
                //res.write("游标遍历错误");
                return;
            }
            if (doc) {
                result.push(doc);
            } else {
                //console.log(result);
                //遍历完毕
                db.close();
                res.render("home",{
                    "result" : result
                });
            }
        });
    });
});

app.get("/add",function(req,res){
    res.render("add");
});

app.get("/dopost",function(req,res){
    //得到参数
    var name = req.query.name;
    var age = req.query.age;
    var yuwenchengji = req.query.yuwenchengji;
    var shuxuechengji = req.query.shuxuechengji;

    MongoClient.connect(shujukuURL, function(err, db) {
        if(err){
            console.log("数据库连接失败");
            return;
        }

        db.collection("teacher").insertOne({
            "name" : name,
            "age" : age,
            "score" : {
                "shuxue" : shuxuechengji,
                "yuwen" : yuwenchengji
            }
        },function(err,result){
            if(err){
                console.log("数据库写入失败");
                return;
            }
            res.send("恭喜，数据已经成功插入");
            res.end();
            //关闭数据库
            db.close();
        });
    });
});

app.listen(3000);
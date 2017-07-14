/**
 * Created by sandeep on 14/07/17.
 */

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var mysql = require('./mysql');

app.use('/',express.static('public_static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/show', function (req,res) {
  mysql.show(function(data) {
      res.send(data);
  });
});

app.post('/cart',function (req,res) {
    console.log(req.body);
    mysql.init(JSON.stringify(req.body),function (data) {
        res.send(data);
    });

});

app.get('/get',function (req,res) {

    mysql.info(req.query.id,function (data) {
        res.send(data);
    })

});


app.listen(5000,function (err) {
    if(err) throw err;
    console.log('working');
});
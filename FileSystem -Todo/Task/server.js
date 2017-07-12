/**
 * Created by sandeep on 08/07/17.
 */

var express = require('express');
var filestream = require('fs');

var app = express();

var todo = [];

app.use('/', express.static('public_static'));

if('info.txt') {

    filestream.readFile('info.txt', function (e,data) {

        if(e) throw e;
        todo = JSON.parse(data);
        console.log('checking for prev task');

    });


}

app.get('/get', function (req,res) {


    todo.push({
            task: req.query.todo,
            done: false
    });

    filestream.writeFile('info.txt',JSON.stringify(todo),function (e) {
        if(e) throw e;
        console.log('file written');
    });

    res.send(todo);


});

app.get('/show', function (req,res) {

    filestream.readFile('info.txt',function (e,data) {
        if(e) throw e;
        todo = JSON.parse(data);
        console.log('sending data');
        res.send(todo);
    })

});


app.listen(4000 || process.env.port, function(response, err) {
    if(err) throw err;
    console.log('Sever is running on 5000 port');
});
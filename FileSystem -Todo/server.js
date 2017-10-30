


var express = require('express');
var file = require('./file.js');

/* 
    main: writeFile,
    getData: readFile
*/

const fileUpload = require('express-fileupload');

var app = express();
app.use(fileUpload());
var todoList = [];

// file.getData(function(data){
//    console.log(JSON.parse(data));
// });

app.use('/', express.static('public_static'));

file.getData(function(data){
    if(data.length){
        var obj = JSON.parse(data);
        for(let i in obj) {
            todoList.push(obj[i]);
        }
    }

});

app.get('/add', function(req,res) {



    todoList.push({task: req.query.todo});
    file.main(todoList);
    res.send("Sucessfully Written");
});

app.get('/getList',function(req,res){
   file.getData(function(data){
       res.send(data);
   })
});

app.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let textfile = req.files.foo;
     console.log(textfile);
    
    // the uploaded file object
    textfile.mv('./text.txt');
    res.send("File Uploaded");
});

app.listen(5000, function() {
    console.log("Port 5000");
});

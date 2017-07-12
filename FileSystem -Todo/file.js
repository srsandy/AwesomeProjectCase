/**
 * Created by aayusharora on 7/8/17.
 */

var fileSystem = require('fs');

function writeFile(todo) {

    fileSystem.writeFile('text.txt',JSON.stringify(todo),function(req,res) {
        console.log("File is written");
    });
}

function readFile(cb) {

    fileSystem.readFile('text.txt',function(err, data) {
        if(data !== undefined) {
            cb(data.toString());
        }

    })
    
}

module.exports = {
    main: writeFile,
    getData: readFile
};
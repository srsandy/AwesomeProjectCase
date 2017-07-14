/**
 * Created by sandeep on 14/07/17.
 */

var mysql = require('mysql');

var dbconfig = {
    host: 'localhost',
    user     : 'sandeep',
    password : 'password',
    database : 'newdb'

}


function show(cb) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect();

    connection.query('SELECT * FROM shop', function (err,result,fields) {
        if(err) throw err;
        cb(result);
    })

}

function info(i,cb) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect();

    connection.query('SELECT * FROM info WHERE id ="'+i+'"', function (err,result,fields) {
        if(err) throw err;
        cb(result);
    })

}



function init(x,cb) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect();
    var post = {
        orders : x
    }
    connection.query('INSERT INTO info SET ?',post, function (err,result,fields) {
        cb(result);
    });
}

module.exports = {
    show : show,
    init : init,
    info : info
}
/**
 * Created by sandeep on 08/07/17.
 */

$(document).ready(function () {

    $('#btn').click(function () {

        var x = $('#inp').val();
        $.get('/get?todo='+x , function (d) {
            console.log(d);
        });

    });

    $('#show').click(function () {

        var sc = $('#sc');
            sc.html("");
        $.get('/show', function (d) {

            for(let i=0; i<d.length; i++){

                sc.append('<li id="'+i+'">'+d[i].task+'</li>' );

            }

        })
    })

})

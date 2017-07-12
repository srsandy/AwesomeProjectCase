/**
 * Created by aayusharora on 7/8/17.
 */


 $(function() {
     getdata();
     var todo =[];
     $('#btn').click(function(){
         var URL = '/add?todo=';
         var value = $('#input').val();
         $.get({url: URL + value, success: function () {
              console.log("Successfully Written");
              getdata();
         }})
     });

     function getdata() {
         $.get({url: '/getList', success: function (data) {
            var obj = JSON.parse(data);
            for(var i in obj) {
                todo[i] = obj[i].task + '<br>';
            }
            $('#output').html(todo);
             //  for(var i=0; i< JSON.parse(data).length;i++) {
            //      console.log(JSON.parse(data[i]))
            //  }

         }})
     }
 });
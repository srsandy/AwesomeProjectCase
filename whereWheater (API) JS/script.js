function initMap() {
                var options = {
                    zoom: 5,
                    center: {lat: 22.9734, lng: 78.6569}
                }
                
                var map = new google.maps.Map(document.getElementById('map'),options);
                
                google.maps.event.addListener(map, 'click', function(corrd) {
                    
                    var ll = corrd;
                    var lat = ll.latLng.lat();
                    var lng = ll.latLng.lng();
                    var URL = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&units=metric&APPID=a634fde5e6c75e4fda0cb6c3d3d6dc25';
                    var data = $('#data');
                    
                    var marker = new google.maps.Marker({
                    position: {lat: lat, lng: lng},
                    map: map
                    });
                    
                    
                    var resp;
                    $.ajax({url: URL, success: function(result) {
                         resp = result;
                        
                       data.html('<h2>'+resp.name+', '+resp.sys.country+'</h2><br>'+
                                   '<h3> <strong>Weather:</strong>'+resp.weather[0].main+'<img src="http://openweathermap.org/img/w/'+resp.weather[0].icon+'.png"></h3><br>'+
                                   '<h3><strong>Description:</strong> '+ resp.weather[0].description+ '</h3><br>'+
                                   '<h3><strong>Temprature:</strong> '+ resp.main.temp + '&deg;C</h3><br>'+
                                   '<h3><strong>Pressure:</strong> '+ resp.main.pressure + ' hPa</span></h3><br>'+
                                   '<h3><strong>Humidity:</strong> '+ resp.main.humidity + '%</h3><br>'+
                                   '<h3><strong>Temprature min:</strong>'+ resp.main.temp_min + '&deg;C</h3><br>'+
                                   '<h3 id="last"><strong>Temprature max:</strong>'+ resp.main.temp_max + '&deg;C</h3><br>'
                                  );
                        
        
                        
                        var infoWindow = new google.maps.InfoWindow({
                        content:'<h4>'+resp.name+'<br>'+resp.main.temp+'&deg;C<br>'+resp.weather[0].main+'</h4>'
                      });
                        
                    marker.addListener('click', function(){
                        infoWindow.open(map, marker);
                      });
                        
                }});
                });
            }
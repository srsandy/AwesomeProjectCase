'use strict'
                var toDoList = [];
                var use = {}
                
            
           
            window.onload = function() {
               
              
                    /* DOM Elements */ 

                    var input = document.getElementById('inp');
                    var addBtn = document.getElementById('btn');
                    var trueBtn = document.getElementById('btn-true');
                    var falseBtn = document.getElementById('btn-false');
                    var printBtn = document.getElementById('btn-print');
                    var clrBtn = document.getElementById('btn-clr');
                    var output = document.getElementById('opt');
                    var outputT = document.getElementById('opt-true');
                    var outputF = document.getElementById('opt-false');
                    var outputE = document.getElementById('opt-er');
                    

                    /*-------------------------*/

                    var z = 100; //z-index variable helper

                    
                    //Function to reset CSS properties
                    var reset = function() {
                        outputT.classList.remove('scr-true-h');
                        outputF.classList.remove('scr-false-h');
                    }


                //To find from the local storage
                toDoList = JSON.parse(localStorage.getItem("Memory")) || [];
                   
                
                //Display function
                
                 var dis = function() {
                     output.innerHTML="";
                  if(toDoList) { 
                    for(var i = 0; i<toDoList.length; i++) { 
                        if(toDoList[i].Done){
                        output.innerHTML += '<li class="true" onclick="doIt(this)" id=' + i + ' >'+(i+1)+"  " + toDoList[i].Task + ' </li><button id="clr" onclick="clre(' +i+ ')"><i class="ion-backspace-outline"></i></button>' ;}
                    else  {
                        output.innerHTML += '<li class="false" onclick="doIt(this)" id=' + i + ' >'+(i+1)+"  " + toDoList[i].Task + ' </li><button id="clr" onclick="clre(' +i+ ')"><i class="ion-backspace-outline"></i></button>'; }
                    }
                    }
            }



                 if(toDoList) {  
                    for(var i = 0; i<toDoList.length; i++) { 
                        if(toDoList[i].Done){
                        output.innerHTML += '<li class="true" onclick="doIt(this)" id=' + i + ' >'+(i+1)+"  " + toDoList[i].Task + '</li><button id="clr" onclick="clre(' +i+ ')"><i class="ion-backspace-outline"></i></button>' ;}
                    else  {
                        output.innerHTML += '<li class="false" onclick="doIt(this)" id=' + i + ' >' +(i+1)+"  "+ toDoList[i].Task + '</li><button id="clr" onclick="clre(' +i+ ')"><i class="ion-backspace-outline"></i></button>'; }
                        
                      localStorage.setItem("Memory",JSON.stringify(toDoList));
                    }
                    }



                 //Tick Button functionality
                
                trueBtn.onclick = function() {
                  
                    z +=10; // for z-index
                    outputT.style.zIndex = z;
                    outputT.innerHTML = "";
                    var trueArr = toDoList.filter( function(ele){
                             return (ele.Done);
                            
                        });
                    outputT.style.animationPlayState = "running";
                    
                    outputT.classList.add('scr-true-h');
                    
                    if(trueArr.length === 0) {
                        outputT.innerHTML = '<h2>No Task Done</h2>';
                    }
                    else {
                        trueArr.forEach( function(y){
                            outputT.innerHTML += '<li class="true">' + y.Task + '</li>';
                        });
                    }

                    //Cheat sheet to stop the animation
                   setTimeout(function() {
                       outputT.style.animationPlayState = "paused";
                       outputF.classList.remove('scr-false-h');
                   },970); 
                    
                    
                     
                    
                }

                //Cross Button functionality
                
                 falseBtn.onclick = function() {
                     z +=10; // for z-index
                     outputF.style.zIndex = z;
                     outputF.innerHTML = "";
                     var falseArr = toDoList.filter( function(ele){
                             return !(ele.Done);
                            
                        });
                     outputF.style.animationPlayState = "running";
                    outputF.classList.add('scr-false-h');
                     
                     
                    if(falseArr.length === 0) {
                        outputF.innerHTML = '<h2>No Undone Task</h2>';
                    }
                    else {
                        falseArr.forEach( function(y){
                            outputF.innerHTML += '<li class="false">' + y.Task + '</li>';
                        });
                    }

                     //Cheat sheet to stop the animation
                    setTimeout(function() {
                       outputF.style.animationPlayState = "paused";
                        outputT.classList.remove('scr-true-h');
                   },960); 
                    
                    //Reset 
                     
                };

                //List Button functionality
                 
                 printBtn.onclick = function() {
                     reset();
                     if(toDoList.length === 0){
                        output.innerHTML = '<h2>No Task Added Yet</h2>'; 
                     }
                     else{
                         dis();
                     }
                 }


                 //Add Button functionality
                
                addBtn.onclick = function() {
                    reset();
                    var value = input.value;
                    output.innerHTML = "";
                    
                    if(value !== '') {
                       
                        toDoList.push({
                        Task : value,
                        Done : false
                    });
                        for(var i = 0; i<toDoList.length; i++) {
                      
                    if(toDoList[i].Done){
                        output.innerHTML += '<li class="true" onclick="doIt(this)" id=' + i + ' >' +(i+1)+"  "+ toDoList[i].Task +'</li><button id="clr" onclick="clre(' +i+ ')"><i class="ion-backspace-outline"></i></button>' ; }
                    else  {
                        output.innerHTML += '<li class="false" onclick="doIt(this)" id=' + i + ' >' +(i+1)+"  "+ toDoList[i].Task + '</li><button id="clr" onclick="clre(' +i+ ')"><i class="ion-backspace-outline"></i></button>'; }
                        
                      localStorage.setItem("Memory",JSON.stringify(toDoList));
                    }
                    
                  
                    input.value = "";
                        
                    }else{ dis()}
                    
                    
                };

                //Bin Button functionality
                
                clrBtn.onclick = function() {
                    reset();
                    toDoList = [];
                    localStorage.setItem("Memory",JSON.stringify(toDoList));
                    output.innerHTML = "<h2> List Empty :( </h2>";
                    
                }

                
                use.disp = dis;
                 

            };

            //Function to help to store in local storage
            
            function doIt(e) {
             if(toDoList[e.id].Done === false) {
               toDoList[e.id].Done = true;
               e.classList.remove('false');
               e.classList.add('true');
               
             }
                else {
                    toDoList[e.id].Done = false; 
                    e.classList.remove('true');
                    e.classList.add('false');
                    
                }
                
                localStorage.setItem("Memory",JSON.stringify(toDoList));
            };

            //Clear button Code
            
            function clre(ele) {
                console.log(ele);
                var x = toDoList.splice(ele,1);
                localStorage.setItem("Memory",JSON.stringify(toDoList));
                console.log(x);
                console.log(toDoList);
                use.disp();
            }
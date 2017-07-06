'use strict'
            
            window.onload = function() { 
                
                /* ALL BUTTONS */
               
                var btn_no = document.getElementsByClassName('press-no'); //for all num Keys including '.'
                var btn_op = document.getElementsByClassName('press-op'); // for all op Keys
                var btn_eq = document.getElementById('press-eq'); // for equal Key
                var btn_clr = document.getElementById('press-clr'); // for clr Key
                var btn_sclr = document.getElementById('press-sclr'); // for bksp Key
                var btn_change = document.getElementById('press-chnge') // for +/- key
                /* ----------------*/
                
                var n_no = btn_no.length; // as press-no is a class
                var n_op = btn_op.length; // as press-op is a class
                
                /* SCREENS */
                
                var display = document.getElementById('screen'); // the big screen
                var mini_display = document.getElementById('mini-screen'); // the mini screen
                /*--------*/
                
                /* HELP VARIABLE */
                
                var num1 = ""; 
                var num2 = "";
                var op = ""; //Value of Operator
                var ans = ""; //Answer
                var clrscr = 1; //To clr mini screen
                var op_press = 0; //So one can press just one op at time
                var dec_count = 0; //So you can only have one decimal at a time in a number
                var eq_count = 0; //So equal is press only once
                /* -------------*/       
                
                var btn_no_click = function(num) {     // When a num key or '.' is clicked
                        return function() {
                        eq_count = 0; // reset eq_count
                        op_press = 0; // reset op_press
                          
                        if(display.innerHTML.charAt(0) == "E") { // if screen has 'error' as this content then replace it then append 
                            display.innerHTML = num; 
                        }
                       else {
                              if( num == '.') { 
                                   // So no more than one '.' is appened at the end
                               if (dec_count == 0) {
                                   display.innerHTML += num;
                                   dec_count = 1;
                               }
                           } 
                              else{
                                 display.innerHTML += num; //append nums on the screen
                                
                            }
                          
                            if(clrscr == 0) { // helps to clr mini screen time to time
                                mini_display.innerHTML = "";
                                clrscr = 1;
                            }  
                            }
                            
                    };
                };
                
                
                var btn_op_click = function() {  // When a op key is clicked
                        return function() {
                            
                            if(clrscr == 0) { // helps to clr mini screen time to time
                                mini_display.innerHTML = "";
                                clrscr = 1; 
                            }
                            
                            dec_count = 0; // rest dec_count
                            eq_count = 0; // reset eq_count
                            if(op_press == 1) {   
                                
                                /*  if some one press one op key then if he/she clicks other op key 
                                     then the previous op press is lost 
                                     eg: if you press '1+' then you click on '-' then the mini screen
                                     changes to '1-' 
                                */
                                
                                if(op !== this.value){
                                      // You can't start a math's expression with an op
                                    var smt =mini_display.innerHTML;
                                    mini_display.innerHTML = smt.substr(0, smt.length-1) + this.value;
                                
                                }
                            }
                            else {
                                
                                op_press = 1; //one op is appened at one time
                                
                                if(display.innerHTML == "" || display.innerHTML.charAt(0) == "E") { // You can't start a math's expression with an op
                                   display.innerHTML = "Error";
                                   mini_display.innerHTML = "";
                                }
                                else {
                                    num1 = display.innerHTML; //apprends to mini screen
                                    mini_display.innerHTML += num1;
                                    op = this.value;
                                    display.innerHTML = "";
                                    mini_display.innerHTML += op; 
                                }
                            }
                      
                };
                };
                
                btn_change.addEventListener('click', function() {  // +ve to -ve
                    eq_count = 0; // reset eq_count
                    op_press = 0; // reset op_press
                    
                    if( display.innerHTML !== "" && display.innerHTML.charAt(0)!== 'E') { //if screen is empty you can't perform this operation
                        
                        var next = display.innerHTML; // take the screen's content

                        if(next.charAt(1) === '+'){ 
                            display.innerHTML = '(-' + next.substr(2,next.length);
                        }
                        else if(next.charAt(1) === '-') {
                            display.innerHTML = '(+' + next.substr(2,next.length);
                        }
                        else {

                        if(display.innerHTML > 0) {
                             var str = display.innerHTML;
                            
                            
                                display.innerHTML = '(-' + str.substring(0,str.length) + ')';
                           
                        
                        }
                        else {
                             var str = display.innerHTML;
                             display.innerHTML = '(+' + str.substring(1,str.length);
                        }
                        } 
                    
                    }
                    
                });
                
                
                btn_clr.addEventListener('click', function() {  // clears both screen and  resets the value the help variables 
                    display.innerHTML = ""; 
                    mini_display.innerHTML = "";
                    clrscr = 1;
                    op_press = 0;
                    dec_count = 0;
                    eq_count = 0;
                });
                
                btn_sclr.addEventListener('click', function(){ // Backspace btn functionality
                    var s_clr = display.innerHTML;
                    var len = s_clr.length;
                    display.innerHTML = s_clr.substring(0, len-1);
                });
                
                btn_eq.addEventListener('click', function(){ // equal button
                     if(eq_count == 0) {
                    num2 = display.innerHTML; // appends to mini screen
                    mini_display.innerHTML += num2;
                  
                    /* The following loop replace the x -> * so the calcuation can be from 
                       it happens behind the screen B|
                    */   
                    
                    var h = mini_display.innerHTML;
                    
                    for(var i=0; i<h.length; i++) {
                        if(h.charAt(i) == 'x') {
                            h = h.substr(0,i) + '*' + h.substr(i+1,h.length);
                        }
                    }
                    
                    /* If the express contains an '(' at the start so this "if & loop" 
                       adds the ')' at the end so it is logically correct
                       it happens behind the screen B|
                    */   
                    
                    if(h.charAt(0) == '(') {
                        var app = true;
                        for(var i = 0; i<h.length; i++) {
                            if(h.charAt(i) == ')') {
                                app = false;
                                break;
                            }
                        }
                        if(app == true) {
                            h += ')';
                        }
                        
                    }
                
                 // finally and is eval() and it is displayed on the screen  and help variables are reset the help variables 
                    
                   
                     ans = eval(h);
                     display.innerHTML = ans;
                    }
                    
                    clrscr = 0;
                     dec_count = 0;
                    eq_count = 1;
                     
                });
                

                /* Key Press Effects */
                
                var mouseDown = function() {
                   return function() {
                       this.style.backgroundColor = "#fbfbfb"; }
                }

                var mouseUp =function () {
                    return function() {
                        this.style.backgroundColor  = "#fff"; }
                } 
                
                var mouseDownop = function() {
                   return function() {
                       this.style.backgroundColor = "#eaeaea"; }
                }
                
                var mouseUpop =function () {
                    return function() {
                        this.style.backgroundColor  = "#f7f7f7"; }
                } 
                
                
                
                btn_change.onmousedown = mouseDown();
                btn_clr.onmousedown = mouseDown();
                btn_sclr.onmousedown = mouseDown();
                
                btn_change.onmouseup = mouseUp();
                btn_clr.onmouseup = mouseUp();
                btn_sclr.onmouseup = mouseUp();

                /*--------------------------*/



                
                  /* LOOP for Class elements */ 

                for(var i=0; i<n_no; i++) {
                    btn_no[i].onclick = btn_no_click(btn_no[i].innerHTML); 
                    btn_no[i].onmousedown = mouseDown();
                    btn_no[i].onmouseup = mouseUp();
                }
                
                for(var i=0; i<n_op; i++) {
                    btn_op[i].onclick = btn_op_click();
                    btn_op[i].onmousedown = mouseDownop();
                    btn_op[i].onmouseup = mouseUpop();
                }
                /*-----------------------*/
                
            };
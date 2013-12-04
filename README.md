scripter
========

a platformer where you control the character by writing short scripts; reach the end to complete.

single level now.

###how to play:

function | use
---------|-----------------
`walk()` | walk ahead a single step
`jump()` | jump
`stop()` | stop whatever you're doing

javascript syntax is allowed. loops, variables and conditionals.

example code:

    var i = 3;
    while(i-- > 0){
        walk();         /* walk i = 3 steps forward */
        if(i == 2){
            jump();     /* jump when i becomes 2 */
        }
    }
 <br>
 <br>
built with [melonJS][1] engine <br>
game art: thanks to [kenney wings][2] <br>
editor: [ace][3]


----------


**TODO**

 1. prevent js injection
 2. handle uncontrolled loops


  [1]: http://melonjs.org/
  [2]: http://kenney.nl
  [3]: http://ace.c9.io/
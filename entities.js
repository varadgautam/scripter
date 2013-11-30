var a=0;
var b=0;
var PlayerEntity = me.ObjectEntity.extend({
	//constructor
    init: function(x, y, settings) {


        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(4, 16);

        this.updateColRect(17,45,-1,0);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        me.game.viewport.setDeadzone( me.game.viewport.width / 10,
                                      me.game.viewport.height);

        //this.resize(.78);

        this.addAnimation("walk", [0,1,2,3,4,5,6,7,8,9], 2);
        this.addAnimation("jump", [12]);
        this.addAnimation("stand", [10,11,13,10,11,13,10,
                                    10,10,10,10,10,10,10,
                                    10,10,10,10,10,10,10,
                                    10,10,10,10,10,10,10,
                                    10,10,10,10,10,10,10,
                                    10,10,10,10,10,10,10], 4);
        this.doubleJumping = false;
    },

    die: function () {
        me.game.HUD.updateItemValue("lives", 1);
        me.levelDirector.loadLevel("area01");
    },

    handleFallOffMap: function() {
        if (this.pos.y > 500) {
            this.die();
        }
    },

    //update animation
    updateAnimation: function(){
        if(this.vel.x === 0){
            this.setCurrentAnimation("stand");
        }
        else{
            if(this.getCurrentAnimationFrame() === 9){
                this.setAnimationFrame(0);
            }
            this.setCurrentAnimation("walk");
        }
        if(this.jumping || this.falling){
            this.setCurrentAnimation("jump");
        }
    },

    updateInAir: function () {
        this.doubleJumping = VAR.doublejump;
        if (me.input.isKeyPressed('left')) {
            this.vel.x -= this.accel.x * me.timer.tick;
        }
        else if (me.input.isKeyPressed('right')) {
            this.vel.x += this.accel.x * me.timer.tick;
        }

        if ((a==1 || me.input.isKeyPressed('jump')) && !this.doubleJumping) {
        	me.audio.play("jump", false, function() {}, .7);
            this.forceJump();
            this.doubleJumping = true;
            //alert(a);
        }
       
    },

    updateOnGround: function () {
        if (me.input.isKeyPressed('left')) {
            this.flipX(true);
            this.vel.x -= this.accel.x * me.timer.tick;
        }
        else if (me.input.isKeyPressed('right')) {
            //this.vel.x =1;  
            this.flipX(false);
            this.vel.x += this.accel.x * me.timer.tick;
        }
        else {
            this.vel.x = VAR.myvalue;
            //console.log(a);
            
        }
        if ((VAR.myvalue == 0 && VAR.c == 'u') || me.input.isKeyPressed('jump')) {
            console.log("so i'll jump");
            if (!this.jumping && !this.falling) {
	        	me.audio.play("jump", false, function() {}, .7);
                this.doJump();
                
            }
            VAR.c=0;
            //VAR.c=1;
        }
        else if(!VAR.block && VAR.myvalue >= 0 && VAR.c == 'r'){
            console.log("jumping right");
            if (!this.jumping && !this.falling) {
                me.audio.play("jump", false, function() {}, .7);
                this.vel.x = 10;
                this.doJump();   
            }
            VAR.c=0;
        }
        else if(!VAR.block && VAR.myvalue >= 0 && VAR.c == 'l'){
            console.log("jumping left");
            if (!this.jumping && !this.falling) {
                me.audio.play("jump", false, function() {}, .7);
                this.flipX(false);
                this.vel.x = -10;
                this.doJump();   
                
            }
            
            VAR.c=0;
        }
    },
    
    
   
    //update player position
    update: function() {
        if (this.jumping || this.falling) {
            this.updateInAir();
        }
        else {
            this.doubleJumping = false;
            this.updateOnGround();
         
        }
        this.updateAnimation();
        this.handleFallOffMap();


        // check & update player movement
        this.updateMovement();
        this.parent(this);
        return true;
    }
 
});


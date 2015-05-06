var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.scheduleUpdate();

        this.player = new Player();
        this.player.setPosition( new cc.Point( 50 , 100 ) );
        this.playerFloor = 0;
        this.playerCurrentFloor = 0;
        this.player.scheduleUpdate();
        
        this.addKeyboardHandlers();

        this.state = GameLayer.STATES.FRONT;

        this.screenFloor = 1;
        this.checkPosition = 0;
        this.arrayBuilding = [];
        this.totalFloor = 3;
        this.floorChange = true;

        this.background = new BackGround();
        this.background.setPosition( new cc.Point( this.background.getBoundingBoxToWorld().width/2 , this.background.getBoundingBoxToWorld().height/2));
        this.addChild(this.background);

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setColor('red');
        this.scoreLabel.setPosition( new cc.Point( 700, 550 ) );
        this.addChild( this.scoreLabel );

        this.addChild( this.player );
        this.createFloor();
        console.log( 'GameLayer created' );
        
        this.checkPause = false; //check pause
        
        return true;
    },

    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( e ) {
                self.onKeyDown( e );
            },
            onKeyReleased: function( e ) {
                self.onKeyUp( e );
            }
        }, this );
    },

    onKeyDown: function( e ) {
        if(e == cc.KEY.escape){
            if(!this.checkPause)
            {
                this.scoreLabel2 = cc.LabelTTF.create( 'PAUSE', 'Arial', 40 );
                this.scoreLabel2.setPosition( new cc.Point( 400, 300 ) );
                this.addChild( this.scoreLabel2 );
                cc.director.pause();
                this.checkPause = true;
            }
            else
            {
                this.removeChild( this.scoreLabel2 );
                cc.director.resume();
                this.checkPause = false;
            }
        }
        else {
            if(this.state == GameLayer.STATES.FRONT){
                Player.vx = 3;
                this.state = GameLayer.STATES.STARTED;
                this.player.startRunning();
            }
            this.player.jump();
        }
    },

    onKeyUp: function( e ) {
    },

    createBuilding: function( numFloor ) {
        var emptyBuilding = 0;
        var indexOfBuilding = 0;
        var numSpace = 0;
        while( indexOfBuilding * 50 <= screenWidth ){
            var index = this.arrayBuilding.length;
            if( this.randomBuilding() ||  indexOfBuilding <= 2 || emptyBuilding == 1 || ( indexOfBuilding * 50 ) >= screenWidth -  200 ){
                this.arrayBuilding.push( new Building() );
                this.arrayBuilding[index].setPosition( new cc.Point( ( indexOfBuilding * 50 ) + ( numSpace * 50 ), numFloor * 200 ) );
                this.addChild( this.arrayBuilding[index] );
                emptyBuilding = 0;
            }
            else{
                numSpace++;
                emptyBuilding++;
            }
            indexOfBuilding++;
        }
    },

    createFloor: function(){
        for( i = 0 ; i < this.totalFloor; i++ ){
            this.createBuilding( i );
        }
    },

    decreasePlayerFloor: function() {
        for( i = 0 ; i < this.arrayBuilding.length ; i++ ){
            if ( this.arrayBuilding[i].isPlayerOnBuilding( this.player ) && this.arrayBuilding[i].getPosition().y < 100 && this.playerFloor > 0 && this.floorChange ){
                this.playerFloor--;
                this.playerCurrentFloor--;
                this.screenFloor--;
                this.floorChange = false;
            }
        }
        if( this.player.getPosition().y > 200 && !this.floorChange){
            this.floorChange = true;   
            this.screenFloor++;
        }
    },

    checkOnBuilding: function() {
        var count = 0;
        for( i = 0 ; i < this.arrayBuilding.length ; i++ ){
            if ( this.arrayBuilding[i].isPlayerOnBuilding( this.player ) ){
                var playerRect = this.player.getBoundingBoxToWorld();
                var topBuilding = this.arrayBuilding[i].getBoundingBoxToWorld();
                this.player.state = Player.STATES.GROUND; 
                this.player.setPosition(new cc.Point( this.player.getPosition().x , topBuilding.y+50+ playerRect.height/2 ) );
                count++;
                this.player.vy = 0;
            }
        }
        if( count <= 0 ){
             this.player.state = Player.STATES.SKY; 
        }
    },

    checkPlayerXPosition: function(){
        if( this.player.getPosition().x >= screenWidth ) {
            this.playerFloor++;
        }
    },

    moveSceen: function(){
        if( this.checkPlayerYPosition() ){
            var tempPosition = 0;
            this.background.setPosition(new cc.Point( this.background.getPosition().x, this.background.getPosition().y - 100 ));
            for( i = 0 ; i < this.arrayBuilding.length ; i++ ){
                if( this.arrayBuilding[i].getPosition().y-5 < 0 ){
                    if( (tempPosition >= 100) && this.randomBuilding() ) {
                        tempPosition += 100;
                        this.arrayBuilding[i].setPosition( new cc.Point( tempPosition , screenHeight ) );
                    }
                    else {
                        this.arrayBuilding[i].setPosition( new cc.Point( tempPosition , screenHeight ) );
                    }
                    tempPosition += 50;
                }
            }
            this.checkPosition = screenHeight;
            this.screenFloor++;
            this.player.setPosition( new cc.Point( this.player.getPosition().x, 500 ) );
        }
   },

    moveBuilding: function( ) {
        if (this.checkPosition > 400) {
            for( i = 0 ; i < this.arrayBuilding.length ; i++ ){
                this.arrayBuilding[i].setPosition( new cc.Point( this.arrayBuilding[i].getPosition().x, this.arrayBuilding[i].getPosition().y-8 ) );
            }
            this.checkPosition -= 8;
        }
    },

    checkPlayerYPosition: function(){
        if( this.playerFloor >= 2 && this.screenFloor !=  this.playerFloor &&  this.floorChange ) { 
            this.floorChange = true;
            return true;
        }
        else {
            return false;
        }
    },

    randomBuilding: function() {
        var check = Math.floor( ( Math.random() * 2 ) + 1);
        if(check == 1) {
            return true;
        }
        else {
            return false;
        }
    },
    
    switchFloor: function() {
        if( this.playerFloor != this.playerCurrentFloor ){
            this.player.setPosition(new cc.Point( 0 , 200 + 100 ) );
            this.player.state = Player.STATES.GROUND;
            this.playerCurrentFloor = this.playerFloor;
            // this.floorChange = true;   
        }
    },

    checkDead: function() {
        if( this.player.getPosition().y <= 0 ){
            this.state = GameLayer.STATES.DEAD;
            var delay=3000;                         //delay 3 seconds
            setTimeout(function(){
                 Player.vx = 0;
                cc.director.runScene(new GameoverScene(this.playerFloor));
            },delay);
        }
    },

    changeScore: function(){
        if( this.state == GameLayer.STATES.STARTED){
            this.scoreLabel.setString( this.playerFloor );
        } else {
            var finalScore = "DEAD " + this.playerFloor;
            this.scoreLabel.setString( finalScore );
        }
    },

    update: function( dt ) {
        if(this.state == GameLayer.STATES.STARTED){
            this.checkOnBuilding();
            this.checkPlayerXPosition();
            this.switchFloor();
            this.moveSceen();
            this.moveBuilding();
            this.decreasePlayerFloor();
            this.checkDead();
            this.changeScore();
        }
        console.log( Player.vx );
    }
});
 
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new Menu();
        console.log( 'Initialized' );
        layer.init();
        this.addChild( layer );
    }
});

var GameoverScene = cc.Scene.extend({
//    init: function(score) {
//        this.score = score;
//    },
    onEnter: function(score) {
        this._super();
        var layer = new Gameover(score);
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD: 3
};
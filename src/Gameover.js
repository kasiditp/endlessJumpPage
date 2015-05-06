var Gameover = cc.LayerColor.extend({
    init: function(score) {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( -10, 0 ) );  
        this.backgroundgameover = new BackGroundGameover();
        this.backgroundgameover.setPosition( new cc.Point( 410, 300 ) );
        this.addChild( this.backgroundgameover );
        this.addKeyboardHandlers();
        
        this.playagain = new PlayagainButton();
        this.playagain.setPosition( new cc.Point( 705, 440 ) );
        this.addChild( this.playagain );
        
        this.mainmenu = new GotoMenuButton();
        this.mainmenu.setPosition( new cc.Point( 670, 346 ) );
        
        this.scoreLabel = cc.LabelTTF.create( 'YOUR SCORE : '+score, 'Arial', 25 );
        this.scoreLabel.setPosition( new cc.Point( 650, 550 ) );
        this.addChild( this.scoreLabel );
        
        this.checkSelect = 1;
        this.isAddStartgame = true;
        this.isAddHowtoplay = false;
        
	    return true;
    },
    
    update: function() {
       
    },
    
    onKeyDown: function( e ) {
        switch(e)
        {
            case cc.KEY.enter:  
                    if(this.checkSelect==1)
                        this.changeScene(1);
                    else
                        this.changeScene(2);
                break;
            case cc.KEY.up:
                if(this.isAddHowtoplay)
                {
                    this.removeChild( this.mainmenu );
                    this.isAddHowtoplay = false;
                }
                if(!this.isAddStartgame)
                {
                    this.addChild( this.playagain );
                    this.isAddStartgame = true;
                }
                this.checkSelect = 1;
                break;
            case cc.KEY.down:
                if(this.isAddStartgame)
                {
                    this.removeChild( this.playagain );
                    this.isAddStartgame = false;
                }
                if(!this.isAddHowtoplay)
                {
                    this.addChild( this.mainmenu );
                    this.isAddHowtoplay = true;
                }
                this.checkSelect = 2;
                break;
        }
    },
    
    onKeyUp: function( e ) {
        switch(e)
        {
            case cc.KEY.up:
                break;
            case cc.KEY.down:
                break;
        }
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
        }, this);
    },
       
    changeScene : function( number ){
        cc.log("change scene");
        if(number==1)
            cc.director.runScene(new GameScene());
        else
            cc.director.runScene(new StartScene());   
    }
});
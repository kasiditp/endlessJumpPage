var Menu = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( -10, 0 ) );  
        this.backgroundmenu = new BackGroundMenu();
        this.backgroundmenu.setPosition( new cc.Point( 410, 300 ) );
        this.addChild( this.backgroundmenu );
        this.addKeyboardHandlers();
        
        this.startgame = new StartGameButton();
        this.startgame.setPosition( new cc.Point( 700, 445 ) );
        this.addChild( this.startgame );
        
        this.howtoplay = new HowtoplayButton();
        this.howtoplay.setPosition( new cc.Point( 695, 345 ) );
        
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
                    this.removeChild( this.howtoplay );
                    this.isAddHowtoplay = false;
                }
                if(!this.isAddStartgame)
                {
                    this.addChild( this.startgame );
                    this.isAddStartgame = true;
                }
                this.checkSelect = 1;
                break;
            case cc.KEY.down:
                if(this.isAddStartgame)
                {
                    this.removeChild( this.startgame );
                    this.isAddStartgame = false;
                }
                if(!this.isAddHowtoplay)
                {
                    this.addChild( this.howtoplay );
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
            cc.director.runScene(new HowtoplayScene());   
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

var HowtoplayScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new Howtoplay();
        layer.init();
        this.addChild( layer );
    }
});
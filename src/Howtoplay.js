var Howtoplay = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( -10, 0 ) );  
        this.backgroundhowtoplay = new BackGroundHowtoplay();
        this.backgroundhowtoplay.setPosition( new cc.Point( 410, 300 ) );
        this.addChild( this.backgroundhowtoplay );
        this.addKeyboardHandlers();
        
	    return true;
    },
    
    update: function() {
       
    },
    
    onKeyDown: function( e ) {
        switch(e)
        {
            case cc.KEY.enter:  
                    this.changeScene();
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
            cc.director.runScene(new StartScene());
    }
});
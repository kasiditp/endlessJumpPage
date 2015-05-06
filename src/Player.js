var Player = cc.Sprite.extend({
	ctor: function() {
        this._super();
        this.initWithFile( 'res/images/1.png' );
        this.vy = 0;
        this.state = Player.STATES.GROUND;
        this.side = Player.SIDE.RIGHT;
        this.movingAction = this.createAnimationAction();
	},

    startRunning: function(){
        this.runAction( this.movingAction );
    },

    createAnimationAction: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'res/images/1.png' );
        animation.addSpriteFrameWithFile( 'res/images/2.png' );
        animation.addSpriteFrameWithFile( 'res/images/3.png' );
        animation.addSpriteFrameWithFile( 'res/images/4.png' );
        animation.addSpriteFrameWithFile( 'res/images/5.png' );
        animation.addSpriteFrameWithFile( 'res/images/6.png' );
        animation.addSpriteFrameWithFile( 'res/images/7.png' );
        animation.addSpriteFrameWithFile( 'res/images/8.png' );
        animation.addSpriteFrameWithFile( 'res/images/9.png' );
        animation.addSpriteFrameWithFile( 'res/images/10.png' );
        console.log( animation.getDelayPerUnit() );
        animation.setDelayPerUnit( 0.2 );
        return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

    update: function( dt ) {
        var pos = this.getPosition();
        if( this.state == Player.STATES.SKY ){
            this.setPosition( new cc.Point( pos.x + Player.vx, pos.y + this.vy ) );
            this.vy += -1;
        } else {
            this.setPosition( new cc.Point( pos.x + Player.vx, pos.y ) );   
        }
    },

    jump: function() {
        var pos = this.getPosition();
        if(this.state == Player.STATES.GROUND){
            this.state = Player.STATES.SKY;
            this.vy = Player.JUMPING_VELOCITY;
            this.setPosition( new cc.Point( pos.x, pos.y + this.vy) );
        }
    },

    getPlayerRect: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    },

    getPlayerRectFoot : function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    }

});

Player.vx = 0;

Player.STATES = {
    SKY: 1,
    GROUND: 2
}

Player.JUMPING_VELOCITY = 10;
Player.SIDE = {
    RIGHT: 1,
    LEFT: 2
}
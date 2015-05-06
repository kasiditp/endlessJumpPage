var Building = cc.Node.extend({
    ctor: function() {
        this._super();
        this.building = cc.Sprite.create( 'res/images/block.png' );
        this.building.setAnchorPoint( new cc.Point( 0, 0 ) );
        this.building.setPosition( new cc.Point( 0, 0 ) );
        this.addChild( this.building );
	},

	getBuildingRect: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y +dY,
                        spriteRect.width,
                        spriteRect.height);
    },

    getXPosition: function() {
    	return this.getPosition().x;
    },

    getYPositon: function() {
        return this.getPosition().y;
    },

    isPlayerOnBuilding: function( player ) {
        return cc.rectIntersectsRect( player.getPlayerRectFoot(), this.getBuildingRect() );
    }
});
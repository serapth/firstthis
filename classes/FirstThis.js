
var FirstThis = cc.LayerColor.extend({
    leftSprite:null,
    rightSprite:null,
    mode:0,
    imageChanged:function(imgName,whichSprite){
        if(this.mode != 0) // We were in transition when select box was changed!
        {
            this.resetVisibility();
        }
        this.removeAllChildrenWithCleanup(true);

        if(this.leftSprite != null && whichSprite=="right")
        {
            this.addChild(this.leftSprite);
        }
        if(this.rightSprite != null && whichSprite=="left"){
            this.addChild(this.rightSprite);
        }

        var imageSize;
        YUI().use('node','io-base',function(Y){
            var results = Y.io("/imageSize/" + imgName, {"sync":true});
            imageSize = JSON.parse(results.responseText);
        });

        var newSpriteWidth = cc.Director.sharedDirector().getWinSize().width/2;
        var newSpriteHeight = cc.Director.sharedDirector().getWinSize().height/2;

        if(whichSprite == "left"){
            this.leftSprite = cc.Sprite.create("/image/" + imgName,new cc.Rect(0,0,imageSize.width,imageSize.height));
            this.addChild(this.leftSprite);
            this.leftSprite.setScale((newSpriteWidth * this.leftSprite.getScaleX())/imageSize.width);
            this.leftSprite.setAnchorPoint(new cc.Point(0,1));
            this.leftSprite.setPosition(new cc.Point(0,cc.Director.sharedDirector().getWinSize().height));
        }
        else
        {
            this.rightSprite = cc.Sprite.create("/image/" + imgName, new cc.Rect(0,0,imageSize.width,imageSize.height));
            this.addChild(this.rightSprite);
            this.rightSprite.setScale((newSpriteWidth * this.rightSprite.getScaleX())/imageSize.width);
            this.rightSprite.setAnchorPoint(new cc.Point(0,1));
            this.rightSprite.setPosition(new cc.Point(newSpriteWidth,cc.Director.sharedDirector().getWinSize().height));
        }
    },
    resetVisibility:function()
    {
        this.leftSprite.setIsVisible(true);
        this.rightSprite.setIsVisible(true);
        this.leftSprite.setPosition(new cc.Point(0,cc.Director.sharedDirector().getWinSize().height));
        this.rightSprite.setPosition(new cc.Point(cc.Director.sharedDirector().getWinSize().width/2,cc.Director.sharedDirector().getWinSize().height));
    },
    ctor:function()
    {
        this._super();
    },
    init:function()
    {
        this.setIsTouchEnabled(true);
        this.initWithColor(cc.ccc4(0,0,0,255));

        var that = this;

        YUI().use('node',function(Y){
            Y.one("#firstSel").on("change",function(event){
                if(event.currentTarget.get("selectedIndex") == 0) return;
                    that.imageChanged(event.currentTarget.get("value"),"left");
            });
            Y.one("#thenSel").on("change",function(event){
                if(event.currentTarget.get("selectedIndex") == 0) return;
                    that.imageChanged(event.currentTarget.get("value"),"right");
            });
        });
        this.setAnchorPoint(0,0);
        return this;
    },
    ccTouchesEnded:function (pTouch,pEvent){
        if(this.leftSprite != null && this.rightSprite != null ){
            this.mode++;
            if(this.mode == 1)
            {
                this.leftSprite.setIsVisible(true);
                this.rightSprite.setIsVisible(false);
                this.leftSprite.setPosition(new cc.Point(cc.Director.sharedDirector().getWinSize().width/4,cc.Director.sharedDirector().getWinSize().height));
            }
            else if(this.mode == 2)
            {
                this.leftSprite.setIsVisible(false);
                this.rightSprite.setIsVisible(true);
                this.rightSprite.setPosition(new cc.Point(cc.Director.sharedDirector().getWinSize().width/4,cc.Director.sharedDirector().getWinSize().height));
            }
            else{
                this.resetVisibility();
                this.mode = 0;
            }
        }

    }
});


FirstThis.scene = function() {
    var scene = cc.Scene.create();
    var layer = FirstThis.layer();

    scene.addChild(layer);
    return scene;
}

FirstThis.layer = function() {
    var pRet = new FirstThis();

    if(pRet && pRet.init()){
        return pRet;
    }
    return null;
}
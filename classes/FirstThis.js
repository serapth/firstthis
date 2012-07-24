
var FirstThis = cc.LayerColor.extend({
    leftSprite:null,
    rightSprite:null,
    imageChanged:function(imgName,whichSprite){
        this.removeAllChildrenWithCleanup(true);

        var imageSize;
        YUI().use('node','io-base',function(Y){
            var results = Y.io("/imageSize/" + imgName, {"sync":true});
            imageSize = JSON.parse(results.responseText);
        });

        var sprite = cc.Sprite.create("/image/" + imgName);//, new cc.Rect(0,0,imageSize.width,imageSize.height));

        var widthOffset;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        var newSpriteWidth = windowWidth/2;
        var newSpriteHeight = windowHeight/2;

        if(whichSprite == "left"){
            leftSprite = sprite;
            widthOffset = 0;
        }
        else
        {
            rightSprite = sprite;
            widthOffset = windowWidth/2;
        }
        sprite.setAnchorPoint(0,0);


        if(typeof(leftSprite)=="object")
            this.addChild(leftSprite);
        if(typeof(rightSprite)=="object")
            this.addChild(rightSprite);


        sprite.setScale((newSpriteWidth * sprite.getScaleX())/imageSize.width);
        sprite.setAnchorPoint(new cc.ccp(0.0,1.0));
        sprite.setPosition(new cc.Point(0 + widthOffset,cc.Director.sharedDirector().getWinSize().height));

    },
    init:function()
    {
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
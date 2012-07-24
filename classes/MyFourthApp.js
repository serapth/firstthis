
var MyFourthApp = cc.LayerColor.extend({
    init:function()
    {
        this.initWithColor(cc.ccc4(0,0,0,255));
        var size = cc.Director.sharedDirector().getWinSize();

        cc.AudioManager.sharedEngine().setEffectsVolume(0.5);
        cc.AudioManager.sharedEngine().setBackgroundMusicVolume(0.5);

        var menuItem1 = new cc.MenuItemFont.create("Play Sound",this,this.playSound);
        var menuItem2 = new cc.MenuItemFont.create("Play Song",this,this.playSong);
        var menuItem3 = new cc.MenuItemFont.create("Stop Playing Song",this,this.stopPlayingSound);
        var menuItem4 = new cc.MenuItemFont.create("Exit",this,this.exit);

        menuItem1.setPosition(cc.ccp(size.width/2,size.height/2+50));
        menuItem2.setPosition(cc.ccp(size.width/2,size.height/2));
        menuItem3.setPosition(cc.ccp(size.width/2,size.height/2-50));
        menuItem4.setPosition(cc.ccp(size.width/2,size.height/2-100));

        var menu = cc.Menu.create(menuItem1,menuItem2,menuItem3,menuItem4);
        menu.setPosition(cc.ccp(0,0));

        this.addChild(menu);

        return this;
    },
    playSound:function(){
        cc.Log("Playing sound");
        cc.AudioManager.sharedEngine().playEffect("resources/effect2");
    },
    playSong:function(){
        cc.Log("Playing song");
        cc.AudioManager.sharedEngine().playBackgroundMusic("resources/background",false);
    },
    stopPlayingSound:function(){
        cc.Log("Done playing song");
        if(cc.AudioManager.sharedEngine().isBackgroundMusicPlaying())
        {
            cc.AudioManager.sharedEngine().stopBackgroundMusic();
        }
    },
    exit:function(){
        document.location.href = "http://www.gamefromscratch.com";
    }
});


MyFourthApp.scene = function() {
    var scene = cc.Scene.create();
    var layer = MyFourthApp.layer();

    scene.addChild(layer);
    return scene;
}

MyFourthApp.layer = function() {
    var pRet = new MyFourthApp();

    if(pRet && pRet.init()){
        return pRet;
    }
    return null;
}
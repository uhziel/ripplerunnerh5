class IntroWorld extends egret.DisplayObjectContainer {
    private backImage: egret.Bitmap;
    private sfx: egret.Sound;
    private text: egret.TextField;
    private startX: number = 0;
    private startY: number = 0;
    private spritemap: egret.MovieClip;
    private spritemap2: egret.MovieClip;
    private timer: number = -1;
    private backdrop1: egret.Bitmap;
    private backdrop1r: egret.Bitmap;
    private backdrop2: egret.Bitmap;
    private backdrop2r: egret.Bitmap;
    private backdrop3: egret.Bitmap;
    private backdrop3r: egret.Bitmap;
    private water: egret.Bitmap;
    private water2: egret.Bitmap;
    private static kFadeRate: number = 1.0 / 30.0;

    public constructor() {
        super();
        
        this.backImage = new egret.Bitmap(RES.getRes("flash_png"));
        this.sfx = RES.getRes("intro_mp3");
        this.text = new egret.TextField();
        this.text.text = "DDRKirby(ISQ) presents";
        this.text.size = 15;
        this.text.anchorOffsetX = this.text.width / 2;
        this.text.anchorOffsetY = this.text.height / 2;
        let dataSet = RES.getRes("player_json");
        let texture = RES.getRes("player_png");
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(dataSet, texture);
        this.spritemap = new egret.MovieClip(mcFactory.generateMovieClipData("player"));
        this.spritemap2 = new egret.MovieClip(mcFactory.generateMovieClipData("player"));
        this.backdrop1 = new egret.Bitmap(RES.getRes("backdrop_1_png"));
        this.backdrop1r = new egret.Bitmap(RES.getRes("backdrop_1r_png"));
        this.backdrop2 = new egret.Bitmap(RES.getRes("backdrop_2_png"));
        this.backdrop2r = new egret.Bitmap(RES.getRes("backdrop_2r_png"));
        this.backdrop3 = new egret.Bitmap(RES.getRes("backdrop_3_png"));
        this.backdrop3r = new egret.Bitmap(RES.getRes("backdrop_3r_png"));
        this.water = new egret.Bitmap(RES.getRes("water_png"));
        this.water2 = new egret.Bitmap(RES.getRes("water2_png"));
    }

    public createWorld(mainContainer: egret.DisplayObjectContainer) {
        this.width = 400;
        this.height = 300;
        this.scaleX = 2;
        this.scaleY = 2;
        mainContainer.addChild(this);

        this.addChild(this.backdrop1);
        this.backdrop1r.y = this.height / 2;
        this.addChild(this.backdrop1r);

        this.addChild(this.backdrop2);
        this.backdrop2r.y = this.height / 2;
        this.addChild(this.backdrop2r);
        
        this.addChild(this.backdrop3);
        this.backdrop3r.y = this.height / 2;
        this.addChild(this.backdrop3r);

        this.addChild(this.water);
        this.addChild(this.water2);

        this.text.x = this.width / 2;
        this.text.y = this.height / 2 - 20;
        this.addChild(this.text);

        this.spritemap.gotoAndPlay("walk", -1);
        this.addChild(this.spritemap);
        this.spritemap2.scaleY = -1;
        this.spritemap2.gotoAndPlay("walk", -1);
        this.addChild(this.spritemap2);

        this.backImage.scaleX = 400;
        this.backImage.scaleY = 300;
        this.backImage.alpha = 1;
        this.backImage.tint = 0x000000;
        this.addChild(this.backImage);

        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private update(e: egret.Event) {
        this.timer++;

        if (this.timer <= 45) {
            this.backImage.alpha = 1.0 - this.timer / 45.0;
        }

        if (this.timer == 0) {
            this.sfx.play();
        }

        this.spritemap.x = this.timer * 2.5 + 20;
        this.spritemap.y = 100;
        this.spritemap.anchorOffsetY = 29;
        this.spritemap2.x = this.timer * 2.5 + 20;
        this.spritemap2.y = 200;
        this.spritemap2.anchorOffsetY = 29;

        if (this.timer >= 135) {
            this.backImage.tint = 0xffffff;
            //this.backImage.alpha = (this.timer - 135) / 45.0;
        }
    }
}
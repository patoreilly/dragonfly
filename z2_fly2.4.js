var Menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Menu ()
    {
        Phaser.Scene.call(this, 'menu');
    },
    init: function (data)
    {
        
    },

    preload: function ()
    {
        // this.load.audio('theme', [
        // 'audio/miltonatmidnight.ogg',
        // 'audio/miltonatmidnight.mp3'
        // ]);
        
        this.load.image('wall', 'walls/'+wallList[0]);
        this.load.image('floor','floors/'+floorList[0]);
        this.load.image('atest', 'fly1_sheet1.png');
        this.load.image('atest5', 'atest5.png');
        this.load.image('atest2', 'atest10.png');
        this.load.image('atest6', 'atest6.png');
        this.load.image('atest8', 'atest8.png');
        this.load.image('atest4', 'atest4.png');
        this.load.image('ammo', 'red_ball.png');
        this.load.image('bluebounce', 'pangball.png');

        this.load.image('Last Duel', 'Last Duel (Capcom).png');
        this.load.image('Blood Warrior', 'Blood Warrior (Kaneko).png');
        this.load.image('sky', 'backgrounds/'+backgroundList[0]);
        this.load.image('sky_layer1', 'skylayerplanet.png');
        this.load.image('moon_lg', 'moon_lg.png');
        this.load.image('moon_med', 'moon_med.png');
        this.load.image('moon_sm', 'moon_sm.png');
        this.load.image('flower1', 'flower1.png');
        this.load.image('flower2', 'flower2.png');
        this.load.image('flower3', 'flower3.png');
        //this.load.image('ground', 'transparent64x64.png');
        //this.load.image('transparent64x64', 'transparent64x64.png');

        // files = [];

        for (var k = 0; k < floorList.length; k++)
        {
            this.load.image(floorList[k], 'floors/'+floorList[k]);
            //files.push(floorList[k]);
        }
        for (var i = 0; i < backgroundList.length; i++)
        {
            this.load.image(backgroundList[i], 'backgrounds/'+backgroundList[i]);
            //files.push(backgroundList[i]);
        }

        for (var j = 0; j < wallList.length; j++)
        {
            this.load.image(wallList[j], 'walls/'+wallList[j]);
            //files.push(wallList[j]);
        }

        
        loadfile_index = 0;

        
        //this.load.image(floorList[0],floorList[0]);

        var progress = this.add.graphics().setDepth(99);

        var text = this.add.text(280, 5, 'x', { fill: '#00ff00' }).setDepth(100);
        var text2 = this.add.text(10, 5, 'loading...', { fill: '#00ff00' }).setDepth(100);
        //var text3 = this.add.text(10, 110, 'x', { fill: '#ff00ff' });

        this.load.on('progress', function (value) {
            text.setText(Math.floor(100*value)+'%');
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 0, 320 * value, 5);
        });
        
        // this.load.on('fileprogress', function (file,value) {
        //     text.setText(Math.floor(100*value)+'%');          
        //     text2.setText(file.key);            
        //     //text3.setText(value);
        //     progress.clear();
        //     progress.fillStyle(0x00cc11, 1);
        //     progress.fillRect(0, 0, 320 * value, 5);            
        // });

        this.load.on('filecomplete', this.showFile, this);

        this.load.on('complete', function () {

            progress.destroy();            
            text.destroy();
            text2.destroy();
            for (var e=0; e<file_thumbs.length; e++)
            {
                file_thumbs[e].destroy();
            }
            

        });

    },

    showFile: function (key, type, texture)
    {

        file_thumbs[loadfile_index] = this.add.image(10+20*(loadfile_index%16), 30+20*(Math.floor(loadfile_index/16)), key).setDisplaySize(20, 20);
        

        
        loadfile_index++;


    },

    create: function ()
    {
        

        var text = this.add.text(10, 5, 'Horizon 7', { fill: '#ff00ff' });

        var config2 = {
            image: 'Last Duel',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 91,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:16}
        };

        this.cache.bitmapFont.add('Last Duel', Phaser.GameObjects.RetroFont.Parse(this, config2));

        var text1 = this.add.dynamicBitmapText(0, 0, 'Last Duel', "\\ PLAY (mouse/keyboard) \\\n-mouse & arrow keys or W,A,S,D-").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,70).setDepth(100);
        var text2 = this.add.dynamicBitmapText(0, 0, 'Last Duel', "\\ PLAY (touchscreen) \\\n-thumb overlays-").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,120).setDepth(100);
        text3 = this.add.dynamicBitmapText(0, 0, 'Last Duel', "\\ PLAY (gamepad) \\\n-No Gamepad Detected-").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,170).setDepth(100);
        
        
                
                  
        
            
        
        var hitarea1 = this.add.rectangle(text1.x, text1.y, text1.width + 20, text1.height + 16, 0x00ff00, 0.5).setInteractive();
        var hitarea2 = this.add.rectangle(text2.x, text2.y, text2.width + 20, text2.height + 16, 0xff00ff, 0.5).setInteractive();
        var hitarea3 = this.add.rectangle(text3.x, text3.y, text3.width + 20, text3.height + 16, 0x00ffff, 0.5).setInteractive();


        hitarea1.on('pointerup', function () {

            //sound_enabled = true;

            this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = false;

            //loop = this.sound.addAudioSprite('loops');
            //loop.play('loop'+Phaser.Math.Between(0,15), {loop: true});

            this.scene.start('demo');
            

        }, this);

        hitarea2.on('pointerup', function () {

            //sound_enabled = true;

            this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = true;

            //loop = this.sound.addAudioSprite('loops');
            //loop.play('loop'+Phaser.Math.Between(0,15), {loop: true});

            this.scene.start('demo');
            

        }, this);

        hitarea3.on('pointerup', function () {

            //sound_enabled = true;

            this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = false;

            //loop = this.sound.addAudioSprite('loops');
            //loop.play('loop'+Phaser.Math.Between(0,15), {loop: true});

            this.scene.start('demo');
            

        }, this);

        
        this.input.gamepad.once('down', function (pad, button, index) {

        //text_gamepad.setText('Playing with ' + pad.id + ' index: ' + pad.index);

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        this.scale.startFullscreen();

        touchActivated = false;

        this.scene.start('demo');

        }, this);

        

        this.events.on('shutdown', this.shutdown, this);
    },

    shutdown: function ()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    },
    update: function ()
    {
        if (this.input.gamepad.total === 0)
        {
            return;
        }

        var debug = [];
        var pads = this.input.gamepad.gamepads;
        // var pads = this.input.gamepad.getAll();
        // var pads = navigator.getGamepads();

        for (var i = 0; i < pads.length; i++)
        {
            var pad = pads[i];

            if (!pad)
            {
                continue;
            }

            //  Timestamp, index. ID
            debug.push(pad.id);
            debug.push('Index: ' + pad.index + ' Timestamp: ' + pad.timestamp);

            
            
            
        }
        
        text3.setText("\\ PLAY (gamepad) \\\n-press any button on gamepad to use-");

    }

});

var Demo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Demo ()
    {
        Phaser.Scene.call(this, { key: 'demo' });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        

    },

    create: function ()
    {

    // size of tile (wall height)
    this.TILE_SIZE = 64;
    this.WALL_HEIGHT = 64;
    this.WALL_WIDTH = 64;
    
    // Remember that PROJECTIONPLANE = screen.  This demo assumes your screen is 320 pixels wide, 200 pixels high
    this.PROJECTIONPLANEWIDTH = 320;
    this.PROJECTIONPLANEHEIGHT = 200;
    
    // We use FOV of 60 degrees.  So we use this FOV basis of the table, taking into account
    // that we need to cast 320 rays (PROJECTIONPLANEWIDTH) within that 60 degree FOV.
    this.ANGLE60 = this.PROJECTIONPLANEWIDTH;
    // You must make sure these values are integers because we're using loopup tables.
    this.ANGLE30 = Math.floor(this.ANGLE60/2);
    this.ANGLE15 = Math.floor(this.ANGLE30/2);
    this.ANGLE90 = Math.floor(this.ANGLE30*3);
    this.ANGLE180 = Math.floor(this.ANGLE90*2);
    this.ANGLE270 = Math.floor(this.ANGLE90*3);
    this.ANGLE360 = Math.floor(this.ANGLE60*6);
    this.ANGLE0 = 0;
    this.ANGLE5 = Math.floor(this.ANGLE30/6);
    this.ANGLE10 = Math.floor(this.ANGLE5*2);
    this.ANGLE45 = Math.floor(this.ANGLE15*3);

    this.ANGLE1 = Math.floor(this.ANGLE5/5);
    this.ANGLE2 = Math.floor(this.ANGLE10/5);
    
    // trigonometric tables (the ones with "I" such as ISiTable are "Inverse" table)
    this.fSinTable=[];
    this.fISinTable=[];
    this.fCosTable=[];
    this.fICosTable=[];
    this.fTanTable=[];
    this.fITanTable=[];
    this.fFishTable=[];
    this.fXStepTable=[];
    this.fYStepTable=[];

    // player's attributes
    this.fPlayerX = 300;
    this.fPlayerY = 340;
    this.fPlayerArc = this.ANGLE90;
    this.playerArcDelta = 0;
    this.fPlayerDistanceToTheProjectionPlane = 277;
    this.fPlayerElevation = 80;
    this.fPlayerSpeed = 6;
    
    // Half of the screen height
    this.fProjectionPlaneYCenter = this.PROJECTIONPLANEHEIGHT/2;

    // the following variables are used to keep the player coordinate in the overhead map
    this.fPlayerMapX;
    this.fPlayerMapY;
    this.fMinimapWidth;

    // movement flag
    this.fKeyUp=false;
    this.fKeyDown=false;
    this.fKeyLeft=false; 
    this.fKeyRight=false;

    // 2 dimensional map
    this.fMap=[];
    this.MAP_WIDTH=12;
    this.MAP_HEIGHT=20; 
    
    this.animationFrameID;
    



        var i;
        var radian;
        this.fSinTable = new Array(this.ANGLE360+1);
        this.fISinTable = new Array(this.ANGLE360+1);
        this.fCosTable = new Array(this.ANGLE360+1);
        this.fICosTable = new Array(this.ANGLE360+1);
        this.fTanTable = new Array(this.ANGLE360+1);
        this.fITanTable = new Array(this.ANGLE360+1);
        this.fFishTable = new Array(this.ANGLE360+1);
        this.fXStepTable = new Array(this.ANGLE360+1);
        this.fYStepTable = new Array(this.ANGLE360+1);

        for (i=0; i<=this.ANGLE360;i++)
        {
            // Populate tables with their radian values.
            // (The addition of 0.0001 is a kludge to avoid divisions by 0. Removing it will produce unwanted holes in the wall when a ray is at 0, 90, 180, or 270 degree angles)
            radian = this.arcToRad(i) + (0.0001);
            this.fSinTable[i]=Math.sin(radian);
            this.fISinTable[i]=(1.0/(this.fSinTable[i]));
            this.fCosTable[i]=Math.cos(radian);
            this.fICosTable[i]=(1.0/(this.fCosTable[i]));
            this.fTanTable[i]=Math.tan(radian);
            this.fITanTable[i]=(1.0/this.fTanTable[i]);

            // Next we crate a table to speed up wall lookups.
            // 
            //  You can see that the distance between walls are the same
            //  if we know the angle
            //  _____|_/next xi______________
            //       |
            //  ____/|next xi_________   slope = tan = height / dist between xi's
            //     / |
            //  __/__|_________  dist between xi = height/tan where height=tile size
            // old xi|
            //                  distance between xi = x_step[view_angle];
            
            
            
            // Facing LEFT
            if (i>=this.ANGLE90 && i<this.ANGLE270)
            {
                this.fXStepTable[i] = (this.TILE_SIZE/this.fTanTable[i]);
                if (this.fXStepTable[i]>0)
                    this.fXStepTable[i]=-this.fXStepTable[i];
            }
            // facing RIGHT
            else
            {
                this.fXStepTable[i] = (this.TILE_SIZE/this.fTanTable[i]);
                if (this.fXStepTable[i]<0)
                    this.fXStepTable[i]=-this.fXStepTable[i];
            }

            // FACING DOWN
            if (i>=this.ANGLE0 && i<this.ANGLE180)
            {
                this.fYStepTable[i] = (this.TILE_SIZE*this.fTanTable[i]);
                if (this.fYStepTable[i]<0)
                    this.fYStepTable[i]=-this.fYStepTable[i];
            }
            // FACING UP
            else
            {
                this.fYStepTable[i] = (this.TILE_SIZE*this.fTanTable[i]);
                if (this.fYStepTable[i]>0)
                    this.fYStepTable[i]=-this.fYStepTable[i];
            }
        }

        // Create table for fixing FISHBOWL distortion
        for (i=-this.ANGLE30; i<=this.ANGLE30; i++)
        {
            radian = this.arcToRad(i);
            // we don't have negative angle, so make it start at 0
            // this will give range from column 0 to 319 (PROJECTONPLANEWIDTH) since we only will need to use those range
            this.fFishTable[i+this.ANGLE30] = (1.0/Math.cos(radian));
        }

        
        
                
  
        // CREATE A SIMPLE MAP. see global var 'map3'
        // Remove spaces and tabs
        this.fMap=map3.replace(/\s+/g, '');



    



    //     This code uses a Phaser generated canvas (phaser.image)
    //     Must uncomment background.refresh in blitOffscreenCanvas() for it to work
    this.backgroundCanvas = this.textures.createCanvas('backgroundcanvas', 320, 200);
    mainBackgroundImage = this.add.image(-20,-50,'backgroundcanvas').setOrigin(0).setScale(1.2,1.5);

    //     This uses a regular dom canvas created in css/html
    // this.backgroundCanvas = document.getElementById("gameCanvas");

    this.bg_context = this.backgroundCanvas.getContext( '2d' );

    // create the offscreen buffer (canvas)
    this.offscreenCanvas = this.textures.createCanvas('offscreencanvas', 320, 200); //document.createElement('canvas');
    //this.offscreenCanvas.width = this.backgroundCanvas.width;
    //this.offscreenCanvas.height = this.backgroundCanvas.height;
    this.offscreenCanvasContext = this.offscreenCanvas.getContext('2d');
    this.offscreenCanvasPixels =  this.offscreenCanvasContext.getImageData(0,0,this.backgroundCanvas.width, this.backgroundCanvas.height);


    this.wallsrcimg = this.textures.get('wall').getSourceImage();

    this.fWallTextureBuffer = this.textures.createCanvas('wallcanvas', this.WALL_WIDTH, this.WALL_HEIGHT);

    this.wall_context = this.fWallTextureBuffer.getContext('2d');

    this.wall_context.drawImage(this.wallsrcimg, 0,0,this.wallsrcimg.width,this.wallsrcimg.height,0,0,this.WALL_WIDTH, this.WALL_HEIGHT);



    var imageData = this.fWallTextureBuffer.getContext('2d').getImageData(0, 0, this.WALL_WIDTH, this.WALL_HEIGHT);
    this.fWallTexturePixels = imageData.data;

    
    //this.walleraseimg = this.textures.get('ground').getSourceImage();
    


    this.wallAnimatedData = {};
    this.wallAnimatedData.active = false;
    // this.wallAnimatedData.burstpixels = [];
    // for (var i = 0; i < 300; i++)
    // {
    //     this.wallAnimatedData.burstpixels[i] = {};

    //     // this.wallAnimatedData.burstpixels[i].xincr = 0;//Phaser.Math.RND.realInRange(-1, 1);
    //     // this.wallAnimatedData.burstpixels[i].yincr = 0;//Phaser.Math.RND.realInRange(-1, 1);
    //     // this.wallAnimatedData.burstpixels[i].xpos = 32;
    //     // this.wallAnimatedData.burstpixels[i].ypos = 32;
    // }

    // this.wallAnimatedData.spawnanimation = function() {

    //     this.timecheck=game.loop.now;

    //     for (var i = 0; i < this.burstpixels.length; i++)
    //         {
                

    //             this.burstpixels[i].xincr = 0;//Phaser.Math.RND.realInRange(-1, 1);
    //             this.burstpixels[i].yincr = Phaser.Math.RND.realInRange(.5, 2.5);
    //             this.burstpixels[i].xpos = Phaser.Math.Between(0,959);
    //             this.burstpixels[i].ypos = Phaser.Math.Between(0,199);

    //             // var greylev = Phaser.Math.Between(0,255);

    //             // this.burstpixels[i].r = greylev;
    //             // this.burstpixels[i].g = greylev;
    //             // this.burstpixels[i].b = greylev;
    //             this.burstpixels[i].timecheck = 0;
    //             this.burstpixels[i].switchtime = Phaser.Math.Between(300,1000);
    //         }
    //     };

    this.wallAnimatedData.skyobject = {};
    this.wallAnimatedData.skyobject.xincr = 2;
    this.wallAnimatedData.skyobject.yincr = 0;//Phaser.Math.RND.realInRange(.5, 2.5);
    this.wallAnimatedData.skyobject.xpos = 600;//Phaser.Math.Between(0,959);
    this.wallAnimatedData.skyobject.ypos = 20;//Phaser.Math.Between(0,199);
    this.wallAnimatedData.skyobject.timecheck = 0;
    this.wallAnimatedData.skyobject.switchtime = Phaser.Math.Between(300,1000);

                
    this.wallAnimatedData.savedkey = Math.random().toString();
    this.wallAnimatedData.savedcanvas = this.textures.createCanvas(this.wallAnimatedData.savedkey,64,64);
    //this.wallAnimatedData.savedcanvas.drawFrame('wall',0,0,0);
    var imageData = this.wallAnimatedData.savedcanvas.getContext('2d').getImageData(0, 0, 64, 64);
    this.wallAnimatedData.savedcanvas.imagedata = imageData;
    this.wallAnimatedData.savedcanvas.pixels = imageData.data;


    this.wallAnimatedData.textspace = 0;
    this.wallAnimatedData.all_characters = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[|]^_`abcdefghijklmnopqrstuvwxyz{\\}~';

    var a = " aabbcc ";
    var b = "        ";
    var c = " COMS   ";
    var d = " ^^^^^  ";
    var e = "  verzz ";
    var f = " ||   | ";
    var g = " %//@<> ";
    var h = "  2022  ";

    this.wallAnimatedData.msgstring = a+b+c+d+e+f+g+h;
    this.wallAnimatedData.msgindex = 0; 
    this.wallAnimatedData.colorindex = 0;
    this.wallAnimatedData.timecheck = 0;
    this.wallAnimatedData.mode = 'scrollCanvas';//'colorfade';//'updateTimedText';//'rain';
    this.wallAnimatedData.scrollindex = 0;
    this.wallAnimatedData.scrollcycles = 0;
    this.wallAnimatedData.modedoneflag = true;
    //this.wallAnimatedData.savedkey = '';
    //this.wallAnimatedData.savedcanvas;
    this.wallAnimatedData.waveFrameIndex = 0;
    this.wallAnimatedData.waveData = Phaser.Math.SinCosTableGenerator(64, 3, 3, 8);

    this.wallAnimatedData.hexdigit1 = 50;
    this.wallAnimatedData.hexdigit2 = 67;
    this.wallAnimatedData.hexdigit3 = 155;
    this.wallAnimatedData.hex1increment = -2;
    this.wallAnimatedData.hex2increment = 3;
    this.wallAnimatedData.hex3increment = -6;
    
    

    //var creditText = this.add.dynamicBitmapText(0, 0, 'Last Duel', '@2019 RETRO*EARTHMOON').setOrigin(0.5).setScale(0.0).setCenterAlign().setPosition(320,350);
    //var randomKey1 = Math.random().toString();

    //greater than a certain amount, canvas dimensions must be specified
    var textCanvas = this.textures.createCanvas('fontsheet',760,64);
    this.wallAnimatedData.numfontcolors = textCanvas.height/8;

    textCanvas.drawFrame('Blood Warrior',0,0,0);

    // textCanvas.add('0', 0, 128, 24, 8, 8);
    // textCanvas.add('1', 0, 136, 24, 8, 8);
    // textCanvas.add('2', 0, 144, 24, 8, 8);
    // textCanvas.add('3', 0, 152, 24, 8, 8);
    // textCanvas.add('4', 0, 160, 24, 8, 8);
    // textCanvas.add('5', 0, 168, 24, 8, 8);
    // textCanvas.add('6', 0, 176, 24, 8, 8);
    // textCanvas.add('7', 0, 184, 24, 8, 8);
    // textCanvas.add('8', 0, 192, 24, 8, 8);
    // textCanvas.add('9', 0, 200, 24, 8, 8);

    
    for (var b=0;b<textCanvas.height/8;b++)
    {

    
        for (var v=0;v<this.wallAnimatedData.all_characters.length;v++)
        {

            var thisChar = this.wallAnimatedData.all_characters.charAt(v);

            //console.log(thisChar);

            textCanvas.add(thisChar+'color'+b, 0, v*8, b*8, 8, 8);

        }
    }

    // this.offscreenObjects = this.textures.createCanvas('offscreenobjects', 320, 200); //document.createElement('canvas');
    // //this.offscreenCanvas.width = this.backgroundCanvas.width;
    // //this.offscreenCanvas.height = this.backgroundCanvas.height;
    // this.offscreenObjectsContext = this.offscreenObjects.getContext('2d');
    // this.offscreenObjectsPixels =  this.offscreenObjectsContext.getImageData(0,0,this.backgroundCanvas.width, this.backgroundCanvas.height);

    

    this.fBackgroundImageArc=0;
    this.fBackgroundTexture = this.textures.get('sky').getSourceImage();
    this.fBackgroundTextureBuffer = this.textures.createCanvas('skycanvas',960,200);

    this.sky_context = this.fBackgroundTextureBuffer.getContext('2d');

        // this.fBackgroundTextureBuffer.width = this.fBackgroundTexture.width;
        // this.fBackgroundTextureBuffer.height = this.fBackgroundTexture.height;
        this.sky_context.drawImage(this.fBackgroundTexture, 0, 0, this.fBackgroundTexture.width, this.fBackgroundTexture.height,0,0,960,200 );
        
        var imageData = this.fBackgroundTextureBuffer.getContext('2d').getImageData(0, 0, 960, 200);
        this.fBackgroundTexturePixels = imageData.data;




    this.fFloorTexture = this.textures.get('floor').getSourceImage();
    this.fFloorTextureBuffer = this.textures.createCanvas('floorcanvas', this.TILE_SIZE, this.TILE_SIZE );

    this.floor_context = this.fFloorTextureBuffer.getContext('2d');      
        // this.fFloorTextureBuffer.width = this.fFloorTexture.width;
        // this.fFloorTextureBuffer.height = this.fFloorTexture.height;
        this.floor_context.drawImage(this.fFloorTexture, 0, 0,this.fFloorTexture.width,this.fFloorTexture.height,0,0,this.TILE_SIZE,this.TILE_SIZE);
        
        var imageData = this.fFloorTextureBuffer.getContext('2d').getImageData(0, 0, this.TILE_SIZE, this.TILE_SIZE);
        this.fFloorTexturePixels = imageData.data;
        
        
    // this.skysrcimg = this.textures.get('sky').getSourceImage();
    // this.skylayersrcimg = this.textures.get('sky_layer1').getSourceImage();

    // this.groundsrcimg = this.textures.get('ground').getSourceImage();







    //this.wallAnimatedData.spawnanimation();
    //targetsnearcenterarray[0] = targetData;

    this.shotIndex = 0;//beginning sprite-array index for bullet sprite object(s)
    this.shot_saved_timecheck = 0;
    
    this.expspriteindex = 0;


    this.zspritesgroup = this.add.group();
    this.zspritesgroupArray = this.zspritesgroup.getChildren();

    var a_zsprite;

    //this.spriteZ = [];

    // player bullets
    
    this.bulletsprites = [];
    //this.bulletcolors = ['red','green','blue','orange','cyan','violet','white','black'];
    for (var i = 0; i < 10; i++)
    {
        this.bulletsprites[i] = this.add.image();
        this.bulletsprites[i].img = this.textures.get('ammo').getSourceImage();

        var randomKey = Math.random().toString();
        this.bulletsprites[i].buffer = this.textures.createCanvas(randomKey, this.bulletsprites[i].img.width, this.bulletsprites[i].img.height);
        this.bulletsprites[i].buffer.getContext('2d').drawImage(this.bulletsprites[i].img, 0, 0);        
        var imageData = this.bulletsprites[i].buffer.getContext('2d').getImageData(0, 0, this.bulletsprites[i].img.width, this.bulletsprites[i].img.height);
        this.bulletsprites[i].pixels = imageData.data;

        this.bulletsprites[i].type = 'bullet';
        

        
        this.bulletsprites[i].dx = 0;
        this.bulletsprites[i].dy = 0;

        

        this.bulletsprites[i].elevation_delta = -14;
        //this.bulletsprites[i].base_elevation = 0;

        
        this.bulletsprites[i].animated = false;
        //this.bulletsprites[i].flying = true;
        this.bulletsprites[i].active = false;
        this.bulletsprites[i].currentMapIndex = 0;



        var thisContext = this;
        this.bulletsprites[i].move = function() 
        {
            // the cannon relative to the player center view
            var shooterOffset = -14;
            var vert_look_range = 40;
            
            var pp_delta = Math.floor(thisContext.PROJECTIONPLANEHEIGHT/2 - thisContext.fProjectionPlaneYCenter);
            var abs_pp_delta = Math.abs(pp_delta);
            var new_elev_delta = Math.floor(thisContext.fTanTable[abs_pp_delta]*this.distance);

            if (pp_delta<0)
            {
                new_elev_delta *= -1;
            }


            var adj_pp_delta = pp_delta/vert_look_range*shooterOffset;

            this.elevation_delta = shooterOffset+adj_pp_delta-new_elev_delta;
            
            this.x+=this.dx; 
            this.y+=this.dy;
            if (this.x<0 || this.x>(this.MAP_WIDTH+1)*this.TILE_SIZE || this.y<0 || this.y>(this.MAP_HEIGHT+1)*this.TILE_SIZE) 
            {
                this.active = false;
                this.distance = 0;                
            }
        }


        

        this.zspritesgroup.add(this.bulletsprites[i]);
    }



    //explosion sprites
    //animated static objects
    this.explosionsprites = [];
    this.explosioncolors = ['red','green','blue','orange','cyan','violet','white','black'];
    explosionsize = 96;

    for (var j=0;j<10;j++)
    {

        //console.log(explosioncolors.length);
        //console.log(explosioncolors);
        //var a_zsprite;

        this.explosionsprites[j] = this.add.image();

        this.explosionsprites[j].type = 'explosion';

        //a_zsprite.img = this.textures.get('transparent64x64').getSourceImage();

        //this.explosion_zsprite.x = 450;
        //this.explosion_zsprite.y = 200;
        // this.expolsionsprites[j].x = Phaser.Math.Between(200, 600);
        // this.expolsionsprites[j].y = Phaser.Math.Between(200, 600);

        this.explosionsprites[j].timecheck = 0;
        this.explosionsprites[j].color = 'orange';//this.explosioncolors[j];
        this.explosionsprites[j].numBurstPixels = 28;
        this.explosionsprites[j].duration = 1600;
        this.explosionsprites[j].resolution = 100;// in ms/snapshot
        this.explosionsprites[j].saved_sparkleIndex = 0;
        this.explosionsprites[j].burstPixelSize = 4;
        this.explosionsprites[j].burstPixelFrame = 0;
        
        this.explosionsprites[j].elevation_delta = 0;
        //this.explosionsprites[j].base_elevation= 0;
        this.explosionsprites[j].animated = false;
        //this.explosionsprites[j].flying = false;
        this.explosionsprites[j].active = false;
        //a_zsprite.numframes = 40;
        //a_zsprite.framewidth = 29;
        //a_zsprite.frameindex = 0;
        
        
        this.explosionsprites[j].burstpixels = [];
        for (var i = 0; i < this.explosionsprites[j].numBurstPixels; i++)
        {
            this.explosionsprites[j].burstpixels[i] = {};

            this.explosionsprites[j].burstpixels[i].xincr = Phaser.Math.RND.realInRange(-.001, .001);
            this.explosionsprites[j].burstpixels[i].yincr = Phaser.Math.RND.realInRange(-.001, .001);
            this.explosionsprites[j].burstpixels[i].xpos = explosionsize/2;
            this.explosionsprites[j].burstpixels[i].ypos = explosionsize/2;
        }

        var randomKey = Math.random().toString();
            this.explosionsprites[j].buffer = this.textures.createCanvas(randomKey, explosionsize, explosionsize);

            this.explosionsprites[j].context =  this.explosionsprites[j].buffer.getContext('2d')

            //a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
            var imageData = this.explosionsprites[j].buffer.getContext('2d').getImageData(0, 0, explosionsize, explosionsize);

            this.explosionsprites[j].imagedata = imageData;

            this.explosionsprites[j].pixels = imageData.data;

        var zspritesref = this.zspritesgroup;    
        this.explosionsprites[j].move = function()
        {
            
            // this.context.drawImage(this.img, 0, 0, 
            // 64, 64, 
            // 0, 0, 64, 64);
            
            // var imageData = this.context.getImageData(0,0, 64, 64);    
            // this.pixels = imageData.data;

            //for timeout self-destruct 
            
            if (game.loop.now > this.timecheck + this.duration)
            {
                this.active = false;
                // this.x = -100;
                // this.y = -100;
                //this.destroy();

                //zspritesref.remove(this);
            }

            //console.log(this.color);

            // var targetIndex=0;  
            // var bytesPerPixel=4;    
            // for (var y=0; y<128; y++) 
            // {   
            //     //console.log("y="+y+" targetIndex="+targetIndex)   
            //     for (var x=0; x<128; x++)  
            //     {   
            //         this.pixels[targetIndex]=0; 
            //         this.pixels[targetIndex+1]=0;   
            //         this.pixels[targetIndex+2]=0;   
            //         this.pixels[targetIndex+3]=0;   
            //         targetIndex+=(bytesPerPixel);       
            //     }   
            // }   
            for (var i=0; i<this.numBurstPixels; i++)
            {

                var thispixel = this.burstpixels[i];

                //var sparkleIndex = Math.floor((game.loop.now-this.timecheck)/this.resolution);

                for (var s=0; s<this.burstPixelSize; s++)
                {
                    for (var t=0; t<this.burstPixelSize; t++)
                    {
                        var bytesPerPixel=4;
                        var targetIndex=(explosionsize*bytesPerPixel)* Math.round(thispixel.ypos+s) + ( bytesPerPixel* Math.round(thispixel.xpos+t) );

                        this.pixels[targetIndex]=0;
                        this.pixels[targetIndex+1]=0;
                        this.pixels[targetIndex+2]=0;
                        this.pixels[targetIndex+3]=0;
                    }        
                }
            }

            for (var i=0; i<this.numBurstPixels; i++)
            {

                var thispixel = this.burstpixels[i];

                thispixel.xpos += thispixel.xincr;
                //if (thispixel.xpos<0 || thispixel.xpos>explosionsize-1) thispixel.xincr*=-1;

                thispixel.ypos += thispixel.yincr;
                //if (thispixel.ypos<0 || thispixel.ypos>explosionsize-1) thispixel.yincr*=-1;

                // this.wall_context.drawImage(subsprite.img, 0, 0, 
                //     subsprite.img.width, subsprite.img.height, 
                //     this.wallAnimatedData.xpos, this.wallAnimatedData.ypos, subsprite.img.width/2, subsprite.img.height/2);        
                var r;
                var g;
                var b;

                var ep_map = [


                [   [0,1,1,0],
                    [0,1,1,1],
                    [0,1,1,1],
                    [0,1,1,1]
                    ],

                [   [0,1,1,0],
                    [1,1,1,1],
                    [1,1,1,0],
                    [0,1,1,0]
                    ],

                [   [0,0,0,0],
                    [1,1,1,1],
                    [1,1,1,0],
                    [0,0,1,0]
                    ],

                [   [0,1,1,0],
                    [1,1,1,1],
                    [1,1,1,0],
                    [0,1,1,0]
                    ],

                [   [0,0,1,0],
                    [0,1,1,1],
                    [0,1,1,0],
                    [0,0,0,0]
                    ],

                [   [0,0,0,0],
                    [0,1,1,1],
                    [1,1,1,0],
                    [0,1,0,0]
                    ],

                [   [0,0,1,0],
                    [1,1,1,1],
                    [1,1,1,0],
                    [0,0,0,0]
                    ],

                [   [0,1,1,0],
                    [1,1,1,1],
                    [1,1,1,1],
                    [0,1,1,0]
                    ]



                ];

                var colors = ['red','green','blue','orange','cyan','violet'];

                var sparkleIndex = Math.floor((game.loop.now-this.timecheck)/this.resolution);
                var abs_resolution = this.duration/this.resolution;
                var brightnessLevel = 1.0 - (game.loop.now-this.timecheck)/this.duration;
                var inv_brightnessLevel = (game.loop.now-this.timecheck)/this.duration;

                

                if (sparkleIndex != this.saved_sparkleIndex)
                {
                    this.saved_sparkleIndex = sparkleIndex;
                    this.burstPixelFrame = sparkleIndex%8;
                }

                if (this.color=='red') { r=255; g=0; b=0; }
                if (this.color=='green') { r=0; g=255; b=0; }
                if (this.color=='blue') { r=0; g=0; b=255; }
                if (this.color=='orange') { r=255; g=255; b=0; }
                if (this.color=='cyan') { r=0; g=255; b=255; }
                if (this.color=='violet') { r=255; g=0; b=255; }
                if (this.color=='white') { r=255; g=255; b=255; }
                if (this.color=='black') { r=0; g=0; b=0; }



                for (var s=0; s<this.burstPixelSize; s++)
                {
                    for (var t=0; t<this.burstPixelSize; t++)
                    {
                        if (ep_map[this.burstPixelFrame][s][t])
                        {
                            // if ( (ep_map[this.burstPixelFrame][s][t]!=2 || (sparkleIndex/abs_resolution <.25)) && (ep_map[this.burstPixelFrame][s][t]!=3 || (sparkleIndex/abs_resolution <.5)) )
                            // {
                                
                            
                                if (Phaser.Math.Between(0,1))
                                {
                                    var bytesPerPixel=4;
                                    var targetIndex=(explosionsize*bytesPerPixel)* Math.round(thispixel.ypos+s) + ( bytesPerPixel* Math.round(thispixel.xpos+t) );

                                    this.pixels[targetIndex]=r*brightnessLevel;
                                    this.pixels[targetIndex+1]=g*brightnessLevel;
                                    this.pixels[targetIndex+2]=b+(255*inv_brightnessLevel);
                                    this.pixels[targetIndex+3]=255; 
                                }                       
                                else
                                {
                                    var bytesPerPixel=4;
                                    var targetIndex=(explosionsize*bytesPerPixel)* Math.round(thispixel.ypos+s) + ( bytesPerPixel* Math.round(thispixel.xpos+t) );

                                    this.pixels[targetIndex]=r*inv_brightnessLevel;
                                    this.pixels[targetIndex+1]=g*inv_brightnessLevel;
                                    this.pixels[targetIndex+2]=b*inv_brightnessLevel;
                                    this.pixels[targetIndex+3]=255;                        
                                }
                            // }

                            
                        }
                    }        
                }
                
            }
        }; 

        //this.explosion = a_zsprite;
        //explosionspritesArray.push(a_zsprite);
        this.zspritesgroup.add(this.explosionsprites[j]);
    }
    
    //console.log(explosionspritesArray);
    //this.zspritesgroup.add(this.explosion);














    // //simple objects
    for (var i = 0; i < 32; i++)
    {
        a_zsprite = this.add.image();
        a_zsprite.label = 'flowers';
        a_zsprite.type = 'flower';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'red';

        var f_index = Phaser.Math.Between(1,3);

        a_zsprite.img = this.textures.get('flower'+f_index).getSourceImage();
        a_zsprite.x = Phaser.Math.Between(100,668);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.active = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // this.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-this.fPlayerElevation,//Phaser.Math.Between(-64,64),
        // ease: 'Sine.easeInOut',
        // duration: 1500,
        // yoyo: true,
        // repeat: -1
        // });
        a_zsprite.move = function()
        {
            //
        };

        var randomKey = Math.random().toString();
        a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d').getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        this.zspritesgroup.add(a_zsprite);
    }

    //animation test sprite 1
    for (var j=0;j<24;j++)
    {
        var a_zsprite = this.add.image();
        a_zsprite.label = "redwings";
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'cyan';

        a_zsprite.img = this.textures.get('atest2').getSourceImage();

        var randomKey = Math.random().toString();
            a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
            var imageData = a_zsprite.buffer.getContext('2d').getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.pixels = imageData.data;



        a_zsprite.x = Phaser.Math.Between(100,668);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = true;
        //a_zsprite.flying = true;
        a_zsprite.animationtimecheck=0;
        a_zsprite.frametimer = 200;
        a_zsprite.active = false;
        a_zsprite.numframes = 4;
        a_zsprite.framewidth = 32;
        a_zsprite.frameindex = 0;
        a_zsprite.xincr = Phaser.Math.RND.realInRange(2.5, 4.5);
        a_zsprite.yincr = Phaser.Math.RND.realInRange(2.5, 4.5);

        a_zsprite.elevation_delta = Phaser.Math.Between(-64,64);
        a_zsprite.base_elevation = 64;//Phaser.Math.Between(0,64);

        this.tweens.add({
            targets: a_zsprite,
            elevation_delta: 0,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        
        
        

        a_zsprite.move = function()
                {
                    this.x+=this.xincr;
                    if (this.x<0 || this.x>768) this.xincr*=-1;//this.MAP_WIDTH*this.TILE_SIZE

                    this.y+=this.yincr;
                    if (this.y<0 || this.y>1280) this.yincr*=-1;//this.MAP_HEIGHT*this.TILE_SIZE


                    // CHECK COLLISION AGAINST WALLS
                    // compute cell position

                    // var map3=
                            // 'WWWWWWWWWWWW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WOOOOOOOOOOW'+
                            // 'WWWWWWWWWWWW'; 
              
                    
                    // // Remove spaces and tabs
                    // var fMap=map3.replace(/\s+/g, '');


                    // var playerXCell = Math.floor(this.x/64);
                    // var playerYCell = Math.floor(this.y/64);

                    // // compute position relative to cell (ie: how many pixel from edge of cell)
                    // var playerXCellOffset = this.x % 64;
                    // var playerYCellOffset = this.y % 64;

                    // var minDistanceToWall=20;
                    
                    // // make sure the player don't bump into walls
                    // if (this.xincr>0)
                    // {
                    //     // moving right
                    //     if ((fMap.charAt((playerYCell*12)+playerXCell+1)!='O')&&
                    //         (playerXCellOffset > (64-minDistanceToWall)))
                    //     {
                    //         // reverse x dir
                    //         this.xincr*=-1;
                    //     }               
                    // }
                    // else
                    // {
                    //     // moving left
                    //     if ((fMap.charAt((playerYCell*12)+playerXCell-1)!='O')&&
                    //         (playerXCellOffset < (minDistanceToWall)))
                    //     {
                    //         /// reverse x dir
                    //         this.xincr*=-1;
                    //     } 
                    // } 

                    // if (this.yincr<0)
                    // {
                    //     // moving up
                    //     if ((fMap.charAt(((playerYCell-1)*12)+playerXCell)!='O')&&
                    //         (playerYCellOffset < (minDistanceToWall)))
                    //     {
                    //         // reverse y dir
                    //         this.yincr*=-1;
                    //     }
                    // }
                    // else
                    // {
                    //     // moving down                                  
                    //     if ((fMap.charAt(((playerYCell+1)*12)+playerXCell)!='O')&&
                    //         (playerYCellOffset > (64-minDistanceToWall)))
                    //     {
                    //         // reverse y dir
                    //         this.yincr*=-1;
                    //     }
                    // }

                    
                };

        this.zspritesgroup.add(a_zsprite);
    }
    



    //animation test sprite 2
    for (var j=0;j<10;j++)
    {

        a_zsprite = this.add.image();
        a_zsprite.label = "pinkblobs";
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'violet';


        a_zsprite.img = this.textures.get('atest8').getSourceImage();

        var randomKey = Math.random().toString();
            a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
            var imageData = a_zsprite.buffer.getContext('2d').getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.pixels = imageData.data;

        a_zsprite.x = 300+(j*5);
        a_zsprite.y = 250+(j*5);
        a_zsprite.animated = true;
        //a_zsprite.flying = true;
        a_zsprite.animationtimecheck=0;
        a_zsprite.frametimer = 200;
        a_zsprite.active = false;
        a_zsprite.numframes = 12;
        a_zsprite.framewidth = 28;
        a_zsprite.frameindex = 0;

        a_zsprite.elevation_delta = 32;//Phaser.Math.Between(0,100);
        a_zsprite.base_elevation = 32;


        this.tweens.add({
            targets: a_zsprite,
            elevation_delta: Phaser.Math.Between(0,64),
            ease: 'Sine.easeInOut',
            duration: 5000,
            yoyo: true,
            repeat: -1
        });

        a_zsprite.followerdata = 0;

        var _path = new Phaser.Curves.Path(Phaser.Math.Between(0,768), Phaser.Math.Between(0,768));

        _path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);

        _path.lineTo(700, 300);

        _path.lineTo(600, 350);

        _path.ellipseTo(200, 100, 100, 250, false, 0);

        _path.cubicBezierTo(222, 119, 308, 107, 208, 368);

        _path.ellipseTo(60, 60, 0, 360, true);

        a_zsprite.path = _path;

        this.tweens.add({
            targets: a_zsprite,
            followerdata: 1,
            ease: 'Sine.easeInOut',
            duration: 20000,
            yoyo: true,
            repeat: -1
        });

        a_zsprite.move = function()
        {
            this.x=this.path.getPoint(this.followerdata).x;
            this.y=this.path.getPoint(this.followerdata).y;
        };                        
        
        this.zspritesgroup.add(a_zsprite);
    }


    //animation test sprite 3
    for (var j=0;j<12;j++)
    {

        a_zsprite = this.add.image();
        a_zsprite.label = "ufos";
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'violet';


        a_zsprite.img = this.textures.get('atest4').getSourceImage();

        var randomKey = Math.random().toString();
            a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
            var imageData = a_zsprite.buffer.getContext('2d').getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.pixels = imageData.data;

        a_zsprite.x = Phaser.Math.Between(100, 668);
        a_zsprite.y = Phaser.Math.Between(100, 1180);
        // a_zsprite.xincr = Phaser.Math.RND.realInRange(4.5, 8.5);
        // a_zsprite.yincr = Phaser.Math.RND.realInRange(4.5, 8.5);
        a_zsprite.animated = true;
        //a_zsprite.flying = false;
        a_zsprite.animationtimecheck=0;
        a_zsprite.frametimer = 0;
        a_zsprite.active = false;
        a_zsprite.numframes = 40;
        a_zsprite.framewidth = 29;
        a_zsprite.frameindex = 0;

        a_zsprite.elevation_delta = 0;
        a_zsprite.base_elevation = 32;

        this.tweens.timeline({

        targets: a_zsprite,
        ease: 'Expo.easeInOut',
        
        delay: Phaser.Math.Between(100, 500),
        loop: -1,

        tweens: [{
            
            x: Phaser.Math.Between(100, 668),
            base_elevation: Phaser.Math.Between(0, 96),
            duration: 1000
        },
        {
            
            y: Phaser.Math.Between(100, 1180),
            base_elevation: Phaser.Math.Between(0, 96),
            duration: 1000
        },
        {
            
            x: a_zsprite.x,
            base_elevation: Phaser.Math.Between(0, 96),
            duration: 1000
        },
        {
            
            y: a_zsprite.y,
            base_elevation: Phaser.Math.Between(0, 96),
            duration: 1000
        }]

        });
        // this.tweens.add({
        //     targets: a_zsprite,
        //     elevation_delta: Phaser.Math.Between(0, 64),
        //     // x: Phaser.Math.Between(100, 668),
        //     // y: Phaser.Math.Between(100, 1180),
        //     ease: 'Quad.easeInOut',
        //     duration: 1000,
        //     yoyo: true,
        //     repeat: -1
        // });

        a_zsprite.move = function()
        {
            // this.x+=this.xincr;
            // if (this.x<0 || this.x>768) this.xincr*=-1;//this.MAP_WIDTH*this.TILE_SIZE

            // this.y+=this.yincr;
            // if (this.y<0 || this.y>1280) this.yincr*=-1;//this.MAP_HEIGHT*this.TILE_SIZE

        };                        
        
        this.zspritesgroup.add(a_zsprite);
    }

    //animation test sprite 4
    for (var j=0;j<15;j++)
    {

        a_zsprite = this.add.image();
        a_zsprite.label = "flybugs";
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'violet';


        a_zsprite.img = this.textures.get('atest').getSourceImage();

        var randomKey = Math.random().toString();
            a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
            var imageData = a_zsprite.buffer.getContext('2d').getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.pixels = imageData.data;

        a_zsprite.x = Phaser.Math.Between(100, 668);
        a_zsprite.y = Phaser.Math.Between(100, 1180);
        a_zsprite.xincr = Phaser.Math.RND.realInRange(-3.5, 3.5);
        a_zsprite.yincr = Phaser.Math.RND.realInRange(-3.5, 3.5);
        a_zsprite.animated = true;
        //a_zsprite.flying = true;
        a_zsprite.animationtimecheck=0;
        a_zsprite.frametimer = 50;
        a_zsprite.active = true;
        a_zsprite.numframes = 3;
        a_zsprite.framewidth = 52;
        a_zsprite.frameindex = 0;

        a_zsprite.elevation_delta = Phaser.Math.Between(-64,100);;
        a_zsprite.base_elevation = 64;


        this.tweens.add({
            targets: a_zsprite,
            elevation_delta: 0,
            ease: 'Sine.easeInOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        a_zsprite.move = function()
        {
            this.x+=this.xincr;
            if (this.x<0 || this.x>768) this.xincr*=-1;//this.MAP_WIDTH*this.TILE_SIZE

            this.y+=this.yincr;
            if (this.y<0 || this.y>1280) this.yincr*=-1;//this.MAP_HEIGHT*this.TILE_SIZE

        };                        
        
        this.zspritesgroup.add(a_zsprite);
    }

    //animation test sprite 5
    for (var j=0;j<15;j++)
    {

        a_zsprite = this.add.image();
        a_zsprite.label = "balls";
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'violet';


        a_zsprite.img = this.textures.get('bluebounce').getSourceImage();

        var randomKey = Math.random().toString();
            a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
            var imageData = a_zsprite.buffer.getContext('2d').getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.pixels = imageData.data;

        a_zsprite.x = Phaser.Math.Between(100,668);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.xincr = Phaser.Math.RND.realInRange(-3.5, 3.5);
        a_zsprite.yincr = Phaser.Math.RND.realInRange(-3.5, 3.5);
        a_zsprite.animated = false;
        //a_zsprite.flying = true;
        // a_zsprite.animationtimecheck=0;
        // a_zsprite.frametimer = 50;
        a_zsprite.active = false;
        // a_zsprite.numframes = 3;
        // a_zsprite.framewidth = 52;
        // a_zsprite.frameindex = 0;

        a_zsprite.elevation_delta = 0;
        a_zsprite.base_elevation = 0;


        this.tweens.add({
            targets: a_zsprite,
            elevation_delta: 100,
            ease: 'Sine.easeOut',
            duration: 500,
            yoyo: true,
            repeat: -1,
            
        });

        a_zsprite.move = function()
        {
            this.x+=this.xincr;
            if (this.x<0 || this.x>768) this.xincr*=-1;//this.MAP_WIDTH*this.TILE_SIZE

            this.y+=this.yincr;
            if (this.y<0 || this.y>1280) this.yincr*=-1;//this.MAP_HEIGHT*this.TILE_SIZE

        };                        
        
        this.zspritesgroup.add(a_zsprite);
    }

    //animation test sprite 6
    for (var j=0;j<24;j++)
    {

        a_zsprite = this.add.image();
        a_zsprite.label = "frogs";
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';


        a_zsprite.img = this.textures.get('atest5').getSourceImage();

        var randomKey = Math.random().toString();
            a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
            var imageData = a_zsprite.buffer.getContext('2d').getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
            a_zsprite.pixels = imageData.data;

        a_zsprite.x = Phaser.Math.Between(100,668);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.xincr = Phaser.Math.RND.realInRange(-2.5, 3.5);
        a_zsprite.yincr = Phaser.Math.RND.realInRange(-2.5, 3.5);
        a_zsprite.animated = true;
        //a_zsprite.flying = true;
        a_zsprite.animationtimecheck=0;
        a_zsprite.frametimer = 0;
        a_zsprite.active = false;
        a_zsprite.numframes = 23;
        a_zsprite.framewidth = 26;
        a_zsprite.frameindex = 0;

        a_zsprite.elevation_delta = Phaser.Math.Between(-64,100);;
        a_zsprite.base_elevation = 64;


        this.tweens.add({
            targets: a_zsprite,
            elevation_delta: 0,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

        a_zsprite.move = function()
        {
            this.x+=this.xincr;
            if (this.x<0 || this.x>768) this.xincr*=-1;//this.MAP_WIDTH*this.TILE_SIZE

            this.y+=this.yincr;
            if (this.y<0 || this.y>1280) this.yincr*=-1;//this.MAP_HEIGHT*this.TILE_SIZE

        };                        
        
        this.zspritesgroup.add(a_zsprite);
    }


    //animated static object
    a_zsprite = this.add.image();

    a_zsprite.label = "spinner";
    a_zsprite.type = 'target';
    a_zsprite.hitcount = 0;
    a_zsprite.explosioncolor= 'orange';

    a_zsprite.img = this.textures.get('atest6').getSourceImage();
    a_zsprite.x = 350;
    a_zsprite.y = 600;
    a_zsprite.animated = true;
    //a_zsprite.flying = false;
    a_zsprite.animationtimecheck=0;
    a_zsprite.frametimer = 0;
    a_zsprite.active = true;
    a_zsprite.numframes = 15;
    a_zsprite.framewidth = 26;
    a_zsprite.frameindex = 0;
    a_zsprite.elevation_delta = 0;
    a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);

    var randomKey = Math.random().toString();
        a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d').drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d').getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

    a_zsprite.move = function()
    {
        //
    }; 

    this.zspritesgroup.add(a_zsprite);



//end of zsprite inits/////////////////////////////////////////////////////////////////
    



    












    



    


 
    
        ////background - ground and sky
        //this.textures.generate('sky', { data: ['3'], pixelWidth: 1});
        //this.textures.generate('ground', { data: ['5'], pixelWidth: 1});

        //skyRect = this.add.image(-200, -200, 'sky').setOrigin(0,0).setDisplaySize(720,this.fProjectionPlaneYCenter+200);

        //groundRect = this.add.image(-200, this.fProjectionPlaneYCenter, 'ground').setOrigin(0,0).setDisplaySize(720,this.fProjectionPlaneYCenter+200);


        //skyRect = this.add.rectangle(-400, -400, 1440, this.fProjectionPlaneYCenter+400, 0x440000).setOrigin(0,0);

        //groundRect = this.add.rectangle(-400, this.fProjectionPlaneYCenter, 1440, this.fProjectionPlaneYCenter+400, 0x002233).setOrigin(0,0);


        //skyRect.setTintFill(0xff0000, 0xff0000, 0x0000ff, 0x0000ff);



        //// ground blip sprites

        // this.textures.generate('chunk', { data: ['2'], pixelWidth: 1});

        // for (var i = 0; i < 320; i++)
        // {
        //     blips[i] = [];
        //     for (var j = 0; j < 40; j++)
        //     {

        //         blips[i][j] = this.add.sprite(-20, -20, 'chunk');
        //     }
            
        // }

        // landscape sprites
        // this.textures.generate('tree', { data: treeData, pixelWidth: 2 });

        // var s = this.add.sprite(100,100,'tree');

        // s.map_index = 820;
        // s.xpos = 16;
        // s.ypos = 16;

        // landscapeSprites[0] = s;


        
        debug = this.add.text(10, 10, '(debug text)', { font: '10px Arial', fill: '#00ff00' });



        if (touchActivated)
        {
            //touch gui
            this.input.addPointer(2);
            this.textures.generate('chunk', { data: ['A'], pixelWidth: 1});
            this.textures.generate('chunk2', { data: ['6'], pixelWidth: 1});

            guide_multi = this.add.image(40,148,'chunk').setDisplaySize(64, 64).setAlpha(.25).setInteractive().setDepth(100);
            guide_multi.on('pointermove', function () {guide_multi_activeY = guide_multi.input.localY}, this);
            guide_multi.on('pointerout', function () {guide_multi_activeY = .5}, this);

            guide_zspeed = this.add.image(280,148,'chunk').setDisplaySize(32, 64).setAlpha(.25).setInteractive().setDepth(100);
            //guide_zspeed.on('pointermove', function () {debug.setText(guide_zspeed.input.localX+" "+guide_zspeed.input.localY)}, this);

            guide_shoot = this.add.image(240,148,'chunk2').setDisplaySize(32, 64).setAlpha(.25).setInteractive().setDepth(100);
            guide_shoot.on('pointermove', function () {gShoot = true}, this);
            guide_shoot.on('pointerout', function () {gShoot = false}, this);

            this.textures.generate('h_arrow', { data: guideInputHorizontalData, pixelWidth: 2});
            this.textures.generate('v_arrow', { data: guideInputVerticalData, pixelWidth: 2});

            guide_left = this.add.image(20,148,'h_arrow').setAlpha(.25);
            guide_right = this.add.image(60,148,'h_arrow').toggleFlipX().setAlpha(.25);

            guide_up = this.add.image(40,128,'v_arrow').setAlpha(.25);
            guide_down = this.add.image(40,168,'v_arrow').toggleFlipY().setAlpha(.25);

            guide_forward = this.add.image(280,128,'v_arrow').setAlpha(.25).setDepth(100);
            guide_back = this.add.image(280,168,'v_arrow').toggleFlipY().setAlpha(.25).setDepth(100);
        }
        





        // this.input.on('pointerdown', function () {gShoot = true});
        // this.input.on('pointerup', function () {gShoot = false});


        this.input.keyboard.addCapture('ALT, LEFT, RIGHT');
        keys = this.input.keyboard.addKeys('E,C,D,Z,M,CTRL,SPACE');

        this.input.keyboard.on('keydown-CTRL', function (event) {gShoot=true});
        this.input.keyboard.on('keyup-CTRL', function (event) {gShoot=false});


        cont = this.add.container();


        if (touchActivated)
        {
            cont.add([guide_back,guide_forward,guide_left,guide_right,guide_up,guide_down, guide_multi, guide_zspeed, guide_shoot, debug]);
        }
        else
        {
            cont.add([debug]);
        }
        

        //  Add in a new camera, the same size and position as the main camera
        UICam = this.cameras.add(0, 0, 320, 180);

        //  The main camera will not render the container
        this.cameras.main.ignore(cont);

        //  The new UI Camera will not render the background image
        UICam.ignore([mainBackgroundImage]);

        

        this.input.gamepad.once('down', function (pad, button, index) {

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        }, this);


        




        this.demoBot = {};
        this.demoBot.xincr = 1;
        this.demoBot.yincr = 4;//Phaser.Math.RND.realInRange(.5, 2.5);
        this.demoBot.xpos = this.fPlayerX;//Phaser.Math.Between(0,959);
        this.demoBot.ypos = this.fPlayerY;//Phaser.Math.Between(0,199);
        this.demoBot.arc = 200;
        this.demoBot.elevation = 4;
        this.demoBot.bg_index = 0;
        this.demoBot.wall_index = 0;
        this.demoBot.floor_index = 0;
        this.demoBot.og_index = 0;
        //this.demoBot.current_objectgang = 'ufo';

        // this.tweens.add({
        // targets: this.demoBot,
        // elevation: 100,//Phaser.Math.Between(-64,64),
        // ease: 'Sine.easeInOut',
        // duration: 5000,
        // yoyo: true,
        // repeat: -1
        // });

        // this.tweens.add({
        // targets: this.demoBot,
        // arc: 1200,//Phaser.Math.Between(-64,64),
        // ease: 'Sine.easeInOut',
        // duration: 15000,
        // yoyo: true,
        // repeat: -1
        // });

    },

    playerShoot: function()
    {

        

        if (game.loop.now > this.shot_saved_timecheck + 110)
        {
            this.shot_saved_timecheck = game.loop.now;

            var shotXDir=this.fCosTable[this.fPlayerArc];
            var shotYDir=this.fSinTable[this.fPlayerArc];

            var adjustshotposition = 5;
            this.zspritesgroupArray[this.shotIndex].x = Math.floor(this.fPlayerX)+Math.round(shotXDir*this.fPlayerSpeed)*adjustshotposition;
            this.zspritesgroupArray[this.shotIndex].y = Math.floor(this.fPlayerY)+Math.round(shotYDir*this.fPlayerSpeed)*adjustshotposition;

            this.zspritesgroupArray[this.shotIndex].dx=Math.round(shotXDir*this.fPlayerSpeed*8);//8
            this.zspritesgroupArray[this.shotIndex].dy=Math.round(shotYDir*this.fPlayerSpeed*8);//8
            
            this.zspritesgroupArray[this.shotIndex].base_elevation = this.fPlayerElevation;
             
            this.zspritesgroupArray[this.shotIndex].active = true;

            this.shotIndex++;
            if (this.shotIndex==10) this.shotIndex=0;
        }
    },

    doDemoBot: function()
    {
        //this.fPlayerY+=this.demoBot.yincr;
            
        if (this.fPlayerY>1200)
        {   
            this.sky_context.clearRect(0, 0, 960, 200);
            this.floor_context.clearRect(0, 0, 64, 64);
            this.wall_context.clearRect(0, 0, 64, 64);

            this.demoBot.bg_index++;
            if (this.demoBot.bg_index>=backgroundList.length) this.demoBot.bg_index=0;
            
            var imagekey = backgroundList[this.demoBot.bg_index];
            var new_bgimg = this.textures.get(imagekey).getSourceImage();
            this.sky_context.drawImage(new_bgimg, 0, 0, new_bgimg.width, new_bgimg.height,0,0,960,200 );
            

            this.demoBot.wall_index++;
            if (this.demoBot.wall_index>=wallList.length) this.demoBot.wall_index=0;
            
            var imagekey = wallList[this.demoBot.wall_index];
            var new_wallimg = this.textures.get(imagekey).getSourceImage();
            this.wall_context.drawImage(new_wallimg, 0, 0, new_wallimg.width, new_wallimg.height,0,0,this.WALL_WIDTH,this.WALL_HEIGHT );
            var imagedata = this.wall_context.getImageData(0, 0, this.WALL_WIDTH, this.WALL_HEIGHT);
            this.fWallTexturePixels = imagedata.data;
            
            this.demoBot.floor_index++;
            if (this.demoBot.floor_index>=floorList.length) this.demoBot.floor_index=0;
            
            var imagekey = floorList[this.demoBot.floor_index];
            var new_floorimg = this.textures.get(imagekey).getSourceImage();
            this.floor_context.drawImage(new_floorimg, 0, 0, new_floorimg.width, new_floorimg.height,0,0,this.TILE_SIZE,this.TILE_SIZE );
            var imagedata = this.floor_context.getImageData(0, 0, this.TILE_SIZE, this.TILE_SIZE);
            this.fFloorTexturePixels = imagedata.data;
            
            this.demoBot.og_index++;
            if (this.demoBot.og_index>=objectGangs.length) this.demoBot.og_index=0;

            var new_objectgang = objectGangs[this.demoBot.og_index];

            

            this.zspritesgroup.children.iterate( 
                function(_sprite)
                { 
                    if (_sprite != undefined)
                    {
                        if (objectGangs.includes(_sprite.label))
                        {
                            
                            if (_sprite.label == new_objectgang)
                            {
                                _sprite.active = true;
                                // _sprite.x = Phaser.Math.Between(100,668);
                                // _sprite.y = Phaser.Math.Between(100,1180);
                            }
                            else
                            {
                                _sprite.active = false;
                                // _sprite.x = undefined;
                                // _sprite.y = undefined;
                            }
                                
                            
                        }
                        if (_sprite.label == 'spinner')
                        {
                            _sprite.active = true;
                        }
                          
                    }
                    

                    
                } );

            
            this.fPlayerY=100; 
        }

        // this.fPlayerX+=this.demoBot.xincr;
        // if (this.fPlayerX<100 || this.fPlayerX>668) this.demoBot.xincr*=-1;

        // this.fPlayerY+=this.demoBot.yincr;
        // if (this.fPlayerY<100 || this.fPlayerY>1180) this.demoBot.yincr*=-1; 

        //this.fPlayerArc = this.ANGLE90;
        // this.fPlayerArc+=this.ANGLE1;
        // this.playerArcDelta=this.ANGLE1;
        // if (this.fPlayerArc>=this.ANGLE360) this.fPlayerArc-=this.ANGLE360;


        // var currentPlayerArc = this.fPlayerArc;
        // this.playerArcDelta = Math.floor(this.demoBot.arc)-currentPlayerArc;
        // this.fPlayerArc = Math.floor(this.demoBot.arc);
        // this.fPlayerElevation = this.demoBot.elevation;
    },

    update: function()
    {

        
        // this.zspritesgroupArray[0].move();
        // this.zspritesgroupArray[1].move();

        // for (var i=0; i<10; i++)
        // {
        //     if (this.zspritesgroupArray[i].active) this.zspritesgroupArray[i].move();
        // }
        this.playerArcDelta=0;
        this.doDemoBot();

        //this.clearOffscreenCanvas();
        
        // the following two lines effectively clear the screen of the previous draw
        this.drawBackground();
        //this.offscreenCanvasPixels =  this.offscreenCanvasContext.getImageData(0,0,this.backgroundCanvas.width, this.backgroundCanvas.height);
        //this.animateBackground();
        

        this.raycast();

        this.drawAllObjects();

        //this.animateWallCanvas();
        


        this.blitOffscreenCanvas();

        this.zspritesgroup.children.iterate( 
                function(_sprite)
                { 
                    if (_sprite != undefined)
                    {
                        if (_sprite.active) { _sprite.move() }
                    }
                    

                    
                } );
        


        

        if (gShoot)
        {     
            this.playerShoot();
        }
        



var playerXDir=this.fCosTable[this.fPlayerArc];
var playerYDir=this.fSinTable[this.fPlayerArc];

var dx=0;
var dy=0;
var sdx=0;
var sdy=0;        
       
var adjustedarc;        
var playerSXDir;
var playerSYDir;



        if (touchActivated)

        {
            //var cam = this.cameras.main;
             //  _____     _
            // |\ arc     |
            // |  \       y
            // |    \     |
            //            -
            // |--x--|  
            //
            //  sin(arc)=y/diagonal
            //  cos(arc)=x/diagonal   where diagonal=speed
            

            var zspeedDelta = (guide_zspeed.input.localY-.5)*-10;

            dx=Math.round(playerXDir*zspeedDelta);
            dy=Math.round(playerYDir*zspeedDelta);

            var horizontalDelta = guide_multi.input.localX-.5;
            
            this.cameras.main.rotation = -horizontalDelta*.65;

            this.fPlayerArc+=Math.floor(horizontalDelta*15);
            this.playerArcDelta=Math.floor(horizontalDelta*15);
            if (this.fPlayerArc<this.ANGLE0) this.fPlayerArc+=this.ANGLE360;
            if (this.fPlayerArc>=this.ANGLE360) this.fPlayerArc-=this.ANGLE360;



            var verticalDelta = guide_multi_activeY-.5;

            if (verticalDelta>0)
            {
                if (this.fProjectionPlaneYCenter<80)
                {
                    this.fPlayerElevation-=verticalDelta*3;
                }
                else
                {
                    this.fProjectionPlaneYCenter-=verticalDelta*6;
                }
            }
            if (verticalDelta<0)
            {
                if (this.fProjectionPlaneYCenter>120)
                {
                    this.fPlayerElevation-=verticalDelta*3;
                }
                else
                {
                    this.fProjectionPlaneYCenter-=verticalDelta*6;
                }
            }
        }

        //check gamepad
        else if (gamepad)
        {

            if (gamepad.R1)
            {     
                gShoot = true;
            }
            else
            {
                gShoot = false;
            }

            var zspeedDelta = (gamepad.rightStick.y*.5)*-10;

            dx=Math.round(playerXDir*zspeedDelta);
            dy=Math.round(playerYDir*zspeedDelta);

            var horizontalDelta = gamepad.leftStick.x*.5;
            
            this.cameras.main.rotation = -horizontalDelta*.65;

            this.fPlayerArc+=Math.floor(horizontalDelta*15);
            this.playerArcDelta=Math.floor(horizontalDelta*15);
            if (this.fPlayerArc<this.ANGLE0) this.fPlayerArc+=this.ANGLE360;
            if (this.fPlayerArc>=this.ANGLE360) this.fPlayerArc-=this.ANGLE360;



            var verticalDelta = gamepad.leftStick.y*.5;

            if (verticalDelta>0)
            {
                if (this.fProjectionPlaneYCenter<80)
                {
                    this.fPlayerElevation-=verticalDelta*3;
                }
                else
                {
                    this.fProjectionPlaneYCenter-=verticalDelta*6;
                }
            }
            if (verticalDelta<0)
            {
                if (this.fProjectionPlaneYCenter>120)
                {
                    this.fPlayerElevation-=verticalDelta*3;
                }
                else
                {
                    this.fProjectionPlaneYCenter-=verticalDelta*6;
                }
            }
        }

        this.fBackgroundImageArc-= this.playerArcDelta;
        if (this.fBackgroundTextureBuffer!=undefined)
        {
        //console.log("this.fPlayerArc="+this.fPlayerArc+" this.fBackgroundImageArc="+this.fBackgroundImageArc);
        // This code wraps around the background image so that it can be drawn just one.
        // For this to work, the first section of the image needs to be repeated on the third section (see the image used in this example)
        if (this.fBackgroundImageArc<-this.PROJECTIONPLANEWIDTH*2)
            this.fBackgroundImageArc=this.PROJECTIONPLANEWIDTH*2+(this.fBackgroundImageArc);
        else if (this.fBackgroundImageArc>0)
            this.fBackgroundImageArc=-(this.fBackgroundTextureBuffer.width-this.PROJECTIONPLANEWIDTH- (this.fBackgroundImageArc));            
        } 

        this.fPlayerX+=(dx+sdx);
        this.fPlayerY+=(dy+sdy);


        /////////////elevation contol


        if (keys.E.isDown)
        {
            if (this.fProjectionPlaneYCenter>145)
            {
                this.fPlayerElevation+=2;
            }
            else
            {
                this.fProjectionPlaneYCenter+=5;
            }
        }
        else if (keys.C.isDown)
        {
            if (this.fProjectionPlaneYCenter<50)
            {
                this.fPlayerElevation-=2;
            }
            else
            {
                this.fProjectionPlaneYCenter-=5;
            }
        }

            
        if (keys.D.isDown)
        {            
            this.fProjectionPlaneYCenter=this.PROJECTIONPLANEHEIGHT/2;            
        }
        if (keys.M.isDown)
        {
            this.cameras.main.rotation = 0.0;
        }

        if (this.fPlayerElevation<10)
            this.fPlayerElevation=10;
        else if (this.fPlayerElevation>150)
            this.fPlayerElevation=150;
        

        ///////////////end elevation control




        // CHECK COLLISION AGAINST WALLS
        // compute cell position
        var playerXCell = Math.floor(this.fPlayerX/this.TILE_SIZE);
        var playerYCell = Math.floor(this.fPlayerY/this.TILE_SIZE);




var debugt = [];
                debugt.push('fps: '+ this.sys.game.loop.actualFps.toString() );
                debugt.push('this.fPlayerElevation: '+ this.fPlayerElevation );
                // debugt.push('dx: '+ dx );
                // debugt.push('dy: '+ dy );
                // debugt.push('this.fPlayerArc: '+ this.fPlayerArc );
                // debugt.push('playerXCell: '+ playerXCell );
                // debugt.push('playerYCell: '+ playerYCell );
                // debugt.push('this.fPlayerX: '+ this.fPlayerX );
                // debugt.push('this.fPlayerY: '+ this.fPlayerY );
                
                debug.setText(debugt);



        // compute position relative to cell (ie: how many pixel from edge of cell)
        var playerXCellOffset = this.fPlayerX % this.TILE_SIZE;
        var playerYCellOffset = this.fPlayerY % this.TILE_SIZE;

        var minDistanceToWall=30;
        
        // make sure the player don't bump into walls
        if ((dx+sdx)>0)
        {
            // moving right -- must manually check cell for left right map edge check
            if (   ( playerXCell==this.MAP_WIDTH-1 || this.fMap.charAt( (playerYCell*this.MAP_WIDTH)+playerXCell+1)!='O' )&&
                playerXCellOffset > (this.TILE_SIZE-minDistanceToWall)   ) 
            {
                // back player up
                this.fPlayerX-= (playerXCellOffset-(this.TILE_SIZE-minDistanceToWall));
            }  
      
        }
        else
        {
            // moving left -- must manually check cell for left right map edge check
            if (   ( playerXCell==0 || this.fMap.charAt( (playerYCell*this.MAP_WIDTH)+playerXCell-1)!='O' )&&
                playerXCellOffset < (minDistanceToWall)  )
            {
                // back player up
                this.fPlayerX+= (minDistanceToWall-playerXCellOffset);
            } 

        } 

        if ((dy+sdy)<0)
        {
            // moving up
            if ((this.fMap.charAt(((playerYCell-1)*this.MAP_WIDTH)+playerXCell)!='O')&&
                (playerYCellOffset < (minDistanceToWall)))
            {
                // back player up 
                this.fPlayerY+= (minDistanceToWall-playerYCellOffset);
            }
        }
        else
        {
            // moving down                                  
            if ((this.fMap.charAt(((playerYCell+1)*this.MAP_WIDTH)+playerXCell)!='O')&&
                (playerYCellOffset > (this.TILE_SIZE-minDistanceToWall)))
            {
                // back player up 
                this.fPlayerY-= (playerYCellOffset-(this.TILE_SIZE-minDistanceToWall ));
            }
        }

        
        // var object=this;
        
        // // Render next frame
        // setTimeout(function() 
        // {
        //     object.animationFrameID = requestAnimationFrame(object.update.bind(object));
        // }, 1000 / this.frameRate);      
    
    },

    arcToRad: function(arcAngle)
    {
        return ((arcAngle*Math.PI)/this.ANGLE180);    
    },
    
    drawLine: function(startX, startY, endX, endY, cssColor)
    {
        //console.log("cssColor="+cssColor);
        this.offscreenCanvasContext.strokeStyle  = cssColor; 
        this.offscreenCanvasContext.beginPath();
        this.offscreenCanvasContext.moveTo(startX, startY);
        this.offscreenCanvasContext.lineTo(endX, endY);    
        this.offscreenCanvasContext.stroke();  
    },
    
    drawFillRectangle: function(x, y, width, height, cssColor)
    {
        this.context.fillStyle = cssColor; 
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.closePath();
        this.context.fill();        
    },

    drawOverheadMap : function()
    {
        this.fMinimapWidth=5;
        for (var r=0; r<this.MAP_HEIGHT; r++)
        {
            for (var c=0; c<this.MAP_WIDTH; c++)
            {
                var cssColor="white";
                if (this.fMap.charAt(r*this.MAP_WIDTH+c)=="W")
                {
                    cssColor="black";
                }
                else
                {
                }
                this.drawFillRectangle(this.PROJECTIONPLANEWIDTH+(c*this.fMinimapWidth),
                    (r*this.fMinimapWidth), this.fMinimapWidth, this.fMinimapWidth, cssColor);
            }
        }
        // Draw player position on the overhead map
        this.fPlayerMapX=this.PROJECTIONPLANEWIDTH+((this.fPlayerX/this.TILE_SIZE) * this.fMinimapWidth);
        this.fPlayerMapY=((this.fPlayerY/this.TILE_SIZE) * this.fMinimapWidth);
        
    },
    

    rgbToHexColor : function(red, green, blue) 
    {
        var result="#"+
            red.toString(16).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+""+
            green.toString(16).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+""+
            blue.toString(16).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        return result;
    },

    //*******************************************************************//
    //* Draw background image
    //*******************************************************************//
    drawBackground : function()
    {
        //this.offscreenCanvasContext.clearRect(0, 0, this.width, this.height);




        
        

        if (this.fBackgroundTextureBuffer!=undefined)
        {
            // this.offscreenCanvasContext.drawImage(this.fBackgroundTexture,
            //     0,0, 
            //     this.PROJECTIONPLANEWIDTH-this.fBackgroundImageArc, this.PROJECTIONPLANEHEIGHT,
            //     this.fBackgroundImageArc, 0, 
            //     this.PROJECTIONPLANEWIDTH-this.fBackgroundImageArc, this.PROJECTIONPLANEHEIGHT);  
            

            // this.fBackgroundTextureBuffer.drawFrame('moon_lg', 0, 475,30); 
            // this.fBackgroundTextureBuffer.drawFrame('moon_med', 0, 145,54); 
            // this.fBackgroundTextureBuffer.drawFrame('moon_sm', 0, 800,67); 


            // this.wallAnimatedData.skyobject.xpos += this.wallAnimatedData.skyobject.xincr;
            // if (this.wallAnimatedData.skyobject.xpos<0 || this.wallAnimatedData.skyobject.xpos>639) this.wallAnimatedData.skyobject.xpos=0;
            // this.wallAnimatedData.skyobject.ypos += this.wallAnimatedData.skyobject.yincr;
            //if (thispixel.ypos>199) thispixel.ypos=0;
            //this.fBackgroundTextureBuffer.drawFrame('ufo', 0, this.wallAnimatedData.skyobject.xpos,this.wallAnimatedData.skyobject.ypos); 
            //this.fBackgroundTextureBuffer.drawFrame('ufo', 0, this.wallAnimatedData.skyobject.xpos+640,this.wallAnimatedData.skyobject.ypos);


            this.offscreenCanvas.drawFrame('skycanvas', 0, this.fBackgroundImageArc, this.fProjectionPlaneYCenter-(this.PROJECTIONPLANEHEIGHT/2));  
            this.offscreenCanvasPixels=this.offscreenCanvasContext.getImageData(0,0,this.backgroundCanvas.width, this.backgroundCanvas.height); 
            
        }
    },
     
    animateBackground : function()
    {    

        
            //this.wallAnimatedData.savedcanvas.drawFrame('sky',0,0,0);

            var imageData = this.wallAnimatedData.savedcanvas.getContext('2d').getImageData(0, 0, 960, 200);
            this.wallAnimatedData.savedcanvas.imagedata = imageData;
            this.wallAnimatedData.savedcanvas.pixels = imageData.data;
            // for (var r=0;r<6;r++)
            // {
            //     var bytesPerPixel=4;
            //     var targetIndex=(960*bytesPerPixel)* Phaser.Math.Between(0,199) + ( bytesPerPixel* Phaser.Math.Between(0,959) );     
            //     this.wallAnimatedData.savedcanvas.pixels[targetIndex]=Phaser.Math.Between(0,199);
            //     this.wallAnimatedData.savedcanvas.pixels[targetIndex+1]=Phaser.Math.Between(0,199);
            //     this.wallAnimatedData.savedcanvas.pixels[targetIndex+2]=Phaser.Math.Between(0,199);
            //     this.wallAnimatedData.savedcanvas.pixels[targetIndex+3]=255;
            // }
            for (var i=0; i<this.wallAnimatedData.burstpixels.length; i++)
                {

                    var thispixel = this.wallAnimatedData.burstpixels[i];


                    thispixel.xpos += thispixel.xincr;
                    //if (thispixel.xpos<0 || thispixel.xpos>64) thispixel.xincr*=-1;

                    thispixel.ypos += thispixel.yincr;
                    if (thispixel.ypos>199) thispixel.ypos=0;

                    // this.wall_context.drawImage(subsprite.img, 0, 0, 
                    //     subsprite.img.width, subsprite.img.height, 
                    //     this.wallAnimatedData.xpos, this.wallAnimatedData.ypos, subsprite.img.width/2, subsprite.img.height/2);   

                    var r;
                    var g;
                    var b;
                    var randColor = Phaser.Math.Between(0,7);

                    if (randColor==0) { r=255; g=0; b=0; }//'red'
                    if (randColor==1) { r=0; g=255; b=0; }//'green'
                    if (randColor==2) { r=0; g=0; b=255; }//'blue'
                    if (randColor==3) { r=255; g=255; b=0; }//'orange'
                    if (randColor==4) { r=0; g=255; b=255; }//'cyan'
                    if (randColor==5) { r=255; g=0; b=255; }//'violet'
                    if (randColor==6) { r=255; g=255; b=255; }//'white'
                    if (randColor==7) { r=0; g=0; b=0; }//'black' 
                    if (game.loop.now>thispixel.timecheck+thispixel.switchtime)  
                    {
                        
                        thispixel.timecheck=game.loop.now;
                        //var greylev = Phaser.Math.Between(0,100);
                        thispixel.r = r;
                        thispixel.g = g;
                        thispixel.b = b;
                    }

                    var bytesPerPixel=4;
                    var targetIndex=(960*bytesPerPixel)* Math.round(thispixel.ypos) + ( bytesPerPixel* Math.round(thispixel.xpos) );     
                    this.wallAnimatedData.savedcanvas.pixels[targetIndex]=thispixel.r;
                    this.wallAnimatedData.savedcanvas.pixels[targetIndex+1]=thispixel.g;
                    this.wallAnimatedData.savedcanvas.pixels[targetIndex+2]=thispixel.b;
                    this.wallAnimatedData.savedcanvas.pixels[targetIndex+3]=255;
                }

            // var canvasFrame1 = this.fBackgroundTextureBuffer;
        var canvasFrame2 = this.fBackgroundTextureBuffer;
        
        var myCropData = this.wallAnimatedData.savedcanvas.imagedata;
                
        canvasFrame2.putData(myCropData,0,0,0,0,960,200);
                 //canvasFrame2.update();


        // this.sky_context.putImageData(this.wallAnimatedData.savedcanvas.imagedata,0,0);
        // this.fBackgroundTextureBuffer.drawFrame(this.wallAnimatedData.savedkey,0,0);
    },

    //*******************************************************************//
    //* Draw ray on the overhead map (for illustartion purpose)
    //* This is not part of the ray-casting process
    //*******************************************************************//
    drawRayOnOverheadMap : function(x, y)
    {
        //console.log("drawRayOnOverheadMap x="+y+" y="+y);
        // draw line from the player position to the position where the ray
        // intersect with wall
        this.drawLine(
            this.fPlayerMapX, 
            this.fPlayerMapY, 
            this.PROJECTIONPLANEWIDTH+((x*this.fMinimapWidth)/this.TILE_SIZE),
            ((y*this.fMinimapWidth)/this.TILE_SIZE), 
            "#00ff00");
    },
    
    //*******************************************************************//
    //* Draw player POV on the overhead map (for illustartion purpose)
    //* This is not part of the ray-casting process
    //*******************************************************************//
    drawPlayerPOVOnOverheadMap : function(x, y)
    {   
        // draw a red line indication the player's direction
        this.drawLine(
            this.fPlayerMapX, 
            this.fPlayerMapY, 
            (this.fPlayerMapX+this.fCosTable[this.fPlayerArc]*10),
            (this.fPlayerMapY+this.fSinTable[this.fPlayerArc]*10), 
            "#ff0000");
  
    },

    drawWallSliceRectangle: function(x, y, width, height, brightnessLevel, xOffset, yOffset, projectedDelta)
    {

        this.offscreenCanvasContext.drawImage(this.wallsrcimg, Math.floor(xOffset), 0, 
            1, this.wallsrcimg.height, 
            x, y, width, height);

        //this.offscreenCanvasPixels =  this.offscreenCanvasContext.getImageData(0,0,this.backgroundCanvas.width, this.backgroundCanvas.height);

        // this.wallSliceData[x] = {};
        // this.wallSliceData[x].y = y;
        // this.wallSliceData[x].width = width;
        // this.wallSliceData[x].height = height;
        // this.wallSliceData[x].brightness = brightnessLevel;




        // this.wallSlicePixels =  this.offscreenCanvasContext.getImageData(x,y,width,height);

        // for (var i=this.wallSlicePixels.data.length-8; i<this.wallSlicePixels.data.length; i+=4)
        // {            
        //     this.wallSlicePixels.data[i]=240;
        //     this.wallSlicePixels.data[i+1]=59;
        //     this.wallSlicePixels.data[i+2]=10;
        // }
        // for (var i=0; i<this.wallSlicePixels.data.length-8; i+=4)
        // {            
        //     this.wallSlicePixels.data[i]=Math.floor(this.wallSlicePixels.data[i]*brightnessLevel);
        //     this.wallSlicePixels.data[i+1]=Math.floor(this.wallSlicePixels.data[i+1]*brightnessLevel);
        //     this.wallSlicePixels.data[i+2]=Math.floor(this.wallSlicePixels.data[i+2]*brightnessLevel);
        // }

        // this.offscreenCanvasContext.putImageData(this.wallSlicePixels,x,y);

        

        
    },

    drawWallSliceRectangleTinted: function(x, y, width, height, brightnessLevel, xOffset, yOffset, projectedDelta)
    {       
        //console.log("this.fWallTextureBuffer="+this.fWallTextureBuffer);
        //var xOffset=x%this.fWallTexture.width;    // wrap the image position
        
        // wait until the texture loads
        if (this.fWallTextureBuffer==undefined)
            return;
        
        
        x=Math.floor(x);
        y=Math.floor(y);

        xOffset=Math.floor(xOffset);
        var bytesPerPixel=4;
        
        var sourceIndex=(bytesPerPixel*xOffset) + (this.fWallTextureBuffer.width*bytesPerPixel)*yOffset;

        var lastSourceIndex=(this.fWallTextureBuffer.width*this.fWallTextureBuffer.height*bytesPerPixel);
        
        var targetIndex=(this.offscreenCanvasPixels.width*bytesPerPixel)*y+(bytesPerPixel*x);
        


        var heightToDraw = height;
        

// var debugt = [];

// debugt.push('y (topOfWall): '+ y );

// debugt.push('heightToDraw: '+ heightToDraw );

// debug.setText(debugt);


// clip bottom
        if (y+heightToDraw>this.offscreenCanvasPixels.height)
            heightToDraw=this.offscreenCanvasPixels.height-y;




        var yError=0;   
        

        // we need to check this, otherwise, program might crash when trying
        // to fetch the shade if this condition is true (possible if height is 0)
        if (heightToDraw<0)
            return;

        while (true)
        {                     
            // if error < actualHeight, this will cause row to be skipped until
            // this addition sums to scaledHeight
            // if error > actualHeight, this ill cause row to be drawn repeatedly until
            // this addition becomes smaller than actualHeight
            // 1) Think the image height as 100, if percent is >= 100, we'll need to
            // copy the same pixel over and over while decrementing the percentage.  
            // 2) Similarly, if percent is <100, we skip a pixel while incrementing
            // and do 1) when the percentage we're adding has reached >=100

            if (projectedDelta) 
            {
                yError += projectedDelta;
            }
            else
            {
                yError += height;
            }
            
                                                 
    
            var red=Math.floor(this.fWallTexturePixels[sourceIndex]*brightnessLevel);
            var green=Math.floor(this.fWallTexturePixels[sourceIndex+1]*brightnessLevel);
            var blue=Math.floor(this.fWallTexturePixels[sourceIndex+2]*brightnessLevel);
            var alpha=Math.floor(this.fWallTexturePixels[sourceIndex+3]);
            
            // while there's a row to draw & not end of drawing area
            while (yError>=this.fWallTextureBuffer.width)
            {                  
                yError-=this.fWallTextureBuffer.width;

                if (alpha!=0)
                {
                    this.offscreenCanvasPixels.data[targetIndex]=red;
                    this.offscreenCanvasPixels.data[targetIndex+1]=green;
                    this.offscreenCanvasPixels.data[targetIndex+2]=blue;
                    //this.offscreenCanvasPixels.data[targetIndex+3]=alpha;
                }
                


                targetIndex+=(bytesPerPixel*this.offscreenCanvasPixels.width);
                // clip bottom (just return if we reach bottom)
                heightToDraw--;
                if (heightToDraw<1)
                    return;
            } 
            sourceIndex+=(bytesPerPixel*this.fWallTextureBuffer.width);
            if (sourceIndex>lastSourceIndex)
                sourceIndex=lastSourceIndex;            
        }

    },  

    tickleOffscreenCanvas : function()
    {   
        var bytesPerPixel=4;
        var targetIndex;

        // //tint wall slices
        // for (var x=0; x<320; x++)
        // {
        //     var sliceData = this.wallSliceData[x];
        //     for (var y=sliceData.y; y<sliceData.y+sliceData.height; y++)
        //     {                
        //         targetIndex=(this.offscreenCanvasPixels.width*bytesPerPixel)*y+(bytesPerPixel*x);          
        //         this.offscreenCanvasPixels.data[targetIndex]=Math.floor(this.offscreenCanvasPixels.data[targetIndex]*sliceData.brightness);
        //         this.offscreenCanvasPixels.data[targetIndex+1]=Math.floor(this.offscreenCanvasPixels.data[targetIndex+1]*sliceData.brightness);
        //         this.offscreenCanvasPixels.data[targetIndex+2]=Math.floor(this.offscreenCanvasPixels.data[targetIndex+2]*sliceData.brightness);
        //     }            
        // }

        //copy object pixels
        for (var x=0; x<320; x++)
        {            
            for (var y=0; y<200; y++)
            {
                var bytesPerPixel=4;
                var targetIndex=(this.offscreenObjectsPixels.width*bytesPerPixel)*y+(bytesPerPixel*x);          
                var red = this.offscreenObjectsPixels.data[targetIndex];
                var green = this.offscreenObjectsPixels.data[targetIndex+1];
                var blue = this.offscreenObjectsPixels.data[targetIndex+2];
                var alpha = this.offscreenObjectsPixels.data[targetIndex+3];
            
                if (alpha!=0)
                {
                    this.offscreenCanvasPixels.data[targetIndex]=red;
                    this.offscreenCanvasPixels.data[targetIndex+1]=green;
                    this.offscreenCanvasPixels.data[targetIndex+2]=blue;
                }                
            }            
        }
    },
    
    clearOffscreenCanvas : function()
    {   
        
        this.offscreenCanvasContext.clearRect(0, 0, 320, 200);
    },
    
    blitOffscreenCanvas : function()
    {        
        //this.offscreenCanvasPixels =  this.offscreenCanvasContext.getImageData(0,0,this.backgroundCanvas.width, this.backgroundCanvas.height);

        //this.tickleOffscreenCanvas();
        
        this.bg_context.putImageData(this.offscreenCanvasPixels,0,0);
        this.backgroundCanvas.refresh();

    },
    animateWallCanvas : function()
    {     

        if ( this.wallAnimatedData.modedoneflag)
        {   
            
            this.wallAnimatedData.savedkey = Math.random().toString();

            

            var imagekey = wallList[this.demoBot.wall_index];
            var new_wallimg = this.textures.get(imagekey).getSourceImage();
            
            this.wallAnimatedData.savedcanvas = this.textures.createCanvas(this.wallAnimatedData.savedkey,64,64);

            this.wallAnimatedData.savedcanvas.getContext('2d').drawImage(new_wallimg, 0, 0, new_wallimg.width, new_wallimg.height,0,0,this.WALL_WIDTH,this.WALL_HEIGHT );

            

            if (this.wallAnimatedData.mode=='updateTimedText') {this.wallAnimatedData.mode = 'flashText'}
            else if (this.wallAnimatedData.mode=='flashText') {this.wallAnimatedData.mode = 'scrollCanvas'}
            else if (this.wallAnimatedData.mode=='scrollCanvas') {this.wallAnimatedData.mode = 'waveCanvas'}
            else if (this.wallAnimatedData.mode=='waveCanvas') {this.wallAnimatedData.mode = 'updateTimedText'}
            else if (this.wallAnimatedData.mode=='rain') { this.wallAnimatedData.mode = 'updateTimedText'}

            

            this.wallAnimatedData.modedoneflag = false;  
        }

        
        // var i = Phaser.Math.Between(0,64);
        // var j = Phaser.Math.Between(0,64);

        //this.wall_context.putImageData(this.offscreenCanvasPixels,0,0);

        
        
        
        
        //**spritesheet code
        // var frameoffset = this.spriteZ[20].frameindex*this.spriteZ[20].framewidth;

        // this.spriteZ[20].frameindex++
        //     if (this.spriteZ[20].frameindex == this.spriteZ[20].numframes)
        //     {
        //         this.spriteZ[20].frameindex = 0;
        //     }
        

        if (this.wallAnimatedData.mode == 'colorfade')
        {

            this.fWallTextureBuffer.drawFrame('wall',0,0,0);
            var imageData = this.wall_context.getImageData(0,0, this.wallsrcimg.width, this.wallsrcimg.height);    
            this.fWallTexturePixels = imageData.data;


            this.wallAnimatedData.hexdigit1 += this.wallAnimatedData.hex1increment;
            this.wallAnimatedData.hexdigit2 += this.wallAnimatedData.hex2increment;
            this.wallAnimatedData.hexdigit3 += this.wallAnimatedData.hex3increment;


            if (this.wallAnimatedData.hexdigit1 <10 || this.wallAnimatedData.hexdigit1 >245) {this.wallAnimatedData.hex1increment*=-1};

            if (this.wallAnimatedData.hexdigit2 <10 || this.wallAnimatedData.hexdigit2 >245) {this.wallAnimatedData.hex2increment*=-1};

            if (this.wallAnimatedData.hexdigit3 <10 || this.wallAnimatedData.hexdigit3 >255) {this.wallAnimatedData.hex3increment*=-1};


            //copy object pixels
            for (var x=0; x<64; x++)
            {            
                for (var y=0; y<64; y++)
                {
                    var bytesPerPixel=4;
                    var targetIndex=(this.wallsrcimg.width*bytesPerPixel)*y+(bytesPerPixel*x);          
                    var red = this.fWallTexturePixels[targetIndex];
                    var green = this.fWallTexturePixels[targetIndex+1];
                    var blue = this.fWallTexturePixels[targetIndex+2];
                    var alpha = this.fWallTexturePixels[targetIndex+3];
                
                    if (alpha!=0)
                    {
                        this.fWallTexturePixels[targetIndex]=Math.floor((red+this.wallAnimatedData.hexdigit1)/2);
                        this.fWallTexturePixels[targetIndex+1]=Math.floor((green+this.wallAnimatedData.hexdigit2)/2);
                        this.fWallTexturePixels[targetIndex+2]=Math.floor((blue+this.wallAnimatedData.hexdigit3)/2);
                    }                
                }            
            }

        }


        if (this.wallAnimatedData.mode == 'rain')
        {

            //erase pixels
            this.clearWallCanvasPixels();

            if ( game.loop.now < this.wallAnimatedData.timecheck + 6000 )
            {

                for (var i=0; i<this.wallAnimatedData.burstpixels.length; i++)
                {

                    var thispixel = this.wallAnimatedData.burstpixels[i];


                    thispixel.xpos += thispixel.xincr;
                    //if (thispixel.xpos<0 || thispixel.xpos>64) thispixel.xincr*=-1;

                    thispixel.ypos += thispixel.yincr;
                    if (thispixel.ypos>63) thispixel.ypos=0;

                    // this.wall_context.drawImage(subsprite.img, 0, 0, 
                    //     subsprite.img.width, subsprite.img.height, 
                    //     this.wallAnimatedData.xpos, this.wallAnimatedData.ypos, subsprite.img.width/2, subsprite.img.height/2);   

                    var r;
                    var g;
                    var b;
                    var randColor = Phaser.Math.Between(0,7);

                    if (randColor==0) { r=255; g=0; b=0; }//'red'
                    if (randColor==1) { r=0; g=255; b=0; }//'green'
                    if (randColor==2) { r=0; g=0; b=255; }//'blue'
                    if (randColor==3) { r=255; g=255; b=0; }//'orange'
                    if (randColor==4) { r=0; g=255; b=255; }//'cyan'
                    if (randColor==5) { r=255; g=0; b=255; }//'violet'
                    if (randColor==6) { r=255; g=255; b=255; }//'white'
                    if (randColor==7) { r=0; g=0; b=0; }//'black' 
                    if (game.loop.now>thispixel.timecheck+thispixel.switchtime)  
                    {
                        
                        thispixel.timecheck=game.loop.now;
                        var greylev = Phaser.Math.Between(0,100);
                        thispixel.r = greylev;
                        thispixel.g = greylev;
                        thispixel.b = Phaser.Math.Between(100,250);
                    }

                    var bytesPerPixel=4;
                    var targetIndex=(this.wallsrcimg.width*bytesPerPixel)* Math.round(thispixel.ypos) + ( bytesPerPixel* Math.round(thispixel.xpos) );     
                    this.fWallTexturePixels[targetIndex]=thispixel.r;
                    this.fWallTexturePixels[targetIndex+1]=thispixel.g;
                    this.fWallTexturePixels[targetIndex+2]=thispixel.b;
                    this.fWallTexturePixels[targetIndex+3]=255;
                }
            }
            else
            {
                this.wallAnimatedData.modedoneflag='true';
            }
        }

        if (this.wallAnimatedData.mode == 'updateTimedText')
        {
            var nextChar = this.wallAnimatedData.msgstring.charAt(this.wallAnimatedData.msgindex);
            if ( game.loop.now > this.wallAnimatedData.timecheck + 65 || nextChar==' ')
            {
                if (this.wallAnimatedData.textspace == 0)
                {
                    this.wallAnimatedData.colorindex = Phaser.Math.Between(0,this.wallAnimatedData.numfontcolors-1);

                    // this.wall_context.drawImage(this.walleraseimg, 0, 0, 
                    // this.walleraseimg.width, this.walleraseimg.height, 
                    // 0, 0, this.wallsrcimg.width, this.wallsrcimg.height);
                    this.wall_context.clearRect(0, 0, 64, 64);

                   
                }
                this.wallAnimatedData.timecheck=game.loop.now;
                var textX = this.wallAnimatedData.textspace%8;
                var textY = Math.floor(this.wallAnimatedData.textspace/8);
                this.wallAnimatedData.textspace++;
                if (this.wallAnimatedData.textspace>=64) {this.wallAnimatedData.textspace = 0; }


                
                this.wallAnimatedData.msgindex++;
                if (this.wallAnimatedData.msgindex>=64) {this.wallAnimatedData.msgindex=0; this.wallAnimatedData.modedoneflag='true';}

                this.fWallTextureBuffer.drawFrame('fontsheet',nextChar+'color'+this.wallAnimatedData.colorindex,textX*8,textY*8);
            }

            var imageData = this.wall_context.getImageData(0,0, this.WALL_WIDTH, this.WALL_HEIGHT);    
            this.fWallTexturePixels = imageData.data;
        }
        if (this.wallAnimatedData.mode == 'scrollCanvas')
        {
            
            // this.wallAnimatedData.savedkey = Math.random().toString();

            // var saveCanvas = this.textures.createCanvas(this.wallAnimatedData.savedkey,64,64);
            // saveCanvas.drawFrame('ammo',0,0,0);

            // this.wall_context.drawImage(this.walleraseimg, 0, 0, 
            // this.walleraseimg.width, this.walleraseimg.height, 
            // 0, 0, this.wallsrcimg.width, this.wallsrcimg.height);
            this.wall_context.clearRect(0, 0, 64, 64);
            
            this.fWallTextureBuffer.drawFrame(this.wallAnimatedData.savedkey,0,this.wallAnimatedData.scrollindex,0);
            this.fWallTextureBuffer.drawFrame(this.wallAnimatedData.savedkey,0,this.wallAnimatedData.scrollindex-64,0);
            
            this.wallAnimatedData.scrollindex+=8;
            
            if (this.wallAnimatedData.scrollindex>=72) 
            {
                this.wallAnimatedData.scrollindex = 0; 
                this.wallAnimatedData.scrollcycles++;
                if (this.wallAnimatedData.scrollcycles==6) {this.wallAnimatedData.scrollcycles=0; this.wallAnimatedData.modedoneflag='true';}
                
            }
            // this.wall_context.drawImage(thisTextImage, 0, 0, 
            //             thisTextImage.width, thisTextImage.height, 
            //  
            var imageData = this.wall_context.getImageData(0,0, this.WALL_WIDTH, this.WALL_HEIGHT);

            //this.wall_context.putImageData(imageData,0,0);    
            this.fWallTexturePixels = imageData.data;

        }
        if (this.wallAnimatedData.mode == 'waveCanvas')
        {
            var frameWidth = 64;
            var frameHeight = 64;
            //console.log(frameWidth,frameHeight);
                
            var numberOfFrames = 64;
            var waveSize = 8;
            var wavePixelChunk = 2;
            
            var canvasFrame1 = this.wallAnimatedData.savedcanvas;
            var canvasFrame2 = this.fWallTextureBuffer;

            //bm.cls();
            
            var s = 0;
            //var copyRect = new Phaser.Rectangle(0, 0, wavePixelChunk, 150 );
            var copyRect = { x: 0, y: 0, w: wavePixelChunk, h: frameHeight };
            var copyPoint = { x: 0, y: 0 };

            for (var x = 0; x <numberOfFrames ; x += wavePixelChunk)
            {
                copyPoint.x = x;
                //copyPoint.y = waveSize + (waveSize / 2) + waveData.sin[s];
                

                
                // if (this.wallAnimatedData.waveFrameIndex < this.wallAnimatedData.waveData.length/2)
                // {
                //     var scaleDownAmp = (1.0-(this.wallAnimatedData.waveData.length-this.wallAnimatedData.waveFrameIndex)/this.wallAnimatedData.waveData.length);
                // }
                
                // else
                // {
                //    var scaleDownAmp = ((this.wallAnimatedData.waveData.length-this.wallAnimatedData.waveFrameIndex)/this.wallAnimatedData.waveData.length);
                // }
                
                var scaleDownAmp = (this.wallAnimatedData.waveData.length-this.wallAnimatedData.waveFrameIndex)/this.wallAnimatedData.waveData.length;

                copyPoint.y = scaleDownAmp*(this.wallAnimatedData.waveData.sin[s]);

                //copyPoint.y = this.wallAnimatedData.waveData.sin[s];


                var myCropData = canvasFrame1.getData(copyRect.x,copyRect.y,frameWidth,frameHeight);
                canvasFrame2.putData(myCropData,copyPoint.x,copyPoint.y,0,0,frameWidth ,frameHeight);
                canvasFrame2.update();

                
                
                copyRect.x += wavePixelChunk;
                    
                s += wavePixelChunk;
            }

                
            //  Cycle through the wave data - this is what causes the image to "undulate"
            Phaser.Utils.Array.RotateRight(this.wallAnimatedData.waveData.sin);
        
            this.wallAnimatedData.waveFrameIndex+=wavePixelChunk;
        
            if (this.wallAnimatedData.waveFrameIndex>=64) 
            {
                this.wallAnimatedData.waveFrameIndex = 0; 
                this.wallAnimatedData.scrollcycles++;
                if (this.wallAnimatedData.scrollcycles==1) {this.wallAnimatedData.scrollcycles=0; this.wallAnimatedData.modedoneflag='true';}
                
            }

            var imageData = this.wall_context.getImageData(0,0, this.WALL_WIDTH, this.WALL_HEIGHT);

            this.fWallTexturePixels = imageData.data;    
            
        }
        

        if (this.wallAnimatedData.mode == 'flashText')
        {

            if ( game.loop.now > this.wallAnimatedData.timecheck + 200)
            {
                // this.wall_context.drawImage(this.walleraseimg, 0, 0, 
                // this.walleraseimg.width, this.walleraseimg.height, 
                // 0, 0, this.wallsrcimg.width, this.wallsrcimg.height);
                this.wall_context.clearRect(0, 0, 64, 64);
                
                this.wallAnimatedData.colorindex = Phaser.Math.Between(0,this.wallAnimatedData.numfontcolors-1);

                for (var q=0; q<this.wallAnimatedData.msgstring.length; q++)
                {
                    var textX = q%8;
                    var textY = Math.floor(q/8);
                    var nextChar = this.wallAnimatedData.msgstring.charAt(q);


                    
                    
                    // if (this.wallAnimatedData.msgindex>=64) {this.wallAnimatedData.msgindex=0; this.wallAnimatedData.modedoneflag='true';}

                    this.fWallTextureBuffer.drawFrame('fontsheet',nextChar+'color'+this.wallAnimatedData.colorindex,textX*8,textY*8);
                }

                this.wallAnimatedData.timecheck=game.loop.now;

                this.wallAnimatedData.msgindex++;
                if (this.wallAnimatedData.msgindex>=16) 
                {
                    this.wallAnimatedData.msgindex = 0; 
                    this.wallAnimatedData.scrollcycles++;
                    if (this.wallAnimatedData.scrollcycles==1) {this.wallAnimatedData.scrollcycles=0; this.wallAnimatedData.modedoneflag='true';}
                    
                }
            }

            var imageData = this.wall_context.getImageData(0,0, this.WALL_WIDTH, this.WALL_HEIGHT);    
            this.fWallTexturePixels = imageData.data;
        }

        // var thisTextImage = this.textures.get('fontsheet').getSourceImage();

        // this.wall_context.drawImage(thisTextImage, 0, 0, 
        //             thisTextImage.width, thisTextImage.height, 
        //             0, 0, 64, 64);   

        


    },

    clearWallCanvasPixels : function()
    {
        
        var targetIndex=0;  
        var bytesPerPixel=4;    
        for (var y=0; y<this.wallsrcimg.height; y++) 
        {   
            //console.log("y="+y+" targetIndex="+targetIndex)   
            for (var x=0; x<this.wallsrcimg.width; x++)  
            {   
                this.fWallTexturePixels[targetIndex]=0; 
                this.fWallTexturePixels[targetIndex+1]=0;   
                this.fWallTexturePixels[targetIndex+2]=0;   
                this.fWallTexturePixels[targetIndex+3]=0;   
                targetIndex+=(bytesPerPixel);       
            }   
        }       
    
    },
    
    //*******************************************************************//
    //* Renderer
    //*******************************************************************//
    raycast : function()
    {
        savedColumnDistances=[];

        var verticalGrid;        // horizotal or vertical coordinate of intersection
        var horizontalGrid;      // theoritically, this will be multiple of TILE_SIZE
                                 // , but some trick did here might cause
                                 // the values off by 1
        var distToNextVerticalGrid; // how far to the next bound (this is multiple of
        var distToNextHorizontalGrid; // tile size)
        var xIntersection;  // x and y intersections
        var yIntersection;
        var distToNextXIntersection;
        var distToNextYIntersection;

        var xGridIndex;        // the current cell that the ray is in
        var yGridIndex;
        var mapIndex;

        var distToVerticalGridBeingHit;      // the distance of the x and y ray intersections from
        var distToHorizontalGridBeingHit;      // the viewpoint

        var castArc, castColumn;
        var DEBUG=false;

        var H_edgeFlag;
        var V_edgeFlag;
        
        
        castArc = this.fPlayerArc;
        // field of view is 60 degree with the point of view (player's direction in the middle)
        // 30  30
        //    ^
        //  \ | /
        //   \|/
        //    v
        // we will trace the rays starting from the leftmost ray
        castArc-=this.ANGLE30;
        // wrap around if necessary
        if (castArc < 0)
        {
            castArc=this.ANGLE360 + castArc;
        }




        



        for (castColumn=0; castColumn<this.PROJECTIONPLANEWIDTH; castColumn+=1)
        {
            // Ray is between 0 to 180 degree (1st and 2nd quadrant).
            
            // Ray is facing down
            if (castArc > this.ANGLE0 && castArc < this.ANGLE180)
            {
                // truncuate then add to get the coordinate of the FIRST grid (horizontal
                // wall) that is in front of the player (this is in pixel unit)
                // ROUNDED DOWN
                horizontalGrid = Math.floor(this.fPlayerY/this.TILE_SIZE)*this.TILE_SIZE  + this.TILE_SIZE;

                // compute distance to the next horizontal wall
                distToNextHorizontalGrid = this.TILE_SIZE;

                var xtemp = this.fITanTable[castArc]*(horizontalGrid-this.fPlayerY);
                // we can get the vertical distance to that wall by
                // (horizontalGrid-playerY)
                // we can get the horizontal distance to that wall by
                // 1/tan(arc)*verticalDistance
                // find the x interception to that wall
                xIntersection = xtemp + this.fPlayerX;
                if (DEBUG)
                {               
                    console.log("castArc="+castArc+" in CHECKPOINT A, horizontalGrid="+horizontalGrid+" distToNextHorizontalGrid="+distToNextHorizontalGrid+
                        " xtemp="+xtemp+" xIntersection="+xIntersection);               
                }               
            }
            // Else, the ray is facing up
            else
            {
                horizontalGrid = Math.floor(this.fPlayerY/this.TILE_SIZE)*this.TILE_SIZE;
                distToNextHorizontalGrid = -this.TILE_SIZE;

                var xtemp = this.fITanTable[castArc]*(horizontalGrid - this.fPlayerY);
                xIntersection = xtemp + this.fPlayerX;

                horizontalGrid--;
                if (DEBUG)
                {               
                    console.log("castArc="+castArc+" in CHECKPOINT B, horizontalGrid="+horizontalGrid+" distToNextHorizontalGrid="+distToNextHorizontalGrid+
                        " xtemp="+xtemp+" xIntersection="+xIntersection);               
                }
            }
            // LOOK FOR HORIZONTAL WALL
            
            // If ray is directly facing right or left, then ignore it 
            if (castArc==this.ANGLE0 || castArc==this.ANGLE180)
            {
                distToHorizontalGridBeingHit=Number.MAX_VALUE;
            }
            // else, move the ray until it hits a horizontal wall
            else
            {
                distToNextXIntersection = this.fXStepTable[castArc];
                while (true)
                {
                    xGridIndex = Math.floor(xIntersection/this.TILE_SIZE);
                    yGridIndex = Math.floor(horizontalGrid/this.TILE_SIZE);
                    mapIndex=Math.floor(yGridIndex*this.MAP_WIDTH+xGridIndex);

                    if (DEBUG)
                    {                                       
                        console.log("this.fPlayerY="+this.fPlayerY+" this.fPlayerX="+this.fPlayerX+" castColumn="+castColumn+" castArc="+castArc+" xIntersection="+xIntersection+" horizontalGrid="+horizontalGrid+" xGridIndex="+xGridIndex+" yGridIndex="+yGridIndex+" mapIndex="+mapIndex);
                        console.log("this.fITanTable="+this.fITanTable[castArc]);
                    }
                    
                    // If we've looked as far as outside the map range, then bail out
                    if ((xGridIndex>=this.MAP_WIDTH) ||
                        (yGridIndex>=this.MAP_HEIGHT) ||
                        xGridIndex<0 || yGridIndex<0)
                    {
                        distToHorizontalGridBeingHit = (xIntersection-this.fPlayerX)*this.fICosTable[castArc];//Number.MAX_VALUE;
                        //savedEdge  = (xIntersection-this.fPlayerX)*this.fICosTable[castArc];
                        H_edgeFlag=true;
                        break;
                    }
                    // If the grid is not an Opening, then stop
                    else if (this.fMap.charAt(mapIndex)=='W')
                    {
                        distToHorizontalGridBeingHit  = (xIntersection-this.fPlayerX)*this.fICosTable[castArc];
                        H_edgeFlag=false;
                        break;
                    }
                    
                    // Else, keep looking.  At this point, the ray is not blocked, extend the ray to the next grid
                    else
                    {
                        if (!tflagarray.includes(mapIndex))
                        {
                            tflagarray.push(mapIndex);
                        }

                        xIntersection += distToNextXIntersection;
                        horizontalGrid += distToNextHorizontalGrid;
                    }
                }
            }


            // FOLLOW X RAY
            if (castArc < this.ANGLE90 || castArc > this.ANGLE270)
            {
                verticalGrid = this.TILE_SIZE + Math.floor(this.fPlayerX/this.TILE_SIZE)*this.TILE_SIZE;
                distToNextVerticalGrid = this.TILE_SIZE;

                var ytemp = this.fTanTable[castArc]*(verticalGrid - this.fPlayerX);
                yIntersection = ytemp + this.fPlayerY;
                if (DEBUG)
                {               
                    
                    console.log("castArc="+castArc+" in CHECKPOINT C, horizontalGrid="+horizontalGrid+" distToNextHorizontalGrid="+distToNextHorizontalGrid+
                        " ytemp="+ytemp+" yIntersection="+yIntersection);               
                }
            }
            // RAY FACING LEFT
            else
            {
                verticalGrid = Math.floor(this.fPlayerX/this.TILE_SIZE)*this.TILE_SIZE;
                distToNextVerticalGrid = -this.TILE_SIZE;

                var ytemp = this.fTanTable[castArc]*(verticalGrid - this.fPlayerX);
                yIntersection = ytemp + this.fPlayerY;

                verticalGrid--;
                if (DEBUG)
                {                               
                    console.log("castArc="+castArc+" in CHECKPOINT D, horizontalGrid="+horizontalGrid+" distToNextHorizontalGrid="+distToNextHorizontalGrid+
                        " ytemp="+ytemp+" yIntersection="+yIntersection);                   
                }
            }
              // LOOK FOR VERTICAL WALL
            if (castArc==this.ANGLE90||castArc==this.ANGLE270)
            {
                distToVerticalGridBeingHit = Number.MAX_VALUE;
            }
            else
            {
                distToNextYIntersection = this.fYStepTable[castArc];
                while (true)
                {
                    // compute current map position to inspect
                    xGridIndex = Math.floor(verticalGrid/this.TILE_SIZE);
                    yGridIndex = Math.floor(yIntersection/this.TILE_SIZE);
                    mapIndex=Math.floor(yGridIndex*this.MAP_WIDTH+xGridIndex);
                    
                    if (DEBUG)
                    {
                        console.log("this.fPlayerY="+this.fPlayerY+" this.fPlayerX="+this.fPlayerX+" castColumn="+castColumn+" castArc="+castArc+" xIntersection="+xIntersection+" horizontalGrid="+horizontalGrid+" xGridIndex="+xGridIndex+" yGridIndex="+yGridIndex+" mapIndex="+mapIndex);
                        console.log("this.fITanTable="+this.fITanTable[castArc]);
                    }
                    
                    if ((xGridIndex>=this.MAP_WIDTH) || 
                        (yGridIndex>=this.MAP_HEIGHT) ||
                        xGridIndex<0 || yGridIndex<0)
                    {
                        distToVerticalGridBeingHit = (yIntersection-this.fPlayerY)*this.fISinTable[castArc];//Number.MAX_VALUE;
                        //savedEdge =
                        V_edgeFlag=true;
                        break;
                    }
                    else if (this.fMap.charAt(mapIndex)=='W')
                    {
                        distToVerticalGridBeingHit =(yIntersection-this.fPlayerY)*this.fISinTable[castArc];
                        V_edgeFlag=false;
                        
                        break;
                    }
                    
                    else
                    {
                        if (!tflagarray.includes(mapIndex))
                        {
                            tflagarray.push(mapIndex);
                        }

                        yIntersection += distToNextYIntersection;
                        verticalGrid += distToNextVerticalGrid;
                    }
                }
            }

            // DRAW THE WALL SLICE
            

            
            var dist;
            var xOffset;
            var yOffset;
            var projectedDelta;

            var topOfWall;   // used to compute the top and bottom of the sliver that
            var bottomOfWall;   // will be the staring point of floor and ceiling
            // determine which ray strikes a closer wall.
            // if yray distance to the wall is closer, the yDistance will be shorter than
            // the xDistance

            var isVerticalHit=false;
            if (distToHorizontalGridBeingHit < distToVerticalGridBeingHit)
            {
                // the next function call (drawRayOnMap()) is not a part of raycating rendering part, 
                // it just draws the ray on the overhead map to illustrate the raycasting process

                //this.drawRayOnOverheadMap(xIntersection, horizontalGrid);

                dist=distToHorizontalGridBeingHit;
                xOffset=xIntersection%this.TILE_SIZE;
                if (DEBUG)
                {               
                    console.log("castColumn="+castColumn+" using distToHorizontalGridBeingHit");
                }
            }
            // else, we use xray instead (meaning the vertical wall is closer than
            //   the horizontal wall)
            else
            {
                isVerticalHit=true;
                // the next function call (drawRayOnMap()) is not a part of raycating rendering part, 
                // it just draws the ray on the overhead map to illustrate the raycasting process

                //this.drawRayOnOverheadMap(verticalGrid, yIntersection);

                dist=distToVerticalGridBeingHit;
                xOffset=yIntersection%this.TILE_SIZE;
                
                if (DEBUG)
                {               
                    console.log("castColumn="+castColumn+" using distToVerticalGridBeingHit");
                }
            }

            savedColumnDistances.push(dist);


// var projectedObjectHeight=Math.floor(zsprite.buffer.height*this.fPlayerDistanceToTheProjectionPlane/distance);
// var projectedObjectWidth=Math.floor(zsprite.buffer.width*this.fPlayerDistanceToTheProjectionPlane/distance);

// if (zsprite.elevation_delta)
// {
//     var projected_ed = Math.floor(zsprite.elevation_delta*(projectedObjectHeight/zsprite.buffer.height));
//     var saved_ed = Math.floor(zsprite.elevation_delta);
// }
// else
// {
//     var projected_ed = 0;
//     var saved_ed = 0;
// }
// var bottomOfObject = Math.floor(this.fProjectionPlaneYCenter+(projectedObjectHeight*0.5)-projected_ed);
// var topOfObject = Math.floor(this.fProjectionPlaneYCenter-(projectedObjectHeight*0.5)-projected_ed);


            // correct distance (compensate for the fishbown effect)
            dist /= this.fFishTable[castColumn];
            // projected_wall_height/wall_height = fPlayerDistToProjectionPlane/dist;



            var projectedWallHeight=(this.WALL_HEIGHT*this.fPlayerDistanceToTheProjectionPlane/dist);
            var projectedWallWidth=(this.WALL_WIDTH*this.fPlayerDistanceToTheProjectionPlane/dist);

            var wallElevationDelta = 32-this.fPlayerElevation;


            var projected_ed = wallElevationDelta*(projectedWallHeight/this.WALL_HEIGHT);
            //var saved_ed = wallElevationDelta;

            var bottomOfWall = Math.floor(this.fProjectionPlaneYCenter+(projectedWallHeight*0.5)-projected_ed);
            var topOfWall = Math.floor(this.fProjectionPlaneYCenter-(projectedWallHeight*0.5)-projected_ed);

            // if (topOfWall<0)
            // {

            //     projectedDelta = (bottomOfWall-topOfWall);
                
            //     var yd1 = (200*64/projectedWallHeight);
            //     var yd2 = (.5*(64-yd1));
            //     topOfWall = 0;
            //     //bottomOfWall = 200;
            //     yOffset = Math.floor(yd2+saved_ed);
            // }
            // else
            // {
                projectedDelta = null;
                yOffset = 0;
            // }

            



            
            if (DEBUG)
            {               
                console.log("castColumn="+castColumn+" distance="+dist);
            }
            
            
            //Add simple shading so that farther wall slices appear darker.
            
            dist=Math.floor(dist);
            

            if ( ((bottomOfWall-topOfWall) && !H_edgeFlag) || ((bottomOfWall-topOfWall) && !V_edgeFlag) )
            {
                // Trick to give different shades between vertical and horizontal (you could also use different textures for each if you wish to)
                if (isVerticalHit)
                    this.drawWallSliceRectangleTinted(castColumn, topOfWall, 1, (bottomOfWall-topOfWall), 1, xOffset, yOffset, projectedDelta);// 90/(dist)
                else
                    this.drawWallSliceRectangleTinted(castColumn, topOfWall, 1, (bottomOfWall-topOfWall), 1, xOffset, yOffset, projectedDelta);// 120/(dist)


            }

            
            
            var bytesPerPixel=4;
            var projectionPlaneCenterY=this.fProjectionPlaneYCenter;
            var lastBottomOfWall = Math.floor(bottomOfWall);
            //*************
            // FLOOR CASTING at the simplest!  Try to find ways to optimize this, you can do it!
            //*************
            if (this.fFloorTextureBuffer!=undefined)
            {
                // find the first bit so we can just add the width to get the
                // next row (of the same column)
                var targetIndex=lastBottomOfWall*(this.offscreenCanvasPixels.width*bytesPerPixel)+(bytesPerPixel*castColumn);

                // added 1 to this.PROJECTIONPLANEHEIGHT to correct last row glitch
                for (var row=lastBottomOfWall;row<this.PROJECTIONPLANEHEIGHT+1;row++) 
                {                          
                    var ratio=(this.fPlayerElevation)/(row-projectionPlaneCenterY);

                    var diagonalDistance=Math.round((this.fPlayerDistanceToTheProjectionPlane*ratio)*
                        (this.fFishTable[castColumn]));

                    var yEnd = Math.round(diagonalDistance * this.fSinTable[castArc]);
                    var xEnd = Math.round(diagonalDistance * this.fCosTable[castArc]);
        
                    // Translate relative to viewer coordinates:
                    xEnd+=this.fPlayerX;
                    yEnd+=this.fPlayerY;

                    // Get the tile intersected by ray:
                    var cellX = Math.floor(xEnd / this.TILE_SIZE);
                    var cellY = Math.floor(yEnd / this.TILE_SIZE);
                    //console.log("cellX="+cellX+" cellY="+cellY);
                    
                    //Make sure the tile is within our map
                    if ((cellX<this.MAP_WIDTH) &&   
                        (cellY<this.MAP_HEIGHT) &&
                        cellX>=0 && cellY>=0)
                    {            
                        // Find offset of tile and column in texture
                        var tileRow = Math.floor(yEnd % this.TILE_SIZE);
                        var tileColumn = Math.floor(xEnd % this.TILE_SIZE);
                        // Pixel to draw
                        var sourceIndex=(tileRow*this.fFloorTextureBuffer.width*bytesPerPixel)+(bytesPerPixel*tileColumn);
                        
                        // Cheap shading trick
                        var brighnessLevel=(100/diagonalDistance);
                        var red=Math.floor(this.fFloorTexturePixels[sourceIndex]*brighnessLevel);
                        var green=Math.floor(this.fFloorTexturePixels[sourceIndex+1]*brighnessLevel);
                        var blue=Math.floor(this.fFloorTexturePixels[sourceIndex+2]*brighnessLevel);
                        var alpha=Math.floor(this.fFloorTexturePixels[sourceIndex+3]);                      
                        
                        // Draw the pixel 
                        if (alpha!=0)
                        {
                            this.offscreenCanvasPixels.data[targetIndex]=red;
                            this.offscreenCanvasPixels.data[targetIndex+1]=green;
                            this.offscreenCanvasPixels.data[targetIndex+2]=blue;
                            //this.offscreenCanvasPixels.data[targetIndex+3]=alpha;
                        }

                        
                        // Go to the next pixel (directly under the current pixel)
                        targetIndex+=(bytesPerPixel*this.offscreenCanvasPixels.width);                                          
                    }                                                              
                }   
            }


            
            

            

            // TRACE THE NEXT RAY
            castArc+=1;
            if (castArc>=this.ANGLE360)
                castArc-=this.ANGLE360;
        }


        

    },

    drawAllObjects: function()
    {
        // DRAW THE OBJECTS
        spriteZDistances = [];
        
        


        for (var i = 0; i < this.zspritesgroupArray.length; i++)
        {

            xGridIndex = Math.floor(this.zspritesgroupArray[i].x/this.TILE_SIZE);
            yGridIndex = Math.floor(this.zspritesgroupArray[i].y/this.TILE_SIZE);
            mapIndex=Math.floor(yGridIndex*this.MAP_WIDTH+xGridIndex);

            if (tflagarray.includes(mapIndex) && this.zspritesgroupArray[i].active)
            {
                
                
                var distance = Phaser.Math.Distance.Between(this.zspritesgroupArray[i].x,this.zspritesgroupArray[i].y,this.fPlayerX,this.fPlayerY);

                this.zspritesgroupArray[i].distance = distance;

                spriteZDistances.push(distance);
            }
            else
            {
                this.zspritesgroupArray[i].distance = 0;
            }       
        }

        spriteZDistances.sort(function(a,b){return b-a});

        for (var i = 0; i < spriteZDistances.length; i++)
        {
            for (var j = 0; j < this.zspritesgroupArray.length; j++)
            {
                if (this.zspritesgroupArray[j].distance == spriteZDistances[i])
                {
                    
                    this.drawObject(this.zspritesgroupArray[j]);
                }
            }
        }
        
        tflagarray = [];
        
        //this.offscreenObjectsPixels =  this.offscreenObjectsContext.getImageData(0,0,this.backgroundCanvas.width, this.backgroundCanvas.height);

    },

    drawObject: function(zsprite)
    {

        
        

        var yOffset=0;
        var projectedDelta;


        var chkangle = Phaser.Math.Angle.Between(zsprite.x,zsprite.y,this.fPlayerX,this.fPlayerY);
        //var distance = Phaser.Math.Distance.Between(zsprite.x,zsprite.y,this.fPlayerX,this.fPlayerY);

        var pcastArc = this.fPlayerArc;
        var parcrad = this.arcToRad(pcastArc)-Math.PI;
        var diffrad = (chkangle - parcrad);

        if (diffrad<-3)
        {
            diffrad += 2*Math.PI;
        }
        if (diffrad>3)
        {
            diffrad -= 2*Math.PI;
        }

        if (diffrad>0)
        {
            var occ = 160 + (diffrad * 160 / .524);
        }
        else
        {
            var occ = 160 - (-diffrad * 160 / .524);
        }

        

        var targetHit;
        var targetTolerance = 16;
        var bullet_hit_ED = 0;
        for (var i = 0; i < this.bulletsprites.length; i++)
        {            
            if ( Phaser.Math.Fuzzy.Equal(this.bulletsprites[i].x,zsprite.x,targetTolerance) && Phaser.Math.Fuzzy.Equal(this.bulletsprites[i].y,zsprite.y,targetTolerance) )
            {
                var net_bullet_elev = this.bulletsprites[i].base_elevation+this.bulletsprites[i].elevation_delta;            
                var net_sprite_elev = zsprite.base_elevation+zsprite.elevation_delta;
                
                if (Phaser.Math.Fuzzy.Equal(net_bullet_elev,net_sprite_elev,targetTolerance))
                {
                    targetHit=true;
                }                
            }
        }

        // if (!zsprite.flying)
        // {
        //     var current_ED = zsprite.elevation_delta;
        //     zsprite.elevation_delta = zsprite.base_elevation-this.fPlayerElevation;
        // } 
        // else
        // {
            var current_ED = zsprite.elevation_delta;
            var abs_ED = (zsprite.base_elevation+current_ED)-this.fPlayerElevation;
        // }
        
        if ( targetHit && (zsprite.type == 'target') ) 
        {
            zsprite.hitcount++;
            if (zsprite.hitcount>0)
            {
                //var thisexpcolor = zsprite.explosioncolor;
                
                //var thisexpspriteindex = this.explosioncolors.findIndex( function checkColor(_expcolor) { return _expcolor==thisexpcolor});

                
                
                var thisexpsprite = this.explosionsprites[this.expspriteindex];

                this.expspriteindex++;
                if (this.expspriteindex==10) {this.expspriteindex=0}

                // uncomment for custom explosion hue based on target setting otherwise default is used
                //thisexpsprite.color = zsprite.explosioncolor;
                var colors = ['red','green','blue','orange','cyan','violet'];
                thisexpsprite.color = colors[Phaser.Math.Between(0,5)];
                
                ///clear the explosion buffer of any left over pixels from previous use
                var targetIndex=0;  
                var bytesPerPixel=4;    
                for (var y=0; y<explosionsize; y++) 
                {   
                    //console.log("y="+y+" targetIndex="+targetIndex)   
                    for (var x=0; x<explosionsize; x++)  
                    {   
                        thisexpsprite.pixels[targetIndex]=0; 
                        thisexpsprite.pixels[targetIndex+1]=0;   
                        thisexpsprite.pixels[targetIndex+2]=0;   
                        thisexpsprite.pixels[targetIndex+3]=0;   
                        targetIndex+=(bytesPerPixel);       
                    }   
                }   

                

                thisexpsprite.x=zsprite.x;
                thisexpsprite.y=zsprite.y;

                thisexpsprite.active=true;
                thisexpsprite.flying=false;

                thisexpsprite.base_elevation=abs_ED+this.fPlayerElevation;
                
                thisexpsprite.distance=zsprite.distance;
                thisexpsprite.timecheck = game.loop.now;
                //thisexpsprite.numBurstPixels = 10;

                

                for (var i = 0; i < thisexpsprite.numBurstPixels; i++)
                {
                    thisexpsprite.burstpixels[i] = {};

                    thisexpsprite.burstpixels[i].xincr = Phaser.Math.RND.realInRange(-1.5, 1.5);
                    thisexpsprite.burstpixels[i].yincr = Phaser.Math.RND.realInRange(-1.5, 1.5);
                    thisexpsprite.burstpixels[i].xpos = explosionsize/2;
                    thisexpsprite.burstpixels[i].ypos = explosionsize/2;
                }

                //this.zspritesgroup.remove(zsprite);
                zsprite.hitcount = 0;
                zsprite.active = false;
                //this.zspritesgroup.add(thisexpsprite);

            }
            
            
            
        }
         
        
    
        

   




        if (zsprite.animated)
        {
            var projectedObjectHeight=zsprite.buffer.height*this.fPlayerDistanceToTheProjectionPlane/zsprite.distance;
            var projectedObjectWidth=zsprite.framewidth*this.fPlayerDistanceToTheProjectionPlane/zsprite.distance;

            // if (abs_ED)
            // {

                var projected_ed = abs_ED*(projectedObjectHeight/zsprite.buffer.height);
            // }
            // else
            // {
            //     var projected_ed = 0;
            // }
            var bottomOfObject = Math.floor(this.fProjectionPlaneYCenter+(projectedObjectHeight*0.5)-projected_ed);
            var topOfObject = Math.floor(this.fProjectionPlaneYCenter-(projectedObjectHeight*0.5)-projected_ed);



            // if (projectedObjectHeight>200)
            // {
            //     var yd1 = (200*zsprite.buffer.height/projectedObjectHeight);
            //     var yd2 = (.5*(zsprite.buffer.height-yd1));

            //     projectedDelta = (bottomOfObject-topOfObject);

            //     topOfObject=0;
            //     //bottomOfObject=topOfObject+projectedObjectHeight;

            //     yOffset = Math.floor(yd2); 
            // }
            // else
            // {
                projectedDelta = null;
                yOffset = 0;
            // }




            for (var i=0;i<projectedObjectWidth;i++)
            {
                var calcColumn = Math.floor(occ-projectedObjectWidth/2)+i;

                if (zsprite.distance<savedColumnDistances[calcColumn])
                {
                    var imgstep = zsprite.framewidth/projectedObjectWidth;
                    var frameoffset = zsprite.frameindex*zsprite.framewidth;
                
                    // this.offscreenObjectsContext.drawImage(zsprite.img, Math.floor(i*imgstep)+frameoffset, 0, 
                    // 1, zsprite.img.height, 
                    // calcColumn, topOfObject, 1, (bottomOfObject-topOfObject)+1);
                    //
                    var brightness;
                    if (targetHit) {brightness=1.0} else {brightness=1.0}
                    this.drawObjectSlice(zsprite,calcColumn,topOfObject,1,(bottomOfObject-topOfObject),Math.floor(i*imgstep)+frameoffset,frameoffset, yOffset, projectedDelta, brightness);                    
                }
            }
            
            if (game.loop.now> zsprite.animationtimecheck+zsprite.frametimer)
            {
                zsprite.animationtimecheck = game.loop.now;
                zsprite.frameindex++;
            }
            

            if (zsprite.frameindex == zsprite.numframes)
            {
                zsprite.frameindex = 0;
            }
        }

        else
        {
            var projectedObjectHeight=zsprite.buffer.height*this.fPlayerDistanceToTheProjectionPlane/zsprite.distance;
            var projectedObjectWidth=zsprite.buffer.width*this.fPlayerDistanceToTheProjectionPlane/zsprite.distance;

            // if (abs_ED)
            // {
                var projected_ed = abs_ED*(projectedObjectHeight/zsprite.buffer.height);
            //     var saved_ed = abs_ED;
            // }
            // else
            // {
            //     var projected_ed = 0;
            //     var saved_ed = 0;
            // }
            var bottomOfObject = Math.floor(this.fProjectionPlaneYCenter+(projectedObjectHeight*0.5)-projected_ed);
            var topOfObject = Math.floor(this.fProjectionPlaneYCenter-(projectedObjectHeight*0.5)-projected_ed);

            // if (projectedObjectHeight>200 && topOfObject<0)
            // {
                
            //     var pp_delta = Math.floor(this.PROJECTIONPLANEHEIGHT/2 - this.fProjectionPlaneYCenter);                
            //     var abs_pp_delta = Math.abs(pp_delta);
            //     var adj_pp_delta = Math.floor(this.fTanTable[abs_pp_delta]*zsprite.distance);

            //     var yd1 = (200*zsprite.buffer.height/projectedObjectHeight);
            //     var yd2 = (.5*(zsprite.buffer.height-yd1));
                
            //     projectedDelta = (bottomOfObject-topOfObject);              
                
            //     topOfObject=0;

            //     yOffset = Math.floor(yd2+abs_ED); 
            // }
            // else
            // {
                projectedDelta = null;
                yOffset = 0;
            // }
            

// var debugt = [];

// debugt.push('sprite ht: '+ zsprite.img.height );
// debugt.push('sprite proj.ht: '+ projectedObjectHeight );
// debugt.push('sprite elev: '+ zsprite.elevation_delta );
// debugt.push('sprite proj.ed: '+ projected_ed );
// debugt.push('sprite saved.ed: '+ saved_ed );

// debugt.push('yd0: '+ yd0 );
// debugt.push('yd1: '+ yd1 );
// debugt.push('yd2: '+ yd2 );

// debugt.push('fps: '+ this.sys.game.loop.actualFps.toString() );

// debug.setText(debugt);


            for (var i=0;i<projectedObjectWidth;i++)
            {
                var calcColumn = Math.floor(occ-projectedObjectWidth/2)+i;

                if (zsprite.distance<savedColumnDistances[calcColumn])
                {
                    var imgstep = zsprite.buffer.width/projectedObjectWidth;
                
                    // this.offscreenObjectsContext.drawImage(zsprite.img, Math.floor(i*imgstep), 0, 
                    // 1, zsprite.img.height, 
                    // calcColumn, topOfObject, 1, (bottomOfObject-topOfObject)+1);
                    var brightness;
                    if (targetHit) {brightness=1.0} else {brightness=1.0}

                    this.drawObjectSlice(zsprite,calcColumn,topOfObject,1,(bottomOfObject-topOfObject),Math.floor(i*imgstep),0, yOffset, projectedDelta, brightness);                    
                }
            } 
        }
                   
    },
    drawObjectSlice: function(zsprite, x, y, width, height, xOffset, frameoffset, yOffset, projectedDelta, brightnessLevel)
    {       
        //console.log("this.fWallTextureBuffer="+this.fWallTextureBuffer);
        //var xOffset=x%this.fWallTexture.width;    // wrap the image position
        
        // wait until the texture loads
        if (zsprite.buffer==undefined)
            return;
        
        var dy=height;
        x=Math.floor(x);
        y=Math.floor(y);

        xOffset=Math.floor(xOffset);
        var bytesPerPixel=4;
        
        var sourceIndex=(bytesPerPixel*xOffset) + (zsprite.buffer.width*bytesPerPixel)*yOffset;
        var lastSourceIndex=sourceIndex+(zsprite.buffer.width*zsprite.buffer.height*bytesPerPixel);
        
        var targetIndex=(this.offscreenCanvasPixels.width*bytesPerPixel)*y+(bytesPerPixel*x);
        


        var heightToDraw = height;
        // clip bottom
        if (y+heightToDraw>this.offscreenCanvasPixels.height)
            heightToDraw=this.offscreenCanvasPixels.height-y;




        var yError=0;   
        

        // we need to check this, otherwise, program might crash when trying
        // to fetch the shade if this condition is true (possible if height is 0)
        if (heightToDraw<0)
            return;

        while (true)
        {                     
            // if error < actualHeight, this will cause row to be skipped until
            // this addition sums to scaledHeight
            // if error > actualHeight, this ill cause row to be drawn repeatedly until
            // this addition becomes smaller than actualHeight
            // 1) Think the image height as 100, if percent is >= 100, we'll need to
            // copy the same pixel over and over while decrementing the percentage.  
            // 2) Similarly, if percent is <100, we skip a pixel while incrementing
            // and do 1) when the percentage we're adding has reached >=100
            if (projectedDelta) 
            {
                yError += projectedDelta;
            }
            else
            {
                yError += height;
            }
                                                 
    
            var red=Math.floor(zsprite.pixels[sourceIndex]*brightnessLevel);
            var green=Math.floor(zsprite.pixels[sourceIndex+1]*brightnessLevel);
            var blue=Math.floor(zsprite.pixels[sourceIndex+2]*brightnessLevel);
            var alpha=Math.floor(zsprite.pixels[sourceIndex+3]);
            
            // while there's a row to draw & not end of drawing area
            while (yError>=zsprite.buffer.height)
            {                  
                yError-=zsprite.buffer.height;

                if (alpha!=0)
                {
                    this.offscreenCanvasPixels.data[targetIndex]=red;
                    this.offscreenCanvasPixels.data[targetIndex+1]=green;
                    this.offscreenCanvasPixels.data[targetIndex+2]=blue;
                    //this.offscreenCanvasPixels.data[targetIndex+3]=alpha;
                }


                targetIndex+=(bytesPerPixel*this.offscreenCanvasPixels.width);
                // clip bottom (just return if we reach bottom)
                heightToDraw--;
                if (heightToDraw<1)
                    return;
            } 
            sourceIndex+=(bytesPerPixel*zsprite.buffer.width);
            if (sourceIndex>lastSourceIndex)
                sourceIndex=lastSourceIndex;            
        }

    },  

});

// var debugt = [];
//         debugt.push('obj castcolum: '+ Math.floor(occ) );
//         debugt.push('obj distance: '+ distance );
//         debugt.push('savedColumnDistance: '+ savedColumnDistances[Math.floor(occ)] );
//         debug.setText(debugt);

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 320,
    height: 200,
    transparent: true,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 0 },
            debug: false
        }
    },

    input: {
        gamepad: true
    },
    scale: {
        mode: Phaser.Scale.EXACT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 200
    },
    audio: {
        disableWebAudio: true
    },
    scene: [Menu, Demo]
};

var game = new Phaser.Game(config);

var file_thumbs = [];
var touchActivated;

var keys;
var gamepad;
var cursors;

var skyRect;
var groundRect;
var mainBackgroundImage;

var cont;
var UICam;
var debug;

var savedColumnDistances=[];
var tflagarray=[];
//var targetsnearcenterarray=[];
var targetData={};
var explosionspritesArray=[];
var explosionsize;
var objectGangs = ['flybugs','flowers','pinkblobs','frogs','redwings','ufos','balls'];




var guide_multi_activeY;
var guide_multi;
var guide_zspeed;
var guide_left;
var guide_right;
var guide_forward;
var guide_back;
var guide_up;
var guide_down;
var guide_shoot;

var gLeft = false;
var gRight = false;
var gForward = false;
var gBack = false;
var gStrafe = false;
var gShoot = false;



var map3=
                            'WOOOOOOOOOOW'+
                            'WOOOOOOOOOOW'+
                            'WOOOOOOOOOOW'+
                            'OOOOOOOOOOOO'+
                            'OOOOOOOOOOOO'+
                            'OOOOOOOOOOOO'+
                            'OOOOOOOOOOOO'+
                            'WOOOOOOOOOOW'+
                            'WOOOOOOOOOOW'+
                            'WOOOOOOOOOOW'+
                            'OOOOOOOOOOOO'+
                            'OOOOOOOOOOOO'+
                            'OOOOOOOOOOOO'+
                            'WOOOOOOOOOOW'+
                            'WOOOOOOOOOOW'+
                            'WOOOOOOOOOOW'+
                            'OOOOOOOOOOOO'+
                            'WOOOOOOOOOOW'+
                            'WOOOOOOOOOOW'+
                            'WOOOOOOOOOOW'; 





guideInputHorizontalData = [
".........22.....",
"........222.....",
".......2222.....",
"......22222.....",
".....222222.....",
"....2222222.....",
"...22222222.....",
"..222222222.....",
"..222222222.....",
"...22222222.....",
"....2222222.....",
".....222222.....",
"......22222.....",
".......2222.....",
"........222.....",
".........22....."
];


guideInputVerticalData = [
"................",
"................",
".......22.......",
"......2222......",
".....222222.....",
"....22222222....",
"...2222222222...",
"..222222222222..",
".22222222222222.",
"2222222222222222",
"2222222222222222",
"................",
"................",
"................",
"................",
"................"
];

var backgroundList = [
'20220825_093450.jpg',
'20220825_093547.jpg',
'20220825_093613.jpg',
'20220825_093623.jpg',
'20220825_093631.jpg',
'20220825_093731.jpg',
'20220825_093946.jpg',
'20220825_094319.jpg',
'20220825_094327.jpg',
'20220825_094335.jpg',
'20220825_094349.jpg',
'20220825_094751.jpg',
'20220825_094833.jpg',
'20220825_095856.jpg',
'20220825_100059.jpg',
'20220825_100706.jpg',
'20220825_100732.jpg'

];

var floorList = [

'tile42.png',
'tile1.jpg',
'spinObj_04.png',
'green.png',
'floortile.png',
'pineapple.png',
'mushroom.png',
'leaf1.png',
'leaf2.png'
];

var wallList = [

'20220814_213728.jpg',
'20220821_202334.jpg',
'20220821_202337.jpg',
'20220825_094138.jpg',
'20220825_094210.jpg',
'20220825_094443.jpg',
'20220825_094638.jpg',
'20220825_101052.jpg',
'20220825_101514.jpg',
'20220825_101822.jpg',
'20220825_102033.jpg',
'20220825_103717.jpg',
'20220825_103735.jpg',
'20220825_103808.jpg',
'20220825_103814.jpg',
'20220825_165313.jpg'

];

// 'xvevvbz66j761.png',
// 'backscroll2.png',
// 'backscroll3.png',
// 'deep-space.jpg',
// 'shadow-of-the-beast2-karamoon.png',
// '20210413_172913.jpg',
// '20220326_073008.jpg',
// '20220404_081108.jpg',
// '20220814_204402.jpg',
// '20220814_212339.jpg',
// '20220814_212343.jpg',
// '20220814_212346.jpg',
// '20220814_212353.jpg',
// '20220814_212403.jpg',
// '20220814_212406.jpg',
// '20220814_212409.jpg',
// '20220814_212412.jpg',
// '20220814_212439.jpg',
// '20220814_212506.jpg',
// '20220814_213632.jpg',
// '20220815_170808.jpg',
// '20220815_170835.jpg',
// '20220815_175751.jpg',
// '20220815_175759.jpg',
// '20220815_175803.jpg',
// '20220815_175922.jpg',
// '20220816_070717.jpg',
// '20220817_211224.jpg',
// '20220817_211848.jpg',
// '20220818_161957.jpg',
// '20220819_211447.jpg',
// '20220821_201353.jpg',
// '20220821_202111.jpg',
// '20220821_202159.jpg',
// '20220821_203146.jpg',
// '20220821_203237.jpg',
// '20220823_072928.jpg',
// '20220825_093300.jpg',
// '20220825_093305.jpg',
// '20220825_093322.jpg',
// '20220825_093352.jpg',
// '20220825_093412.jpg',
// '20220825_093450.jpg',
// '20220825_093547.jpg',
// '20220825_093613.jpg',
// '20220825_093623.jpg',
// '20220825_093631.jpg',
// '20220825_093731.jpg',
// '20220825_093946.jpg',
// '20220825_094319.jpg',
// '20220825_094327.jpg',
// '20220825_094335.jpg',
// '20220825_094349.jpg',
// '20220825_094751.jpg',
// '20220825_094833.jpg',
// '20220825_095856.jpg',
// '20220825_100059.jpg',
// '20220825_100706.jpg',
// '20220825_100732.jpg',
// '20220825_101325.jpg',
// '20220825_101428.jpg',
// '20220825_101929.jpg',
// '20220825_102130.jpg',
// '20220825_102136.jpg',
// '20220825_102143.jpg',
// '20220825_102213.jpg',
// '20220825_102343.jpg',
// '20220825_102424.jpg',
// '20220825_102813.jpg',
// '20220825_102823.jpg',
// '20220825_105049.jpg',
// '20220825_165500.jpg',
// '20220827_151555.jpg',
// '20220827_151601.jpg'


// 'wallv.png',
// 'wallq.png',
// 'walls.png',
// 'wallw.png',
// 'wallc.png',
// 'mana_card.png',
// 'wallg.png',
// '20220814_213728.jpg',
// '20220821_202334.jpg',
// '20220821_202337.jpg',
// '20220825_094138.jpg',
// '20220825_094210.jpg',
// '20220825_094443.jpg',
// '20220825_094638.jpg',
// '20220825_101052.jpg',
// '20220825_101514.jpg',
// '20220825_101822.jpg',
// '20220825_102033.jpg',
// '20220825_103717.jpg',
// '20220825_103735.jpg',
// '20220825_103808.jpg',
// '20220825_103814.jpg',
// '20220825_165313.jpg',
// 'cokecan.png',
// 'd3n85n.jpg',
// 'leaf3.png',
// 'master.png',
// 'treasure_trap.png'

// 'viletsquare.png',
// 'tile7.png',
// 'tile41.png',
// 'tile43.png',
// 'tile42.png',
// 'tile1.jpg',
// 'spinObj_04.png',
// 'green.png',
// 'floortile.png',
// 'pineapple.png',
// 'mushroom.png',
// 'leaf1.png',
// 'leaf2.png'
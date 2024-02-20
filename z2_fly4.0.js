

var backgroundList = [

'20220814_212439.jpg',
'20220814_212353.jpg',
'20210413_172913.jpg',
'20220326_073008.jpg',
'20220404_081108.jpg',
'20220814_204402.jpg',
'20220814_212339.jpg',
'20220814_212343.jpg',
'20220814_212346.jpg',

'20220814_212403.jpg',
'20220814_212406.jpg',
'20220814_212409.jpg',
'20220814_212412.jpg',

'20220814_212506.jpg',
'20220814_213632.jpg',
'20220815_170808.jpg',
'20220815_170835.jpg',
'20220815_175751.jpg',
'20220815_175759.jpg'

];

var floorList = [
'SNES_Choco_Island_2.png',
'SNES_Mario_Circuit_2.png',
'20220814_212353.jpg',
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

'transparent64x64.png',
'20220825_101822.jpg',
'20220821_202334.jpg',
'20220821_202337.jpg',
'20220825_094138.jpg',
'20220825_094210.jpg',
'20220825_094443.jpg',
'20220825_094638.jpg',
'20220825_101052.jpg',
'20220825_101514.jpg',


];

var wallData = [

{'height':64,'width':64},
{'height':200,'width':64},
{'height':64,'width':64},
{'height':220,'width':64},
{'height':180,'width':64},
{'height':300,'width':64},
{'height':220,'width':64},
{'height':64,'width':64},
{'height':64,'width':64},
{'height':64,'width':64}

];

var objectList = [


'flybug_anim_52x34x3.png',
'octo_anim_29x27x4.png',
'cydrone_anim_20x26x4.png',
'ufo_anim_29x26x40.png',

'frog_anim_26x24x23.png',
'pinkblob_anim_28x32x12.png',
'redwing_anim_32x24x4.png',


'red_ball.png',
'purple_ball.png',
'yellow_ball.png',
'ball1.png',
'ball2.png',
'ball3.png',
'ball4.png',
'fern1.png',
'fern2.png',
'fern3.png',
'fern4.png',
'fern5.png',
'fern6.png',
'fern7.png',
'fern8.png',
'flower1.png',
'flower2.png',
'flower3.png',
'flower4.png',
'flower5.png',
'flower6.png',
'flower7.png',
'flower8.png',
'rock1.png',
'rock2.png',
'rock3.png',
'rock4.png',
'rock5.png',
'rock6.png',
'rock7.png',
'rock8.png',
'tree1.png',
'tree2.png',
'tree3.png',
'tree4.png',
'tree5.png',
'tree6.png',
'tree7.png',
'tree8.png',
'tree9.png',
'tree10.png',
'tree11.png',
'tree12.png',
'tree13.png',
'tree14.png',
'tree15.png',
'tree16.png',
'gem1.png',
'gem2.png',
'gem3.png',
'gem4.png',
'gem5.png',
'gem6.png',
'plant1.png',
'plant2.png',
'plant3.png',
'plant4.png',
'plant5.png',
'plant6.png',
'shroom1.png',
'shroom2.png',
'shroom3.png',
'shroom4.png'


];





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
        // // load audio assets

        // this.load.audioSprite('sfx', 'audio/horizon6_sounds.json', [
        // 'audio/horizon6_sounds.ogg',
        // 'audio/horizon6_sounds.mp3'
        // ]);

        // this.load.audio('theme', [
        // 'audio/tdujam_000.ogg',
        // 'audio/tdujam_000.mp3'
        // ]);
        

        // load gui assets

        this.load.spritesheet('flybug', 'gui/fly1_sheet1.png',{ frameWidth: 52, frameHeight: 34 });

        this.load.image('Afterburner', 'gui/Afterburner (Sega).png');

        this.load.image('Major Title', 'gui/Major Title (IREM).png');

        this.load.image('mousekeys_icon', 'gui/mousekeys_icon.png');
        this.load.image('touch_icon', 'gui/touch_icon.png');
        this.load.image('gamepad_icon', 'gui/gamepad_icon.png');        


        // load game assets

        for (var i = 0; i < backgroundList.length; i++)
        {
            this.load.image(backgroundList[i], 'backgrounds/'+backgroundList[i]);
        }

        for (var j = 0; j < wallList.length; j++)
        {
            this.load.image(wallList[j], 'walls/'+wallList[j]);
        }

        for (var k = 0; k < floorList.length; k++)
        {
            this.load.image(floorList[k], 'floors/'+floorList[k]);    
        }

        for (var h = 0; h < objectList.length; h++)
        {
            this.load.image(objectList[h], 'objects/'+objectList[h]);
        }







        
        loadfile_index = 0;

        var progress = this.add.graphics().setDepth(99);

        var text = this.add.text(10, 50, '(debug text)', { font: '10px Courier', fill: '#00ff00' });
        var text2 = this.add.text(10, 72, '(debug text)', { font: '10px Courier', fill: '#00ff00' });
        

        this.load.on('progress', function (value) {
            text.setText('loading...'+Math.floor(100*value)+'%');
            progress.clear();
            progress.fillStyle(0x33ff04, 1);
            progress.fillRect(0, 40, 320 * value, 10);
        });
        
        this.load.on('fileprogress', function (file,value) {
            //text.setText(Math.floor(100*value)+'%');          
            text2.setText(file.key);            
            // text3.setText(value);
            // progress.clear();
            // progress.fillStyle(0x00cc11, 1);
            // progress.fillRect(0, 0, 320 * value, 5);            
        });

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
        file_thumbs[loadfile_index] = this.add.image(10+20*(loadfile_index%16), 80+20, key).setDisplaySize(20, 20);
        

        
        loadfile_index++;

        if (key=='Major Title')
        {
            var config3 = {
            image: 'Major Title',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            offset: {y:0}
            };

            this.cache.bitmapFont.add('ab_headtext', Phaser.GameObjects.RetroFont.Parse(this, config3));

            hsv = Phaser.Display.Color.HSVColorWheel();

            var text0 = this.add.dynamicBitmapText(0, 0, 'ab_headtext', 'DragonFLY').setOrigin(0).setScale(1).setPosition(4,4).setDepth(200);
            var text1 = this.add.dynamicBitmapText(0, 0, 'ab_headtext', '          Engine').setOrigin(0).setScale(1).setPosition(4,4).setDepth(200);
            var text2 = this.add.dynamicBitmapText(0, 0, 'ab_headtext', 'v 0.4 demo').setOrigin(0).setScale(1).setPosition(4,14).setDepth(200);

            text0.setDisplayCallback(this.textCallback);
        } 
    },

    textCallback: function (data) 
    {


        data.tint.topLeft = hsv[Math.floor(i)].color;
        

        i += 0.5;

        if (i >= hsv.length)
        {
            i = 0;
        }
        // data.parent.alpha -= .0005;
        // if (data.parent.alpha<.5) data.parent.alpha=1.0;
        //console.log(data);
        

        return data;
    },
    
    
    create: function ()
    {
        startFlag=false;

        
        this.textures.generate('chunk3', { data: ['3'], pixelWidth: 1});

        

        bgimg = this.add.image(0,0,'chunk3').setAlpha(.25).setOrigin(0).setDisplaySize(320,200).setDepth(0);


        //  animated sprite set up for 2d display purpose 
            //  must be loaded as .spritesheet with frame params and added as .sprite
            var randomKey3 = Math.random().toString();

            this.anims.create({
                key: randomKey3,
                frames: this.anims.generateFrameNumbers('flybug'),
                frameRate: 60,
                repeat: -1
                //yoyo: true
            });

        
            var flysprite = this.add.sprite(280, 10, 'flybug').play(randomKey3).setOrigin(0).setScale(.5);

            this.tweens.add({
                targets: flysprite,
                y: 30,
                ease: 'Sine.easeInOut',
                duration: 600,
                yoyo: true,
                repeat: -1
            });

       

        var config2 = {
            image: 'Afterburner',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:40}
        };

        var config1 = {
            image: 'Afterburner',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:24}
        };

        this.cache.bitmapFont.add('Afterburner', Phaser.GameObjects.RetroFont.Parse(this, config2));
        this.cache.bitmapFont.add('Afterburner1', Phaser.GameObjects.RetroFont.Parse(this, config1));

        var text1 = this.add.dynamicBitmapText(0, 0, 'Afterburner', " PLAY keyboard mouse \n ").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,70).setDepth(100);
        var text2 = this.add.dynamicBitmapText(0, 0, 'Afterburner1', " PLAY touchscreen \n ").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,120).setDepth(100);
        text3 = this.add.dynamicBitmapText(0, 0, 'Afterburner', " PLAY gamepad \n ").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,170).setDepth(100);
        
        this.add.sprite(160, 70, 'mousekeys_icon').setOrigin(.5,0).setScale(1);   
        this.add.sprite(160, 120, 'touch_icon').setOrigin(.5,0).setScale(1);   
        this.add.sprite(160, 170, 'gamepad_icon').setOrigin(.5,0).setScale(1);   
        
        var hitarea1 = this.add.rectangle(text1.x, text1.y, text1.width + 20, text1.height + 16, 0x00ff00, 0.25).setInteractive();
        var hitarea2 = this.add.rectangle(text2.x, text2.y, text2.width + 20, text2.height + 16, 0xff00ff, 0.25).setInteractive();
        var hitarea3 = this.add.rectangle(text3.x, text3.y, text3.width + 20, text3.height + 16, 0x00ffff, 0.25).setInteractive();


        hitarea1.on('pointerup', function () {
             
            sound_enabled = true;

            //this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = false;


            // music = this.sound.add('theme');
            // music.play({loop: true});

            text4 = this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'get ready!').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(160,100).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        hitarea2.on('pointerup', function () {

            sound_enabled = true;

            //this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = true;

            // music = this.sound.add('theme');
            // music.play({loop: true});

            text4 = this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'get ready!').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(160,100).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        hitarea3.on('pointerup', function () {

            sound_enabled = true;

            //this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = false;

            // music = this.sound.add('theme');
            // music.play({loop: true});

            text4 = this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'get ready!').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(160,100).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        
        this.input.gamepad.once('down', function (pad, button, index) {

        //text_gamepad.setText('Playing with ' + pad.id + ' index: ' + pad.index);

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        //this.scale.startFullscreen();

        touchActivated = false;

        text4 = this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'get ready!').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(160,100).setDepth(100);
        startFlag=true;//this.scene.start('demo');

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
        
        //console.log(i);
        var ml = hsv.length-1;
        var a = hsv[Math.floor(hsvindex)].color;
        var b = hsv[ml-Math.floor(hsvindex)].color;
        var c = hsv[ml-Math.floor(hsvindex)].color;
        var d = hsv[Math.floor(hsvindex)].color;
        hsvindex += 1.25;

        if (hsvindex >= hsv.length)
        {
            hsvindex = 0;
        }

        bgimg.setTintFill(a,b,c,d);



        if (startFlag)
        {
            this.scene.start('demo');
        }        
        else if (this.input.gamepad.total === 0)// exit update loop if no gamepad detected
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
        
        text3.setText("\\ PLAY (gamepad) \\\n-press any button-");

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
        this.MAP_WIDTH=40;
        this.MAP_HEIGHT=40; 
        
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
        this.gamedisplayCanvas = this.textures.createCanvas('gamedisplaycanvas', 320, 200);

        //     This code uses a regular dom canvas created in css/html
        // this.gamedisplayCanvas = document.getElementById("gameCanvas");


        this.gamedisplay_context = this.gamedisplayCanvas.getContext('2d', {willReadFrequently:true});

        // to accomodate camera tilting for flying the main projected image has to be scaled (larger) and shifted (left/up)

        if (tilt_mode)
        {
            gamedisplayImage = this.add.image(160,100,'gamedisplaycanvas').setOrigin(.5).setScale(1.17);
        }
        else 
        {
            gamedisplayImage = this.add.image(160,100,'gamedisplaycanvas').setOrigin(.5);

        }
        
        // create the offscreen buffer (canvas)
        this.offscreenCanvas = this.textures.createCanvas('offscreencanvas', 320, 200); //document.createElement('canvas');
        this.offscreenCanvasContext = this.offscreenCanvas.getContext('2d', {willReadFrequently:true});
        this.offscreenCanvasPixels =  this.offscreenCanvasContext.getImageData(0,0,this.gamedisplayCanvas.width, this.gamedisplayCanvas.height);

        
           
        
        


        this.wall = [];
        for (var i = 0; i < wallList.length; i++)
        {
            var imagekey = wallList[i];
                
            this.wall[i] = {};

            this.wall[i].srcimg = this.textures.get(imagekey).getSourceImage();
            this.wall[i].buffer = this.textures.createCanvas('wallcanvas'+i, wallData[i].width, wallData[i].height);
            this.wall[i].context = this.wall[i].buffer.getContext('2d', {willReadFrequently:true});
            this.wall[i].context.drawImage(this.wall[i].srcimg, 0,0,this.wall[i].srcimg.width,this.wall[i].srcimg.height,0,0,wallData[i].width, wallData[i].height);
            var imageData = this.wall[i].context.getImageData(0, 0, wallData[i].width, wallData[i].height);
            this.wall[i].pixels = imageData.data;

            this.wall[i].waveData = Phaser.Math.SinCosTableGenerator(256, 3, 3, 32);

            this.wall[i].burstpixels = [];
            for (var j = 0; j < 800; j++)
            {
                this.wall[i].burstpixels[j] = {};
                this.wall[i].burstpixels[j].xincr = 0;//Phaser.Math.RND.realInRange(-1, 1);
                this.wall[i].burstpixels[j].yincr = Phaser.Math.RND.realInRange(-.25, -4.5);
                this.wall[i].burstpixels[j].xpos = Phaser.Math.Between(0,wallData[i].width);
                this.wall[i].burstpixels[j].ypos = Phaser.Math.Between(0,wallData[i].height);
                this.wall[i].burstpixels[j].timecheck = 0;
                this.wall[i].burstpixels[j].switchtime = Phaser.Math.Between(300,1000);
            }
        }

        this.floor = [];
        this.floor.defaultIndex = 0;
        this.floor.currentIndex = 0;
        for (var i = 0; i < 1; i++)
        {
            var imagekey = floorList[i];
                
            this.floor[i] = {};

            this.floor[i].srcimg = this.textures.get(imagekey).getSourceImage();
            this.floor[i].buffer = this.textures.createCanvas('floorcanvas'+i, 2560, 2560);
            this.floor[i].context = this.floor[i].buffer.getContext('2d', {willReadFrequently:true});
            this.floor[i].context.drawImage(this.floor[i].srcimg, 0,0,this.floor[i].srcimg.width,this.floor[i].srcimg.height, 0, 0, 2560, 2560);
            var imageData = this.floor[i].context.getImageData(0, 0, 2560, 2560);
            this.floor[i].pixels = imageData.data;
        }

        this.background = [];
        this.background.defaultIndex = 0;
        this.background.currentIndex = 0;
        for (var i = 0; i < 1; i++)
        {
            var imagekey = backgroundList[i];
                
            this.background[i] = {};

            this.background[i].ImageArc = 0;
            
            this.background[i].width = 960;
            this.background[i].height = 600;
            this.background[i].yoffset = 150;

            this.background[i].srcimg = this.textures.get(imagekey).getSourceImage();
            this.background[i].buffer = this.textures.createCanvas('backgroundcanvas'+i, this.background[i].width, this.background[i].height);
            this.background[i].context = this.background[i].buffer.getContext('2d', {willReadFrequently:true});
            this.background[i].context.drawImage(this.background[i].srcimg, 0,0,this.background[i].srcimg.width,this.background[i].srcimg.height,0,0,this.background[i].width, this.background[i].height);
            var imageData = this.background[i].context.getImageData(0, 0, this.background[i].width, this.background[i].height);
            this.background[i].imagedata = imageData;
            this.background[i].pixels = imageData.data;

            this.background[i].waveData = Phaser.Math.SinCosTableGenerator(256, 3, 3, 32);
        }




        // player shooting settings
        this.shotIndex = 0;// index for bullet sprite objects
        this.num_bullets=10;
        this.shot_saved_timecheck = 0;


        // index for explosion sprite objects
        this.expspriteindex = 0;

        //total set of objects that can be drawn
        this.zspritesgroup = this.add.group();
        this.zspritesgroupArray = this.zspritesgroup.getChildren();

        // worker variables for creating game objects/sprites
        var thisContext = this;
        var a_zsprite;



        // all enemy bullets
        this.enemybulletsprites = [];

        // player bullets
        this.bulletsprites = [];

        
        for (var i = 0; i < this.num_bullets; i++)
        {
            this.bulletsprites[i] = this.add.image();
            this.bulletsprites[i].img = this.textures.get('red_ball.png').getSourceImage();

            var randomKey = Math.random().toString();
            this.bulletsprites[i].buffer = this.textures.createCanvas(randomKey, this.bulletsprites[i].img.width, this.bulletsprites[i].img.height);
            this.bulletsprites[i].buffer.context = this.bulletsprites[i].buffer.getContext('2d', {willReadFrequently:true});
            this.bulletsprites[i].buffer.context.drawImage(this.bulletsprites[i].img, 0, 0);        
            var imageData = this.bulletsprites[i].buffer.context.getImageData(0, 0, this.bulletsprites[i].img.width, this.bulletsprites[i].img.height);
            this.bulletsprites[i].pixels = imageData.data;

            this.bulletsprites[i].type = 'bullet';
            this.bulletsprites[i].dx = 0;
            this.bulletsprites[i].dy = 0;
            this.bulletsprites[i].pp_delta = 0;
            this.bulletsprites[i].distance = 0;

            // using .elevation_delta to make sure unpositioned redraws happen offscreen
            this.bulletsprites[i].elevation_delta = -100;
            this.bulletsprites[i].base_elevation = 0;

            this.bulletsprites[i].animated = false;
            this.bulletsprites[i].inplay = false;
            this.bulletsprites[i].currentMapIndex = 0;

            this.bulletsprites[i].move = function() 
            {
                // the cannon relative to the player center view
                var shooterOffset = -14;
                var vert_look_range = 80;
                
                //var pp_delta = Math.floor(thisContext.PROJECTIONPLANEHEIGHT/2 - thisContext.fProjectionPlaneYCenter);
                var abs_pp_delta = Math.abs(this.pp_delta);
                var new_elev_delta = Math.floor(thisContext.fTanTable[abs_pp_delta]*this.distance);

                if (this.pp_delta<0)
                {
                    new_elev_delta *= -1;
                }


                var adj_pp_delta = this.pp_delta/vert_look_range*shooterOffset;

                this.elevation_delta = shooterOffset+adj_pp_delta-new_elev_delta;
                
                this.x+=this.dx; 
                this.y+=this.dy;
                if (this.x<0 || this.x>thisContext.MAP_WIDTH*thisContext.TILE_SIZE || this.y<0 || this.y>thisContext.MAP_HEIGHT*thisContext.TILE_SIZE || this.distance>1500) 
                {
                    // using .elevation_delta to make sure unpositioned redraws happen offscreen
                    this.elevation_delta = -100;
                    this.inplay = false; 
                    
                }



                // CHECK COLLISION AGAINST WALLS
                // compute cell position


                var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
                var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

                // compute position relative to cell (ie: how many pixel from edge of cell)
                var playerXCellOffset = this.x % thisContext.TILE_SIZE;
                var playerYCellOffset = this.y % thisContext.TILE_SIZE;

                var minDistanceToWall=20;
                
                // bullet wall detect and remove
                //
                if (this.dx>0)
                {
                    // moving right
                    if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
                        (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
                    {
                        // remove sprite
                        this.inplay = false;
                        this.elevation_delta = -100;
                    }               
                }
                else
                {
                    // moving left
                    if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
                        (playerXCellOffset < (minDistanceToWall)))
                    {
                        // remove sprite
                        this.inplay = false;
                        this.elevation_delta = -100;
                    } 
                } 

                if (this.dy<0)
                {
                    // moving up
                    if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
                        (playerYCellOffset < (minDistanceToWall)))
                    {
                        // remove sprite
                        this.inplay = false;
                        this.elevation_delta = -100;
                    }
                }
                else
                {
                    // moving down                                  
                    if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
                        (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
                    {
                        // remove sprite
                        this.inplay = false;
                        this.elevation_delta = -100;
                    }
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

            

            this.explosionsprites[j] = this.add.image();

            this.explosionsprites[j].type = 'explosion';

            

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
                
                

                //for timeout self-destruct 
                
                if (game.loop.now > this.timecheck + this.duration)
                {
                    this.inplay = false;
                    
                }

                
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
                    

                    thispixel.ypos += thispixel.yincr;
                    
                           
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

            
            this.zspritesgroup.add(this.explosionsprites[j]);
        }
    
    






        

        






    
        this.portal = this.add.image();

        this.portal.p_index = 0;

        this.portal.buffer = this.textures.createCanvas('portaldisplaycanvas', 64, 64);
        this.portal.context = this.portal.buffer.getContext('2d', {willReadFrequently:true});
        
        this.portal.imagedata = this.portal.context.getImageData(0, 0, 64, 64);
        this.portal.pixels = this.portal.imagedata.data;



        
        //portal image source
        this.portal.sphereTexture = this.textures.get(backgroundList[0]).getSourceImage();
        this.portal.sphereTextureBuffer = this.textures.createCanvas('portalimagecanvas', this.portal.sphereTexture.width, this.portal.sphereTexture.height);
        this.portal.sphereTexture_context = this.portal.sphereTextureBuffer.getContext('2d', {willReadFrequently:true});
        this.portal.sphereTexture_context.drawImage(this.portal.sphereTexture, 0, 0);
        this.portal.sphereTexture_imagedata = this.portal.sphereTexture_context.getImageData(0, 0, this.portal.sphereTexture.width, this.portal.sphereTexture.height);
        this.portal.sphereTexturePixels = this.portal.sphereTexture_imagedata.data;


        this.portal.src_vert_scope = this.portal.sphereTexture.height/16;


        //portal properties
        this.portal.width = 64;
        this.portal.height = 64;

        this.portal.rotation = 0;
        this.portal.s_distance = 0;

        this.portal.x = 1280;
        this.portal.y = 1280;
        this.portal.base_elevation = 32;
        this.portal.elevation_delta = 0;//Phaser.Math.Between(-50,70);
        this.portal.animated = true; //prevents close-up optimiztion draw routine which has some jankyness 
        this.portal.animationtimecheck=0;
        this.portal.frametimer = 200;
        this.portal.numframes = 1;
        this.portal.framewidth = this.portal.width;
        this.portal.frameindex = 0;


        this.portal.inplay = true;
        

        // Main render function. This method is called for each frame (see init() method for initialization).
        this.portal.move = function()
        {
            
            
            // this.context.clearRect(0, 0, this.width, this.height);
            // this.imagedata = this.context.getImageData(0, 0, this.width,this.height);
            // this.pixels = this.imagedata.data;

            var x, y;

            var p = {x:0,y:0,z:0};  
            
            for(i = 0; i < this.sphere.numberOfVertexes; i++) {
                
                p.x = this.sphere.point[i].x;
                p.y = this.sphere.point[i].y;
                p.z = this.sphere.point[i].z;

                //this.rotateX(p, this.rotation);
                this.rotateY(p, this.rotation);
                //this.rotateZ(p, this.rotation);

                x = this.projection(p.x, p.z, this.width/2.0, 100.0, this.s_distance);
                y = this.projection(p.y, p.z, this.height/2.0, 100.0, this.s_distance);

                if((x >= 0) && (x < this.width)) {
                    if((y >= 0) && (y < this.height)) {

                        //limit drawing to front facing vertices. slightly greater than 0 to clean up the edge
                        if(p.z >= 2) 
                        {
                            var mycolor = this.sphere.point[i].color;
                            var bytesPerPixel=4;
                            var targetIndex=(this.width*bytesPerPixel)*Math.round(y)+(bytesPerPixel*Math.round(x));          
            
                            this.pixels[targetIndex]=mycolor.r;
                            this.pixels[targetIndex+1]=mycolor.g;
                            this.pixels[targetIndex+2]=mycolor.b;
                            this.pixels[targetIndex+3]=255;
                        }
                    }
                }                   
            }

            // this.context.putImageData(this.imagedata,0,0);

            this.rotation += Math.PI/90.0;

            if(this.s_distance < 280) {
                this.s_distance += 10;
            }
        };


        // Sphere3D constructor. It builds a 3D sphere from scratch.
        this.portal.Sphere3D = function (radius) 
        {
            sphere = {};

            sphere.point = new Array();
            sphere.radius = (typeof(radius) == "undefined") ? 20.0 : radius;
            sphere.radius = (typeof(radius) != "number") ? 20.0 : radius;
            sphere.numberOfVertexes = 0;

            var vertex_step = .0235;
            
            // It builds the middle circle on the XZ plane. Loop of 2*pi with a step of 0.17 radians.
            for(alpha = 0; alpha <= 6.28; alpha += vertex_step) {
                p = sphere.point[sphere.numberOfVertexes] = {x:0,y:0,z:0};

                //console.log("onSphereTextureLoaded imageData="+sphereTexturePixels);
                var bytesPerPixel=4;
                var sourceIndex = bytesPerPixel* Math.round(this.sphereTexture.width*(alpha/6.28) ) + (this.sphereTexture.width*bytesPerPixel)*(Math.round((0/1.445))+this.sphereTexture.height/2 );//22;//
                //console.log("sourceIndex="+100);

                var r=this.sphereTexturePixels[sourceIndex];//r=200;//
                var g=this.sphereTexturePixels[sourceIndex+1];//g=11;//
                var b=this.sphereTexturePixels[sourceIndex+2];//b=100;//
                var a=this.sphereTexturePixels[sourceIndex+3];//a=100;//

                // var colors = ['red','green','blue','orange','cyan','violet'];
                p.color = {};//colors[Math.floor(Math.random()*5)];//
                p.color.r = r;
                p.color.g = g;
                p.color.b = b;

            
                p.x = Math.cos(alpha) * sphere.radius;
                p.y = 0;
                p.z = Math.sin(alpha) * sphere.radius;

                sphere.numberOfVertexes++;
            }

            // It builds two hemispheres:
            //  - First hemisphere: loop of pi/2 with step of 0.17 (direction = 1)
            //  - Second hemisphere: loop of pi/2 with step of 0.17 (direction = -1)
            
            for(var direction = 1; direction >= -1; direction -= 2) {
                for(var beta = vertex_step; beta < 1.445; beta += vertex_step) {
                    var radius = Math.cos(beta) * sphere.radius;
                    var fixedY = Math.sin(beta) * sphere.radius * direction;

                    for(var alpha = 0; alpha < 6.28; alpha += vertex_step) {
                        p = sphere.point[sphere.numberOfVertexes] = {x:0,y:0,z:0};



                        var src_vert_scope = this.src_vert_scope;

                        var bytesPerPixel=4;
                        var sourceIndex = bytesPerPixel* Math.round(this.sphereTexture.width*(alpha/6.28) ) + (this.sphereTexture.width*bytesPerPixel)*(Math.round((fixedY*-1*src_vert_scope/1.445))+this.sphereTexture.height/2);//11;//

                        var r=this.sphereTexturePixels[sourceIndex];//r=200;//
                        var g=this.sphereTexturePixels[sourceIndex+1];//g=11;//
                        var b=this.sphereTexturePixels[sourceIndex+2];//b=100;//
                        var a=this.sphereTexturePixels[sourceIndex+3];//a=100;//

                        // var colors = ['red','green','blue','orange','cyan','violet'];
                        p.color = {};//colors[Math.floor(Math.random()*5)];//
                        p.color.r = r;
                        p.color.g = g;
                        p.color.b = b;



                        p.x = Math.cos(alpha) * radius;
                        p.y = fixedY;
                        p.z = Math.sin(alpha) * radius;

                        sphere.numberOfVertexes++;
                    }
                }
            }

            return sphere;
        }





        // Utility method to rotate point by X in a 3D space
        this.portal.rotateX = function (point, radians) 
        {
            var y = point.y;
            point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
            point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
        };

        // Utility method to rotate point by Y in a 3D space
        this.portal.rotateY = function (point, radians) 
        {
            var x = point.x;
            point.x = (x * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
            point.z = (x * Math.sin(radians)) + (point.z * Math.cos(radians));
        };

        // Utility method to rotate point by Z in a 3D space
        this.portal.rotateZ = function (point, radians) 
        {
            var x = point.x;
            point.x = (x * Math.cos(radians)) + (point.y * Math.sin(radians) * -1.0);
            point.y = (x * Math.sin(radians)) + (point.y * Math.cos(radians));
        };

        // Utility method to project a 3D point a a 2D surface
        this.portal.projection = function (xy, z, xyOffset, zOffset, s_distance) 
        {
            return ((s_distance * xy) / (z - zOffset)) + xyOffset;
        };


        this.portal.sphere = this.portal.Sphere3D(10);

        this.zspritesgroup.add(this.portal);








        
        debug = this.add.text(10, 10, '(debug text)', { font: '10px Arial', fill: '#00ff00' });



        if (touchActivated)
        {
            //touch gui
            this.input.addPointer(3);
            this.textures.generate('chunk', { data: ['A'], pixelWidth: 1});
            this.textures.generate('chunk2', { data: ['6'], pixelWidth: 1});

            guide_multi = this.add.image(40,148,'chunk').setDisplaySize(64, 64).setAlpha(.25).setInteractive().setDepth(200);
            guide_multi.on('pointermove', function () {guide_multi_activeY = guide_multi.input.localY}, this);
            guide_multi.on('pointerout', function () {guide_multi_activeY = .5}, this);

            guide_zspeed = this.add.image(280,148,'chunk').setDisplaySize(64, 64).setAlpha(.25).setInteractive().setDepth(200);
            //guide_zspeed.on('pointermove', function () {debug.setText(guide_zspeed.input.localX+" "+guide_zspeed.input.localY)}, this);

            guide_shoot = this.add.image(210,148,'chunk2').setDisplaySize(40, 40).setAlpha(.45).setInteractive().setDepth(200);
            guide_shoot.on('pointermove', function () {gShoot = true}, this);
            guide_shoot.on('pointerout', function () {gShoot = false}, this);

            this.textures.generate('h_arrow', { data: guideInputHorizontalData, pixelWidth: 2});
            this.textures.generate('v_arrow', { data: guideInputVerticalData, pixelWidth: 2});

            guide_left = this.add.image(20,148,'h_arrow').setAlpha(.25);
            guide_right = this.add.image(60,148,'h_arrow').toggleFlipX().setAlpha(.25);

            guide_up = this.add.image(40,128,'v_arrow').setAlpha(.25);
            guide_down = this.add.image(40,168,'v_arrow').toggleFlipY().setAlpha(.25);

            guide_forward = this.add.image(280,128,'v_arrow').setAlpha(.25).setDepth(200);
            guide_back = this.add.image(280,168,'v_arrow').toggleFlipY().setAlpha(.25).setDepth(200);

            guide_sleft = this.add.image(260,148,'h_arrow').setAlpha(.25);
            guide_sright = this.add.image(300,148,'h_arrow').toggleFlipX().setAlpha(.25);

            this.textures.generate('a_menu', { data: accessMenuData, pixelWidth: 1});
            access_menu = this.add.image(310,10,'a_menu').setAlpha(1).setInteractive();
            access_menu.on('pointerdown', function () { this.displayHideMenu(); } , this);
                
        }
        else
        {
            this.input.addPointer(1);

            this.input.on('pointerdown', function (){gShoot=true}, this);
            this.input.on('pointerup', function (){gShoot=false}, this);


            this.input.on('pointermove', function (pointer) {

                horizontalMouseDelta = (((pointer.x - 160) / 320));
                verticalMouseDelta = (((pointer.y - 100) / 200));

            } );


        }
        





        // this.input.on('pointerdown', function () {gShoot = true});
        // this.input.on('pointerup', function () {gShoot = false});
        cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.addCapture('ALT, LEFT, RIGHT');
        keys = this.input.keyboard.addKeys('E,C,W,A,S,D,CTRL,SPACE');

        // this.input.keyboard.on('keydown-CTRL', function (event) {gShoot=true});
        // this.input.keyboard.on('keyup-CTRL', function (event) {gShoot=false});


        this.input.keyboard.on('keydown-ONE', function (event) 
            {
                thisContext.background.currentIndex++;
                if (thisContext.background.currentIndex==thisContext.background.length) {thisContext.background.currentIndex=0}
            }
        );

        this.input.keyboard.on('keydown-TWO', function (event) 
            {
                thisContext.floor.currentIndex++;
                if (thisContext.floor.currentIndex==thisContext.floor.length) {thisContext.floor.currentIndex=0}
            }
        );

        this.input.keyboard.on('keydown-THREE', function (event) 
            {
                if (!menu_mode) {thisContext.changeObjectgang();}
            }
        );

        // this.input.keyboard.on('keydown-FOUR', function (event) 
        //     {
        //         if (!menu_mode) {thisContext.changeLevelmap();}
        //     }
        // );
        this.input.keyboard.on('keydown-FIVE', function (event) 
            {
                if (!menu_mode) {thisContext.changePortal();}
            }
        );


        cont = this.add.container();


        if (touchActivated)
        {
            cont.add([guide_back,guide_forward,guide_left,guide_right,guide_up,guide_down,guide_sleft,guide_sright, guide_multi, guide_zspeed, guide_shoot, access_menu, debug]);
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
        UICam.ignore([gamedisplayImage]);

        this.cameras.main.on('camerashakestart', function () {

            if (tilt_mode)
            {
                //set greater 
                gamedisplayImage.setScale(1.25);
            }
            else
            {
                //set regular 
                gamedisplayImage.setScale(1.08);
            }

        });

        this.cameras.main.on('camerashakecomplete', function () {

            if (tilt_mode)
            {
                //reset to 1.17x
                gamedisplayImage.setScale(1.17);
            }
            else
            {
                //reset to normal scale
                gamedisplayImage.setScale(1.0);
            }

        });

        

        this.input.gamepad.once('down', function (pad, button, index) {

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        }, this);






        ///////////////pre activations

        activate_flybugs(thisContext,3);

        //activate_plantedrocks(thisContext,50);

        ////////////////////////////////////////////


    },

    playerShoot: function()
    {
        if (game.loop.now > this.shot_saved_timecheck + 110)
        {
            this.shot_saved_timecheck = game.loop.now;

            var shotXDir=this.fCosTable[this.fPlayerArc];
            var shotYDir=this.fSinTable[this.fPlayerArc];

            var adjustshotposition = 5;
            this.bulletsprites[this.shotIndex].x = Math.floor(this.fPlayerX)+Math.round(shotXDir*this.fPlayerSpeed)*adjustshotposition;
            this.bulletsprites[this.shotIndex].y = Math.floor(this.fPlayerY)+Math.round(shotYDir*this.fPlayerSpeed)*adjustshotposition;

            this.bulletsprites[this.shotIndex].dx=Math.round(shotXDir*this.fPlayerSpeed*8);//8
            this.bulletsprites[this.shotIndex].dy=Math.round(shotYDir*this.fPlayerSpeed*8);//8
            
            this.bulletsprites[this.shotIndex].base_elevation = this.fPlayerElevation;
             
            this.bulletsprites[this.shotIndex].inplay = true;

            this.bulletsprites[this.shotIndex].pp_delta = Math.floor(this.PROJECTIONPLANEHEIGHT/2 - this.fProjectionPlaneYCenter);

            this.shotIndex++;
            if (this.shotIndex==this.num_bullets) this.shotIndex=0;
        }
    },
    
    changePortal: function ()
    {
        this.portal.p_index++;
        if (this.portal.p_index>=backgroundList.length) this.portal.p_index=0;        
        var imagekey = backgroundList[this.portal.p_index];

        //portal image source
        this.portal.sphereTexture = this.textures.get(imagekey).getSourceImage();

        var randomKey = Math.random().toString();
        this.portal.sphereTextureBuffer = this.textures.createCanvas(randomKey, this.portal.sphereTexture.width, this.portal.sphereTexture.height);
        this.portal.sphereTexture_context = this.portal.sphereTextureBuffer.getContext('2d', {willReadFrequently:true});
        //this.portal.sphereTextureBuffer.drawFrame(imagekey,0, 0, 0);
        this.portal.sphereTexture_context.drawImage(this.portal.sphereTexture,0,0);
        this.portal.sphereTexture_imagedata = this.portal.sphereTexture_context.getImageData(0, 0, this.portal.sphereTexture.width, this.portal.sphereTexture.height);
        this.portal.sphereTexturePixels = this.portal.sphereTexture_imagedata.data;

        this.portal.src_vert_scope = this.portal.sphereTexture.height/16;
        this.portal.sphere = this.portal.Sphere3D(10);


    },

    changeObjectgang: function ()
    {
        og_index++;
        if (og_index>=objectGangs.length) og_index=0;
        var new_objectgang = objectGangs[og_index];

        this.zspritesgroup.children.iterate( 
                function(_sprite)
                { 
                    if (_sprite != undefined)
                    {
                        if (objectGangs.includes(_sprite.label))
                        {
                            if (_sprite.label != new_objectgang)
                            {
                                _sprite.inplay = false;
                                // _sprite.x = Phaser.Math.Between(100,668);
                                // _sprite.y = Phaser.Math.Between(100,1180);
                            }
                            else
                            {
                                _sprite.inplay = true;
                                // _sprite.x = undefined;
                                // _sprite.y = undefined;
                            }                            
                        }

                    }                    
                } );
    },
        
    

    update: function()
    {

        var debugt = [];
                // debugt.push(backgroundList[this.demoBot.bg_index]);
                debugt.push('fps: '+ Math.floor(this.sys.game.loop.actualFps.toString()) );
                // debugt.push('this.fPlayerArc: '+ this.fPlayerArc );
        debug.setText(debugt);

        var thisContext = this;
        
        this.drawBackground();
        
        this.rain(this.wall[6]);

        this.wave(this.wall[4]);

        this.raycast();


        this.zspritesgroup.children.iterate( 
            function(_sprite)
            { 
                if (_sprite != undefined)
                {
                    if (_sprite.inplay) 
                    {
                        if (_sprite.label == 'ferns')
                        {
                           thisContext.noise(_sprite,'orange');
                        }
                        if (_sprite.label == 'classictrees')
                        {
                           thisContext.wave(_sprite);
                        }
                        if (_sprite.label == 'fancytrees')
                        {
                           thisContext.wave(_sprite);
                        }

                        _sprite.move();
                    }
                }
                

                
            } );



        this.drawAllObjects();


        this.blitOffscreenCanvas();

        
        


        

        // check for shoot global

        if (gShoot && !menu_mode) // disable shooting when menu up
        {     
            this.playerShoot();
        }





        ///gamepad menu control
        if (gamepad)
        {
            if (gamepad.X)
            {     
                this.displayHideMenu();
            } 
        }
        
        


        if (drive_mode)
        {
            var playerXDir=this.fCosTable[this.playercart.arc];
            var playerYDir=this.fSinTable[this.playercart.arc];        
                   
            var adjustedarc;        
            var playerSXDir;
            var playerSYDir;

            adjustedarc=this.playercart.arc+this.ANGLE90;
            if (adjustedarc>this.ANGLE360)
            {
                adjustedarc-=this.ANGLE360;
            }
            playerSXDir=this.fCosTable[adjustedarc];
            playerSYDir=this.fSinTable[adjustedarc];
        }
        else
        {
            var playerXDir=this.fCosTable[this.fPlayerArc];
            var playerYDir=this.fSinTable[this.fPlayerArc];        
                   
            var adjustedarc;        
            var playerSXDir;
            var playerSYDir;

            adjustedarc=this.fPlayerArc+this.ANGLE90;
            if (adjustedarc>this.ANGLE360)
            {
                adjustedarc-=this.ANGLE360;
            }
            playerSXDir=this.fCosTable[adjustedarc];
            playerSYDir=this.fSinTable[adjustedarc];
        }
        




        var dx=0;
        var dy=0;
        var sdx=0;
        var sdy=0;        


        var strafeDelta=0;
        var zspeedDelta=0;
        var horizontalDelta=0;
        var verticalDelta=0;
        var forceAmp = 1;


        if (demo_mode)
        {

            strafeDelta = this.demoBot.strafeDelta;
            zspeedDelta = this.demoBot.zspeedDelta;
            horizontalDelta = this.demoBot.horizontalDelta;
            verticalDelta = this.demoBot.verticalDelta;

            this.doDemoBot();

        }
        else if (touchActivated)
        {

            strafeDelta = (guide_zspeed.input.localX-.5)*10;
            zspeedDelta = (guide_zspeed.input.localY-.5)*-10;
            horizontalDelta = guide_multi.input.localX-.5;
            verticalDelta = guide_multi_activeY-.5;

        }
        else if (gamepad)
        {

            strafeDelta = (gamepad.rightStick.x*.5)*10;
            zspeedDelta = (gamepad.rightStick.y*.5)*-10;
            horizontalDelta = gamepad.leftStick.x*.5;
            verticalDelta = gamepad.leftStick.y*.5;

            if (gamepad.R1)
            {     
                gShoot = true;
            }
            else
            {
                gShoot = false;
            }    

        }
        else //default to keyboard/mouse
        {

            // move forward
            if (cursors.up.isDown) zspeedDelta = this.fPlayerSpeed;
            
            // move backward
            if (cursors.down.isDown) zspeedDelta = -this.fPlayerSpeed;
            
            if (drive_mode)
            {
                // turn left
                if (cursors.left.isDown) 
                {
                    this.playercart.arc-=this.ANGLE5;
                    
                    if (this.playercart.arc<this.ANGLE0)
                        this.playercart.arc+=this.ANGLE360;
                }            
            
                // turn right
                if (cursors.right.isDown) 
                {
                    this.playercart.arc+=this.ANGLE5;
                    
                    if (this.playercart.arc>=this.ANGLE360)
                        this.playercart.arc-=this.ANGLE360;
                }

                horizontalDelta = horizontalMouseDelta;
                verticalDelta = verticalMouseDelta;

                forceAmp = 3;
            }
            else
            {
                // strafe left
                if (cursors.left.isDown) strafeDelta = -this.fPlayerSpeed;            
            
                // strafe right
                if (cursors.right.isDown) strafeDelta = this.fPlayerSpeed;

                horizontalDelta = horizontalMouseDelta;
                verticalDelta = verticalMouseDelta;

                forceAmp = 2.4;
            }
            

        }



        sdx=Math.round(playerSXDir*strafeDelta);
        sdy=Math.round(playerSYDir*strafeDelta);   

        dx=Math.round(playerXDir*zspeedDelta);
        dy=Math.round(playerYDir*zspeedDelta);        


        if (!menu_mode && !demo_mode && !drive_mode)

        {
            
            if (tilt_mode)
            {
                this.cameras.main.rotation = -horizontalDelta*.24;
            }    
            

            this.fPlayerArc+=Math.floor(horizontalDelta*15*forceAmp);
            this.playerArcDelta=Math.floor(horizontalDelta*15*forceAmp);

            if (this.fPlayerArc<this.ANGLE0) this.fPlayerArc+=this.ANGLE360;
            if (this.fPlayerArc>=this.ANGLE360) this.fPlayerArc-=this.ANGLE360;
            
            if (verticalDelta>0)
            {
                if (this.fProjectionPlaneYCenter<20)
                {
                    this.fPlayerElevation-=verticalDelta*3*forceAmp;
                }
                else
                {
                    this.fProjectionPlaneYCenter-=verticalDelta*6*forceAmp;
                }
            }
            if (verticalDelta<0)
            {
                if (this.fProjectionPlaneYCenter>240)
                {
                    this.fPlayerElevation-=verticalDelta*3*forceAmp;
                }
                else
                {
                    this.fProjectionPlaneYCenter-=verticalDelta*6*forceAmp;
                }
            }


            this.background[this.background.currentIndex].ImageArc-= this.playerArcDelta;

        }
        /////////////elevation contol
        if (menu_mode)
        {

            if (keys.E.isDown)
            {
                // if (this.fProjectionPlaneYCenter>145)
                // {
                    this.fPlayerElevation+=2;
                // }
                // else
                // {
                //     this.fProjectionPlaneYCenter+=5;
                // }
            }
            if (keys.C.isDown)
            {
                // if (this.fProjectionPlaneYCenter<50)
                // {
                    this.fPlayerElevation-=2;
                // }
                // else
                // {
                //     this.fProjectionPlaneYCenter-=5;
                // }
            }

                
            if (keys.D.isDown)
            {            
                this.fPlayerArc+=this.ANGLE1;            
            }
            if (keys.A.isDown)
            {
                this.fPlayerArc-=this.ANGLE1;
            }

            if (keys.W.isDown)
            {            
                this.fProjectionPlaneYCenter+=3;           
            }
            if (keys.S.isDown)
            {
                this.fProjectionPlaneYCenter-=3;
            }

        }



                
        if (this.background[this.background.currentIndex].buffer!=undefined)
        {
        //console.log("this.fPlayerArc="+this.fPlayerArc+" this.fBackgroundImageArc="+this.fBackgroundImageArc);
        // This code wraps around the background image so that it can be drawn just one.
        // For this to work, the first section of the image needs to be repeated on the third section (see the image used in this example)
        if (this.background[this.background.currentIndex].ImageArc<-this.PROJECTIONPLANEWIDTH*2)
            this.background[this.background.currentIndex].ImageArc=this.PROJECTIONPLANEWIDTH*2+(this.background[this.background.currentIndex].ImageArc);
        else if (this.background[this.background.currentIndex].ImageArc>0)
            this.background[this.background.currentIndex].ImageArc=-(this.background[this.background.currentIndex].buffer.width-this.PROJECTIONPLANEWIDTH- (this.background[this.background.currentIndex].ImageArc));            
        }



        if (drive_mode)
        {
            this.playercart.arc+=Math.floor(horizontalDelta*15*forceAmp);


            if (this.playercart.arc<this.ANGLE0) this.playercart.arc+=this.ANGLE360;
            if (this.playercart.arc>=this.ANGLE360) this.playercart.arc-=this.ANGLE360;

            this.playercart.x += (dx+sdx);
            this.playercart.y += (dy+sdy);

            this.driveCart();
        }
        else
        {
            this.fPlayerX+=(dx+sdx);
            this.fPlayerY+=(dy+sdy);
        }

        


        /////////////elevation contol

        if (this.fPlayerElevation<10)
            this.fPlayerElevation=10;
        else if (this.fPlayerElevation>800)
            this.fPlayerElevation=800;

        ///////////////end elevation control

        //console.log(this.fMapArrays[this.MAP_currentlevelindex][playerYCell]);
        //console.log(this.fMapArrays[this.MAP_currentlevelindex][playerYCell][playerXCell+1]);





        if (!demo_mode)
        {

            // CHECK COLLISION AGAINST WALLS
            // compute cell position
            var playerXCell = Math.floor(this.fPlayerX/this.TILE_SIZE);
            var playerYCell = Math.floor(this.fPlayerY/this.TILE_SIZE);

            // compute position relative to cell (ie: how many pixel from edge of cell)
            var playerXCellOffset = this.fPlayerX % this.TILE_SIZE;
            var playerYCellOffset = this.fPlayerY % this.TILE_SIZE;

            var minDistanceToWall=30;
            
            // make sure the player don't bump into walls
            if ((dx+sdx)>0)
            {
                // moving right -- must manually check cell for left right map edge check
                if (   ( playerXCell==this.MAP_WIDTH-1 || this.fMap.charAt( (playerYCell*this.MAP_WIDTH)+playerXCell+1)!='-' )&&
                    playerXCellOffset > (this.TILE_SIZE-minDistanceToWall)   ) 
                {
                    // back player up
                    this.fPlayerX-= (playerXCellOffset-(this.TILE_SIZE-minDistanceToWall));
                }  
          
            }
            else
            {
                // moving left -- must manually check cell for left right map edge check
                if (   ( playerXCell==0 || this.fMap.charAt( (playerYCell*this.MAP_WIDTH)+playerXCell-1)!='-' )&&
                    playerXCellOffset < (minDistanceToWall)  )
                {
                    // back player up
                    this.fPlayerX+= (minDistanceToWall-playerXCellOffset);
                } 

            } 

            if ((dy+sdy)<0)
            {
                // moving up
                if ((this.fMap.charAt(((playerYCell-1)*this.MAP_WIDTH)+playerXCell)!='-')&&
                    (playerYCellOffset < (minDistanceToWall)))
                {
                    // back player up 
                    this.fPlayerY+= (minDistanceToWall-playerYCellOffset);
                }
            }
            else
            {
                // moving down                                  
                if ((this.fMap.charAt(((playerYCell+1)*this.MAP_WIDTH)+playerXCell)!='-')&&
                    (playerYCellOffset > (this.TILE_SIZE-minDistanceToWall)))
                {
                    // back player up 
                    this.fPlayerY-= (playerYCellOffset-(this.TILE_SIZE-minDistanceToWall ));
                }
            }

        }
        
    
    },




    
    arcToRad: function(arcAngle)
    {
        return ((arcAngle*Math.PI)/this.ANGLE180);    
    },

    radToArc: function(arcRad)
    {
        return ((arcRad*this.ANGLE180)/Math.PI);    
    },
    
    

    

    //*******************************************************************//
    //* Draw background image
    //*******************************************************************//
    drawBackground : function()
    {
        if (this.background[this.background.currentIndex].buffer!=undefined)
        {
            // offset .putImageData y value to accomodate vertical projectionplane shifting

            this.offscreenCanvasContext.putImageData(this.background[this.background.currentIndex].imagedata,this.background[this.background.currentIndex].ImageArc,this.fProjectionPlaneYCenter-(this.PROJECTIONPLANEHEIGHT/2) - this.background[this.background.currentIndex].yoffset);

            this.offscreenCanvasPixels=this.offscreenCanvasContext.getImageData(0,0,this.gamedisplayCanvas.width, this.gamedisplayCanvas.height);             
        }
    },
    
    
    blitOffscreenCanvas : function()
    {        
        //this.offscreenCanvasPixels =  this.offscreenCanvasContext.getImageData(0,0,this.gamedisplayCanvas.width, this.gamedisplayCanvas.height);

        //this.tickleOffscreenCanvas();
        
        this.gamedisplay_context.putImageData(this.offscreenCanvasPixels,0,0);
        this.gamedisplayCanvas.refresh();

    },
    

    wave: function(thing)
    {


        
        numberOfFrames = thing.buffer.width;
        wavePixelChunk = 1;
        
        // if the context is not updated we can retrieve the unaltered image data and pixels                 
        var imageData = thing.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, thing.buffer.width, thing.buffer.height);
        var savedpixels = imageData.data;

        // width is number of frames, 1 frame for every col
        for (var x = 0; x <numberOfFrames ; x += wavePixelChunk)
        {
            var y = thing.waveData.sin[x];

            for (var sy=0; sy<thing.buffer.height; sy++)  
            {   
                var bytesPerPixel=4; 

                var sourceIndex=(bytesPerPixel*x) + (thing.buffer.width*bytesPerPixel)*sy;

                var red=savedpixels[sourceIndex];
                var green=savedpixels[sourceIndex+1];
                var blue=savedpixels[sourceIndex+2];
                var alpha=savedpixels[sourceIndex+3];

                var yadj = Math.round(y)+sy
                var targetIndex= (bytesPerPixel*x) + (thing.buffer.width*bytesPerPixel)*yadj;

                thing.pixels[targetIndex]=red; 
                thing.pixels[targetIndex+1]=green;   
                thing.pixels[targetIndex+2]=blue;   
                thing.pixels[targetIndex+3]=alpha;         
            }                     
        }
            
        //  Cycle through the wave data - this is what causes the image to "undulate"
        Phaser.Utils.Array.RotateRight(thing.waveData.sin);
    
        // this.waveFrameIndex+=this.wavePixelChunk;
    
        // if (this.waveFrameIndex>=this.numberOfFrames) 
        // {
        //     this.waveFrameIndex = 0; 
        //     this.scrollcycles++;
        //     if (this.scrollcycles==1) { this.scrollcycles=0 } //this.wallAnimatedData.modedoneflag='true';
            
        // }
    },
    

    noise: function(thing,color)
    {
        var r,g,b;

        if (color=='red') { r=255; g=0; b=0; }
        if (color=='green') { r=0; g=255; b=0; }
        if (color=='blue') { r=0; g=0; b=255; }
        if (color=='orange') { r=255; g=255; b=0; }
        if (color=='cyan') { r=0; g=255; b=255; }
        if (color=='violet') { r=255; g=0; b=255; }
        if (color=='white') { r=255; g=255; b=255; }
        if (color=='black') { r=0; g=0; b=0; }

        //copy pixels
        for (var x=0; x<thing.buffer.width; x++)
        {            
            for (var y=0; y<thing.buffer.height; y++)
            {
                var bytesPerPixel=4;
                var targetIndex=(thing.buffer.width*bytesPerPixel)*y+(bytesPerPixel*x);          
                // var red = this.wall[i].pixels[targetIndex];
                // var green = this.wall[i].pixels[targetIndex+1];
                // var blue = this.wall[i].pixels[targetIndex+2];
                var alpha = thing.pixels[targetIndex+3];
            
                if (alpha!=0)
                {
                    var greylev = Phaser.Math.Between(80,160);
                    thing.pixels[targetIndex]=greylev*r/255;
                    thing.pixels[targetIndex+1]=greylev*g/255;
                    thing.pixels[targetIndex+2]=greylev*b/255;
                }                
            }            
        }
    },

    rain: function(thing)
    {


            //  'clearRect' clears the image from the CONTEXT. it does not clear any risidual data already extracted
            //  with 'getImageData' into var imageData. to do that 'getImageData' must be called again

            //this.wall[i].context.clearRect(0, 0, wallData[i].width, wallData[i].height);

            //this.wall[i].buffer.drawFrame('wallcanvas'+i,0,0,0);
            var imageData = thing.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, thing.buffer.width, thing.buffer.height);
            thing.pixels = imageData.data;
            



            // var mycolor = wallData[wallIndex].effect_color;
            // var r,g,b;

            // if (mycolor=='red') { r=255; g=0; b=0; }
            // if (mycolor=='green') { r=0; g=255; b=0; }
            // if (mycolor=='blue') { r=0; g=0; b=255; }
            // if (mycolor=='orange') { r=255; g=255; b=0; }
            // if (mycolor=='cyan') { r=0; g=255; b=255; }
            // if (mycolor=='violet') { r=255; g=0; b=255; }
            // if (mycolor=='white') { r=255; g=255; b=255; }
            // if (mycolor=='black') { r=0; g=0; b=0; }

            // if ( game.loop.now < this.wallAnimatedData.timecheck + 6000 )
            // {

                for (var j=0; j<thing.burstpixels.length; j++)
                {



                    var thispixel = thing.burstpixels[j];


                    thispixel.xpos += thispixel.xincr;
                    //if (thispixel.xpos<0 || thispixel.xpos>64) thispixel.xincr*=-1;

                    thispixel.ypos += thispixel.yincr;
                    if (thispixel.ypos<0) thispixel.ypos=thing.buffer.height;

                    // this.wall_context.drawImage(subsprite.img, 0, 0, 
                    //     subsprite.img.width, subsprite.img.height, 
                    //     this.wallAnimatedData.xpos, this.wallAnimatedData.ypos, subsprite.img.width/2, subsprite.img.height/2);   
                    var r;
                    var g;
                    var b;
                    var randColor = Phaser.Math.Between(0,1);

                    //if (randColor==0) { r=255; g=0; b=0; }//'red'
                    //if (randColor==1) { r=0; g=255; b=0; }//'green'
                    if (randColor==0) { r=0; g=0; b=255; }//'blue'
                    //if (randColor==1) { r=255; g=255; b=0; }//'orange'
                    //if (randColor==4) { r=0; g=255; b=255; }//'cyan'
                    if (randColor==1) { r=255; g=0; b=255; }//'violet'
                    //if (randColor==6) { r=255; g=255; b=255; }//'white'
                    //if (randColor==7) { r=0; g=0; b=0; }//'black' 


                    if (game.loop.now>thispixel.timecheck+thispixel.switchtime)  
                    {
                        
                        thispixel.timecheck=game.loop.now;
                        //var greylev = Phaser.Math.Between(0,100);
                        thispixel.r = r;
                        thispixel.g = g;
                        thispixel.b = b;
                    }
                    
                    // if (game.loop.now>thispixel.timecheck+thispixel.switchtime)  
                    // {
                        
                    //     thispixel.timecheck=game.loop.now;
                    //     var greylev = Phaser.Math.Between(60,120);
                    //     thispixel.r = greylev*r/255;
                    //     thispixel.g = greylev*g/255;
                    //     thispixel.b = greylev*b/255;
                    // }

                    var bytesPerPixel=4;
                    var targetIndex=(thing.buffer.width*bytesPerPixel)* Math.round(thispixel.ypos) + ( bytesPerPixel* Math.round(thispixel.xpos) );     
                    thing.pixels[targetIndex]=thispixel.r;
                    thing.pixels[targetIndex+1]=thispixel.g;
                    thing.pixels[targetIndex+2]=thispixel.b;
                    thing.pixels[targetIndex+3]=255;
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
        var v_savedMapIndex='';
        var h_savedMapIndex='';

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
                    var mapIndexChar = this.fMap.charAt(mapIndex);

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
                        h_savedMapIndex = '0';
                        H_edgeFlag=true;
                        break;
                    }
                    // If the grid is not an Opening, then stop
                    else if (  mapIndexChar!='-' )
                    {
                        h_savedMapIndex = mapIndexChar;
                        distToHorizontalGridBeingHit  = (xIntersection-this.fPlayerX)*this.fICosTable[castArc];
                        H_edgeFlag=false;
                        break;
                    }
                    
                    // Else, keep looking.  At this point, the ray is not blocked, extend the ray to the next grid
                    else
                    {
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
                    var mapIndexChar = this.fMap.charAt(mapIndex);
                    
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

                        v_savedMapIndex = '0';

                        V_edgeFlag=true;
                        break;
                    }
                    else if (  mapIndexChar!='-' )
                    {

                        v_savedMapIndex = mapIndexChar;
                        distToVerticalGridBeingHit =(yIntersection-this.fPlayerY)*this.fISinTable[castArc];
                        V_edgeFlag=false;
                        
                        break;
                    }
                    
                    else
                    {
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
            var savedMapIndex;
            //var edgeType;

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
                savedMapIndex = h_savedMapIndex;
                //edgeType = h_edgeType;
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
                savedMapIndex = v_savedMapIndex;
                //edgeType = v_edgeType;
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


            savedMapIndex = +savedMapIndex; //converts string to number

            var projectedWallHeight=(wallData[savedMapIndex].height*this.fPlayerDistanceToTheProjectionPlane/dist);
            var projectedWallWidth=(wallData[savedMapIndex].width*this.fPlayerDistanceToTheProjectionPlane/dist);

            var wallElevationDelta = (wallData[savedMapIndex].height/2)-this.fPlayerElevation;


            var projected_ed = wallElevationDelta*(projectedWallHeight/wallData[savedMapIndex].height);
        

            var bottomOfWall = Math.round(this.fProjectionPlaneYCenter+(projectedWallHeight*0.5)-projected_ed);
            var topOfWall = Math.round(this.fProjectionPlaneYCenter-(projectedWallHeight*0.5)-projected_ed);

            if (topOfWall<0 && bottomOfWall>199)
            {
                var pp_delta = Math.floor(this.PROJECTIONPLANEHEIGHT/2 - this.fProjectionPlaneYCenter);                
                var abs_pp_delta = Math.abs(pp_delta);
                var adj_pp_delta = (this.fTanTable[abs_pp_delta]*dist);

                //ensures the calculated height is cast at same scale even though it will be trimmed
                projectedDelta = (bottomOfWall-topOfWall);

                // setting topOfWall = 0 trims the calculated height to the visible area as the new height
                topOfWall = 0;
                //bottomOfWall = 200;
                
                
                var yd1 = ( 200*wallData[savedMapIndex].height / projectedWallHeight );
                var yd2 = (.5*(wallData[savedMapIndex].height-yd1));
                
                
                if (pp_delta>0)
                {
                    yOffset = Math.floor(yd2+(wallElevationDelta+adj_pp_delta))  ;
                }
                else
                {
                    yOffset = Math.floor(yd2+(wallElevationDelta-adj_pp_delta))  ;
                }
                
            }
            else
            {
                projectedDelta = null;
                yOffset = 0;
            }

            
// var debugt = [];

// if (castColumn==319)
// {
//     debugt.push('mapIndex: '+ mapIndex );

//     debugt.push('charAt: '+ this.fMap.charAt(mapIndex));
//     // debugt.push('topOfWall: '+ topOfWall );
//     // debugt.push('bottomOfWall: '+ bottomOfWall);

    
//     debugt.push('xGridIndex: '+ xGridIndex );
//     debugt.push('yGridIndex: '+ yGridIndex );

//     debugt.push('horizontalGrid: '+ horizontalGrid );
//     debugt.push('verticalGrid: '+ verticalGrid );

//     debugt.push('xIntersection: '+ xIntersection );
//     debugt.push('yIntersection: '+ yIntersection );

//     debugt.push('distToHorizontalGridBeingHit: '+ distToHorizontalGridBeingHit );
//     debugt.push('distToVerticalGridBeingHit: '+ distToVerticalGridBeingHit );

//     debugt.push('playerXCell: '+ Math.floor(this.fPlayerX/this.TILE_SIZE ));
//     debugt.push('playerYCell: '+ Math.floor(this.fPlayerY/this.TILE_SIZE ));
    

// }
// debugt.push('relYCenter: '+ (100-this.fProjectionPlaneYCenter) );
//debugt.push('fps: '+ Math.floor(this.sys.game.loop.actualFps.toString()) );

//debug.setText(debugt);


            
            if (DEBUG)
            {               
                console.log("castColumn="+castColumn+" distance="+dist);
            }
            
            
            //Add simple shading so that farther wall slices appear darker.
            
            //dist=Math.floor(dist);
            

            // if ( ((bottomOfWall-topOfWall) && !H_edgeFlag) || ((bottomOfWall-topOfWall) && !V_edgeFlag) )
            // {
                // Trick to give different shades between vertical and horizontal (you could also use different textures for each if you wish to)  
                if (isVerticalHit)
                {
                    
                    this.drawWallSliceRectangleTinted(castColumn, (topOfWall), 1, (bottomOfWall-topOfWall), 1.0, xOffset, yOffset, projectedDelta, savedMapIndex);// 90/(dist)
                }

                else
                {
                    
                    this.drawWallSliceRectangleTinted(castColumn, (topOfWall), 1, (bottomOfWall-topOfWall), 0.7, xOffset, yOffset, projectedDelta, savedMapIndex);// 120/(dist)
                }


            // }

            if (!wallCastMask)
            {
                var bytesPerPixel=4;
                var projectionPlaneCenterY=this.fProjectionPlaneYCenter;
                var lastBottomOfWall = Math.floor(bottomOfWall);
                //*************
                // FLOOR CASTING at the simplest!  Try to find ways to optimize this, you can do it!
                //*************
                if (this.floor[this.floor.currentIndex].buffer!=undefined)
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

                        // // Get the tile intersected by ray:
                        // var cellX = Math.floor(xEnd / this.TILE_SIZE);
                        // var cellY = Math.floor(yEnd / this.TILE_SIZE);
                        // //console.log("cellX="+cellX+" cellY="+cellY);
                        
                        //Make sure the tile is within our map
                        // if ((cellX<this.MAP_WIDTH) &&   
                        //     (cellY<this.MAP_HEIGHT) &&
                        //     cellX>=0 && cellY>=0)
                        // {            
                            // Find offset of tile and column in texture
                            var tileRow = Math.floor(yEnd);
                            var tileColumn = Math.floor(xEnd);
                            // Pixel to draw
                            var sourceIndex=(tileRow*this.floor[this.floor.currentIndex].buffer.width*bytesPerPixel)+(bytesPerPixel*tileColumn);
                            
                            // Cheap shading trick
                            //var brighnessLevel=1;//(100/diagonalDistance);
                            var red=Math.floor(this.floor[this.floor.currentIndex].pixels[sourceIndex]);//*brighnessLevel);
                            var green=Math.floor(this.floor[this.floor.currentIndex].pixels[sourceIndex+1]);//*brighnessLevel);
                            var blue=Math.floor(this.floor[this.floor.currentIndex].pixels[sourceIndex+2]);//*brighnessLevel);
                            var alpha=Math.floor(this.floor[this.floor.currentIndex].pixels[sourceIndex+3]);                      
                            
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
                        // }                                                              
                    }   
                }  
            }
            
                      

            // TRACE THE NEXT RAY
            castArc+=1;
            if (castArc>=this.ANGLE360)
                castArc-=this.ANGLE360;
        }


        

    },

    drawWallSliceRectangleTinted: function(x, y, width, height, brightnessLevel, xOffset, yOffset, projectedDelta, savedMapIndex)
    {       
        //console.log(savedMapIndex);
        //var xOffset=x%this.fWallTexture.width;    // wrap the image position
        
        // wait until the texture loads
        if (this.wall[savedMapIndex] == undefined)
            return;
        
        
        x=Math.floor(x);
        y=Math.floor(y);

        xOffset=Math.floor(xOffset);
        var bytesPerPixel=4;
        
        var sourceIndex=(bytesPerPixel*xOffset) + (this.wall[savedMapIndex].buffer.width*bytesPerPixel)*yOffset;

        var lastSourceIndex= sourceIndex + (this.wall[savedMapIndex].buffer.width*this.wall[savedMapIndex].buffer.height*bytesPerPixel);
        
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
            
                                                 
    
            var red=Math.floor(this.wall[savedMapIndex].pixels[sourceIndex]*brightnessLevel);
            var green=Math.floor(this.wall[savedMapIndex].pixels[sourceIndex+1]*brightnessLevel);
            var blue=Math.floor(this.wall[savedMapIndex].pixels[sourceIndex+2]*brightnessLevel);
            var alpha=Math.floor(this.wall[savedMapIndex].pixels[sourceIndex+3]);
            
            // while there's a row to draw & not end of drawing area
            while (yError>=this.wall[savedMapIndex].buffer.height)
            {                  
                yError-=this.wall[savedMapIndex].buffer.height;

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
            sourceIndex+=(bytesPerPixel*this.wall[savedMapIndex].buffer.width);
            if (sourceIndex>lastSourceIndex)
                sourceIndex=lastSourceIndex;            
        }

    },    







    drawAllObjects: function()
    {
        // DRAW THE OBJECTS
        spriteZDistances = [];
        
        for (var i = 0; i < this.zspritesgroupArray.length; i++)
        {
            if (this.zspritesgroupArray[i].inplay) 
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


        // visible range to limit object drawing to. object cast column (occ) is the object center, 
        // so wider objects require a bigger range than the projection plane width (0..319) to not blink out of view
        if (occ<-100 || occ>419)
        {
            return;
        }
                

        var targetHit;
        var targetTolerance = 16;
        var bullet_hit_ED = 0;
        for (var i = 0; i < this.bulletsprites.length; i++)
        {
            if (this.bulletsprites[i].inplay)
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
        }

        var playerHit;
        var player_targetTolerance = 16;
        var player_hit_ED = 0;

        for (var i = 0; i < this.enemybulletsprites.length; i++)
        {
            if (this.enemybulletsprites[i].inplay)
            {
                if ( Phaser.Math.Fuzzy.Equal(this.enemybulletsprites[i].x,this.fPlayerX,player_targetTolerance) && Phaser.Math.Fuzzy.Equal(this.enemybulletsprites[i].y,this.fPlayerY,player_targetTolerance) )
                {
                    var net_ebullet_elev = this.enemybulletsprites[i].base_elevation+this.enemybulletsprites[i].elevation_delta;            
                    var net_player_elev = this.fPlayerElevation; // zsprite.base_elevation+zsprite.elevation_delta;
                    
                    if (Phaser.Math.Fuzzy.Equal(net_ebullet_elev,net_player_elev,player_targetTolerance))
                    {
                        playerHit=true;
                        playerHitCount++;
                        if (soundfx_enabled) { this.sound.playAudioSprite('sfx', 'char move') }
                        this.cameras.main.shake(260);
                    }                
                }
            }
        }

        
        var current_ED = zsprite.elevation_delta;
        var abs_ED = (zsprite.base_elevation+current_ED)-this.fPlayerElevation;        
        
        if ( targetHit && (zsprite.type == 'target') ) 
        {
            zsprite.hitcount++;
            if (zsprite.hitcount>0)
            {
                
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

                thisexpsprite.inplay=true;

                thisexpsprite.base_elevation=abs_ED+this.fPlayerElevation;
                
                thisexpsprite.distance=zsprite.distance;
                thisexpsprite.timecheck = game.loop.now;

                

                for (var i = 0; i < thisexpsprite.numBurstPixels; i++)
                {
                    thisexpsprite.burstpixels[i] = {};

                    thisexpsprite.burstpixels[i].xincr = Phaser.Math.RND.realInRange(-1.5, 1.5);
                    thisexpsprite.burstpixels[i].yincr = Phaser.Math.RND.realInRange(-1.5, 1.5);
                    thisexpsprite.burstpixels[i].xpos = explosionsize/2;
                    thisexpsprite.burstpixels[i].ypos = explosionsize/2;
                }

                
                zsprite.hitcount = 0;
                zsprite.inplay = false;
            }
            
                        
        }
         

        if (zsprite.animated)
        {
            var projectedObjectHeight=zsprite.buffer.height*this.fPlayerDistanceToTheProjectionPlane/zsprite.distance;
            var projectedObjectWidth=zsprite.framewidth*this.fPlayerDistanceToTheProjectionPlane/zsprite.distance;

            var projected_ed = abs_ED*(projectedObjectHeight/zsprite.buffer.height);
            
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
                    var brightness;

                    if (targetHit) {brightness=1.0} else {brightness=1.0}
                    this.drawObjectSlice(zsprite,calcColumn,topOfObject,1,(bottomOfObject-topOfObject),Math.floor(i*imgstep)+frameoffset,0, yOffset, projectedDelta, brightness);                    
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
            
            var projected_ed = abs_ED*(projectedObjectHeight/zsprite.buffer.height);
           
            var bottomOfObject = Math.round(this.fProjectionPlaneYCenter+(projectedObjectHeight*0.5)-projected_ed);
            var topOfObject = Math.round(this.fProjectionPlaneYCenter-(projectedObjectHeight*0.5)-projected_ed);

            if (topOfObject<0 && bottomOfObject>199)
            {
                
                var pp_delta = Math.floor(this.PROJECTIONPLANEHEIGHT/2 - this.fProjectionPlaneYCenter);                
                var abs_pp_delta = Math.abs(pp_delta);
                var adj_pp_delta = (this.fTanTable[abs_pp_delta]*zsprite.distance);

                var yd1 = (200*zsprite.buffer.height/projectedObjectHeight);
                var yd2 = (.5*(zsprite.buffer.height-yd1));
                
                projectedDelta = (bottomOfObject-topOfObject);    
                topOfObject=0;

                if (pp_delta>0)
                {
                    yOffset = Math.floor(yd2+(abs_ED+adj_pp_delta)) ;
                }
                else
                {
                    yOffset = Math.floor(yd2+(abs_ED-adj_pp_delta)) ;
                    
                }


            }
            else
            {
                projectedDelta = null;
                yOffset = 0;
            }
            

// var debugt = [];

// debugt.push('topOfObject: '+ topOfObject );
// debugt.push('projectedDelta: '+ projectedDelta );
// debugt.push('yOffset: '+ yOffset );

// debugt.push('sprite ht: '+ zsprite.img.height );
// debugt.push('sprite proj.ht: '+ projectedObjectHeight );
// debugt.push('sprite elev: '+ zsprite.elevation_delta );
// debugt.push('sprite proj.ed: '+ projected_ed );
// debugt.push('sprite saved.ed: '+ saved_ed );

// debugt.push('yd0: '+ yd0 );
// debugt.push('yd1: '+ yd1 );
// debugt.push('yd2: '+ yd2 );

// debugt.push('fps: '+ Math.floor(this.sys.game.loop.actualFps.toString()) );

//debug.setText(debugt);


            for (var i=0;i<projectedObjectWidth;i++)
            {
                var calcColumn = Math.floor(occ-projectedObjectWidth/2)+i;

                if (zsprite.distance<savedColumnDistances[calcColumn])
                {
                    var imgstep = zsprite.buffer.width/projectedObjectWidth;
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

    }


});



var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 320,
    height: 200,
    transparent: false,
    roundPixels: true,
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

var sound_enabled;
var music;

//for textcallback
var i = 0;
var j = 1.0; 
var hsv = [];
var hsvindex=0;
//


var audioIndex=0;
var touchActivated=false;
var gamepad=false;
var soundfx_enabled = false;

var keys;
var cursors;

var objectGangs = [];//'flybugs','plantedrocks','blueorbs','neonorbs','ferns','classictrees','barerocks','plants','shrooms','fancytrees','oddtrees','gems',
                    //'frogs','pinkblobs','redwings','octos','cydrones','ufos','firtrees','redtrees','palmtrees','baretrees','brightflowers','elegantflowers',
var og_index = 0;
var wallCastMask = false;

var gamedisplayImage;

var tilt_mode = true;
var drive_mode = false;
var demo_mode = false;
var menu_mode = false;
var game_mode = false;
//// temp
var cont;
////
var menu1_cont;
var menu2_cont;
var editor_cont;
var touchgui_cont;
var menugui_cont;

var UICam;
var debug;
var access_menu;


var savedColumnDistances=[]; //to assist with detecting object-wall overlap


//var targetsnearcenterarray=[];
var targetData={};
var explosionspritesArray=[];
var explosionsize;

var horizontalMouseDelta=0;
var verticalMouseDelta=0;

var guide_multi_activeY;
var guide_multi;
var guide_zspeed;
var guide_left;
var guide_right;
var guide_sleft;
var guide_sright;
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

var playerHitCount = 0;

var map0=
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------';

var map3=
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------4444444444444444444-----------'+
                            '----------6-----------------6-----------'+
                            '----------6-----------------------------'+
                            '----------6-----------------6-----------'+
                            '----------4444444444444444444-----------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------'+
                            '----------------------------------------';
                            

var accessMenuData = [
"................",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"................"
];

var guideInputHorizontalData = [
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


var guideInputVerticalData = [
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




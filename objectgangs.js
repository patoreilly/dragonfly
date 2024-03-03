

function activate_flybugs(thisContext,quantity)
{
    active_objectGangs.push('flybugs');
    //animation test sprite 4
        for (var j=0;j<quantity;j++)
        {

            a_zsprite = thisContext.add.image();
            a_zsprite.label = "flybugs";
            a_zsprite.type = 'target';
            a_zsprite.hitcount = 0;
            a_zsprite.explosioncolor= 'violet';


            a_zsprite.img = thisContext.textures.get('flybug_anim_52x34x3.png').getSourceImage();

            a_zsprite.animationData = thisContext.animationData['flybug_anim_52x34x3.png'];

            var randomKey = Math.random().toString();
                a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
                a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
                var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
                a_zsprite.pixels = imageData.data;

            a_zsprite.x = 2000;//Phaser.Math.Between(100, 668);
            a_zsprite.y = 2000;//Phaser.Math.Between(100, 1180);
            a_zsprite.dx = Phaser.Math.RND.realInRange(-3.5, 3.5);
            a_zsprite.dy = Phaser.Math.RND.realInRange(-3.5, 3.5);
            a_zsprite.animated = true;
            a_zsprite.animationtimecheck=0;
            a_zsprite.frametimer = 50;
            a_zsprite.inplay = false;
            a_zsprite.numframes = 3;
            a_zsprite.framewidth = 52;
            a_zsprite.frameindex = 0;

            a_zsprite.elevation_delta = 100;//Phaser.Math.Between(-64,100);
            a_zsprite.base_elevation = 64;


            // .num_bullets enemy bullet sprite indexes will proceed the enemy sprite index shooting them
            // the index of the last bullet is marked, shotIndex will point at the first bullet
            a_zsprite.num_bullets = 8;

            a_zsprite.shotIndexMarker = thisContext.zspritesgroupArray.length + a_zsprite.num_bullets;
            a_zsprite.shotIndex = a_zsprite.shotIndexMarker - a_zsprite.num_bullets;

            a_zsprite.shot_timestart = 0;
            a_zsprite.shot_timecheck = 0;        
            a_zsprite.shot_frequency = Phaser.Math.Between(5000,6000);
            a_zsprite.shot_duration = Phaser.Math.Between(500,700);
            


            thisContext.tweens.add({
                targets: a_zsprite,
                elevation_delta: 0,
                ease: 'Sine.easeInOut',
                duration: 1500,
                yoyo: true,
                repeat: -1
            });

            a_zsprite.move = function()
            {
                this.x+=this.dx;
                if ( this.x<thisContext.TILE_SIZE || this.x>(thisContext.MAP_WIDTH-1)*thisContext.TILE_SIZE ) this.dx*=-1;

                this.y+=this.dy;
                if ( this.y<thisContext.TILE_SIZE || this.y>(thisContext.MAP_HEIGHT-1)*thisContext.TILE_SIZE ) this.dy*=-1;

                // CHECK COLLISION AGAINST WALLS
                // compute cell position


                var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
                var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

                // compute position relative to cell (ie: how many pixel from edge of cell)
                var playerXCellOffset = this.x % thisContext.TILE_SIZE;
                var playerYCellOffset = this.y % thisContext.TILE_SIZE;

                var minDistanceToWall=20;
                
                // make sure the player don't bump into walls
                if (this.dx>0)
                {
                    // moving right
                    if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
                        (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
                    {
                        // reverse x dir
                        this.dx*=-1;
                    }               
                }
                else
                {
                    // moving left
                    if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
                        (playerXCellOffset < (minDistanceToWall)))
                    {
                        /// reverse x dir
                        this.dx*=-1;
                    } 
                } 

                if (this.dy<0)
                {
                    // moving up
                    if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
                        (playerYCellOffset < (minDistanceToWall)))
                    {
                        // reverse y dir
                        this.dy*=-1;
                    }
                }
                else
                {
                    // moving down                                  
                    if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
                        (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
                    {
                        // reverse y dir
                        this.dy*=-1;
                    }
                }





                ///enemy fire code
                if (game.loop.now > this.shot_timestart + this.shot_frequency)
                {
                    this.shot_timestart = game.loop.now;

                    this.shot_frequency = Phaser.Math.Between(3400,6000);
                    this.shot_duration = Phaser.Math.Between(500,700);
                }

                if (game.loop.now < this.shot_timestart + this.shot_duration)
                {
                    

                    if (game.loop.now > this.shot_timecheck + 100)
                    {
                        this.shot_timecheck = game.loop.now;

                        thisContext.zspritesgroupArray[this.shotIndex].x = Math.floor(this.x);//+Math.round(shotXDir*.25);//*thisContext.fPlayerSpeed )*adjustshotposition;
                        thisContext.zspritesgroupArray[this.shotIndex].y = Math.floor(this.y);//+Math.round(shotYDir*.25);//*adjustshotposition;

                        var distance = Phaser.Math.Distance.Between(thisContext.fPlayerX,thisContext.fPlayerY,this.x,this.y);
                        var xdelta = thisContext.fPlayerX-this.x;//Math.abs(
                        var ydelta = thisContext.fPlayerY-this.y;
                        var myrad = Math.asin(ydelta/distance);
                        var myarc = Math.round(thisContext.radToArc(myrad))+thisContext.ANGLE180;
                        
                        // var debugt = [];
                        //     debugt.push('xdelta: '+ xdelta );
                        //     debugt.push('ydelta: '+ ydelta );
                        //     debugt.push('myrad: '+ myrad );
                        //     debugt.push('myarc: '+ myarc );
                        //     debugt.push('distance: '+ distance );
                            
                        //     debug.setText(debugt);

                        /// to far for javascript? abort firing 
                        if (distance>1500) return;    
                        
                        if (xdelta>0)
                        {
                            var shotXDir=thisContext.fCosTable[myarc];//thisContext.fPlayerArc
                            var shotYDir=thisContext.fSinTable[myarc];
                        }
                        else
                        {
                            var shotXDir=-thisContext.fCosTable[myarc];//thisContext.fPlayerArc
                            var shotYDir=thisContext.fSinTable[myarc];
                        }
                        
                        
                        thisContext.zspritesgroupArray[this.shotIndex].dx=Math.round(shotXDir*32);//thisContext.fPlayerSpeed*8
                        thisContext.zspritesgroupArray[this.shotIndex].dy=Math.round(shotYDir*32);//8

                        //var current_ED = this.elevation_delta;
                        //var abs_ED = thisContext.fPlayerElevation - (this.base_elevation+current_ED);
                        thisContext.zspritesgroupArray[this.shotIndex].base_elevation = this.elevation_delta+this.base_elevation;
                         
                        thisContext.zspritesgroupArray[this.shotIndex].inplay = true;

                        thisContext.zspritesgroupArray[this.shotIndex].pp_delta = Math.floor((thisContext.fPlayerElevation -  thisContext.zspritesgroupArray[this.shotIndex].base_elevation )*(320/distance));

                        this.shotIndex++;
                        if (this.shotIndex==this.shotIndexMarker) this.shotIndex=this.shotIndexMarker-this.num_bullets;
                    }
                }
                
            };

            // this enemy bullets
        
            a_zsprite.bulletsprites = [];
            //this.bulletcolors = ['red','green','blue','orange','cyan','violet','white','black'];
            for (var i = 0; i < a_zsprite.num_bullets; i++)
            {
                a_zsprite.bulletsprites[i] = thisContext.add.image();
                a_zsprite.bulletsprites[i].img = thisContext.textures.get('purple_ball.png').getSourceImage();

                var randomKey = Math.random().toString();
                a_zsprite.bulletsprites[i].buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.bulletsprites[i].img.width, a_zsprite.bulletsprites[i].img.height);
                a_zsprite.bulletsprites[i].buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.bulletsprites[i].img, 0, 0);        
                var imageData = a_zsprite.bulletsprites[i].buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.bulletsprites[i].img.width, a_zsprite.bulletsprites[i].img.height);
                a_zsprite.bulletsprites[i].pixels = imageData.data;

                a_zsprite.bulletsprites[i].type = 'bullet';
                

                
                a_zsprite.bulletsprites[i].dx = 0;
                a_zsprite.bulletsprites[i].dy = 0;
                a_zsprite.bulletsprites[i].pp_delta = 0;
                a_zsprite.bulletsprites[i].distance = 0;

                

                a_zsprite.bulletsprites[i].elevation_delta = 0;
                a_zsprite.bulletsprites[i].base_elevation = 0;

                
                a_zsprite.bulletsprites[i].animated = false;
                //this.bulletsprites[i].flying = true;
                a_zsprite.bulletsprites[i].inplay = false;
                a_zsprite.bulletsprites[i].currentMapIndex = 0;
                a_zsprite.bulletsprites[i].shotIndexMarker = a_zsprite.shotIndexMarker;



                
                a_zsprite.bulletsprites[i].move = function() 
                {
                    // the cannon relative to the player center view
                    //var shooterOffset = -14;
                    //var vert_look_range = 40;
                    var ax= Math.floor(thisContext.zspritesgroupArray[this.shotIndexMarker].x);
                    var ay= Math.floor(thisContext.zspritesgroupArray[this.shotIndexMarker].y);
                    //console.log(ax);
                    //console.log(ay);
                    var distance = Phaser.Math.Distance.Between(this.x,this.y,ax,ay);
                    //var pp_delta = Math.floor(thisContext.PROJECTIONPLANEHEIGHT/2 - thisContext.fProjectionPlaneYCenter);
                    var abs_pp_delta = Math.abs(this.pp_delta);
                    var new_elev_delta = Math.floor(thisContext.fTanTable[abs_pp_delta]*distance);

                    if (this.pp_delta<0)
                    {
                        new_elev_delta *= -1;
                    }


                    //var adj_pp_delta = this.pp_delta/vert_look_range*shooterOffset;

                    this.elevation_delta = new_elev_delta; //shooterOffset+adj_pp_delta-new_elev_delta;
                    
                    this.x-=this.dx; 
                    this.y-=this.dy;
                    if (this.x<0 || this.x>thisContext.MAP_WIDTH*thisContext.TILE_SIZE || this.y<0 || this.y>thisContext.MAP_HEIGHT*thisContext.TILE_SIZE || distance>1500) 
                    {
                        this.inplay = false;
                        this.distance = 0;
                        this.elevation_delta = 0;                
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
                            this.distance = 0; 
                            this.elevation_delta = 0;
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
                            this.distance = 0; 
                            this.elevation_delta = 0;
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
                            this.distance = 0; 
                            this.elevation_delta = 0;
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
                            this.distance = 0; 
                            this.elevation_delta = 0;
                        }
                    }
                }


                
                thisContext.enemybulletsprites.push(a_zsprite.bulletsprites[i]);
                thisContext.zspritesgroup.add(a_zsprite.bulletsprites[i]);
            }                        
            
            thisContext.zspritesgroup.add(a_zsprite);
        }
}



//////////   simple objects

function activate_plantedrocks(thisContext,quantity)
{
    active_objectGangs.push('plantedrocks');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'plantedrocks';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'red';

        var f_index = Phaser.Math.Between(1,4);

        a_zsprite.img = thisContext.textures.get('rock'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['rock'+f_index+'.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        a_zsprite.inplay = true;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2)-4;//32;

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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_barerocks(thisContext,quantity)
{
    active_objectGangs.push('barerocks');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'barerocks';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'red';

        var f_index = Phaser.Math.Between(5,8);

        a_zsprite.img = thisContext.textures.get('rock'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['rock'+f_index+'.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // this.Context.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-this.Context.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        a_zsprite.waveData = Phaser.Math.SinCosTableGenerator(256, 3, 3, 32);

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_elegantflowers(thisContext,quantity)
{
    active_objectGangs.push('elegantflowers');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'elegantflowers';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'red';

        var f_index = Phaser.Math.Between(1,3);

        a_zsprite.img = thisContext.textures.get('flower'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['flower'+f_index+'.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_brightflowers(thisContext,quantity)
{
    active_objectGangs.push('brightflowers');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'brightflowers';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'red';

        var f_index = Phaser.Math.Between(4,8);

        a_zsprite.img = thisContext.textures.get('flower'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['flower'+f_index+'.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_gems(thisContext,quantity)
{
    active_objectGangs.push('gems');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'gems';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        var f_index = Phaser.Math.Between(1,6);

        a_zsprite.img = thisContext.textures.get('gem'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['gem'+f_index+'.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);//32;

        // starting 
        a_zsprite.elevation_delta = 16;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_shrooms(thisContext,quantity)
{
    active_objectGangs.push('shrooms');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'shrooms';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        var f_index = Phaser.Math.Between(1,4);

        a_zsprite.img = thisContext.textures.get('shroom'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['shroom'+f_index+'.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_plants(thisContext,quantity)
{
    active_objectGangs.push('plants');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'plants';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        var f_index = Phaser.Math.Between(3,6);

        a_zsprite.img = thisContext.textures.get('plant'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['plant'+f_index+'.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_ferns(thisContext,quantity)
{
    active_objectGangs.push('ferns');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'ferns';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        var f_index = Phaser.Math.Between(1,8);

        a_zsprite.img = thisContext.textures.get('fern'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['fern'+f_index+'.png'];


        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2)-10;//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_firtrees(thisContext,quantity)
{
    active_objectGangs.push('firtrees');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'firtrees';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        

        a_zsprite.img = thisContext.textures.get('tree13.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['tree13.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2)-6;//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_baretrees(thisContext,quantity)
{
    active_objectGangs.push('baretrees');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'baretrees';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        

        a_zsprite.img = thisContext.textures.get('tree14.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['tree14.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2)-10;//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_redtrees(thisContext,quantity)
{
    active_objectGangs.push('redtrees');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'redtrees';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        

        a_zsprite.img = thisContext.textures.get('tree15.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['tree15.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2)-12;//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_palmtrees(thisContext,quantity)
{
    active_objectGangs.push('palmtrees');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'palmtrees';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        

        a_zsprite.img = thisContext.textures.get('tree16.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['tree16.png'];


        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2)-4;//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_fancytrees(thisContext,quantity)
{
    active_objectGangs.push('fancytrees');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'fancytrees';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        var f_index = Phaser.Math.Between(1,4);

        a_zsprite.img = thisContext.textures.get('tree'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['tree'+f_index+'.png'];

        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2)-16;//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        a_zsprite.waveData = Phaser.Math.SinCosTableGenerator(256, 3, 3, 32);

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

function activate_classictrees(thisContext,quantity)
{
    active_objectGangs.push('classictrees');

    for (var i = 0; i < quantity; i++)
    {
        a_zsprite = thisContext.add.image();
        a_zsprite.label = 'classictrees';
        a_zsprite.type = 'target';
        a_zsprite.hitcount = 0;
        a_zsprite.explosioncolor= 'green';

        var f_index = Phaser.Math.Between(5,10);

        a_zsprite.img = thisContext.textures.get('tree'+f_index+'.png').getSourceImage();

        a_zsprite.animationData = thisContext.animationData['tree'+f_index+'.png'];


        a_zsprite.x = Phaser.Math.Between(100,1180);
        a_zsprite.y = Phaser.Math.Between(100,1180);
        a_zsprite.animated = false;
        //a_zsprite.flying = false;
        a_zsprite.inplay = false;

        // where the object visually touches the ground based on 1/2 the height in pixels as standard
        a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2);//32;

        // starting 
        a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        // thisContext.tweens.add({
        // targets: a_zsprite,
        // elevation_delta: 0,//32-thisContext.fPlayerElevation,//Phaser.Math.Between(-64,64),
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
        a_zsprite.buffer = thisContext.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        a_zsprite.imagedata = imageData;

        a_zsprite.pixels = imageData.data;

        a_zsprite.waveData = Phaser.Math.SinCosTableGenerator(256, 3, 3, 32);

        thisContext.zspritesgroup.add(a_zsprite);
    }
}

        //     for (var i = 0; i < 30; i++)
        //     {
        //         a_zsprite = this.add.image();
        //         a_zsprite.label = 'oddtrees';
        //         a_zsprite.type = 'target';
        //         a_zsprite.hitcount = 0;
        //         a_zsprite.explosioncolor= 'green';

        //         var f_index = Phaser.Math.Between(11,16);

        //         a_zsprite.img = this.textures.get('tree'+f_index+'.png').getSourceImage();
        //         a_zsprite.x = Phaser.Math.Between(100,1180);
        //         a_zsprite.y = Phaser.Math.Between(100,1180);
        //         a_zsprite.animated = false;
        //         //a_zsprite.flying = false;
        //         a_zsprite.inplay = false;

        //         // where the object visually touches the ground based on 1/2 the height in pixels as standard
        //         a_zsprite.base_elevation = Math.floor(a_zsprite.img.height/2)-10;//32;

        //         // starting 
        //         a_zsprite.elevation_delta = 0;//Phaser.Math.Between(-50,70);

        //         // this.tweens.add({
        //         // targets: a_zsprite,
        //         // elevation_delta: 0,//32-this.fPlayerElevation,//Phaser.Math.Between(-64,64),
        //         // ease: 'Sine.easeInOut',
        //         // duration: 1500,
        //         // yoyo: true,
        //         // repeat: -1
        //         // });
        //         a_zsprite.move = function()
        //         {
        //             //
        //         };

        //         var randomKey = Math.random().toString();
        //         a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //         var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);

        //         a_zsprite.imagedata = imageData;

        //         a_zsprite.pixels = imageData.data;

        //         this.zspritesgroup.add(a_zsprite);
        //     }
        
        // //animation test sprite 6
        // for (var j=0;j<10;j++)
        // {


           

        //     // //  animated sprite set up for 2d display purpose 
        //     // //  must be loaded as .spritesheet with frame params and added as .sprite
        //     // var randomKey3 = Math.random().toString();

        //     // this.anims.create({
        //     //     key: randomKey3,
        //     //     frames: this.anims.generateFrameNumbers('atest5'),
        //     //     frameRate: 60,
        //     //     repeat: -1
        //     //     //yoyo: true
        //     // });

        
        //     // a_zsprite = this.add.sprite(0, 0, 'atest5').play(randomKey3).setOrigin(0).setScale(1);
        //     // //////////////////////////////

        //     // console.log(a_zsprite);



        //     a_zsprite = this.add.image();


        //     a_zsprite.label = "frogs";
        //     a_zsprite.type = 'target';
        //     a_zsprite.hitcount = 0;
        //     a_zsprite.explosioncolor= 'green';


        //     a_zsprite.img = this.textures.get('frog_anim_26x24x23.png').getSourceImage();

        //     var randomKey = Math.random().toString();
        //     a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //     a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //     var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
        //     a_zsprite.pixels = imageData.data;

        //     a_zsprite.x = Phaser.Math.Between(0,1280);
        //     a_zsprite.y = Phaser.Math.Between(0,1280);
        //     a_zsprite.dx = Phaser.Math.RND.realInRange(-2.5, 3.5);
        //     a_zsprite.dy = Phaser.Math.RND.realInRange(-2.5, 3.5);
        //     a_zsprite.animated = true;
        //     a_zsprite.animationtimecheck=0;
        //     a_zsprite.frametimer = 0;
        //     a_zsprite.inplay = false;
        //     a_zsprite.numframes = 23;
        //     a_zsprite.framewidth = 26;
        //     a_zsprite.frameindex = 0;

        //     a_zsprite.elevation_delta = Phaser.Math.Between(-64,100);;
        //     a_zsprite.base_elevation = 64;


        //     this.tweens.add({
        //         targets: a_zsprite,
        //         elevation_delta: 0,
        //         ease: 'Sine.easeInOut',
        //         duration: 2000,
        //         yoyo: true,
        //         repeat: -1
        //     });

        //     a_zsprite.move = function()
        //     {
        //         this.x+=this.dx;
        //         if ( this.x<thisContext.TILE_SIZE || this.x>(thisContext.MAP_WIDTH-1)*thisContext.TILE_SIZE ) this.dx*=-1;

        //         this.y+=this.dy;
        //         if ( this.y<thisContext.TILE_SIZE || this.y>(thisContext.MAP_HEIGHT-1)*thisContext.TILE_SIZE ) this.dy*=-1;

        //         // CHECK COLLISION AGAINST WALLS
        //         // compute cell position


        //         var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
        //         var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

        //         // compute position relative to cell (ie: how many pixel from edge of cell)
        //         var playerXCellOffset = this.x % thisContext.TILE_SIZE;
        //         var playerYCellOffset = this.y % thisContext.TILE_SIZE;

        //         var minDistanceToWall=20;
                
        //         // make sure the player don't bump into walls
        //         if (this.dx>0)
        //         {
        //             // moving right
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
        //                 (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse x dir
        //                 this.dx*=-1;
        //             }               
        //         }
        //         else
        //         {
        //             // moving left
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
        //                 (playerXCellOffset < (minDistanceToWall)))
        //             {
        //                 /// reverse x dir
        //                 this.dx*=-1;
        //             } 
        //         } 

        //         if (this.dy<0)
        //         {
        //             // moving up
        //             if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset < (minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }
        //         else
        //         {
        //             // moving down                                  
        //             if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }

        //     };                 
            
        //     this.zspritesgroup.add(a_zsprite);
        // }

        // //octo creature animation (type 1)
        // for (var j=0;j<24;j++)
        // {
        //     a_zsprite = this.add.image();
        //     a_zsprite.label = "octos";
        //     a_zsprite.type = 'target';
        //     a_zsprite.hitcount = 0;
        //     a_zsprite.explosioncolor= 'cyan';

        //     a_zsprite.img = this.textures.get('octo_anim_29x27x4.png').getSourceImage();

        //     var randomKey = Math.random().toString();
        //         a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //         var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.pixels = imageData.data;



        //     a_zsprite.x = Phaser.Math.Between(100,668);
        //     a_zsprite.y = Phaser.Math.Between(100,1180);
        //     a_zsprite.animated = true;
        //     //a_zsprite.flying = true;
        //     a_zsprite.animationtimecheck=0;
        //     a_zsprite.frametimer = 200;
        //     a_zsprite.inplay = false;
        //     a_zsprite.numframes = 4;
        //     a_zsprite.framewidth = 29;
        //     a_zsprite.frameindex = 0;
        //     a_zsprite.dx = Phaser.Math.RND.realInRange(2.5, 4.5);
        //     a_zsprite.dy = Phaser.Math.RND.realInRange(2.5, 4.5);

        //     a_zsprite.elevation_delta = Phaser.Math.Between(-64,64);
        //     a_zsprite.base_elevation = 64;//Phaser.Math.Between(0,64);

        //     this.tweens.add({
        //         targets: a_zsprite,
        //         elevation_delta: 0,
        //         ease: 'Sine.easeInOut',
        //         duration: 2000,
        //         yoyo: true,
        //         repeat: -1
        //     });
            
            
            

        //     a_zsprite.move = function()
        //     {
        //         this.x+=this.dx;
        //         if ( this.x<thisContext.TILE_SIZE || this.x>(thisContext.MAP_WIDTH-1)*thisContext.TILE_SIZE ) this.dx*=-1;

        //         this.y+=this.dy;
        //         if ( this.y<thisContext.TILE_SIZE || this.y>(thisContext.MAP_HEIGHT-1)*thisContext.TILE_SIZE ) this.dy*=-1;

        //         // CHECK COLLISION AGAINST WALLS
        //         // compute cell position


        //         var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
        //         var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

        //         // compute position relative to cell (ie: how many pixel from edge of cell)
        //         var playerXCellOffset = this.x % thisContext.TILE_SIZE;
        //         var playerYCellOffset = this.y % thisContext.TILE_SIZE;

        //         var minDistanceToWall=20;
                
        //         // make sure the player don't bump into walls
        //         if (this.dx>0)
        //         {
        //             // moving right
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
        //                 (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse x dir
        //                 this.dx*=-1;
        //             }               
        //         }
        //         else
        //         {
        //             // moving left
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
        //                 (playerXCellOffset < (minDistanceToWall)))
        //             {
        //                 /// reverse x dir
        //                 this.dx*=-1;
        //             } 
        //         } 

        //         if (this.dy<0)
        //         {
        //             // moving up
        //             if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset < (minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }
        //         else
        //         {
        //             // moving down                                  
        //             if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }

                
        //     };

        //     this.zspritesgroup.add(a_zsprite);
        // }

        // //cydrone creature animation (type 1)
        // for (var j=0;j<24;j++)
        // {
        //     a_zsprite = this.add.image();
        //     a_zsprite.label = "cydrones";
        //     a_zsprite.type = 'target';
        //     a_zsprite.hitcount = 0;
        //     a_zsprite.explosioncolor= 'cyan';

        //     a_zsprite.img = this.textures.get('cydrone_anim_20x26x4.png').getSourceImage();

        //     var randomKey = Math.random().toString();
        //         a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //         var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.pixels = imageData.data;



        //     a_zsprite.x = Phaser.Math.Between(100,668);
        //     a_zsprite.y = Phaser.Math.Between(100,1180);
        //     a_zsprite.animated = true;
        //     //a_zsprite.flying = true;
        //     a_zsprite.animationtimecheck=0;
        //     a_zsprite.frametimer = 200;
        //     a_zsprite.inplay = false;
        //     a_zsprite.numframes = 4;
        //     a_zsprite.framewidth = 20;
        //     a_zsprite.frameindex = 0;
        //     a_zsprite.dx = Phaser.Math.RND.realInRange(2.5, 4.5);
        //     a_zsprite.dy = Phaser.Math.RND.realInRange(2.5, 4.5);

        //     a_zsprite.elevation_delta = Phaser.Math.Between(-64,64);
        //     a_zsprite.base_elevation = 64;//Phaser.Math.Between(0,64);

        //     this.tweens.add({
        //         targets: a_zsprite,
        //         elevation_delta: 0,
        //         ease: 'Sine.easeInOut',
        //         duration: 2000,
        //         yoyo: true,
        //         repeat: -1
        //     });
            
            
            

        //     a_zsprite.move = function()
        //     {
        //         this.x+=this.dx;
        //         if ( this.x<thisContext.TILE_SIZE || this.x>(thisContext.MAP_WIDTH-1)*thisContext.TILE_SIZE ) this.dx*=-1;

        //         this.y+=this.dy;
        //         if ( this.y<thisContext.TILE_SIZE || this.y>(thisContext.MAP_HEIGHT-1)*thisContext.TILE_SIZE ) this.dy*=-1;

        //         // CHECK COLLISION AGAINST WALLS
        //         // compute cell position


        //         var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
        //         var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

        //         // compute position relative to cell (ie: how many pixel from edge of cell)
        //         var playerXCellOffset = this.x % thisContext.TILE_SIZE;
        //         var playerYCellOffset = this.y % thisContext.TILE_SIZE;

        //         var minDistanceToWall=20;
                
        //         // make sure the player don't bump into walls
        //         if (this.dx>0)
        //         {
        //             // moving right
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
        //                 (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse x dir
        //                 this.dx*=-1;
        //             }               
        //         }
        //         else
        //         {
        //             // moving left
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
        //                 (playerXCellOffset < (minDistanceToWall)))
        //             {
        //                 /// reverse x dir
        //                 this.dx*=-1;
        //             } 
        //         } 

        //         if (this.dy<0)
        //         {
        //             // moving up
        //             if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset < (minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }
        //         else
        //         {
        //             // moving down                                  
        //             if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }

                        
        //     };

        //     this.zspritesgroup.add(a_zsprite);
        // }

        // //animation test sprite - type 1
        // for (var j=0;j<24;j++)
        // {
        //     a_zsprite = this.add.image();
        //     a_zsprite.label = "redwings";
        //     a_zsprite.type = 'target';
        //     a_zsprite.hitcount = 0;
        //     a_zsprite.explosioncolor= 'cyan';

        //     a_zsprite.img = this.textures.get('redwing_anim_32x24x4.png').getSourceImage();

        //     var randomKey = Math.random().toString();
        //         a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //         var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.pixels = imageData.data;



        //     a_zsprite.x = Phaser.Math.Between(100,668);
        //     a_zsprite.y = Phaser.Math.Between(100,1180);
        //     a_zsprite.animated = true;
        //     //a_zsprite.flying = true;
        //     a_zsprite.animationtimecheck=0;
        //     a_zsprite.frametimer = 200;
        //     a_zsprite.inplay = false;
        //     a_zsprite.numframes = 4;
        //     a_zsprite.framewidth = 32;
        //     a_zsprite.frameindex = 0;
        //     a_zsprite.dx = Phaser.Math.RND.realInRange(2.5, 4.5);
        //     a_zsprite.dy = Phaser.Math.RND.realInRange(2.5, 4.5);

        //     a_zsprite.elevation_delta = Phaser.Math.Between(-64,64);
        //     a_zsprite.base_elevation = 64;//Phaser.Math.Between(0,64);

        //     this.tweens.add({
        //         targets: a_zsprite,
        //         elevation_delta: 0,
        //         ease: 'Sine.easeInOut',
        //         duration: 2000,
        //         yoyo: true,
        //         repeat: -1
        //     });
            
            
            

        //     a_zsprite.move = function()
        //     {
        //         this.x+=this.dx;
        //         if ( this.x<thisContext.TILE_SIZE || this.x>(thisContext.MAP_WIDTH-1)*thisContext.TILE_SIZE ) this.dx*=-1;

        //         this.y+=this.dy;
        //         if ( this.y<thisContext.TILE_SIZE || this.y>(thisContext.MAP_HEIGHT-1)*thisContext.TILE_SIZE ) this.dy*=-1;

        //         // CHECK COLLISION AGAINST WALLS
        //         // compute cell position


        //         var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
        //         var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

        //         // compute position relative to cell (ie: how many pixel from edge of cell)
        //         var playerXCellOffset = this.x % thisContext.TILE_SIZE;
        //         var playerYCellOffset = this.y % thisContext.TILE_SIZE;

        //         var minDistanceToWall=20;
                
        //         // make sure the player don't bump into walls
        //         if (this.dx>0)
        //         {
        //             // moving right
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
        //                 (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse x dir
        //                 this.dx*=-1;
        //             }               
        //         }
        //         else
        //         {
        //             // moving left
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
        //                 (playerXCellOffset < (minDistanceToWall)))
        //             {
        //                 /// reverse x dir
        //                 this.dx*=-1;
        //             } 
        //         } 

        //         if (this.dy<0)
        //         {
        //             // moving up
        //             if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset < (minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }
        //         else
        //         {
        //             // moving down                                  
        //             if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }

                        
        //     };

        //     this.zspritesgroup.add(a_zsprite);
        // }
        



        // //animation test sprite 2
        // for (var j=0;j<20;j++)
        // {

        //     a_zsprite = this.add.image();
        //     a_zsprite.label = "pinkblobs";
        //     a_zsprite.type = 'target';
        //     a_zsprite.hitcount = 0;
        //     a_zsprite.explosioncolor= 'violet';


        //     a_zsprite.img = this.textures.get('pinkblob_anim_28x32x12.png').getSourceImage();

        //     var randomKey = Math.random().toString();
        //         a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //         var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.pixels = imageData.data;

        //     a_zsprite.x = 300+(j*5);
        //     a_zsprite.y = 250+(j*5);
        //     a_zsprite.animated = true;
        //     //a_zsprite.flying = true;
        //     a_zsprite.animationtimecheck=0;
        //     a_zsprite.frametimer = 200;
        //     a_zsprite.inplay = false;
        //     a_zsprite.numframes = 12;
        //     a_zsprite.framewidth = 28;
        //     a_zsprite.frameindex = 0;

        //     a_zsprite.elevation_delta = 32;//Phaser.Math.Between(0,100);
        //     a_zsprite.base_elevation = 32;


        //     this.tweens.add({
        //         targets: a_zsprite,
        //         elevation_delta: 96,
        //         ease: 'Sine.easeInOut',
        //         duration: 1000,
        //         delay: j*100,
        //         yoyo: true,
        //         repeat: -1
        //     });





        //     a_zsprite.followerdata = 0;

        //     var _path = new Phaser.Curves.Path(100, 100);

        //     _path.splineTo([ 160,136,440,280,640,56,870,194,1240,56,1160,536,1200,736,840,896,800,536,480,816,80,776,400,496,100,250 ]);
        //     _path.closePath();

        //     // _path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);

        //     // _path.lineTo(700, 300);

        //     // _path.lineTo(600, 350);

        //     // _path.ellipseTo(200, 100, 100, 250, false, 0);

        //     // _path.cubicBezierTo(222, 119, 308, 107, 208, 368);

        //     // _path.ellipseTo(60, 60, 0, 360, true);

        //     a_zsprite.path = _path;

        //     this.tweens.add({
        //         targets: a_zsprite,
        //         followerdata: 1,
        //         ease: 'none',
        //         duration: 14000,
        //         delay: j*120,
        //         yoyo: false,
        //         repeat: -1
        //     });

        //     a_zsprite.move = function()
        //     {
        //         this.x=this.path.getPoint(this.followerdata).x;
        //         this.y=this.path.getPoint(this.followerdata).y;
        //     };                        
            
        //     this.zspritesgroup.add(a_zsprite);
        // }


        // //animation test sprite 3
        // for (var j=0;j<12;j++)
        // {

        //     a_zsprite = this.add.image();
        //     a_zsprite.label = "ufos";
        //     a_zsprite.type = 'target';
        //     a_zsprite.hitcount = 0;
        //     a_zsprite.explosioncolor= 'violet';


        //     a_zsprite.img = this.textures.get('ufo_anim_29x26x40.png').getSourceImage();

        //     var randomKey = Math.random().toString();
        //         a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //         var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.pixels = imageData.data;

        //     a_zsprite.x = Phaser.Math.Between(100, 668);
        //     a_zsprite.y = Phaser.Math.Between(100, 1180);
        //     // a_zsprite.xincr = Phaser.Math.RND.realInRange(4.5, 8.5);
        //     // a_zsprite.yincr = Phaser.Math.RND.realInRange(4.5, 8.5);
        //     a_zsprite.animated = true;
        //     //a_zsprite.flying = false;
        //     a_zsprite.animationtimecheck=0;
        //     a_zsprite.frametimer = 0;
        //     a_zsprite.inplay = false;
        //     a_zsprite.numframes = 40;
        //     a_zsprite.framewidth = 29;
        //     a_zsprite.frameindex = 0;

        //     a_zsprite.elevation_delta = 0;
        //     a_zsprite.base_elevation = 32;

        //     this.tweens.timeline({

        //     targets: a_zsprite,
        //     ease: 'Expo.easeInOut',
            
        //     delay: Phaser.Math.Between(100, 500),
        //     loop: -1,

        //     tweens: [{
                
        //         x: Phaser.Math.Between(100, 668),
        //         base_elevation: Phaser.Math.Between(0, 96),
        //         duration: 1000
        //     },
        //     {
                
        //         y: Phaser.Math.Between(100, 1180),
        //         base_elevation: Phaser.Math.Between(0, 96),
        //         duration: 1000
        //     },
        //     {
                
        //         x: a_zsprite.x,
        //         base_elevation: Phaser.Math.Between(0, 96),
        //         duration: 1000
        //     },
        //     {
                
        //         y: a_zsprite.y,
        //         base_elevation: Phaser.Math.Between(0, 96),
        //         duration: 1000
        //     }]

        //     });
        //     // this.tweens.add({
        //     //     targets: a_zsprite,
        //     //     elevation_delta: Phaser.Math.Between(0, 64),
        //     //     // x: Phaser.Math.Between(100, 668),
        //     //     // y: Phaser.Math.Between(100, 1180),
        //     //     ease: 'Quad.easeInOut',
        //     //     duration: 1000,
        //     //     yoyo: true,
        //     //     repeat: -1
        //     // });

        //     a_zsprite.move = function()
        //     {
        //         // this.x+=this.dx;
        //         // if ( this.x<thisContext.TILE_SIZE || this.x>(thisContext.MAP_WIDTH-1)*thisContext.TILE_SIZE ) this.dx*=-1;

        //         // this.y+=this.dy;
        //         // if ( this.y<thisContext.TILE_SIZE || this.y>(thisContext.MAP_HEIGHT-1)*thisContext.TILE_SIZE ) this.dy*=-1;

        //         // // CHECK COLLISION AGAINST WALLS
        //         // // compute cell position


        //         // var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
        //         // var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

        //         // // compute position relative to cell (ie: how many pixel from edge of cell)
        //         // var playerXCellOffset = this.x % thisContext.TILE_SIZE;
        //         // var playerYCellOffset = this.y % thisContext.TILE_SIZE;

        //         // var minDistanceToWall=20;
                
        //         // // make sure the player don't bump into walls
        //         // if (this.dx>0)
        //         // {
        //         //     // moving right
        //         //     if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
        //         //         (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //         //     {
        //         //         // reverse x dir
        //         //         this.dx*=-1;
        //         //     }               
        //         // }
        //         // else
        //         // {
        //         //     // moving left
        //         //     if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
        //         //         (playerXCellOffset < (minDistanceToWall)))
        //         //     {
        //         //         /// reverse x dir
        //         //         this.dx*=-1;
        //         //     } 
        //         // } 

        //         // if (this.dy<0)
        //         // {
        //         //     // moving up
        //         //     if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //         //         (playerYCellOffset < (minDistanceToWall)))
        //         //     {
        //         //         // reverse y dir
        //         //         this.dy*=-1;
        //         //     }
        //         // }
        //         // else
        //         // {
        //         //     // moving down                                  
        //         //     if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //         //         (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //         //     {
        //         //         // reverse y dir
        //         //         this.dy*=-1;
        //         //     }
        //         // }

        //     };                        
            
        //     this.zspritesgroup.add(a_zsprite);
        // }

        // //animation test sprite 5
        // for (var j=0;j<15;j++)
        // {

        //     a_zsprite = this.add.image();
        //     a_zsprite.label = "neonorbs";
        //     a_zsprite.type = 'target';
        //     a_zsprite.hitcount = 0;
        //     a_zsprite.explosioncolor= 'violet';

        //     var b_index = Phaser.Math.Between(1,3);
        //     a_zsprite.img = this.textures.get('ball'+b_index+'.png').getSourceImage();


        //     var randomKey = Math.random().toString();
        //         a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //         var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.pixels = imageData.data;

        //     a_zsprite.x = Phaser.Math.Between(100,1180);
        //     a_zsprite.y = Phaser.Math.Between(100,1180);
        //     a_zsprite.dx = Phaser.Math.RND.realInRange(3, 7);
        //     a_zsprite.dy = Phaser.Math.RND.realInRange(-3, -7);
        //     a_zsprite.animated = false;
        //     // a_zsprite.animationtimecheck=0;
        //     // a_zsprite.frametimer = 50;
        //     a_zsprite.inplay = false;
        //     // a_zsprite.numframes = 3;
        //     // a_zsprite.framewidth = 52;
        //     // a_zsprite.frameindex = 0;

        //     a_zsprite.elevation_delta = 0;
        //     a_zsprite.base_elevation = 0;


        //     this.tweens.add({
        //         targets: a_zsprite,
        //         delay: Phaser.Math.Between(500,1500),
        //         elevation_delta: Phaser.Math.Between(50,120),
        //         ease: 'Sine.easeOut',
        //         duration: Phaser.Math.Between(400,600),
        //         yoyo: true,
        //         repeat: -1,
                
        //     });

        //     // this.tweens.timeline({

        //     //     targets: a_zsprite,
        //     //     delay: Phaser.Math.Between(500,1500),
        //     //     ease: 'Sine.easeOut',
        //     //     duration: 500,
        //     //     yoyo: true,
        //     //     repeat: -1,
                
                
        //     //     tweens: [{
                    
        //     //         elevation_delta: 100
                    
        //     //         }]

        //     // });

        //     a_zsprite.move = function()
        //     {
        //         this.x+=this.dx;
        //         if ( this.x<thisContext.TILE_SIZE || this.x>(thisContext.MAP_WIDTH-1)*thisContext.TILE_SIZE ) this.dx*=-1;

        //         this.y+=this.dy;
        //         if ( this.y<thisContext.TILE_SIZE || this.y>(thisContext.MAP_HEIGHT-1)*thisContext.TILE_SIZE ) this.dy*=-1;

        //         // CHECK COLLISION AGAINST WALLS
        //         // compute cell position


        //         var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
        //         var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

        //         // compute position relative to cell (ie: how many pixel from edge of cell)
        //         var playerXCellOffset = this.x % thisContext.TILE_SIZE;
        //         var playerYCellOffset = this.y % thisContext.TILE_SIZE;

        //         var minDistanceToWall=20;
                
        //         // make sure the player don't bump into walls
        //         if (this.dx>0)
        //         {
        //             // moving right
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
        //                 (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse x dir
        //                 this.dx*=-1;
        //             }               
        //         }
        //         else
        //         {
        //             // moving left
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
        //                 (playerXCellOffset < (minDistanceToWall)))
        //             {
        //                 /// reverse x dir
        //                 this.dx*=-1;
        //             } 
        //         } 

        //         if (this.dy<0)
        //         {
        //             // moving up
        //             if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset < (minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }
        //         else
        //         {
        //             // moving down                                  
        //             if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }

        //     };                        
            
        //     this.zspritesgroup.add(a_zsprite);
        // }


        // //animation test sprite 5
        // for (var j=0;j<20;j++)
        // {

        //     a_zsprite = this.add.image();
        //     a_zsprite.label = "blueorbs";
        //     a_zsprite.type = 'target';
        //     a_zsprite.hitcount = 0;
        //     a_zsprite.explosioncolor= 'violet';

            
        //     a_zsprite.img = this.textures.get('ball4.png').getSourceImage();


        //     var randomKey = Math.random().toString();
        //         a_zsprite.buffer = this.textures.createCanvas(randomKey, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).drawImage(a_zsprite.img, 0, 0);        
        //         var imageData = a_zsprite.buffer.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, a_zsprite.img.width, a_zsprite.img.height);
        //         a_zsprite.pixels = imageData.data;

        //     a_zsprite.x = Phaser.Math.Between(100,1180);
        //     a_zsprite.y = Phaser.Math.Between(100,1180);
        //     a_zsprite.dx = Phaser.Math.RND.realInRange(3, 7);
        //     a_zsprite.dy = Phaser.Math.RND.realInRange(-3, -7);
        //     a_zsprite.animated = false;
        //     // a_zsprite.animationtimecheck=0;
        //     // a_zsprite.frametimer = 50;
        //     a_zsprite.inplay = false;
        //     // a_zsprite.numframes = 3;
        //     // a_zsprite.framewidth = 52;
        //     // a_zsprite.frameindex = 0;

        //     a_zsprite.elevation_delta = 0;
        //     a_zsprite.base_elevation = 0;


        //     this.tweens.add({
        //         targets: a_zsprite,
        //         //delay: Phaser.Math.Between(500,1500),
        //         elevation_delta: 120,
        //         ease: 'Sine.easeOut',
        //         duration: 500,
        //         yoyo: true,
        //         repeat: -1,
                
        //     });

        //     // this.tweens.timeline({

        //     //     targets: a_zsprite,
        //     //     delay: Phaser.Math.Between(500,1500),
        //     //     ease: 'Sine.easeOut',
        //     //     duration: 500,
        //     //     yoyo: true,
        //     //     repeat: -1,
                
                
        //     //     tweens: [{
                    
        //     //         elevation_delta: 100
                    
        //     //         }]

        //     // });

        //     a_zsprite.move = function()
        //     {
        //         this.x+=this.dx;
        //         if ( this.x<thisContext.TILE_SIZE || this.x>(thisContext.MAP_WIDTH-1)*thisContext.TILE_SIZE ) this.dx*=-1;

        //         this.y+=this.dy;
        //         if ( this.y<thisContext.TILE_SIZE || this.y>(thisContext.MAP_HEIGHT-1)*thisContext.TILE_SIZE ) this.dy*=-1;

        //         // CHECK COLLISION AGAINST WALLS
        //         // compute cell position


        //         var playerXCell = Math.floor(this.x/thisContext.TILE_SIZE);
        //         var playerYCell = Math.floor(this.y/thisContext.TILE_SIZE);

        //         // compute position relative to cell (ie: how many pixel from edge of cell)
        //         var playerXCellOffset = this.x % thisContext.TILE_SIZE;
        //         var playerYCellOffset = this.y % thisContext.TILE_SIZE;

        //         var minDistanceToWall=20;
                
        //         // make sure the player don't bump into walls
        //         if (this.dx>0)
        //         {
        //             // moving right
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell+1)!='-')&&
        //                 (playerXCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse x dir
        //                 this.dx*=-1;
        //             }               
        //         }
        //         else
        //         {
        //             // moving left
        //             if ((thisContext.fMap.charAt((playerYCell*thisContext.MAP_WIDTH)+playerXCell-1)!='-')&&
        //                 (playerXCellOffset < (minDistanceToWall)))
        //             {
        //                 /// reverse x dir
        //                 this.dx*=-1;
        //             } 
        //         } 

        //         if (this.dy<0)
        //         {
        //             // moving up
        //             if ((thisContext.fMap.charAt(((playerYCell-1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset < (minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }
        //         else
        //         {
        //             // moving down                                  
        //             if ((thisContext.fMap.charAt(((playerYCell+1)*thisContext.MAP_HEIGHT)+playerXCell)!='-')&&
        //                 (playerYCellOffset > (thisContext.TILE_SIZE-minDistanceToWall)))
        //             {
        //                 // reverse y dir
        //                 this.dy*=-1;
        //             }
        //         }

        //     };                        
            
        //     this.zspritesgroup.add(a_zsprite);
        // }
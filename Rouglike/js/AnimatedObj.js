AnimatedObj.count = 0 ;

function AnimatedObj (type)
{
	AnimatedObj.count ++;
	this.animationObj = 'toAnimate';
	this.id = 'AObj_' + AnimatedObj.count;
	this.fW = 32;
	this.fH = 32;
	this.currDelay = 0;
	this.current_f = 0;
	this.type = type;
	this.animDelay = 20;
	this.types = {
		'water_rock1':{sx:371 , sy:264 , f:[0,1]},
		'water_rock2':{sx:305 , sy:264 , f:[0,1]},
		'water':{sx:371 , sy:231 , f:[0,1]},
		'waterfall_top':{sx:173 , sy:132 , f:[0,1]},
		'waterfall_center':{sx:173 , sy:231 , f:[0]},
		'waterfall_bottom':{sx:173 , sy:198 , f:[0,1]},
		'water_border':{sx:239 , sy:132 , f:[0,1]},

	} 
	
	
	//Game.toDraw[this.id] = this;
};

AnimatedObj.prototype.draw = function(x,y,frameup)
{
			//Drawing Check
		if(!(drawBoard.shouldDraw(x,y)))
		{
				return;
		}

		Game.ctx.drawImage(
			Game.spr2,
			this.types[this.type].sx + this.fW*this.types[this.type].f[this.current_f],
			this.types[this.type].sy,
			this.fW ,
			this.fH,
			x,
			y,
			this.fW*VAR.scale,
			this.fH*VAR.scale,
			)

			//Frame changing
			if(frameup)
			{	
			this.current_f = this.current_f == (this.types[this.type].f.length -1) ? 0 : (this.current_f+1);
			}

			
};
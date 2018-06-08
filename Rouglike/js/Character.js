Character.count = 0;
//Pixel precision for the collider
Character.colider = 10;
Character.showGrid = false;
function Character(inheritance){
	//
	Character.count++;
	//
	this.id = 'char_'+Character.count;
	//
	if(!inheritance){
	Game.toDraw[this.id] = this;
	}
	//
	this.fW = 32;
	this.fH = 32;
	//
	this.sW = 96;
	this.sH = 96;
	this.states = {};
	// 
	this.current_f = 0;
	//
	this.change_f_delay = 0;
	this.f_max_delay =4;
	//
	this.mod_speed = 10;

}
//On moving state..
Character.prototype.move = function()
{
	if(this.state.slice(-2) == 'go' )
	{
				
		if(this.tmp_state == 'left_go')
		{

			if(Board.shouldMoveX)
			{
				if(this.hitLeftBorder)
				{	
					
					Game.trans_x = 0;
					Board.shouldMoveX = false;
					this.x -=this.mod_speed;
				} 
				else if(this.hitRightBorder)
				{
					if(this.x <= Board.width - VAR.W/2)
					{
						this.x -=this.mod_speed;
						Game.trans_x =  this.mod_speed;		
						Board.setPointX -= Game.trans_x;
					}
					else
					{
						this.x -= this.mod_speed;
					}
				}
				else
				{
				this.x -=this.mod_speed;
				Game.trans_x =  this.mod_speed;		
				Board.setPointX -= Game.trans_x;
				}
			}
			else
			{
				this.x -= this.mod_speed;
			}
		
		}
		else if(this.tmp_state == 'right_go' )
		{				
			
			

			if(Board.shouldMoveX)
			{
				if(this.hitRightBorder)	
				{
					Game.trans_x = 0;
					Board.shouldMoveX = false;
					this.x +=this.mod_speed;
				}
				else
				{
				Game.trans_x = -this.mod_speed;
				Board.setPointX -= Game.trans_x;
				this.x +=this.mod_speed
				}
				
			}				
			else
			{
			    this.x +=this.mod_speed
			}
		}
		else if(this.tmp_state == 'up_go') 
		{

			if(Board.shouldMoveY) 
			{ 
				
				if(Board.setPointY <= 0 )
				{
					Game.trans_y = 0;

					Board.shouldMoveY = false;
					this.y-=this.mod_speed
				}
				else if(this.hitBottomBorder)
				{
					if(this.y <= Board.height - VAR.H/2)
					{
						this.y -=this.mod_speed;
						Game.trans_y =  this.mod_speed;		
						Board.setPointY -= Game.trans_y;
					}
					else
					{
						this.y -= this.mod_speed;
					}
				
				}
				else
				{
				Game.trans_y = this.mod_speed
				Board.setPointY -= Game.trans_y;
				this.y -=this.mod_speed
				}
			}
			else
			{  
				this.y -=this.mod_speed
			}
		}
		else if(this.tmp_state == 'down_go')
		{
			console.log('Y: ' + Board.setPointY)
			

			if(Board.shouldMoveY)
			{
				if(this.hitBottomBorder)
				{
					Game.trans_y = 0;
					this.y += this.mod_speed;
				}
				else
				{
				Board.setPointY -=Game.trans_y;
				Game.trans_y = -this.mod_speed
				this.y +=this.mod_speed
			}
			}
			else 
			{
			 this.y += this.mod_speed
			}
		}
		

	}
	if(this.tmp_state != this.state)
	{
		Game.trans_x = 0;
		Game.trans_y = 0;
		this.current_f = 0;
		this.tmp_state = this.state;
	}			
}
Character.prototype.translateCheck = function() {

Board.shouldMoveX = this.x >= VAR.W/2;
Board.shouldMoveY = this.y >= VAR.H/2;

this.hitRightBorder = this.x + VAR.W/2 >= Board.width;
this.hitLeftBorder = (Board.shouldMoveX) && (Board.setPointX-this.fW*VAR.scale <= 0)

this.hitBottomBorder = this.y+VAR.H/2 >= Board.height;

	
};
Character.prototype.draw = function()
{
	this.translateCheck();
	this.move();
	this.RowNColumn(this.x,this.y);

	Game.ctx.translate(Game.trans_x,Game.trans_y)
	if(Character.showGrid)
	{
	Game.ctx.fillRect(this.column*64 - 64,this.row*64 - 64,64,64)
	Game.ctx.fillRect(this.next_column*64 - 64,this.next_row*64 - 64,64,64)
}
	Game.ctx.drawImage(
		Game.char,
		this.states[this.state].sx+this.states[this.state].f[this.current_f]*this.sW,
		this.states[this.state].sy,
		this.sW,
		this.sH,
		this.x,
		this.y,
		this.fW*VAR.scale,
		this.fH*VAR.scale
	);
	if(Character.showGrid)
	{

	Game.ctx.strokeRect(
		this.x,
		this.y,
		this.fW*VAR.scale,
		this.fH*VAR.scale)
	}
	

	
// To slow animation ...
	// On idle..
	if(this.state == 'left' || this.state == 'right' || this.state == 'up' || this.state == 'down')
	{
		this.f_max_delay = 12;
	}
	//Other animations...
	else
	{
		this.f_max_delay = 6;
	}
	//
	//
	if(this.change_f_delay<this.f_max_delay){
		this.change_f_delay++;
	}
	else{
		this.change_f_delay = 0;
		this.current_f = this.current_f+1>=this.states[this.state].f.length ? 0 : this.current_f+1;
	}
};
// HERO CTOR
function Hero(){
	
	Character.call(this);
	this.x = 32;
	this.y = 32;
	this.hero_fH = 96;
	this.hero_fW = 96;
	this.state = 'right';
	this.states = {
		'down':{sx:0, sy:0, f:[0,1]},
		'down_go':{sx:0, sy:this.hero_fH*4, f:[0,1,0,2]},
		'up':{sx:0, sy:this.hero_fH*2, f:[0,1]},
		'up_go':{sx:0, sy:this.hero_fH*6, f:[0,1,0,2]},
		'left':{sx:0, sy:this.hero_fH*3, f:[0,1]},
		'left_go':{sx:0, sy:this.hero_fH*7, f:[0,1,0,2]},
		'right':{sx:0, sy:this.hero_fH*1, f:[0,1]},
		'right_go':{sx:0, sy:this.hero_fH*5, f:[0,1,0,2]},
		'ko':{sx:0, sy:this.hero_fH*9, f:[0,1,2,3,4,4,4]},
		'idle':{sx:0,sy:this.hero_fH*8,f:[0,1,2,3,4,5,6]}

	}
}
Hero.prototype = new Character(true);
Hero.prototype.constructor = Hero;

Hero.prototype.updateState = function()
{

	if(Game.key_39){this.state = 'right_go'}
	else if(Game.key_38){this.state = 'up_go'}
	else if(Game.key_37){this.state = 'left_go'}
	else if(Game.key_40){this.state = 'down_go'}
		//on key up
		else if(this.state.slice(-2) == 'go')
		{
				
			this.state = this.state.slice(0,-3);
				

		}
		
}
function Wojtek ()
{
	Character.call(this)
}
Character.prototype.RowNColumn = function(x,y)
{	
	this.actual_fW = this.fW*VAR.scale; 
	this.actual_fH = this.fH*VAR.scale;
	//	

	this.char_x = this.x+this.actual_fH;
	this.char_y = this.y+(this.actual_fW+10);
		// Logic
	 this.row = Math.round(this.char_y/this.actual_fH); 
	 this.column = Math.round(this.char_x/this.actual_fW);//j/w
	// console.log(this.row + '  ' + this.column)


	 //If character goes...
	if(this.state.slice(-2)!='go')
		return;
	
	if(this.state == 'down_go' || this.state == 'up_go')
	{ 

		this.next_row = this.state == 'down_go' ?  Math.ceil((this.char_y+10)/this.actual_fH) : Math.floor((this.char_y+this.actual_fH)/this.actual_fH)
		this.next_column = this.column;
	}
	else
	{
		this.next_column = this.state == 'right_go' ? Math.ceil(this.char_x/this.actual_fW) : Math.floor(this.char_x/this.actual_fW)
		this.next_row = this.row
	}
	
	//Collider
	if(!(Game.board.objArray))
		{return;}


	if(Game.board.objArray[this.next_row-1][this.next_column-1].type != 'walk')
	{
		this.state = this.state.slice(0,-3);

			// if(this.state == 'down' || this.state == 'up')
			// {
			// 	this.y = this.state == 'down' ? this.y-10 : this.y+10;
			// }
			// else
			// {
			// 	this.x = this.state == 'left' ? this.x+10 : this.x-10;
			// }
	}
	 
 	

};






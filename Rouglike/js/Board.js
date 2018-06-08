drawBoard = {
	shouldDraw : function(x,y)
{
	if(x>=(Board.setPointX-(48*VAR.scale)) && x<=Board.setPointX+VAR.W && y>=Board.setPointY && y<=Board.setPointY+VAR.H )
		{
			return true;
		}
	else
	{
		return false;
	}
},
	frameup: false,
	change_f_delay : 0,
	f_max_delay : 20,
drawDelay : function()
{	
	

	//animation delay--------------------
	if(drawBoard.change_f_delay<drawBoard.f_max_delay)
	{

		drawBoard.change_f_delay++;
		drawBoard.frameup = false;
	}
	else
	{

		drawBoard.change_f_delay = 0;
		drawBoard.frameup = true;
	}
	//---------------------------------
},


};



Board.setPointX = 0;
Board.setPointY = 0;
Board.width = 0;
Board.height = 0;
Board.shouldMoveX = false;
Board.shouldMoveY = false;

Board.groundTypes ={
	'grass': {sx:0, sy:0, type:'solid'},
	'stone': {sx:48 , sy:0, type:'walk'}

};
Board.templates = 
[
		'XXX-------XXXTTTT---XXX------------XXXXX-------XXXX-------',
		'----------XXXCCCC-----XXXX---------XXXXX-------XXXX---------',
		'XXX-------PPPBBBBPPPP-------------X------------------------X',
		'XXX-------WWWWRWWWWWW------------XXXXXXX------------------XX',
		'XXX--------------------XXXX-----XXXWWWWW-------XXXXX-----XXX',
		'XXX-------WRWWWWWWWrW-XXXXXXXXXXXXXWWWWW-------XXXXXXXXXXXXX',
		'XXX---XXXXWWWWWWWWWWWW----XXXXXXXXXWWWWWXX---------XXXXXXXXX',
		'XXXXXXXXXXWWWWWrWWrWWWXXXXXXXXXXXXXWWWWWXXX-------XXXXXXXXXX',
		'XXXXXXXXXXWWWWWWrWWrWWXXXXXXXXXXXXXWWWWWXXXXXXXXXXXXXXXXXXXX',
		'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
		'XXX---------------------------------------------------------',
		'XXX---XXXXXXXXXXX---------XXXXXXXXXXXXXXXX---------XXXXXXXXX',
		'XXX--------XXXXXXX-------XXXXXXXXXX-XXXXXXX-------XXXXXXXXXX',
		'XXX---------XXXXXXXXXXXXXXXXXXXXXXX--XXXXXXXXXXXXXXXXXXXXXXX',
		'XXX-----------X------------------------X--------------------',
		'XXX---------------------------------------------------------',
		'----------XXXXX-------XXXX---------XXXXX-------XXXX---------',
		'XXX-------------------------------X------------------------X',
		'XXX-------XXXXX------------------XXXXXXX------------------XX',
		'XXX-------XXXXX-------XXXXX-----XXXXXXXX-------XXXXX-----XXX',
		'XXX-------XXXXX-------XXXXXXXXXXXXXXXXXX-------XXXXXXXXXXXXX',
		'XXX---XXXXXXXXXXX---------XXXXXXXXXXXXXXXX---------XXXXXXXXX',
		'XXX--------XXXXXXX-------XXXXXXXXXX-XXXXXXX-------XXXXXXXXXX',
		'XXX---------XXXXXXXXXXXXXXXXXXXXXXX--XXXXXXXXXXXXXXXXXXXXXXX',
		'XXX-----------X------------------------X--------------------',
		'XXX---------------------------------------------------------',
		'XXX---XXXXXXXXXXX---------XXXXXXXXXXXXXXXX---------XXXXXXXXX',
		'XXX--------XXXXXXX-------XXXXXXXXXX-XXXXXXX-------XXXXXXXXXX',
		'XXX---------XXXXXXXXXXXXXXXXXXXXXXX--XXXXXXXXXXXXXXXXXXXXXXX',
		'XXX-----------X------------------------X--------------------',
		'XXX---------------------------------------------------------'
	];
function BoardElement(element)
{	

	this.fW = 48;
	this.fH = 48;
	// this.gorundType = {
	// 	'grass': {sx:0, sy:0 , type:'solid'},
	// 	'stone': {sx:48 , sy:0 , type:'walk'}
	this.sx = Board.groundTypes[element].sx;
	this.sy = Board.groundTypes[element].sy;
	this.type = Board.groundTypes[element].type;


};

BoardElement.prototype.draw = function(x,y)
{	

		if(!(drawBoard.shouldDraw(x,y)))
		{
				return;
		}
	Game.ctx.drawImage(
			Game.spr,
			this.sx,
			this.sy,
			this.fW,
			this.fH,
			x,
			y,
			this.fW*VAR.scale,
			this.fH*VAR.scale
			)
	
};



function Board ()
{	
	this.change_f_delay  = 0;
	this.f_max_delay = 25;
	this.fW = 32;
	this.fH = 32;
	this.objArray = [];
	this.frameup = false;
	//this.createBoard();	
}


Board.prototype.createBoard = function()
{
//Create an 2D array of sprite blocks data
	for(i=0;i<Board.templates.length;i++)	
	{
		
		this.objArray.push([])
		for(j=0;j<Board.templates[i].length;j++)
		{
			
			if(Board.templates[i][j] == '-')
			{
				this.objArray[i].push(new BoardElement('stone'));
			}
			else if(Board.templates[i][j] == 'X')
			{
				this.objArray[i].push(new BoardElement('grass'));
			}
			else if(Board.templates[i][j] == 'W')
			{
				this.objArray[i].push(new AnimatedObj('water'))
			}
			else if(Board.templates[i][j] == 'R')
			{
				this.objArray[i].push(new AnimatedObj('water_rock1'))
			}
			else if(Board.templates[i][j] == 'T')
			{
				this.objArray[i].push(new AnimatedObj('waterfall_top'))
			}
			else if(Board.templates[i][j] == 'C')
			{
				this.objArray[i].push(new AnimatedObj('waterfall_center'))
			}
			else if(Board.templates[i][j] == 'B')
			{
				this.objArray[i].push(new AnimatedObj('waterfall_bottom'))
			}
			else if(Board.templates[i][j] == 'P')
			{
				this.objArray[i].push(new AnimatedObj('water_border'))
			}
			else if(Board.templates[i][j] == 'r')
			{
				this.objArray[i].push(new AnimatedObj('water_rock2'))
			}					
		}
		if(i === (Board.templates.length-1))
		{
			console.log('rows created')
		}

	}
	Board.width = Board.templates[0].length * this.fW * VAR.scale;
	Board.height = Board.templates.length * this.fH * VAR.scale;	
	//this.draw();
};


Board.prototype.draw = function()
{	
	


	this.width = 0;
	this.height = 0;
	

		for(var row of this.objArray)
		{

			for (var object of row)
			{
				
					if(object.animationObj)
					{
						//-----------------------
						//console.log(object.animationObj,this.frameup)
						//------------------------

						object.draw(this.width,this.height,drawBoard.frameup)
						this.width +=this.fW*VAR.scale ;
					}
					else
					{
						//-----------------------
						//console.log(object.animationObj)
						//------------------------

						object.draw(this.width,this.height)
						this.width +=this.fW*VAR.scale ;
					}
				
				
			}
			
			this.width = 0;
			this.height +=this.fH*VAR.scale;
		}
		this.height = 0;
	
};
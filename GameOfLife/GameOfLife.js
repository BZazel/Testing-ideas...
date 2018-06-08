window.onload = function()
{
	Game.init();
}
Cell = 
{
	updateState: function()
	{
		for(var y = 1; y < VAR.rows-1 ; y ++)
		{
			for( var x = 1; x < VAR.cols-1 ; x++)
				{ var cell = VAR.table[y][x]; 

					var number =  VAR.table[y-1][x-1].state + VAR.table[y+0][x-1].state + VAR.table[y+1][x-1].state
								+ VAR.table[y-1][x+0].state + 			0				+ VAR.table[y+1][x+0].state
								+ VAR.table[y-1][x+1].state + VAR.table[y+0][x+1].state + VAR.table[y+1][x+1].state;

					if (cell.state == 1) 
					{
						if (number == 3 || number == 2) 
						{
							cell.temp_state =  1;
						}
						else 
							cell.temp_state = 0;
					}
					else
					{
						cell.temp_state = number == 3;
					}
			}
		}

					for(var row of VAR.table)
						for(var cell of row)
							{	
								if(cell.state != cell.temp_state)
									{
										cell.state = cell.temp_state
									}

								
							}

				Game.ctx.clearRect(0,0,VAR.W,VAR.H);
				VAR.drawAll();
	},
}

var size = 8;
VAR = 
{
	table:[],
	W:0,
	H:0,
	cell_width:size,
	cell_height:size,
	lastTime:0,
	fps:60,
	cols:Math.floor(window.innerWidth/size),
	rows:Math.floor(window.innerHeight/size),
}
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}


function cell (x,y,state)
{
	this.x = x; 
	this.y = y;
	this.state = Math.round(state);
	this.temp_state = this.state;
}
cell.prototype.draw = function()
{

	if(this.state == 0)
	{
		 Game.ctx.fillStyle = '#323232'; 
	}
	else 
	{
		Game.ctx.fillStyle = '#FFFAEC';
	}

	Game.ctx.fillRect(this.x,this.y,VAR.cell_width,VAR.cell_height);
	
}


VAR.MakeTable = function()
{
	for (var y = 0; y < VAR.rows; y++)
		for ( var x = 0; x < VAR.cols; x++)
		{ 
			VAR.table[y][x] = new cell(VAR.cell_width*x,VAR.cell_height*y,Math.random());
		}
}
VAR.drawAll = function()
{
	for(var row of VAR.table)
		for(var cell of row)
		{
			cell.draw();
		}
}

	Game = 
	{
		init:function()
		{
			VAR.table = Create2DArray(VAR.rows);
			Game.canvas = document.createElement('canvas');
			Game.ctx = Game.canvas.getContext('2d');
			Game.layout();
			//event Listerners
			window.addEventListener('resize',Game.layout,false);
			VAR.MakeTable();

			document.body.appendChild(Game.canvas);
			VAR.drawAll();
			Game.animationLoop();
		},
		layout:function()
		{
			VAR.W = window.innerWidth;
			VAR.H = window.innerHeight;
			Game.canvas.width = window.innerWidth;
			Game.canvas.height = window.innerHeight;
		},
		animationLoop:function(time)
		{
			requestAnimationFrame( Game.animationLoop );
			if (time - VAR.lastTime >=1000/VAR.fps)
		 	{						
				VAR.lastTime = time;

				//Game.ctx.clearRect(0,0,VAR.W, VAR.H);
				Cell.updateState();
				//VAR.drawAll();
			}

		}
	}


// Inicjuję grę dopiero po załadowaniu całej strony
window.onload = function(){
	// Najpierw muszę załadować obrazek (tutaj mógłby pojawić się preloader, aby gracz wiedział, że są ładowane niezbędne pliki).
	Game.spr = new Image();
	// Dopiero po załadowaniu obrazka zostanie zainicjalizowana gra
	Game.spr.src = 'Board-sprite-48.png';
	//
	Game.spr2 = new Image();
	Game.spr2.src = '32x32_map_tile.png';
	//
	Game.char = new Image()
	Game.char.onload = Game.init;
	Game.char.src = 'Andrzej-pozy 2.0.png'

}
// Obiekt, w którym będą przechowywane „podręczne” wartości
VAR = {
	fps:30,
	W:0,// szerokość okna
	H:0,// wysokość okna
	scale:2.5,// elementy gry będą wklejane w odpowiedniej skali
	//
	lastTime:0,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}
// Obiekt zawierający bazowe funckje związane z grą.
// Game nie ma konstruktora, jest jedynie obiektem grupującym funkcje.
//

Game = {
	toDraw:{},// tym razem stworzymy jeden obiekt, w którym będą przechowywane elementy do narysowania w każdej klatce
	// init zostanie odpalone raz po załadowaniu strony.
	trans_x:0,
	trans_y:0,
	init:function(){
		
		// Tworzę canvas
		Game.canvas = document.createElement('canvas');
		
		// Przypisuję kontekst 2D do zmiennej ctx, która jest właściwością obiektu Game
		Game.ctx = Game.canvas.getContext('2d');
		
		// odpalam metodę obiektu Game
		Game.layout();
		// metoda layout odpali się przy każdej zmianie wielkości okna
		window.addEventListener('resize', Game.layout, false);
		window.addEventListener('keydown',Game.onKey,false);
		window.addEventListener('keyup',Game.onKey,false);
		// Canvas zostaje dodany do DOM
		
		document.body.appendChild(Game.canvas)
		// Tworzymy nową planszę
		
		Game.board = new Board();
		Game.board.createBoard();
 

		Game.hero = new Hero();
		
		// Rysowanie planszy
		Game.board.draw();
		
		// rozpoczęcie pętli gry
		Game.animationLoop();
	},
	onKey:function(ev)
	{
		if(!((ev.keyCode >=37 && ev.keyCode <= 40) || ev.keyCode == 32) )
			return;

		if(!Game['key_'+ev.keyCode] && ev.type == 'keydown')
		{	
			for(i=37;i<=40;i++){
				if(i!=ev.keyCode){Game['key_'+i]=false;}
			}
			Game['key_'+ev.keyCode] = true;
			Game.hero.updateState();
		}
		else if(ev.type == 'keyup')
		{
			
		
			Game['key_' + ev.keyCode] = false
			Game.hero.updateState();
			
		}


	},
	// Ta metoda będzie odpalana przy każdej zmianie wielkości okna
	layout:function(ev){
		// Dla łatwiejszego pisania wielkość okna zostaje przypisana do właściwości W i H obiektu VAR
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		// Chwilowo do canvas przypiszemy wielkość okna
		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;

		

		// Nie chcę blurowania (trzeba updatować za każdym razem gdy zmieni się rozmiar canvas)
		Game.ctx.imageSmoothingEnabled = false;
		Game.ctx.mozImageSmoothingEnabled = false;
		Game.ctx.oImageSmoothingEnabled = false;
		Game.ctx.webkitImageSmoothingEnabled = false;
 
		// if(Game.hero && (Board.shouldMoveX || Board.shouldMoveY))
		// {
		// 	Game.hero.x = VAR.W/2
		// 	Game.hero.y = VAR.H/2
		// 	console.log('hero has been moved')
		// }
		//Game.board = new Board()
	},
	// Funkcja, która odpala się 60 razy na sekundę
	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
		// ograniczenie do ilości klatek zdefiniowanych w właściwości obiektu VAR (nie więcej niż VAR.fps)
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;
			//
			// oczyszczenie canvas
			Game.ctx.clearRect(0,0,VAR.W, VAR.H);
			//przesunięcie planszy
			drawBoard.drawDelay();
			Game.board.draw();
			// Dla wszystkich obiektów znajdujących się w toDraw wywołaj ich metodę draw()
			for(var o in Game.toDraw){
				Game.toDraw[o].draw();
			}
		}
	}
}
(function(){
    window.onload = ()=>{       
        main();
    }
})();

var VAR = {
    W:0,
    H:0,
    fftSize:1024,
    step:0,
    size:0,
    TYPE:"circle-bars",
    X:1,
    Y:1,
   
};
var down = false;

var main = function()
{
    
    let canvas, ctx, audioCtx, reader, analyser, dataArray, src, fileArrayBuffer, animation;


    //SETUP ...
    (function(){
        
        //Canvas setup ==============
        canvas = document.querySelector('#canvas');
        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        
        canvas.addEventListener('mousemove',function(e)
        {
            
            e.preventDefault()
            if(!down) return

            VAR.X = (e.clientX - VAR.W/2)/200
            VAR.Y =-(e.clientY - VAR.H/2)/200
        })
        canvas.addEventListener('mousedown',(e)=>{
            // Reset on rightClick
            if(e.button == 2)
            { 
                VAR.X = 1;
                VAR.Y = 1;
                return;
            }
            down = true;
        })
        canvas.addEventListener('mouseup',()=>{ down = false })
        //======================================

      
        document.querySelector('#play-pause-btn').addEventListener('click',function(){
           
            if(!audioCtx) return;
            if(!fileArrayBuffer) return;

            if(audioCtx.state == 'running') {
                audioCtx.suspend();
                cancelAnimationFrame(animation)
            }
            else{
                audioCtx.resume()
                requestAnimationFrame(Update)
            }
           
        })

        // Adding listeners other
        document.querySelectorAll('input[name=animation-type]').forEach((el)=>{
            el.onchange = function()
            {
                VAR.TYPE = this.value
            }
        })        
   
        
    })()
    //.............
   
    
    var Layout = function()
    {
        
        canvas.width = canvas.parentElement.clientWidth
        canvas.height =  canvas.parentElement.clientHeight;
        
        VAR.W = canvas.clientWidth;
        VAR.H = canvas.clientHeight;
        
        VAR.size = Math.ceil(VAR.W/VAR.fftSize)
        VAR.step = VAR.size++;
    }

    var examineAudio = function()
    {
        
        
        if(!fileArrayBuffer) return;

        analyser.fftSize = VAR.fftSize;
        
        audioCtx.decodeAudioData(fileArrayBuffer ,function(buffer){
            src.buffer = buffer;
            src.connect(analyser);
            analyser.connect(audioCtx.destination);
            dataArray = new Uint8Array(analyser.frequencyBinCount)
            //Instant play
            src.start(0)
            //Start drawing
            Update();
        });
    }
    var getFile = function(e)
    {
        if(audioCtx) audioCtx.close();
        //Drag 'n' Drop to add
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        src = audioCtx.createBufferSource();
        analyser = audioCtx.createAnalyser();

        reader = new FileReader();
        var audioFile = e.target.files[0]
        reader.readAsArrayBuffer(audioFile);

        reader.onload = function(e)
        {
            if(this.readyState == FileReader.DONE)
            {
                fileArrayBuffer = this.result;

                    examineAudio();
            }
        }
    }
    document.querySelector('#input-file').addEventListener('change',getFile)

    //Animation Loop ----------------------------------------------
   var Update = function()
   { 
        animation = requestAnimationFrame(Update); 
        
        document.querySelector('#current-time').innerHTML = Math.round(audioCtx.currentTime)
    
        ctx.fillStyle = 'rgba(255, 255,255, 1)';
        ctx.fillRect(0,0,VAR.W,VAR.H); 
        
        ctx.fillStyle = 'red'; 

        if(VAR.TYPE == 'rectangle')
        {   
            analyser.getByteFrequencyData(dataArray);     

            VAR.step = Math.round(VAR.W/VAR.fftSize)
            VAR.size = VAR.step-1 < 1 ? 1 : VAR.step-1;
            
            for(var i=0; i < VAR.fftSize; i++) { 
                
                ctx.fillRect(
                    i*VAR.step,
                    VAR.H-dataArray[i]*1.5-20,
                    VAR.size,
                    dataArray[i]*1.5); 
            } 
        }
        else if(VAR.TYPE.startsWith('circle'))
        {   
            analyser.getByteFrequencyData(dataArray);     
            let temp = 360/VAR.fftSize;
            
            var angle = 0;
            VAR.step = temp < 1? 1 :temp+1;
            ctx.lineWidth = temp;
            
            ctx.beginPath();
            ctx.strokeStyle = '#2A54B2'
            let range = temp < 1 ? 360 : VAR.fftSize 
            for(var i = 0; i < range; i++)
            {  
                if(VAR.TYPE == 'circle-bars'){
                    ctx.moveTo(VAR.W/2,VAR.H/2);
                }

                ctx.lineTo(
                VAR.W/2 - Math.round(Math.cos(angle*Math.PI/180)*dataArray[i]*2.5* VAR.X),
                VAR.H/2 - Math.round(Math.sin(angle*Math.PI/180)*dataArray[i]*2.5* VAR.Y)
                )
            
                angle += VAR.step;
            }
            ctx.stroke();

        }else if(VAR.TYPE == 'oscilloscope')
        {
            analyser.getByteTimeDomainData(dataArray);
                for(var i = 0; i<analyser.frequencyBinCount; i++)
                {
                }
        }
    }

    //------------------------------------
   

    Layout();    
}



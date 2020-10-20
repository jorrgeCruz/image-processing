(function(){
<canvas id="img" width="225" height="225"></canvas>

    var img=document.getElementById("img");
    var contexto= img.getContext("2d");

     var foto= new Image();
     foto.onload=function(){
         contexto.drawImage(foto, 0 ,0);
     }
     foto.src = "i.jpeg";
     function verde(){
         var numPixel=contexto.getImageData(0,0,225,225);
         var contPixel= numPixel.width * numPixel.height;
          for ( var i = 0; i < contPixel; i++ ) {
                      var v = numPixel.data[ i*4+1];

                      numPixel.data[i*4]=0;
                      numPixel.data[i*4+1]=v;
                       numPixel.data[i*4+2]=0;
     }
     contexto.putImageData( numPixel, 0, 0 );
    };
    
<div>
    <input type="button" onclick="verde()" value="VERDE" name="">
</div>
});
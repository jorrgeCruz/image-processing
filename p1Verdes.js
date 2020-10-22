
	//<canvas id="img" width="225" height="225"></canvas>
	

		//let img=document.getElementById("img");
		//let contexto= img.getContext("2d");
		
		 //var foto= new Image();
		 //foto.onload=function(){
		 	//contexto.drawImage(foto, 0 ,0);
			 
		 //};
		 foto.src = "images.jpeg";
		 function verde(){
			let numPixel=contexto.getImageData(0,0,225,225);
		 	var contPixel= numPixel.width * numPixel.height;
              for ( var i = 0; i < contPixel; i++ ) {
				
              			let v = numPixel.data[ i*4+1];
						  
              			numPixel.data[i*4]=0;
              			numPixel.data[i*4+1]=v;
               			numPixel.data[i*4+2]=0;
		 }
		 contexto.putImageData( numPixel, 0, 0 );
		
		 };
		
		//<input type="button" onclick="verde()" value="VERDE" name="">

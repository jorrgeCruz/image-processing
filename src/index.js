
import DefaultSetings from "./DefaultSettins.js";
import ImageOp from "./ImageOp.js";

// let img = new Image();
let lienzo;
let  pantalla;
// let readyToDraw=false;

/* function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
    output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate.toLocaleDateString(), '</li>');
        
        img.src = f.name;
        // console.log(img.src)
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

}*/


/*function drawSmallImg(evt){
    pantalla.strokeStyle = "red";
    pantalla.imageSmoothingEnabled = false;

    if(readyToDraw){    
        pantalla.drawImage(img, 0 ,0 , 300, 300);
        pantalla.strokeRect(evt.clientX, evt.clientY,  DefaultSetings.SMALL_W,DefaultSetings.SMALL_H);
        pantalla.drawImage(img, evt.clientX-3, evt.clientY-3, 5, 5, evt.clientX, evt.clientY, DefaultSetings.SMALL_W,DefaultSetings.SMALL_H);
    }
}  */
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
 


lienzo =  document.getElementById('img');
pantalla = lienzo.getContext("2d");
var dropZone = document.getElementById('img');
var imgOperator = new ImageOp(pantalla);

imgOperator.image.onload = function() {
    imgOperator.pantalla.drawImage(imgOperator.image, 0 ,0, DefaultSetings.SIZE_WIDTH,DefaultSetings.SIZE_HEIGHT);
} 
lienzo.addEventListener("mousemove", imgOperator.drawSmallImg);
document.getElementById('files').addEventListener('change', imgOperator.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgOperator.handleFileSelect, false);
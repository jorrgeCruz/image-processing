
import DefaultSetings from "../DefaultSettins_resp";
import ImageLocal from "../ImageLocal";

// let img = new Image();
let lienzo;
let  pantalla;

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

lienzo =  document.getElementById('img');
pantalla = lienzo.getContext("2d");
var dropZone = document.getElementById('img');
var imgOperator = new ImageLocal(pantalla);

imgOperator.image.onload = function() {
    imgOperator.pantalla.drawImage(imgOperator.image, 0 ,0, DefaultSetings.SIZE_WIDTH,DefaultSetings.SIZE_HEIGHT);
} 
lienzo.addEventListener("mousemove", imgOperator.drawSmallImg);
document.getElementById('files').addEventListener('change', imgOperator.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgOperator.handleFileSelect, false);
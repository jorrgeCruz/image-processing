import { DefaultSettings } from "./DefaultSettings.js";
import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
// let img = new Image();
var lienzo1, lienzo2;
var pantalla1;
var pantalla2;
/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
/** Variables que controla el canvas de la imagen, el primero
 * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
*/
lienzo1 = document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
var dropZone = lienzo1; //document.getElementById('img1');
var imgLocal = new ImageLocal(pantalla1);
var testImage; // = new ImageType(imgOperator.getImage(), pantalla);
/** Para que se dibuje la imagen en cuanto la cargamos se debe llamar a este evento onload */
imgLocal.getImage().onload = function () {
    imgLocal.getScreen().clearRect(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
    /** SI nuestro canas es mas pequeño que la imagen se dibuja a su escala normal,
     * si es mas grande se dibuja reescalado al ancho de ventana por default  */
    if (imgLocal.getImage().width > DefaultSettings.SIZE_WIDTH
        || imgLocal.getImage().height > DefaultSettings.SIZE_HEIGHT) {
        imgLocal.getScreen().drawImage(imgLocal.getImage(), 0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
        imgLocal.setScaled(true);
    }
    else {
        imgLocal.getScreen().drawImage(imgLocal.getImage(), 0, 0, imgLocal.getImage().width, imgLocal.getImage().height);
        imgLocal.setScaled(false);
    }
    /** Una vez leida la imagen se puede instancias un objeto de este tipo ya que depende del tamaño y daots de la imagen leida */
    //testImage = new ImageType(imgLocal.getImage(), pantalla1);
    
};
function realizaOP(evt) {
    
    testImage = new ImageType(imgLocal.getImage(), pantalla1);
    
    testImage.dataToImageArray2D();
    testImage.ImageArray2DtoData(pantalla2);
}
lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);
document.getElementById("con-gris").addEventListener('click', realizaOP, false);

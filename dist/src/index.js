import { DefaultSettings } from "./DefaultSettings.js";
import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
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
function convertirAGris(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toGray(imagenSal));
}
function convertirARojo(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toRed(imagenSal));
}
function correccionGamma(evt) {
    var args = prompt('Ingresa los factores de correccion Gamma, separados por coma');
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.correctionGamma(imagenSal, factores));
}
function umbralizado(evt) {
    var args = prompt('Ingresa el valor del umbral');
    var umbral = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral(imagenSal, umbral));
}
function desfaseX(evt) {
    var args = prompt('Ingresa el valor del desfase en X');
    var des = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceX(imagenSal, des));
}
function desfaseY(evt) {
    var args = prompt('Ingresa el valor del desfase en X');
    var desy = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceX(imagenSal, desy));
}
lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);
document.getElementById("op-gris").addEventListener('click', convertirAGris, false);
document.getElementById("op-rojo").addEventListener('click', convertirARojo, false);
document.getElementById("op-gamma").addEventListener('click', correccionGamma, false);
document.getElementById("op-umbral1").addEventListener('click', umbralizado, false);
document.getElementById("op-desfaseX").addEventListener('click', desfaseX, false);
document.getElementById("op-desfaseY").addEventListener('click', desfaseY, false);

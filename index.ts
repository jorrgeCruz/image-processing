import { DefaultSettings } from "./DefaultSettings";
import { ImageLocal } from "./ImageLocal";
import { ImageType } from "./ImageType";
import { MathImg } from "./MathImg";

let lienzo1: HTMLCanvasElement;
let lienzo2: HTMLCanvasElement;
let lienzo4: HTMLCanvasElement;
let pantalla1: CanvasRenderingContext2D;
let pantalla2: CanvasRenderingContext2D;
let pantalla4: CanvasRenderingContext2D;
/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt:any) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  /** Variables que controla el canvas de la imagen, el primero 
   * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
  */
 lienzo1 = <HTMLCanvasElement>document.getElementById('img1');
 pantalla1 = lienzo1.getContext("2d");
 lienzo2 = <HTMLCanvasElement>document.getElementById('img2');
 pantalla2 = lienzo2.getContext("2d");
 lienzo4 = <HTMLCanvasElement>document.getElementById('img4');
 pantalla4 = lienzo4.getContext("2d");

var dropZone = lienzo1;//document.getElementById('img1');
var imgLocal: ImageLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var imgLocal4: ImageLocal = new ImageLocal(pantalla4);
imgLocal4.getImage().onload = imgLocal4.onload;

function convertirAGris(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toGray(imagenSal));
}
function convertirANegativo(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegative(imagenSal));
}
function convertirARojo(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toRed(imagenSal));
}
function convertirAVerde(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toGreen(imagenSal));
}
function convertirAAzul(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toBlue(imagenSal));
}
function convertirMagenta(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toMagenta(imagenSal));
}
function correccionGamma(evt: any): void{
  var args = prompt('Ingresa los factores de correccion Gamma, separados por coma');
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.correctionGamma(imagenSal, factores));
}
function umbralizado(evt: any): void{
  var args = prompt('Ingresa el valor del umbral');
  var umbral = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral(imagenSal, umbral));
}
function desfaseX(evt: any): void{
  var args = prompt('Ingresa el valor del desfase en X');
  var des = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceX(imagenSal, des));
}
function desfaseY(evt: any): void{
  var args = prompt('Ingresa el valor del desfase en Y');
  var desy = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceX(imagenSal, desy));
}
function umbral2limites(evt: any): void{
    var args = prompt('Ingresa el rango minimo y el maximo separado por comas');
    var rangos = args.split(',').map(elem => parseFloat(elem));
    var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral2limites(imagenSal, rangos));
}
function changeBrightness(evt: any): void {
    var factor = prompt ("Ingresa un valor en el rango de 0-2, como un porcentaje");
    var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeBrightness(imagenSal,  parseFloat(factor)));
}
function colorGradienteX(evt: any): void{
  var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradienteX(imagenSal, factores));
}
function colorGradienteY(evt: any): void{
  var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradientY(imagenSal, factores));
}
function opchangeContraste(evt: any): void{
    var argss = prompt('Ingresa un valor entre el rango de -100 a 100');
    var valor = parseFloat(argss);
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeContraste(imagenSal, valor));
}
function opgetPow(evt: any): void{
  var argss = prompt('Ingresa el valor de la potencia');
  var valor = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.pow(imagenSal, valor));
}
function coseno(evt: any): void{
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toCos(imagenSal));
}
function multiplicacion(evt: any): void{
  var argss = prompt('Ingresa el valor');
  var valor = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toMultiplication(imagenSal, valor));
}
function subtract(evt: any): void{
  var argss = prompt('Ingresa el valor a restar en el rango 1 hasta 255');
  var restar = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toSubtract(imagenSal, restar));
} 
function funcionSine(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSine(imagenSal));
}
function add(evt: any): void{
  var argss = prompt('Ingresa el valor a sumar en el rango 1 hasta 255');
  var sumar = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toAdd(imagenSal, sumar));
}
function sqrt(evt: any): void{
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSqrt(imagenSal));
}  
function div(evt: any): void{
  var argss = prompt('Ingresa el valor a dividir en el rango 1 hasta 255');
  var dividir = parseFloat(argss);
  if(dividir==0){
    var argss = prompt('Ingresa un valor diferente de 0');
    var dividir = parseFloat(argss);
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDividir(imagenSal, dividir));
  }
  else{
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDividir(imagenSal, dividir));
  }
}
function tan(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toTan(imagenSal));
} 

function sumaImg(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagen2:ImageType = new ImageType(pantalla4, imgLocal4.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.addImg(imagenSal, imagen2));
}
lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);
//menu op basicas
document.getElementById("op-gris").addEventListener('click', convertirAGris, false);
document.getElementById("op-negativo").addEventListener('click', convertirANegativo, false);
document.getElementById("op-rojo").addEventListener('click', convertirARojo, false);
document.getElementById("op-verde").addEventListener('click', convertirAVerde, false);
document.getElementById("op-azul").addEventListener('click', convertirAAzul, false);
document.getElementById("op-gamma").addEventListener('click', correccionGamma, false);
document.getElementById("op-umbral1").addEventListener('click', umbralizado, false);
document.getElementById("op-umbral-2-limites").addEventListener('click', umbral2limites, false);
document.getElementById("op-desfaseX").addEventListener('click', desfaseX, false);
document.getElementById("op-desfaseY").addEventListener('click', desfaseY, false);
document.getElementById("op-magenta").addEventListener('click', convertirMagenta, false);

//menu op. edicion
document.getElementById("op-brillo").addEventListener('click', changeBrightness, false);
document.getElementById("op-gradienteX").addEventListener('click', colorGradienteX, false);
document.getElementById("op-gradienteY").addEventListener('click', colorGradienteY, false);
document.getElementById("op-contraste").addEventListener('click', opchangeContraste, false);

//op matematicas
document.getElementById("op-pow").addEventListener('click', opgetPow, false);
document.getElementById("op-sqrt").addEventListener('click', sqrt, false);
document.getElementById("op-sine").addEventListener('click', funcionSine, false);
document.getElementById("op-cos").addEventListener('click', coseno, false);
document.getElementById("op-tan").addEventListener('click', tan, false);
document.getElementById("op-add").addEventListener('click', add, false);
document.getElementById("op-subtract").addEventListener('click', subtract, false);
document.getElementById("op-multiplicacion").addEventListener('click', multiplicacion, false);
document.getElementById("op-div").addEventListener('click', div, false);


//op con imagenes compuestas
document.getElementById("op-addimg").addEventListener('click', sumaImg, false);

import { DefaultSettings } from "./DefaultSettings";
import { ImageType } from "./ImageType";

export class MathImg{

  public static toGray(img: ImageType): number[][][]  {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());

    var prom;
    for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) { 
        prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        sal[0][i][j] = prom;
        sal[1][i][j] = prom;
        sal[2][i][j] = prom;
      }
    } 
    return sal;
  }
  public static toNegative(img: ImageType): number[][][]  {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) { 
        sal[0][i][j] = 255 - arrImage[0][i][j];
        sal[1][i][j] = 255 - arrImage[1][i][j];
        sal[2][i][j] = 255 - arrImage[2][i][j];
      }
    } 
    return sal;
  }
  public static toRed(img: ImageType): number[][][]  {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) { 
        sal[0][i][j] = arrImage[0][i][j];
        sal[1][i][j] = 0;
        sal[2][i][j] = 0;
      }
    } 
    return sal;
  }
  public static toGreen(img: ImageType): number[][][]  {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) { 
        sal[0][i][j] = 0;
        sal[1][i][j] = arrImage[1][i][j];
        sal[2][i][j] = 0;
      }
    } 
    return sal;
  }
  public static toBlue(img: ImageType): number[][][]  {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) { 
        sal[0][i][j] = 0;
        sal[1][i][j] = 0;
        sal[2][i][j] = arrImage[2][i][j];
      }
    } 
    return sal;
  }
  
  public static correctionGamma(img: ImageType, factores:number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) { 
        sal[0][i][j] = this.funcionGamma(arrImage[0][i][j], factores[0]) ;
        sal[1][i][j] = this.funcionGamma(arrImage[1][i][j], factores[1]) ;
        sal[2][i][j] = this.funcionGamma(arrImage[2][i][j], factores[2]) ;
      }
    } 
    return sal;
  }

  public static funcionGamma(pixel: number, factor: number):number {
    return Math.min(255 * Math.pow(pixel / 250, factor), 255);
  }

  public static initArray(width:number, height:number): any{
    var arrImage = new Array(3);
    arrImage[0] = new Array(height);
    arrImage[1] = new Array(height);
    arrImage[2] = new Array(height);
    for (let i = 0; i < height; i++){
      arrImage[0][i] = new Array(width);
      arrImage[1][i] = new Array(width);
      arrImage[2][i] = new Array(width);
    }
    return arrImage;
  }

  public static toUmbral(img: ImageType, umbral: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    var prom;
    for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) { 
        prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        sal[0][i][j] = prom > umbral ? 255 : 0;
        sal[1][i][j] = prom > umbral ? 255 : 0;
        sal[2][i][j] = prom > umbral ? 255 : 0;
        
      }
    } 
    return sal;
  }
  
  public static toDesfaceX(img: ImageType, des: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    var  fila =arrImage[0].length, cols= arrImage[0] [0].length;
    for(let i=0; i<fila; i++){
      for(let j=0; j<cols; j++){
        sal[1][i][j] = arrImage[1][i][j];
        if((j - des)>= 0){
          sal[0][i][j] = arrImage[0][i][j - des];
        }
        else{
          sal[0][i][j] = arrImage[0][i][j];
        }
        if((j + des) < cols){
          sal[2][i][j] = arrImage[2][i][j + des];
        }
        else{
          sal[2][i][j] = arrImage[2][i][j];
        }
      }
    }
     return sal;
  }

  public static toDesfaceY(img: ImageType, desy: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    var  fila =arrImage[0].length, cols= arrImage[0] [0].length;
    for(let i=0; i<fila; i++){
      for(let j=0; j<cols; j++){
        sal[1][i][j] = arrImage[1][i][j];
        if((i - desy)>= 0){
          sal[0][i][j] = arrImage[0][i - desy][j];
        }
        else{
          sal[0][i][j] = arrImage[0][i][j];
        }
        if((i + desy) < fila){
          sal[2][i][j] = arrImage[2][i + desy][j];
        }
        else{
          sal[2][i][j] = arrImage[2][i][j];
        }
      }
    }
    return sal;
  }

  public static colorGradientY(img: ImageType, factores: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    let arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    let sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    var prom: number;
    let r1, r2, b1,b2,g1,g2: number;
    let dr,dg,db: number;
    r1 = factores[0];
    g1 = factores[1];
    b1 = factores[2];
    r2 = factores[3];
    g2 = factores[4];
    b2 = factores[5];

    dr = (r2-r1) / img.getHeight();
    dg = (g2-g1) / img.getHeight();
    db = (b2-b1) / img.getHeight();

    for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) { 
        prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        sal[0][i][j] = Math.floor(prom * r1/255);
        sal[1][i][j] = Math.floor(prom * g1/255);
        sal[2][i][j] = Math.floor(prom * b1/255);
      }
      r1+=dr;
      g1+=dg;
      b1+=db;
    } 
    return sal;
  }
}
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

  public static gammaCorrection(gFactors:number[], img: ImageType):number[][][]{
    var arrImage = img.getArrayImg();
    var sal= this.initArray(img.getWidth(), img.getHeight());
     for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = this.funcionGamma(gFactors[0], arrImage[0][i][j]);
        sal[1][i][j] = this.funcionGamma(gFactors[1], arrImage[1][i][j]);
        sal[2][i][j] = this.funcionGamma(gFactors[2], arrImage[2][i][j]);
      }
    } 
    return sal;
  }
  public static funcionGamma(factor:number, n:number):number {
    var correction: number;
    correction = Math.min(250.0 * Math.pow(n/255,factor)+ 0., 255);
    return correction;
  }


  public static toNegative(img: ImageType) :number[][][]  {
    //var sal = ;
    var arrImage = img.getArrayImg();
    var sal= this.initArray(img.getWidth(), img.getHeight());
     for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = 255-arrImage[0][i][j];
        sal[1][i][j] = 255-arrImage[1][i][j];
        sal[2][i][j] = 255-arrImage[2][i][j];
      }
    } 
    return sal;
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

}


/**prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) /3;
        sal[0][i][j] = prom;
        sal[1][i][j] = prom;
        sal[2][i][j] = prom; */
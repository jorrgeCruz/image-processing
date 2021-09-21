
import { ImageType } from "./ImageType.js";

export class MathImg {

  public static initArray(width: number, height: number): any {
    var arrImage = new Array(3);
    arrImage[0] = new Array(height);
    arrImage[1] = new Array(height);
    arrImage[2] = new Array(height);
    for (let i = 0; i < height; i++) {
      arrImage[0][i] = new Array(width);
      arrImage[1][i] = new Array(width);
      arrImage[2][i] = new Array(width);
    }
    return arrImage;
  }
  public static initArray2D(width: number, height: number): any {
    var arrImage = new Array(2);
    arrImage[0] = new Array(height);
    arrImage[1] = new Array(height);
    for (let i = 0; i < height; i++) {
      arrImage[0][i] = new Array(width);
      arrImage[1][i] = new Array(width);
    }
    return arrImage;
  }

  public static toGray(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());

    var prom;
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        sal[0][i][j] = prom;
        sal[1][i][j] = prom;
        sal[2][i][j] = prom;
      }
    }
    return sal;
  }
  public static toNegative(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = arrImage[0][i][j];
        sal[1][i][j] = arrImage[1][i][j];
        sal[2][i][j] = 0;//255-arrImage[2][i][j];
      }
    }
    return sal;
  }
  public static toRed(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = arrImage[0][i][j];
        sal[1][i][j] = 0;
        sal[2][i][j] = 0;
      }
    }
    return sal;
  }
  public static toGreen(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = 0;
        sal[1][i][j] = arrImage[1][i][j];
        sal[2][i][j] = 0;
      }
    }
    return sal;
  }
  public static toBlue(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = 0;
        sal[1][i][j] = 0;
        sal[2][i][j] = arrImage[2][i][j];
      }
    }
    return sal;
  }
  
  public static correctionGamma(img: ImageType, factores: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = this.funcionGamma(arrImage[0][i][j], factores[0]);
        sal[1][i][j] = this.funcionGamma(arrImage[1][i][j], factores[1]);
        sal[2][i][j] = this.funcionGamma(arrImage[2][i][j], factores[2]);
      }
    }
    return sal;
  }

  public static funcionGamma(pixel: number, factor: number): number {
    return Math.min(255 * Math.pow(pixel / 250, factor), 255);
  }

  public static toUmbral(img: ImageType, umbral: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    var prom;
    for (let i = 0; i < img.getHeight(); i++) {
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
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
    for (let i = 0; i < fila; i++) {
      for (let j = 0; j < cols; j++) {
        sal[1][i][j] = arrImage[1][i][j];
        if ((j - des) >= 0) {
          sal[0][i][j] = arrImage[0][i][j - des];
        }
        else {
          sal[0][i][j] = arrImage[0][i][j];
        }
        if ((j + des) < cols) {
          sal[2][i][j] = arrImage[2][i][j + des];
        }
        else {
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
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
    for (let i = 0; i < fila; i++) {
      for (let j = 0; j < cols; j++) {
        sal[1][i][j] = arrImage[1][i][j];
        if ((i - desy) >= 0) {
          sal[0][i][j] = arrImage[0][i - desy][j];
        }
        else {
          sal[0][i][j] = arrImage[0][i][j];
        }
        if ((i + desy) < fila) {
          sal[2][i][j] = arrImage[2][i + desy][j];
        }
        else {
          sal[2][i][j] = arrImage[2][i][j];
        }
      }
    }
    return sal;
  }

  public static toUmbral2limites(img: ImageType, rangos: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
    var sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    let rangoMin = rangos[0];
    let rangoMax = rangos[1];
    var prome;
    for (let i = 0; i < fila; i++) {
      for (let j = 0; j < cols; j++) {
        prome = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        if (prome <= rangoMin && prome >= rangoMax) {
          sal[0][i][j] = 250;
        }
        else
          sal[0][i][j] = 0;
        if (prome <= rangoMin && prome >= rangoMax) {
          sal[1][i][j] = 250;
        }
        else
          sal[1][i][j] = 0;
        if (prome <= rangoMin && prome >= rangoMax) {
          sal[2][i][j] = 250;
        }
        else
          sal[2][i][j] = 0;
      }
    }
    return sal;
  }

  public static changeBrightness(img: ImageType, factor: number): number[][][] {
    var arrImage: number[][][] = img.getArrayImg();
    var sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = arrImage[0][i][j] * factor > 255.0 ? 255.0 : arrImage[0][i][j] * factor;
        sal[1][i][j] = arrImage[1][i][j] * factor > 255.0 ? 255.0 : arrImage[1][i][j] * factor;
        sal[2][i][j] = arrImage[2][i][j] * factor > 255.0 ? 255.0 : arrImage[2][i][j] * factor;
      }
    }
    return sal;
  }

  public static relativeBrightness(img: ImageType): number[][][] {
    var arrImage: number[][][] = img.getArrayImg();
    var sal: any[][][] = this.initArray2D(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        //si el valor del pixel > umbral, entoncesa calculo el brillo
        //si no el brillo =0
        sal[0][i][j] = Math.sqrt(arrImage[0][i][j] ** 2 * 0.299 +
          arrImage[1][i][j] ** 2 * 0.587 +
          arrImage[2][i][j] ** 2 * 0.114) / 100.0;
        sal[1][i][j] = 'rgb(' + arrImage[0][i][j] + ',' + arrImage[1][i][j] + ',' + arrImage[2][i][j] + ')';
      }
    }
    return sal;
  }

  public static colorGradienteX(img: ImageType, factores: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    let arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    let sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    var prom: number;
    let r1, r2, b1, b2, g1, g2: number;
    let dr, dg, db, dir: number;
    r1 = factores[0];
    g1 = factores[1];
    b1 = factores[2];
    r2 = factores[3];
    g2 = factores[4];
    b2 = factores[5];

    dr = (r2 - r1) / img.getWidth();
    dg = (g2 - g1) / img.getWidth();
    db = (b2 - b1) / img.getWidth();

    for (let j = 0; j < img.getWidth(); j++) {
      for (let i = 0; i < img.getHeight(); i++) {
        prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        sal[0][i][j] = Math.floor(prom * r1 / 255);
        sal[1][i][j] = Math.floor(prom * g1 / 255);
        sal[2][i][j] = Math.floor(prom * b1 / 255);
      }
      r1 += dr;
      g1 += dg;
      b1 += db;
    }
    return sal;
  }
  public static colorGradientY(img: ImageType, factores: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    let arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    let sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    var prom: number;
    let r1, r2, b1, b2, g1, g2: number;
    let dr, dg, db: number;
    r1 = factores[0];
    g1 = factores[1];
    b1 = factores[2];
    r2 = factores[3];
    g2 = factores[4];
    b2 = factores[5];

    dr = (r2 - r1) / img.getHeight();
    dg = (g2 - g1) / img.getHeight();
    db = (b2 - b1) / img.getHeight();

    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        sal[0][i][j] = Math.floor(prom * r1 / 255);
        sal[1][i][j] = Math.floor(prom * g1 / 255);
        sal[2][i][j] = Math.floor(prom * b1 / 255);
      }
      r1 += dr;
      g1 += dg;
      b1 += db;
    }
    return sal;
  }

  /**
   * Metodo para Generar el contraste de una Imagen
   * @img  ImageType tipo de imagen donde se guarda una matriz tridimencional
   * @return number[][][] es la imagen de salida con contraste 
   */
  public static changeContraste(img: ImageType, valor: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = this.initArray(img.getWidth(), img.getHeight());
    //
    var cR, cG, cB: number;
    var contraste: number;
    contraste = (valor + 100) / 100;
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        cR = ((((arrImage[0][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
        if (cR > 255) cR = 255;
        if (cR < 0) cR = 0;
        sal[0][i][j] = cR;
        cG = ((((arrImage[1][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
        if (cG > 255) cG = 255;
        if (cG < 0) cG = 0;
        sal[1][i][j] = cG;
        cB = ((((arrImage[2][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
        if (cB > 255) cB = 255;
        if (cB < 0) cB = 0;
        sal[2][i][j] = cB;
      }
    }
    return sal;
  }

  public static pow(img: ImageType, power: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = Math.pow(arrImage[0][i][j], power);
        sal[1][i][j] = Math.pow(arrImage[1][i][j], power);
        sal[2][i][j] = Math.pow(arrImage[2][i][j], power);
      }
    }
    return sal;
  }

  public static toCos(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = Math.cos(arrImage[0][i][j]);
        sal[1][i][j] = Math.cos(arrImage[1][i][j]);
        sal[2][i][j] = Math.cos(arrImage[2][i][j]);
      }
    }
    return sal;
  }

  public static toSubtract(img: ImageType, escalar: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = arrImage[0][i][j] - escalar;
        sal[1][i][j] = arrImage[1][i][j] - escalar;
        sal[2][i][j] = arrImage[2][i][j] - escalar;
      }
    }
    return sal;
  }
  
  public static toMultiplication(img: ImageType, valor: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = valor * arrImage[0][i][j];
        sal[1][i][j] = valor * arrImage[1][i][j];
        sal[2][i][j] = valor * arrImage[2][i][j];
      }
    }
    return sal;
  }
  
  public static toSine(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = Math.sin(arrImage[0][i][j]);
        sal[1][i][j] = Math.sin(arrImage[1][i][j]);
        sal[2][i][j] = Math.sin(arrImage[2][i][j]);
      }
    }
    return sal;
  }

  public static toAdd(img: ImageType, sumar: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = arrImage[0][i][j] + sumar;
        sal[1][i][j] = arrImage[1][i][j] + sumar;
        sal[2][i][j] = arrImage[2][i][j] + sumar;
      }
    }
    return sal;
  }
 
  public static toDividir(img: ImageType, dividir: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = arrImage[0][i][j] + dividir;
        sal[1][i][j] = arrImage[1][i][j] + dividir;
        sal[2][i][j] = arrImage[2][i][j] + dividir;
      }
    }
    return sal;
  }
  

  public static toSqrt(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {

        sal[0][i][j] = Math.sqrt(arrImage[0][i][j]);
        sal[1][i][j] = Math.sqrt(arrImage[1][i][j]);
        sal[2][i][j] = Math.sqrt(arrImage[2][i][j]);
      }
    }
    return sal;
  }

  public static toTan(img: ImageType): number[][][] {

    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = Math.tan(arrImage[0][i][j]);
        sal[1][i][j] = Math.tan(arrImage[1][i][j]);
        sal[2][i][j] = Math.tan(arrImage[2][i][j]);
      }
    }
    return sal;
  }

  public static addImg(img: ImageType, img2: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    var arrImage2 = img2.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = arrImage[0][i][j] + arrImage2[0][i][j];
        sal[1][i][j] = arrImage[1][i][j] + arrImage2[1][i][j];
        sal[2][i][j] = arrImage[2][i][j] + arrImage2[2][i][j];
      }
    }
    return sal;
  }

  public static hist(img: ImageType): number[][] {

    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = new Array(3);
    sal[0] = new Array(256);
    sal[1] = new Array(256);
    sal[2] = new Array(256);
    
    for (let i = 0; i < 256; i++) {
      sal[0][i] = 0;
      sal[1][i] = 0;
      sal[2][i] = 0;
    }
    
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][arrImage[0][i][j]]++;
        sal[1][arrImage[1][i][j]]++;
        sal[2][arrImage[2][i][j]]++;
      }
    }
    //console.log(sal[0])
    return sal;
  }
  public static histAcum(h: number[][]): number[][] {

    //variable donde guardamos la salida
    var hist = new Array(3);
    hist[0] = new Array(256);
    hist[1] = new Array(256);
    hist[2] = new Array(256);
  
    hist[0][0] = h[0][0];
    hist[1][0] = h[1][0];
    hist[2][0] = h[2][0];
    for (let i = 1; i < h[0].length; i++) {
      hist[0][i] = hist[0][i - 1] + h[0][i];
      hist[1][i] = hist[1][i - 1] + h[1][i];
      hist[2][i] = hist[2][i - 1] + h[2][i];
      //if(i==255)
    }
    return hist;
  }

  public static ecualizar(img: ImageType): number[][][] {

    //variable que guarda el arreglo 3d de la imagen de color
    let arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    let sal = this.initArray(img.getWidth(), img.getHeight());
    let h = this.hist(img);
    let hA = this.histAcum(h);
    let fT: number[][];
    fT = new Array(3);
    fT[0] = new Array(256);
    fT[2] = new Array(256);
    fT[1] = new Array(256);
    
    for (let i = 0; i < 256; i++) {
      fT[0][i] = Math.floor(hA[0][i] * 255.0 / hA[0][255]);
      fT[1][i] = Math.floor(hA[1][i] * 255.0 / hA[1][255]);
      fT[2][i] = Math.floor(hA[2][i] * 255.0 / hA[2][254]);
    }
    
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = fT[0][arrImage[0][i][j]];
        sal[1][i][j] = fT[1][arrImage[1][i][j]];
        sal[2][i][j] = fT[2][arrImage[2][i][j]];
      }
    }
    //console.log(sal[0])
    return sal;
  }


  public static erosionar(img: ImageType, vec8: boolean): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = 0;
        sal[1][i][j] = 0;
        sal[2][i][j] = 0;
      }
    }
    let vecinos: number, valorComp = 4;
    if (vec8) valorComp = 8;
    
    for (let i = 1; i < img.getHeight() - 1; i++) {
      for (let j = 1; j < img.getWidth() - 1; j++) {
        vecinos = 0;
        vecinos += arrImage[0][i + 1][j] ? 1 : 0;
        vecinos += arrImage[0][i - 1][j] ? 1 : 0;
        vecinos += arrImage[0][i][j + 1] ? 1 : 0;
        vecinos += arrImage[0][i][j - 1] ? 1 : 0;
        if (vec8) {
          vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
          vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
          vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
          vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
        }

        if (arrImage[0][i][j] && vecinos == valorComp) {
          sal[0][i][j] = 255;
          sal[1][i][j] = 255;
          sal[2][i][j] = 255;
        }
      }
    }
    
    return sal;
  }
  public static dilatar(img: ImageType, vec8: boolean): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = 0;
        sal[1][i][j] = 0;
        sal[2][i][j] = 0;
      }
    }
    let vecinos: number, valorComp = 4;
    if (vec8) valorComp = 8;
    
    for (let i = 1; i < img.getHeight() - 1; i++) {
      for (let j = 1; j < img.getWidth() - 1; j++) {
        vecinos = 0;
        vecinos += arrImage[0][i + 1][j] ? 1 : 0;
        vecinos += arrImage[0][i - 1][j] ? 1 : 0;
        vecinos += arrImage[0][i][j + 1] ? 1 : 0;
        vecinos += arrImage[0][i][j - 1] ? 1 : 0;
        if (vec8) {
          vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
          vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
          vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
          vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
        }

        if (arrImage[0][i][j] && vecinos) {
          sal[0][i][j] = 255;
          sal[1][i][j] = 255;
          sal[2][i][j] = 255;
        }
      }
    }
    
    return sal;
  }

  public static apertura(img: ImageType, vec8: boolean): number[][][] {
    var arrImage = this.erosionar(img, vec8);
    var sal = this.initArray(img.getWidth(), img.getHeight());
    let vecinos: number, valorComp = 4;
    if (vec8) valorComp = 8;
    
    for (let i = 1; i < img.getHeight() - 1; i++) {
      for (let j = 1; j < img.getWidth() - 1; j++) {
        vecinos = 0;
        vecinos += arrImage[0][i + 1][j] ? 1 : 0;
        vecinos += arrImage[0][i - 1][j] ? 1 : 0;
        vecinos += arrImage[0][i][j + 1] ? 1 : 0;
        vecinos += arrImage[0][i][j - 1] ? 1 : 0;
        if (vec8) {
          vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
          vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
          vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
          vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
        }

        if (arrImage[0][i][j] && vecinos) {
          sal[0][i][j] = 255;
          sal[1][i][j] = 255;
          sal[2][i][j] = 255;
        }
      }
    }
    
    return sal;
  }

  public static cierre(img: ImageType, vec8: boolean): number[][][] {
    var arrImage = this.dilatar(img, vec8);
    let vecinos: number, valorComp = 4;
    var sal = this.initArray(img.getWidth(), img.getHeight());
    if (vec8) valorComp = 8;
    
    for (let i = 1; i < img.getHeight() - 1; i++) {
      for (let j = 1; j < img.getWidth() - 1; j++) {
        vecinos = 0;
        vecinos += arrImage[0][i + 1][j] ? 1 : 0;
        vecinos += arrImage[0][i - 1][j] ? 1 : 0;
        vecinos += arrImage[0][i][j + 1] ? 1 : 0;
        vecinos += arrImage[0][i][j - 1] ? 1 : 0;
        if (vec8) {
          vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
          vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
          vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
          vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
        }

        if (arrImage[0][i][j] && vecinos == valorComp) {
          sal[0][i][j] = 255;
          sal[1][i][j] = 255;
          sal[2][i][j] = 255;
        }
      }
    }
    
    return sal;
  }

  public static fromRGBtoHSI(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    var sal = this.initArray(img.getWidth(), img.getHeight());
    let hue: number;
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        arrImage[0][i][j] /= 255.0;
        arrImage[1][i][j] /= 255.0;
        arrImage[2][i][j] /= 255.0;
        hue = 180 / Math.PI * Math.acos(0.5 * ((arrImage[0][i][j] - arrImage[1][i][j]) + (arrImage[0][i][j] - arrImage[2][i][j])) /
          Math.sqrt(Math.pow(arrImage[0][i][j] - arrImage[1][i][j], 2) + (arrImage[0][i][j] - arrImage[2][i][j]) * (arrImage[1][i][j] - arrImage[2][i][j])))
          
        sal[0][i][j] = arrImage[2][i][j] > arrImage[1][i][j] ? 360 - hue : hue;
        sal[1][i][j] = 1 - (3 * Math.min(arrImage[0][i][j], arrImage[1][i][j], arrImage[2][i][j])) / (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]);
        sal[2][i][j] = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
      }
    }
    return sal;
  }

  public static fromHSItoRGB(arrImage: number[][][]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    let width: number;
    let height: number;
    height = arrImage[0].length;
    width = arrImage[0][0].length;
    //variable donde guardamos la salida
    var sal = this.initArray(width, height);
  
    let hue: number;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        //H de 0 - 120
        if (arrImage[0][i][j] >= 0 && arrImage[0][i][j] < 120) {
          sal[0][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j]))) /
            (Math.cos(this.toRad(60 - arrImage[0][i][j]))));
          sal[2][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
          sal[1][i][j] = 3 * arrImage[2][i][j] - sal[0][i][j] - sal[2][i][j];
        } else if (arrImage[0][i][j] >= 120 && arrImage[0][i][j] < 240) {
          sal[0][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
          sal[1][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j] - 120))) /
            (Math.cos(this.toRad(180 - arrImage[0][i][j]))));
          sal[2][i][j] = 3 * arrImage[2][i][j] - sal[0][i][j] - sal[1][i][j];
        } else if (arrImage[0][i][j] >= 240 && arrImage[0][i][j] < 360) {
          sal[1][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
          sal[2][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j] - 240))) /
            (Math.cos(this.toRad(300 - arrImage[0][i][j]))));
          sal[0][i][j] = 3 * arrImage[2][i][j] - sal[1][i][j] - sal[2][i][j];
        }
        sal[0][i][j] *= 255.0;
        sal[1][i][j] *= 255.0;
        sal[2][i][j] *= 255.0;
      }
    }
    return sal;
  }

  public static toRad(grados: number ): number{
    return ( grados * Math.PI / 180);
  }
  public static falseColorByHue(arrImage: number[][][], hue: number, newHue: number): number[][][] {
    let width: number;
    let height: number; 
    height = arrImage[0].length;
    width = arrImage[0][0].length;
    //variable donde guardamos la salida
    var sal = this.initArray(width, height);
    let range = 25;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        //si hue es menor a cero estamos en el rango de 360 bajos, por lo que hay que revisar esos valores
        if ((hue - range) < 0) {
          if (Math.abs(hue - arrImage[0][i][j]) < range) {
            sal[0][i][j] = newHue;
          } else if ( (360 + hue - arrImage[0][i][j])< range) {
            sal[0][i][j] = newHue;
          } else {
            sal[0][i][j] = arrImage[0][i][j];
          }
        }
        else if ((hue + range) > 360) {
          if (Math.abs(hue - arrImage[0][i][j]) < range) {
            sal[0][i][j] = newHue;
          } else if ( (-360 + hue - arrImage[0][i][j])< range) {
            sal[0][i][j] = newHue;
          } else {
            sal[0][i][j] = arrImage[0][i][j];
          }
        }// si no se rebasa del cero
        else if (Math.abs(hue - arrImage[0][i][j]) < range) {
          sal[0][i][j] = newHue;
        } // si no se rebasa del rango
        else {
          sal[0][i][j] = arrImage[0][i][j];
        }
        sal[1][i][j] = arrImage[1][i][j];
        sal[2][i][j] = arrImage[2][i][j];
      } 
    }
    return sal;
  }
}

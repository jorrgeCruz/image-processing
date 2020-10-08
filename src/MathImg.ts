import { DefaultSettings } from "./DefaultSettings";
import { ImageType } from "./ImageType";

export class MathImg{

  public static toGray(img: ImageType) :number[][][]  {
    //var sal = ;
    var arrImage = img.getArrayImg();
    var prom;
    var sal: number[][][];
     for (let i = 0; i < img.getHeight(); i++){
      for (let j = 0; j < img.getWidth(); j++) {
        
        prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) /3;
        sal[0][i][j] = prom;
        sal[0][i][j] = prom;
        sal[0][i][j] = prom;
      }
    } 
    return sal;
  }
  
}
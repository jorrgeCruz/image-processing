export class ImageType {
  arrImage: number[][][];
  imageData: ImageData;
  screenCanvas:CanvasRenderingContext2D
  _width: number;
  _height: number;

  /**  Constructor general
   * @img es un objeto tipo HTMLImageElement del cual se extrae el tamaño de la imagen
   * @sc es el elemento Canvas de donde se ha dibujado la img
  */
  constructor(sc: CanvasRenderingContext2D, img?: HTMLImageElement,  w?:number, h?:number) {
    if (img) {
      this._width = img.width;
      this._height = img.height;
    } else {
      this._width = w;
      this._height = h;
    }
    this.screenCanvas = sc;
    this.imageData = sc.getImageData(0, 0, this._width, this._height);
    this.initArray();
    this.dataToImageArray2D();
    this.dataToImageArray2D = this.dataToImageArray2D.bind(this);
    this.imageArray2DtoData = this.imageArray2DtoData.bind(this);
  }

  private _initConstructor1() {
    
  }

  /** Metodo que devuelve las coordenas del array unidimensional de datos de la imagen */
  public getColorIndicesForCoord(x:number, y:number):number[] {
    var red = y * (this._width * 4) + x * 4;
    return [red, red + 1, red + 2];
  }

  /** Convierte la data de la imagen a un arreglo tridimensional de manera que que queda asi:
   * img[canalDeColor][anchoImg][altoImg]
   */
  public dataToImageArray2D():void { // number[][][]
    let position: number[];
    for (let i = 0; i < this._height; i++){
      for (let j = 0; j < this._width; j++) {
        position = this.getColorIndicesForCoord(j, i);
        this.arrImage[0][i][j] = this.imageData.data[position[0]];
        this.arrImage[1][i][j] = this.imageData.data[position[1]];
        this.arrImage[2][i][j] = this.imageData.data[position[2]];
      }
    }
    //return this.arrImage;
  }

  /** Covierte un arreglo 3d de la imagen a un objeto data, si el argumento existe se dibuja
   * @sc elemento Canas donde se desa dibujar la data
   */
  public imageArray2DtoData(sc:CanvasRenderingContext2D, arrImage: number[][][]):void {
    let position: number[];
    
    for (let i = 0; i < this._height; i++){
      for (let j = 0; j < this._width; j++) {
        position = this.getColorIndicesForCoord(j, i);
        this.imageData.data[position[0]] = arrImage[0][i][j];
        this.imageData.data[position[1]] = arrImage[1][i][j];
        this.imageData.data[position[2]] = arrImage[2][i][j];
      }
    }
    sc.putImageData(this.imageData, 0,0);
  }

  public initArray():void{
    this.arrImage = new Array(3);
    this.arrImage[0] = new Array(this._height);
    this.arrImage[1] = new Array(this._height);
    this.arrImage[2] = new Array(this._height);
    for (let i = 0; i < this._height; i++){
      this.arrImage[0][i] = new Array(this._width);
      this.arrImage[1][i] = new Array(this._width);
      this.arrImage[2][i] = new Array(this._width);
    }
  }

  public getArrayImg():number[][][]  {
    return this.arrImage;
  }
  public getWidth():number {
    return this._width;
  }
  public getHeight():number {
    return this._height;
  }
}

// new ImageType(new ImageData(2,2)).testint();
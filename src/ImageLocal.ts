import { DefaultSettings } from "./DefaultSettings.js";
import { ImageOp } from "./ImageOp.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";

export class ImageLocal implements ImageOp {
  //atributos
  protected img: HTMLImageElement;
  protected screen: CanvasRenderingContext2D;
  protected readyToDraw: boolean;
  protected isScaled: boolean;
  public xStart: number = null;
  public yStart: number;
  public xFinal: number;
  public yFinal: number;
  public minMax=[0,0];
  // protected document: HTMLDocument;

  public constructor(p: CanvasRenderingContext2D, ready?: boolean){
    this.img = new Image();
    this.screen = p;
    // this.document = d;
    
    this.readyToDraw = ready;
    this.isScaled = false;
    this.drawSmallImg = this.drawSmallImg.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);  
    this.onload = this.onload.bind(this);
    this.drawArea = this.drawArea.bind(this);  
  }
    
  public handleFileSelect(evt:any):void {
    let files: any;
    
    if(evt.type === "drop") {
      evt.stopPropagation();
      evt.preventDefault();
      files = evt.dataTransfer.files;
    }
    if(evt.type === "change")
      files = evt.target.files; // FileList object
            
    // files is a FileList of File objects. List some properties.
    let output:any[] = [];
    //console.log(evt)
    let f:any = files[0];
    output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
    f.size, ' bytes, last modified: ',
    f.lastModifiedDate.toLocaleDateString(), '</li>');
                
    this.img.src = f.name;      
    this.readyToDraw = true;  

    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';     
    this.onload();
  }

  public drawSmallImg(evt:any):void{
    let xPos:number = evt.offsetX-2;
    let yPos: number = evt.offsetY - 2;
    let pixel:ImageData = this.screen.getImageData(xPos, yPos, 1, 1);
       
    if (this.readyToDraw) {    
      if (this.isScaled) {
        xPos *= (this.img.width/DefaultSettings.SIZE_WIDTH);
        yPos *= (this.img.height/DefaultSettings.SIZE_HEIGHT);
        
      }
      this.screen.clearRect(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
      this.screen.strokeStyle = "lightgray";
      
      this.screen.imageSmoothingEnabled = false;
      this.isScaled ?
          this.screen.drawImage(this.img, 0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT)
        : this.screen.drawImage(this.img, 0, 0, this.img.width, this.img.height);
      
      this.screen.strokeRect(evt.offsetX+5, evt.offsetY+5,  DefaultSettings.SMALL_W,DefaultSettings.SMALL_H);
      this.screen.drawImage(this.img, Math.floor(xPos - 3), Math.floor(yPos - 3), 5, 5, evt.offsetX + 5, evt.offsetY + 5, DefaultSettings.SMALL_W, DefaultSettings.SMALL_H);
      
      let color:HTMLElement = document.getElementById('color');
      
      let data:Uint8ClampedArray = pixel.data;
      let rgba = 'rgba(' + data[0] + ', ' + data[1] +
                ', ' + data[2] + ', ' + (data[3] / 255) + ')';
      color.style.background =  rgba;
      //color.textContent = rgba;

      document.getElementById('rgb').innerHTML = '<strong>'+ rgba + '</strong> ';
    }
  }
  public getImage():HTMLImageElement{
        return this.img;
  }
  public getScreen():CanvasRenderingContext2D{
    return this.screen;
  }

  public setScaled(v:boolean):void{
        this.isScaled = v;
  }
  public onload() {
    this.getScreen().clearRect(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
    /** SI nuestro canvas es mas pequeño que la imagen se dibuja a su escala normal, 
     * si es mas grande se dibuja reescalado al ancho de ventana por default  */
    if (this.getImage().width > DefaultSettings.SIZE_WIDTH
      || this.getImage().height > DefaultSettings.SIZE_HEIGHT) {
      this.getScreen().drawImage(this.getImage(), 0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
      this.setScaled(true);
    }
    else {
      this.getScreen().drawImage(this.getImage(), 0, 0, this.getImage().width, this.getImage().height);
      this.setScaled(false);
    }
  }

  public drawArea(evt:any): void{
    let canvas:CanvasRenderingContext2D;
    let aux: number;

    console.log('Funcion draw area');
    if(this.xStart==null){
      this.xStart = evt.offsetX;
      this.yStart =evt.offsetY;
    }else{
      this.xFinal=evt.offsetX;
      this.yFinal=evt.offsetY;
      if(this.xFinal < this.xStart){
        aux = this.xFinal;
        this.xFinal = this.xStart;
        this.xStart = aux;
      }if(this.yFinal < this.yStart){
        aux = this.yFinal;
        this.yFinal = this.yStart;
        this.yStart = aux;
      }
      this.screen.strokeRect(this.xStart,this.yStart,this.xFinal-this.xStart+4,this.yFinal-this.yStart+4);
      var imagencropSal: ImageType=new ImageType(this.getScreen(),this.getImage(),this.getImage().width,this.getImage().height);
      this.minMax=MathImg.averageHue(MathImg.fromRGBtoHSI(imagencropSal),this.xStart,this.yStart,this.xFinal,this.yFinal);
      console.log(this.minMax);
      this.xStart=null;
    }
  }
}

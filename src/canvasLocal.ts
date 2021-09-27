
export class CanvasLocal {
  //atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth:number;
  protected rHeight:number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  protected hist: number[][];
  
      
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement, h?:number[][]){
    this.graphics = g;
    this.rWidth = 12;
    this.rHeight= 12;
    this.maxX = canvas.width - 1
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX/12;
    this.centerY = this.maxY / 12*10;
    this.hist = h;
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number):number{return Math.round(this.centerY - y / this.pixelSize); }
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }
  drawRmboide(x1: number, y1: number, x2: number, y2: number,
  x3:number, y3:number, x4:number, y4:number, color:string) {
    // Color de relleno
    this.graphics.fillStyle = color;
    // Comenzamos la ruta de dibujo, o path
    this.graphics.beginPath();
    // Mover a la esquina superior izquierda
    this.graphics.moveTo(x1, y1);
    // Dibujar la línea hacia la derecha
    this.graphics.lineTo(x2, y2);
    // Ahora la que va hacia abajo
    this.graphics.lineTo(x3, y3); // A 80 porque esa es la altura
    // La que va hacia la izquierda
    this.graphics.lineTo(x4, y4);
    // Y dejamos que la última línea la dibuje JS
    this.graphics.closePath();
    // Hacemos que se dibuje
    this.graphics.stroke();
    // Lo rellenamos
    this.graphics.fill();
  }

  fx(x:number):number {
    return Math.sin(x*2.5);
  }

  paint() {
    const max = this.maxHist();
    const factor = 6 / max;
    this.drawLine(this.iX(0), this.iY(0), this.iX(10), this.iY(0));
    this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(8));
    this.graphics.strokeStyle = 'red';
    for (let i = 0; i < 254; i++){
      this.drawLine(this.iX(i/25), this.iY(this.hist[0][i]*factor), this.iX((i+1)/25), this.iY(this.hist[0][i+1]*factor));
    }
    this.graphics.strokeStyle = 'green';
    for (let i = 0; i < 254; i++){
      this.drawLine(this.iX(i/25), this.iY(this.hist[1][i]*factor), this.iX((i+1)/25), this.iY(this.hist[1][i+1]*factor));
    }
    this.graphics.strokeStyle = 'blue';
    for (let i = 0; i < 254; i++){
      this.drawLine(this.iX(i/25), this.iY(this.hist[2][i]*factor), this.iX((i+1)/25), this.iY(this.hist[2][i+1]*factor));
    }
    /*this.graphics.strokeStyle = 'black';
    this.drawLine(this.iX(0), this.iY(0), this.iX(8), this.iY(0));
    this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(6));
    
   */
  }

  public maxHist(): number {
    let max = this.hist[0][0];
    for (let i = 0; i < 255; i++) {
      if (this.hist[0][i] > max) max = this.hist[0][i];
    }
    return max;
  }
}
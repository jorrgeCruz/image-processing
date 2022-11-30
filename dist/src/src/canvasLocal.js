var CanvasLocal = /** @class */ (function () {
    function CanvasLocal(g, canvas, h) {
        this.graphics = g;
        this.rWidth = 12;
        this.rHeight = 12;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 12;
        this.centerY = this.maxY / 12 * 10;
        this.hist = h;
    }
    CanvasLocal.prototype.iX = function (x) { return Math.round(this.centerX + x / this.pixelSize); };
    CanvasLocal.prototype.iY = function (y) { return Math.round(this.centerY - y / this.pixelSize); };
    CanvasLocal.prototype.drawLine = function (x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    };
    CanvasLocal.prototype.drawRmboide = function (x1, y1, x2, y2, x3, y3, x4, y4, color) {
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
    };
    CanvasLocal.prototype.fx = function (x) {
        return Math.sin(x * 2.5);
    };
    CanvasLocal.prototype.paint = function () {
        var max = this.maxHist();
        var factor = 6 / max;
        this.drawLine(this.iX(0), this.iY(0), this.iX(10), this.iY(0));
        this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(8));
        this.graphics.strokeStyle = 'red';
        for (var i = 0; i < 254; i++) {
            this.drawLine(this.iX(i / 25), this.iY(this.hist[0][i] * factor), this.iX((i + 1) / 25), this.iY(this.hist[0][i + 1] * factor));
        }
        this.graphics.strokeStyle = 'green';
        for (var i = 0; i < 254; i++) {
            this.drawLine(this.iX(i / 25), this.iY(this.hist[1][i] * factor), this.iX((i + 1) / 25), this.iY(this.hist[1][i + 1] * factor));
        }
        this.graphics.strokeStyle = 'blue';
        for (var i = 0; i < 254; i++) {
            this.drawLine(this.iX(i / 25), this.iY(this.hist[2][i] * factor), this.iX((i + 1) / 25), this.iY(this.hist[2][i + 1] * factor));
        }
        /*this.graphics.strokeStyle = 'black';
        this.drawLine(this.iX(0), this.iY(0), this.iX(8), this.iY(0));
        this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(6));
        
       */
    };
    CanvasLocal.prototype.maxHist = function () {
        var max = this.hist[0][0];
        for (var i = 0; i < 255; i++) {
            if (this.hist[0][i] > max)
                max = this.hist[0][i];
        }
        return max;
    };
    return CanvasLocal;
}());
export { CanvasLocal };

var ImageType = /** @class */ (function () {
    /**  Constructor general
     * @img es un objeto tipo HTMLImageElement del cual se extrae el tamaño de la imagen
     * @sc es el elemento Canvas de donde se ha dibujado la img
    */
    function ImageType(sc, img, w, h, data) {
        if (img) {
            this._width = img.width;
            this._height = img.height;
        }
        else {
            this._width = w;
            this._height = h;
        }
        this.screenCanvas = sc;
        this.imageData = sc.getImageData(0, 0, this._width, this._height);
        this.initArray();
        if (!data)
            this.dataToImageArray2D();
        else
            this.dataTextToImageArray2D();
        /*this.dataToImageArray2D = this.dataToImageArray2D.bind(this);
        this.imageArray2DtoData = this.imageArray2DtoData.bind(this);*/
    }
    /** Metodo que devuelve las coordenas del array unidimensional de datos de la imagen */
    ImageType.prototype.getColorIndicesForCoord = function (x, y) {
        var red = y * (this._width * 4) + x * 4;
        return [red, red + 1, red + 2, red + 3];
    };
    /** Convierte la data de la imagen a un arreglo tridimensional de manera que que queda asi:
     * img[canalDeColor][anchoImg][altoImg]
     */
    ImageType.prototype.dataToImageArray2D = function () {
        var position;
        for (var i = 0; i < this._height; i++) {
            for (var j = 0; j < this._width; j++) {
                position = this.getColorIndicesForCoord(j, i);
                this.arrImage[0][i][j] = this.imageData.data[position[0]];
                this.arrImage[1][i][j] = this.imageData.data[position[1]];
                this.arrImage[2][i][j] = this.imageData.data[position[2]];
            }
        }
        //return this.arrImage;
    };
    ImageType.prototype.dataTextToImageArray2D = function () {
        var position;
        for (var i = 0; i < this._height; i++) {
            for (var j = 0; j < this._width; j++) {
                position = this.getColorIndicesForCoord(j, i);
                this.arrImage[0][i][j] = this.imageData.data[position[3]];
                //this.arrImage[1][i][j] = this.imageData.data[position[1]];
                //this.arrImage[2][i][j] = this.imageData.data[position[2]];
            }
        }
        //return this.arrImage;
    };
    /** Covierte un arreglo 3d de la imagen a un objeto data, si el argumento existe se dibuja
     * @sc elemento Canas donde se desa dibujar la data
     */
    ImageType.prototype.imageArray2DtoData = function (sc, arrImage) {
        var position;
        for (var i = 0; i < this._height; i++) {
            for (var j = 0; j < this._width; j++) {
                position = this.getColorIndicesForCoord(j, i);
                this.imageData.data[position[0]] = arrImage[0][i][j];
                this.imageData.data[position[1]] = arrImage[1][i][j];
                this.imageData.data[position[2]] = arrImage[2][i][j];
            }
        }
        sc.putImageData(this.imageData, 0, 0);
    };
    /**
     * Funcion que reescala los valores dew la imagen a el rango de una imagen de 0 - 255,
     * la imagen puede estar en cualrquier rango de nunmeros reales.
     * @param arrImage arrar of data
     * @param alto image heigh
     * @param ancho image width
     */
    ImageType.prototype.imageArray2DtoDataWithResizing = function (sc, arrImage) {
        //variable donde guardamos la salida
        //var sal: number[][][] = this.initArray(ancho, alto);
        var max, min, factor;
        max = arrImage[0][0][0];
        min = arrImage[0][0][0];
        var position;
        for (var i = 0; i < this._height; i++) {
            for (var j = 0; j < this._width; j++) {
                max = Math.max(max, arrImage[0][i][j]);
                min = Math.min(min, arrImage[0][i][j]);
            }
        }
        factor = 255.0 / (max - min);
        console.log(factor, max, min);
        for (var i = 0; i < this._height; i++) {
            for (var j = 0; j < this._width; j++) {
                position = this.getColorIndicesForCoord(j, i);
                this.imageData.data[position[0]] = Math.floor(factor * (arrImage[0][i][j] - min));
                this.imageData.data[position[1]] = Math.floor(factor * (arrImage[1][i][j] - min));
                this.imageData.data[position[2]] = Math.floor(factor * (arrImage[2][i][j] - min));
            }
        }
        sc.putImageData(this.imageData, 0, 0);
    };
    ImageType.prototype.initArray = function () {
        this.arrImage = new Array(3);
        this.arrImage[0] = new Array(this._height);
        this.arrImage[1] = new Array(this._height);
        this.arrImage[2] = new Array(this._height);
        for (var i = 0; i < this._height; i++) {
            this.arrImage[0][i] = new Array(this._width);
            this.arrImage[1][i] = new Array(this._width);
            this.arrImage[2][i] = new Array(this._width);
        }
    };
    ImageType.prototype.getArrayImg = function () {
        return this.arrImage;
    };
    ImageType.prototype.getWidth = function () {
        return this._width;
    };
    ImageType.prototype.getHeight = function () {
        return this._height;
    };
    return ImageType;
}());
export { ImageType };

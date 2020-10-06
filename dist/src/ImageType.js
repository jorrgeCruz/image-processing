var ImageType = /** @class */ (function () {
    function ImageType(img, sc) {
        this._width = img.width;
        this._height = img.height;
        this.screenCanvas = sc;
        debugger
        this.imageData = sc.getImageData(0, 0, this._width, this._height);
        this.dataToImageArray2D = this.dataToImageArray2D.bind(this);
    this.ImageArray2DtoData = this.ImageArray2DtoData.bind(this);
        this.initArray();
    }
    ImageType.prototype.getColorIndicesForCoord = function (x, y) {
        var red = y * (this._width * 4) + x * 4;
        return [red, red + 1, red + 2];
    };
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
        return this.arrImage;
    };
    ImageType.prototype.ImageArray2DtoData = function (sc) {
        var position;
        var prom;
        for (var i = 0; i < this._height; i++) {
            for (var j = 0; j < this._width; j++) {
                position = this.getColorIndicesForCoord(j, i);
                prom = (this.arrImage[0][i][j] + this.arrImage[1][i][j] + this.arrImage[2][i][j]) / 3;
                this.imageData.data[position[0]] = prom;
                this.imageData.data[position[1]] = prom;
                this.imageData.data[position[2]] = prom;
                /* this.imageData.data[position[0]] = this.arrImage[0][i][j];
                this.imageData.data[position[1]] = this.arrImage[1][i][j];
                this.imageData.data[position[2]] = this.arrImage[2][i][j]; */
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
        // this.getImageArray2D();
    };
    return ImageType;
}());
export { ImageType };
// new ImageType(new ImageData(2,2)).testint();

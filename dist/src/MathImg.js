var MathImg = /** @class */ (function () {
    function MathImg() {
    }
    MathImg.toGray = function (img) {
        //var sal = ;
        var arrImage = img.getArrayImg();
        var prom;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = prom;
                sal[1][i][j] = prom;
                sal[2][i][j] = prom;
            }
        }
        return sal;
    };
    MathImg.toNegative = function (img) {
        //var sal = ;
        var arrImage = img.getArrayImg();
        var prom;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 255 - arrImage[0][i][j];
                sal[1][i][j] = 255 - arrImage[1][i][j];
                sal[2][i][j] = 255 - arrImage[2][i][j];
            }
        }
        return sal;
    };
    MathImg.initArray = function (width, height) {
        var arrImage = new Array(3);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        arrImage[2] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
            arrImage[2][i] = new Array(width);
        }
        return arrImage;
    };
    return MathImg;
}());
export { MathImg };

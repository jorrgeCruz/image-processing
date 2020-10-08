var MathImg = /** @class */ (function () {
    function MathImg() {
    }
    MathImg.toGray = function (img) {
        //var sal = ;
        var arrImage = img.getArrayImg();
        var prom;
        var sal;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = prom;
                sal[0][i][j] = prom;
                sal[0][i][j] = prom;
            }
        }
        return sal;
    };
    return MathImg;
}());
export { MathImg };

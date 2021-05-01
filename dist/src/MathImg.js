var MathImg = /** @class */ (function () {
    function MathImg() {
    }
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
    MathImg.initArray2D = function (width, height) {
        var arrImage = new Array(2);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
        }
        return arrImage;
    };
    MathImg.toGray = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
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
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
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
    MathImg.toRed = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    MathImg.toGreen = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    MathImg.toBlue = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = arrImage[2][i][j];
            }
        }
        return sal;
    };
    MathImg.correctionGamma = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = this.funcionGamma(arrImage[0][i][j], factores[0]);
                sal[1][i][j] = this.funcionGamma(arrImage[1][i][j], factores[1]);
                sal[2][i][j] = this.funcionGamma(arrImage[2][i][j], factores[2]);
            }
        }
        return sal;
    };
    MathImg.funcionGamma = function (pixel, factor) {
        return Math.min(255 * Math.pow(pixel / 250, factor), 255);
    };
    MathImg.toUmbral = function (img, umbral) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = prom > umbral ? 255 : 0;
                sal[1][i][j] = prom > umbral ? 255 : 0;
                sal[2][i][j] = prom > umbral ? 255 : 0;
            }
        }
        return sal;
    };
    MathImg.toDesfaceX = function (img, des) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
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
    };
    MathImg.toDesfaceY = function (img, desy) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
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
    };
    MathImg.toUmbral2limites = function (img, rangos) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var rangoMin = rangos[0];
        var rangoMax = rangos[1];
        var prome;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
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
    };
    MathImg.changeBrightness = function (img, factor) {
        var arrImage = img.getArrayImg();
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] * factor > 255.0 ? 255.0 : arrImage[0][i][j] * factor;
                sal[1][i][j] = arrImage[1][i][j] * factor > 255.0 ? 255.0 : arrImage[1][i][j] * factor;
                sal[2][i][j] = arrImage[2][i][j] * factor > 255.0 ? 255.0 : arrImage[2][i][j] * factor;
            }
        }
        return sal;
    };
    MathImg.relativeBrightness = function (img) {
        var arrImage = img.getArrayImg();
        var sal = this.initArray2D(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                //si el valor del pixel > umbral, entoncesa calculo el brillo
                //si no el brillo =0
                sal[0][i][j] = Math.sqrt(Math.pow(arrImage[0][i][j], 2) * 0.299 +
                    Math.pow(arrImage[1][i][j], 2) * 0.587 +
                    Math.pow(arrImage[2][i][j], 2) * 0.114) / 100.0;
                sal[1][i][j] = 'rgb(' + arrImage[0][i][j] + ',' + arrImage[1][i][j] + ',' + arrImage[2][i][j] + ')';
            }
        }
        return sal;
    };
    MathImg.colorGradienteX = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        var r1, r2, b1, b2, g1, g2;
        var dr, dg, db, dir;
        r1 = factores[0];
        g1 = factores[1];
        b1 = factores[2];
        r2 = factores[3];
        g2 = factores[4];
        b2 = factores[5];
        dr = (r2 - r1) / img.getWidth();
        dg = (g2 - g1) / img.getWidth();
        db = (b2 - b1) / img.getWidth();
        for (var j = 0; j < img.getWidth(); j++) {
            for (var i = 0; i < img.getHeight(); i++) {
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
    };
    MathImg.colorGradientY = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        var r1, r2, b1, b2, g1, g2;
        var dr, dg, db;
        r1 = factores[0];
        g1 = factores[1];
        b1 = factores[2];
        r2 = factores[3];
        g2 = factores[4];
        b2 = factores[5];
        dr = (r2 - r1) / img.getHeight();
        dg = (g2 - g1) / img.getHeight();
        db = (b2 - b1) / img.getHeight();
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
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
    };
    /**
     * Metodo para Generar el contraste de una Imagen
     * @img  ImageType tipo de imagen donde se guarda una matriz tridimencional
     * @return number[][][] es la imagen de salida con contraste
     */
    MathImg.changeContraste = function (img, valor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        //
        var cR, cG, cB;
        var contraste;
        contraste = (valor + 100) / 100;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                cR = ((((arrImage[0][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cR > 255)
                    cR = 255;
                if (cR < 0)
                    cR = 0;
                sal[0][i][j] = cR;
                cG = ((((arrImage[1][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cG > 255)
                    cG = 255;
                if (cG < 0)
                    cG = 0;
                sal[1][i][j] = cG;
                cB = ((((arrImage[2][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cB > 255)
                    cB = 255;
                if (cB < 0)
                    cB = 0;
                sal[2][i][j] = cB;
            }
        }
        return sal;
    };
    MathImg.pow = function (img, power) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.pow(arrImage[0][i][j], power);
                sal[1][i][j] = Math.pow(arrImage[1][i][j], power);
                sal[2][i][j] = Math.pow(arrImage[2][i][j], power);
            }
        }
        return sal;
    };
    MathImg.toCos = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.cos(arrImage[0][i][j]);
                sal[1][i][j] = Math.cos(arrImage[1][i][j]);
                sal[2][i][j] = Math.cos(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toSubtract = function (img, escalar) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] - escalar;
                sal[1][i][j] = arrImage[1][i][j] - escalar;
                sal[2][i][j] = arrImage[2][i][j] - escalar;
            }
        }
        return sal;
    };
    MathImg.toMultiplication = function (img, valor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = valor * arrImage[0][i][j];
                sal[1][i][j] = valor * arrImage[1][i][j];
                sal[2][i][j] = valor * arrImage[2][i][j];
            }
        }
        return sal;
    };
    MathImg.toSine = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.sin(arrImage[0][i][j]);
                sal[1][i][j] = Math.sin(arrImage[1][i][j]);
                sal[2][i][j] = Math.sin(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toAdd = function (img, sumar) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + sumar;
                sal[1][i][j] = arrImage[1][i][j] + sumar;
                sal[2][i][j] = arrImage[2][i][j] + sumar;
            }
        }
        return sal;
    };
    MathImg.toDividir = function (img, dividir) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + dividir;
                sal[1][i][j] = arrImage[1][i][j] + dividir;
                sal[2][i][j] = arrImage[2][i][j] + dividir;
            }
        }
        return sal;
    };
    MathImg.toSqrt = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.sqrt(arrImage[0][i][j]);
                sal[1][i][j] = Math.sqrt(arrImage[1][i][j]);
                sal[2][i][j] = Math.sqrt(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toTan = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.tan(arrImage[0][i][j]);
                sal[1][i][j] = Math.tan(arrImage[1][i][j]);
                sal[2][i][j] = Math.tan(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.addImg = function (img, img2) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        var arrImage2 = img2.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + arrImage2[0][i][j];
                sal[1][i][j] = arrImage[1][i][j] + arrImage2[1][i][j];
                sal[2][i][j] = arrImage[2][i][j] + arrImage2[2][i][j];
            }
        }
        return sal;
    };
    MathImg.espejoX = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][img.getWidth() - 1 - i][j];
                sal[1][i][j] = arrImage[1][img.getWidth() - 1 - i][j];
                sal[2][i][j] = arrImage[2][img.getWidth() - 1 - i][j];
            }
        }
        return sal;
    };
    return MathImg;
}());
export { MathImg };

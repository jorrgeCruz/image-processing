import { DefaultSettings } from "./DefaultSettings.js";
var ImageLocal = /** @class */ (function () {
    // protected document: HTMLDocument;
    function ImageLocal(p, ready) {
        this.img = new Image();
        this.screen = p;
        // this.document = d;
        this.readyToDraw = ready;
        this.isScaled = false;
        this.drawSmallImg = this.drawSmallImg.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.onload = this.onload.bind(this);
    }
    ImageLocal.prototype.handleFileSelect = function (evt) {
        var files;
        if (evt.type === "drop") {
            evt.stopPropagation();
            evt.preventDefault();
            files = evt.dataTransfer.files;
        }
        if (evt.type === "change")
            files = evt.target.files; // FileList object
        // files is a FileList of File objects. List some properties.
        var output = [];
        //console.log(evt)
        var f = files[0];
        output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate.toLocaleDateString(), '</li>');
        this.img.src = f.name;
        this.readyToDraw = true;
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        this.onload();
    };
    ImageLocal.prototype.drawSmallImg = function (evt) {
        var xPos = evt.offsetX - 2;
        var yPos = evt.offsetY - 2;
        var pixel = this.screen.getImageData(xPos, yPos, 1, 1);
        if (this.readyToDraw) {
            if (this.isScaled) {
                xPos *= (this.img.width / DefaultSettings.SIZE_WIDTH);
                yPos *= (this.img.height / DefaultSettings.SIZE_HEIGHT);
            }
            this.screen.clearRect(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
            this.screen.strokeStyle = "lightgray";
            this.screen.imageSmoothingEnabled = false;
            this.isScaled ?
                this.screen.drawImage(this.img, 0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT)
                : this.screen.drawImage(this.img, 0, 0, this.img.width, this.img.height);
            this.screen.strokeRect(evt.offsetX + 5, evt.offsetY + 5, DefaultSettings.SMALL_W, DefaultSettings.SMALL_H);
            this.screen.drawImage(this.img, Math.floor(xPos - 3), Math.floor(yPos - 3), 5, 5, evt.offsetX + 5, evt.offsetY + 5, DefaultSettings.SMALL_W, DefaultSettings.SMALL_H);
            var color = document.getElementById('color');
            var data = pixel.data;
            var rgba = 'rgba(' + data[0] + ', ' + data[1] +
                ', ' + data[2] + ', ' + (data[3] / 255) + ')';
            color.style.background = rgba;
            //color.textContent = rgba;
            document.getElementById('rgb').innerHTML = '<strong>' + rgba + '</strong> ';
        }
    };
    ImageLocal.prototype.getImage = function () {
        return this.img;
    };
    ImageLocal.prototype.getScreen = function () {
        return this.screen;
    };
    ImageLocal.prototype.setScaled = function (v) {
        this.isScaled = v;
    };
    ImageLocal.prototype.onload = function () {
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
    };
    return ImageLocal;
}());
export { ImageLocal };

import DefaultSetings from "./DefaultSettins.js";

class ImageOp {
    
    constructor(p){
        this.img = new Image();
        this.pantalla = p;
        this.readyToDraw = false;
        this.drawSmallImg = this.drawSmallImg.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        
    }
    

    handleFileSelect(evt) {

            var files;
            if(evt.type === "drop") {
                evt.stopPropagation();
                evt.preventDefault();
                files = evt.dataTransfer.files;

            }
            if(evt.type === "change")
                files = evt.target.files; // FileList object
            
            // files is a FileList of File objects. List some properties.
            var output = [];
            //console.log(evt)
            let f = files[0];
                output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate.toLocaleDateString(), '</li>');
                
                this.img.src = f.name;   
                
                this.readyToDraw = true;  
            document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';   
            
        
    }
    drawSmallImg(evt){
        let xPos = evt.offsetX-2;
        let yPos = evt.offsetY-2;
       // 
        if(this.readyToDraw){    
            xPos *= (this.img.width/DefaultSetings.SIZE_WIDTH);
            yPos *= (this.img.height/DefaultSetings.SIZE_HEIGHT);
            this.pantalla.strokeStyle = "lightgray";
           
            this.pantalla.imageSmoothingEnabled = false;
            this.pantalla.drawImage(this.img, 0 ,0 , DefaultSetings.SIZE_WIDTH, DefaultSetings.SIZE_HEIGHT);
            this.pantalla.strokeRect(evt.clientX, evt.clientY,  DefaultSetings.SMALL_W,DefaultSetings.SMALL_H);
            this.pantalla.drawImage(this.img, Math.floor(xPos-3),Math.floor(yPos-3), 5, 5, evt.clientX, evt.clientY, DefaultSetings.SMALL_W,DefaultSetings.SMALL_H);
        }
    }
    get image(){
        return this.img;
    }
    set imageWidth(w){
        this.img.width = w;
    }
    set imageHeight(h){
        this.img.height =h;
    }
    
}
/* ImageOp.prototype.handleEvent = function (event) {
    console.log("correct");
    if(event.type==="mousemove")
        console.log("correct");
} */

export default ImageOp;
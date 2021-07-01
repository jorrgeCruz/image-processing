var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
        this.width = width;
        this.height = height;
        this.ctx = screenCanvas;
        this.x = Math.random() * width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 2.5;
        this.size = Math.random() * 1.5 + 1;
        this._2PI = Math.PI * 2;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.mappedImage = mapImg;
    }
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 30) + 1);
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
    }
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };
var BouncingParticle = /** @class */ (function () {
    function BouncingParticle(color, width, height, screenCanvas, weight, size) {
        this.width = width;
        this.height = height;
        this.ctx = screenCanvas;
        this.color = color;
        this.weight = 1;
        this.weightGainer = weight;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.tamanio = size;
        this.size = (Math.random() * 5) + 2;
        this._2PI = Math.PI * 2;
        //this.mappedImage = mapImg;
    }
    BouncingParticle.prototype.updateBouncingParticle = function (mouse) {
        this.size -= 0.05; // decrementa el tamaño al caer     //
        // se hace mas pequeña cada iteracion
        if (this.size < 0) { // si no hay tamaño visible
            this.x = (mouse.x + ((Math.random() * 20) - 10)); // dispersion al pasar el mouse     //
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            // de no tener este factor de dispersion las 
            // particulas se crearian  en la misma columna del punto x,y
            this.size = (Math.random() * this.tamanio) + 2; // tamanio=10
            this.weight = (Math.random() * 2) - 0.5; // entre mas peso mas rebote
        }
        this.y += this.weight;
        this.weight += this.weightGainer; //weightGainer=0.2
        // entre mas pequeño el weigthGainer da una apariencia paracida al humo (pierde solides)
        // entre mas grande la particula rebota mas alto, por lo que al disminuir el size en -0.05
        //   las particulas rebotan mas alto
        // le restamos el tamaño de la particula al heigth para que no desborde
        if (this.y >= this.height - this.size) {
            this.weight *= -1; // se cambia la particula a negativo para dar el efecto rebote
        }
        ;
    };
    BouncingParticle.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
        this.ctx.closePath();
    };
    return BouncingParticle;
}());
export { BouncingParticle };

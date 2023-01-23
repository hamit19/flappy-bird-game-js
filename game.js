var cav = document.getElementById('my-canvas');

var cxt = cav.getContext('2d');


var frames = 0;

var sprite = new Image();

sprite.src = './image/sprite.png';


var bg = {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    h : cav.height - 226, 
    
    draw : function () {
        cxt.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.h, this.w, this.h )
        cxt.drawImage(sprite, this.sX, this.sY, this.w , this.h, this.x + this.w, this.h, this.w, this.h )
    }
}


var fg = {
    sX : 276,
    sY : 0,
    w : 224,
    h : 112,
    x : 0,
    h : cav.height - 112, 
    
    draw : function () {
        cxt.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.h, this.w, this.h )
        cxt.drawImage(sprite, this.sX, this.sY, this.w , this.h, this.x + this.w, this.h, this.w, this.h )
    }
}



function update() {

}


function draw(){
    cxt.fillStyle = '#70c5ce'
    cxt.fillRect(0, 0 , cav.width, cav.height)

    bg.draw()

    fg.draw()
}


function animate() {

    update()

    draw()

    frames++;
    
    requestAnimationFrame(animate)

}


animate();
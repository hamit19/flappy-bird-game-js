var cav = document.getElementById("my-canvas");

var cxt = cav.getContext("2d");

var DEGREE = Math.PI / 180;

var frames = 0;

var sprite = new Image();

sprite.src = "./image/sprite.png";

var state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};

function clickHandler() {
  switch (state.current) {
    case state.getReady:
      state.current = state.game;

      break;

    case state.game:
      bird.flap();

      break;

    default:
      bird.speed = 0;
      bird.rotation = 0;
      pipes.position = [];
      state.current = state.getReady;
      break;
  }
}

document.addEventListener("click", clickHandler);

document.addEventListener("keypress", function (e) {
  if (e.code === "Space") {
    clickHandler();
  }
});

var bg = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 226,
  x: 0,
  y: cav.height - 226,

  draw: function () {
    cxt.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    cxt.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
};

var fg = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: cav.height - 112,
  dx: 3,

  draw: function () {
    cxt.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    cxt.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },

  update : function() {

    if(state.current === state.game){

      this.x = ( this.x - this.dx ) % (this.w / 2)
    }

  }
 
};

var getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  x: cav.width / 2 - 173 / 2,
  y: 80,

  draw: function () {
    if (state.current === state.getReady) {
      cxt.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

var gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  x: cav.width / 2 - 225 / 2,
  y: 90,

  draw: function () {
    if (state.current === state.over) {
      cxt.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

var bird = {
  animations: [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 },
  ],

  w: 34,
  h: 26,
  x: 50,
  y: 150,
  speed: 0,
  gravity: 0.25,
  jump: 4.6,
  animationIndex: 0,
  rotation:0,

  draw: function () {
    let bird = this.animations[this.animationIndex];

    cxt.save();
    cxt.translate(this.x, this.y)
    cxt.rotate(this.rotation)
    cxt.drawImage(
      sprite,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
     - this.w / 2,
     - this.h / 2,
      this.w,
      this.h
    );
    cxt.restore()
  },

  update: function () {
    let period = state.current === state.getReady ? 10 : 5;

    this.animationIndex += frames % period == 0 ? 1 : 0;
    this.animationIndex = this.animationIndex % this.animations.length;

    if (state.current === state.getReady) {
      this.y = 150;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if(this.speed < this.jump){
        this.rotation = - 25 * DEGREE;
      }else {
        this.rotation =  45 * DEGREE;
      }

    }

    if (this.y + this.h / 2 > cav.height - fg.h) {
      this.y = cav.height - fg.h - this.h / 2;
      this.animationIndex = 1;
      if (state.current === state.game) {
        state.current = state.over;
      }
    }
  },

  flap: function () {
    this.speed = - this.jump;
  },
};

var pipes = {
  top: {
    sX: 553, 
    sY: 0, 

  },

  bottom : {
    sX: 503, 
    sY : 0,
  },

  w: 53,
  h: 400,
  dx: 2, 
  gap: 80,
  maxYPos: -150,
  position: [],

  draw: function(){

    for( let i = 0; i < this.position.length; i++ ) {
      let p = this.position[i];

      let topYPos = p.y;

      let bottomYPos = p.y + this.h + this.gap;

      cxt.drawImage(
        sprite,
        this.top.sX,
        this.top.sY,
        this.w,
        this.h,
        p.x,
        topYPos,
        this.w,
        this.h
      );
      cxt.drawImage(
        sprite,
        this.bottom.sX,
        this.bottom.sY,
        this.w,
        this.h,
        p.x,
        bottomYPos,
        this.w,
        this.h
      );

    }

  },

  update: function() {

    if(state.current != state.game) return;

    //new pipes position

    if( frames % 100 == 0 ) {
      this.position.push({
        x: cav.width,
        y: this.maxYPos * ( Math.random() +1 )
      })

    }

    for(let i = 0; i < this.position.length; i++ ){
        
      let p =  this.position[i]

      p.x -= this.dx;

      if( p.x + this.w <= 0) {
        this.position.shift()
      }
      console.log(this.position)

    }
  }

}

function update() {
  bird.update();
  fg.update();
  pipes.update();
}

function draw() {
  cxt.fillStyle = "#70c5ce";
  cxt.fillRect(0, 0, cav.width, cav.height);

  bg.draw();

  pipes.draw();

  fg.draw();

  bird.draw();

  getReady.draw();

  gameOver.draw();
}

function animate() {
  update();

  draw();

  frames++;

  requestAnimationFrame(animate);
}

animate();

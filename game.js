var cav = document.getElementById("my-canvas");

var cxt = cav.getContext("2d");

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

  animationIndex: 3,

  draw: function () {
    let bird = this.animations[this.animationIndex];

    cxt.drawImage(
      sprite,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  },
};

function update() {}

function draw() {
  cxt.fillStyle = "#70c5ce";
  cxt.fillRect(0, 0, cav.width, cav.height);

  bg.draw();

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

var Game = function() {
  var lastRender = 0;
  var canvas = document.getElementById("canvas")
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d")
  var base_image = new Image();
  var background_image = new Image();
  var animState = 3;  
  var state = {
    x: (71),
    y: (187),
    pressedKeys: {
      left: false,
      right: false,
      up: false,
      down: false
    }
  }
  
  var keyMap = {
    39: 'right',
    37: 'left',
    38: 'up',
    40: 'down'
  }
  
  function init(){
    background_image.src = 'media/background2.jpg';
    base_image.src = 'media/anim/chibi_anim0.png';
    window.addEventListener("keydown", keydown, false)
    window.addEventListener("keyup", keyup, false)
  }
 
  function keydown(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = true
  }
  
  function keyup(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = false
  }

  function update(progress) {
    var moved = false;
    if (state.pressedKeys.left) {
        moved = true;
        state.x -= 1
      }
      if (state.pressedKeys.right) {
        moved = true;
        state.x += 1
      }
      if (state.pressedKeys.up) {
        moved = true;
        state.y -= 1
        if(state.y < 170) state.y = 170;
      }
      if (state.pressedKeys.down) {
        moved = true;
        state.y += 1
      }

      // Flip position at boundaries
      if (state.x > width) {
        state.x -= width
      }
      else if (state.x < 0) {
        state.x += width
      }
      if (state.y > height) {
        state.y -= height
      }
      else if (state.y < 0) {
        state.y += height
    }
    
    if(moved) animState = (animState+1)%13;
    else animState = 0;
    
    document.getElementById('stateDiv').innerHTML = "x:"+state.x + " y:"+state.y;
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(background_image, -1 * state.x , -1 * state.y, canvas.width * 2, canvas.height * 2);
    ctx.drawImage(base_image, state.x , state.y, 100, 100);
    base_image.src = 'media/anim/chibi_anim'+animState+'.png';
  }
  
  function loop(timestamp) {
    var progress = timestamp - lastRender;
    update(progress);
    draw()
    lastRender = timestamp
    window.requestAnimationFrame(loop)
  }

  this.run = function(){ 
    init();
    window.requestAnimationFrame(loop)
  }
  
  var self = this;
}

var game = new Game();
game.run();


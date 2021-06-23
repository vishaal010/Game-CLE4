let levels = [];
let sound1 = new Audio('E.mp3');
let sound2 = new Audio('B.mp3'); 
let sound3 = new Audio('D.mp3');
let sound4 = new Audio('BED.mp3')


levels[0] = {
  map:[
     [1,1,0,0,1,0,1],
     [1,0,0,0,0,0,1],
     [0,0,1,1,0,1,1],
     [0,0,0,1,0,0,0],
     [0,1,0,1,0,0,0],
     [0,0,1,1,0,1,1],
     [1,1,0,0,1,1,1]
  ],
  player: {
     x:2,
     y:4
  },
  goal:{
    x:5,
    y:1
  },
  goal2: {
      x: 1,
      y: 2
  },
  goal3: {
      x:4,
      y:5
  },
  chaser: {
      x:0,
      y:5,
      xspeed:3,
      yspeed:5
  },

  theme:'default'
};


levels[1] = {
   map:[
      [0,0,0,0,1,0,1],
      [1,1,0,0,0,0,1],
      [0,0,1,1,0,0,1],
      [0,1,0,1,0,0,0],
      [0,1,0,0,0,0,0],
      [0,0,1,1,0,1,1],
      [1,1,0,1,1,1,1]
   ],
   player: {
      x:2,
      y:1
   },
   goal:{
     x:2,
     y:0
   },
   goal2: {
       x: 1,
       y: 2
   },
   goal3: {
       x:4,
       y:5
   },
   chaser: {
       x:0,
       y:5,
       xspeed:5,
       yspeed:5
   },
 
   theme:'default'
 };
/*
 *  The Game Object.
 * 
 * @param {String} id - the id of the dom element.
 * @param {Object} level - the initial level being passed in.
 */

const GAMESTATE = {
   RUNNING : 0,
   MENU : 1
}

function Game(id, level) {
  
  this.el = document.getElementById(id);
  
  this.tileTypes = ['floor','wall'];
  
  this.tileDim = 32;
  
  // inherit the level's properties: map, player start, goal start.
  this.map = level.map;
  this.theme = level.theme
  this.player = {...level.player};
  this.goal = {...level.goal};
  this.goal2 = {...level.goal2};
  this.goal3 = {...level.goal3};
  this.chaser = {...level.chaser};

 


}
/*
 *  Populates the map with a nested loop.
 */
Game.prototype.populateMap = function() {
  
  this.el.className = 'game-container ' + this.theme;
  
  let tiles = document.getElementById('tiles');
  
  for (var y = 0; y < this.map.length; ++y) {
    
    for (var x = 0; x < this.map[y].length; ++x) {
              
           let tileCode = this.map[y][x];
       
           let tileType = this.tileTypes[tileCode];
       
           let tile = this.createEl(x, y, tileType);
       
           tiles.appendChild(tile); // add to tile layer
     }
  }
}


/*
 * Creates a tile or sprite element.
 * 
 * @param {Number} x - The x coordinate.
 * @param {Number} y - The y coordinate.
 */
Game.prototype.createEl = function(x,y,type) {
   // create one tile.
  let el = document.createElement('div');
       
  // two class names: one for tile, one or the tile type.
  el.className = type;
  
  // set width and height of tile based on the passed-in dimensions.
  el.style.width = el.style.height = this.tileDim + 'px';
  
  // set left positions based on x coordinate.
  el.style.left = x*this.tileDim + 'px';
  
  // set top position based on y coordinate.
  el.style.top = y*this.tileDim + 'px';
      
  return el;
}
/*
 *  Places a player or goal sprite.
 * 
 *  @param {String} type - The type of sprite or tile.
 */
Game.prototype.placeSprite = function(type) {
  
  // syntactic sugar
  let x = this[type].x
  
  let y = this[type].y;
  
  // reuse the createTile function
  let sprite  = this.createEl(x,y,type);
  
  sprite.id = type;
  
  // set the border radius of the sprite.
  sprite.style.borderRadius = this.tileDim + 'px';
  
  // get half the difference between tile and sprite.
  
  // grab the layer
  let layer = this.el.querySelector('#sprites');
  
  layer.appendChild(sprite);
  
  return sprite;
}
/*
 *  Sizes up map.
 */
Game.prototype.sizeUp = function() {
  
  // inner container so that text can be below it
  let map  = this.el.querySelector('.game-map');
  
  // inner container, height. Need this.map
  map.style.height = this.map.length * this.tileDim + 'px';
   
  map.style.width = this.map[0].length * this.tileDim + 'px';
 }
 /* 
  *  Moves the player.
  *  @param {Object} event - The event object.
  */
Game.prototype.movePlayer = function(event) {
  
  event.preventDefault();
  
  if (event.keyCode < 37 || event.keyCode > 40) {
      return;
  }
   switch (event.keyCode) {
   
        case 37:
        this.moveLeft();
        break;
        
        case 38:
        this.moveUp();
        break;
        
        case 39:
        this.moveRight();
        break;
       
        case 40:
        this.moveDown();
        break;
    }
}


function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }

//moving chaser behind the player

//  Game.prototype.moveChaser = async function(event) {

//    let counter = 0


//    if (counter == 0) {
//       this.moveUpEnemy();
//   }
//   else if (counter == 1) {
//       this.moveRightEnemy();
//   }
//   else if (counter == 2) {
//       this.moveLeftEnemy();
//   }
//   else if (counter == 3) {
//       this.moveDownEnemy();
//   }

// }
/*
 *  Checks for the goal.
 */
Game.prototype.checkGoal = function() {
  
    let body = document.querySelector('body');
  
    if (this.player.y == this.goal.y && 
        this.player.x == this.goal.x) {
            sound1.loop = false;
        sound1.play();
        document.getElementById('goal').style.display = 'none';
        
     }
     else {
        body.className = '';
     }
  
}

Game.prototype.checkGoal2 = function() {
  
    let body = document.querySelector('body');
  
    if (this.player.y == this.goal2.y && 
        this.player.x == this.goal2.x) {
            sound2.loop = false;
        sound2.play();
        document.getElementById('goal2').style.display = 'none';
        
     }
     else {
        body.className = '';
     }
  
}




Game.prototype.checkGoal3 = function() {
  
    let body = document.querySelector('body');
  
    if (this.player.y == this.goal3.y && 
        this.player.x == this.goal3.x) {
        body.className = 'success';
         sound3.play();
         document.getElementById('goal3').style.display = 'none';     
         redirectURL();             

        }
      
     
     else {
        body.className = '';
     }
  
}
/*
 *  Listens for keyboard input.
 */
Game.prototype.keyboardListener = function() {


   
  document.addEventListener('keydown', event => {
      

      this.moveChaser(event);

      this.movePlayer(event);
    
      this.checkGoal();
     
      this.checkGoal2();

      this.checkGoal3();

      
  });
}


 async function redirectURL() {
   var getURL = location.search; 
   await sleep(1000)
   sound4.play();
   await sleep(1000)
   

   if(getURL === ""){
    window.location.replace("level2.html?=level2");   
   }
}

function gamestateMenu(){

   this.gamestate = GAMESTATE.MENU
   
   if (this.gamestate === GAMESTATE.MENU){
      let start = document.createElement("img")
      start.src = "letter.png"

   }
}

/*
 * Move player left.
 */

Game.prototype.moveLeft = function() {   
  
   if (this.player.x == 0) {
       return;
   }
  
   let nextTile = this.map[this.player.y][this.player.x - 1];
   if (nextTile == 1) {
       return;
   }
    
   this.player.x -=1;
   
   this.updateHoriz();
}
Game.prototype.moveUp = function() {    

  
   if (this.player.y == 0) {
        return;
   }
  
   let nextTile = this.map[this.player.y-1][this.player.x];
   if (nextTile ==1) {
        return;
   }
    
   this.player.y -=1;
   
   this.updateVert();
}
/*
 *  Moves the player right.
 */
Game.prototype.moveRight = function() {   

   // Niet uit de map gaan
  
   if (this.player.x == this.map[this.player.y].length - 1) {
        return;
   }

   let nextTile = this.map[this.player.y][this.player.x + 1];
        
   // Niet in het groene veld gaan
   if (nextTile == 1) {
        return;
   }
    
   this.player.x +=1;
   
   this.updateHoriz();
}
/*
 * Moves the player down.
 */
Game.prototype.moveDown = function() {   
  
   if (this.player.y == this.map.length - 1) {
        return;
   }
   let nextTile = this.map[this.player.y+1][this.player.x];
  
   if (nextTile == 1) {
        return;
   }
    
   this.player.y +=1;
   
   this.updateVert();
}

// Game.prototype.moveUpEnemy = async function() {   

  
//    if (this.chaser.y == this.map.length - 1) {
//         return;
//    }

//    console.log('testmoveuo')
//    await sleep(1000)
//    let nextTile = this.map[this.chaser.y-1][this.chaser.x];



  
//    if (nextTile == 1) {
//         return;
//    }
    
//    this.chaser.y +=2;
   
//    this.updateVertEnemy();

//    counter = 1;

//    console.log(counter)
// }



// Game.prototype.moveRightEnemy = function() {   
  
//    if (this.chaser.y == this.map.length - 1) {
//         return;
//    }
//    let nextTile = this.map[this.chaser.y][this.chaser.x + 1];
  
//    if (nextTile == 1) {
//         return;
//    }
    
//    this.chaser.y +=1;
   
//    this.updateHorizEnemy();

//    counter = 2;

// }


// Game.prototype.moveLeftEnemy = function() {   
  
//    if (this.chaser.y == this.map.length - 1) {
//         return;
//    }
//    let nextTile = this.map[this.chaser.y][this.chaser.x - 1];
  
//    if (nextTile == 1) {
//         return;
//    }
    
//    counter = 3;

//    this.chaser.y +=1;
   
//    this.updateHorizEnemy();
// }



// Game.prototype.moveDownEnemy = function() {   
  
//    if (this.chaser.y == this.map.length - 1) {
//         return;
//    }
//    let nextTile = this.map[this.chaser.y+1][this.chaser.x];
  
//    if (nextTile == 1) {
//         return;
//    }
    
//    this.chaser.y +=1;
   
//    this.updateVertEnemy();
// }




/* 
 * Update helpers for player movement.
 */

Game.prototype.updateHoriz = function() {      
   this.player.el.style.left = this.player.x * this.tileDim+ 'px';    
};

Game.prototype.updateVert = function() {
   this.player.el.style.top = this.player.y * this.tileDim+ 'px'; };


Game.prototype.updateHorizEnemy = function() {      
      this.chaser.el.style.left = this.chaser.x * this.tileDim+ 'px';    
   };
   
Game.prototype.updateVertEnemy = function() {
      this.chaser.el.style.top = this.chaser.y * this.tileDim+ 'px'; };
   

/* 
 * Initialization.
 */

function init() {
   let myGame = new Game('game-container-1',levels[0]);


   gamestateMenu();
    
   myGame.populateMap();
  
   myGame.sizeUp();

   // myGame.moveChaser();
  
   myGame.placeSprite('goal');

   myGame.placeSprite('goal2');

   myGame.placeSprite('goal3');

   myGame.placeSprite('chaser');
  
   let playerSprite = myGame.placeSprite('player');
  
   myGame.player.el = playerSprite;
  
   let chaserSprite = myGame.placeSprite('chaser');
  
   myGame.chaser.el = chaserSprite;

   myGame.keyboardListener();


   

 
}
init();


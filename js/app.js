'use strict';
// this is the super class from which the enemy and player classes inherit
class Entities {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemy class inherits from entities and add its perculiar methods and properties
class Enemy extends Entities {
    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.speed = Math.floor(Math.random() * 555);
    }
    update(dt, startGame) {
        // randomly change the speed
        if(startGame) {
            this.x += this.speed * dt;
            if(this.x > 500) {
                this.x = Math.floor(Math.random()-80);
                this.y = Math.floor(Math.random() * (180) + 55);
            }
        } 
    };
}

// Player class inherits from entities and add its perculiar methods and properties
class Player extends Entities {
    constructor(sprite, x, y) {
        super(sprite, x, y);
    }
    update() {
        if(this.y > 400 ) {
            this.y = 400;
        } else if(this.x > 420) {
            this.x = 420;
        } else if(this.x < -16) {
            this.x = -16;
        } else if(this.y < 10) {
            this.y = -5;
            this.x = 200;
        }
    };

    handleInput(keyPressed, startGame) {
        if(keyPressed == 'left') {
            this.x -= 70;
        } else if(keyPressed == 'right') {
            this.x += 85;
        } else if(keyPressed == 'up' && this.y > -16) {
            this.y -= 85;
        } else if(keyPressed == 'down' && this.y > 0) {
            this.y += 70;
        }
    };
}

// Collectibles class inherits from Enemy
class Collectibles extends Enemy {
    constructor(sprite, x, y) {
        super(sprite, x, y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place all player objects in an array called allPlayers
//Place all collectible objects in an array called collectibles

let allEnemies = [],
    allPlayers = [],
    collectibles = [],
    player,
    collectible,
    collectiblesItems,
    selectedPlayer;
    //availblePlayers;

collectiblesItems = [
                'images/Gem Blue.png',
                'images/Gem Green.png',
                'images/Gem Orange.png',
                'images/Star.png'
                ]

for(collectible of collectiblesItems) {
    collectibles.push(new Collectibles(collectible, Math.random()-80, Math.floor(Math.random() * (180) + 55)));
}

for(let i = 0; i < 5; i++) {
    allEnemies.push(new Enemy('images/enemy-bug.png', Math.random()-80, Math.floor(Math.random() * (180) + 55)));
}

//get the players displayed on the modal
//availblePlayers = document.getElementById('myModal').childNodes;
const players = [
            'images/char-boy.png',
            'images/char-princess-girl.png',
            'images/char-pink-girl.png',
            'images/char-cat-girl.png'
            ];

for(player of players) {
    allPlayers.push(new Player(player, 200, 400));
}

selectedPlayer = 2;
//listen for click event on any of the players selected 
//and set the player object accordingly

/*for(let x = 2; x < availblePlayers.length; x++) {
availblePlayers[x].addEventListener("click", function() {
            selection = indexOf(availblePlayers[x]);
            alert(selection)
    });
}  
*/

player = allPlayers[selectedPlayer];


//touch keyup events
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {

    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0 && player.x > 0) {
            // swiped left
            console.log("swiped left");
            player.x -= 102;
        } if (diffX < 0 && player.x < 405) {
            // swiped right
            console.log("swiped right");
            player.x += 102;
        }
    } else {
        // sliding vertically
        if (diffY > 0 && player.y > 0) {
            // swiped up
            console.log("swiped up");
            player.y -= 83;
            if (player.y < 0) {
                nextLevel();
            }

        } if (diffY < 0 && player.y < 405) {
            // swiped down
            console.log("swiped down");
            player.y += 83;
        }
    }

    initialX = null;
    initialY = null;

};





//touch keyup events




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});



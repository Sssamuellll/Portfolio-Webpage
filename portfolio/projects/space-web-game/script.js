// Project 1 JavaScript Functionality:
// Imported space game code from previous repository project:

// Allows for the autocomplete intellesence of the Canvas Element:
/**
 * @type HTMLCanvasElement
 */

// Variables
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d'); // Lower-case d in 2d is important :)
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height); //x,y,width,height
let enemyTex;
let bulletTex;

// Classes:
// A Game class that keeps track of the current state of the game:
class Game
{
    // Variables:
    state = false;
    bullets = [];
    enemies = [];

    // Methods/functions:
    refresh_screen()
    {
        // Draw the background:
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height); //x,y,width,height

        // Draw the entities on top:
        player.draw_entity(player.x, player.y, player.width, player.height, '#ff0077ff');
        // Loops through drawing all the bullets if their are any:
        for(let b = 0; b < this.bullets.length; b++)
        {
            if(this.bullets[b].alive == true)
            {
                this.bullets[b].draw_entity(this.bullets[b].x, this.bullets[b].y, this.bullets[b].width, this.bullets[b].height, '#d9ff00ff');
            }
        }
        // Same is done for enemies:
        for(let e = 0; e < this.enemies.length; e++)
        {
            if(this.enemies[e].alive == true)
            {
                this.enemies[e].draw_entity(this.enemies[e].x, this.enemies[e].y, this.enemies[e].width, this.enemies[e].height, '#6e0505ff');
            }
        }
    }

    // Spawns an enemy:
    spawn_enemy(_x, _y)
    {
        // Creating a new Enemy and appending it to the game's list of enemies.
        const enemy = new Enemy(_x, _y, 0.5, 50, 50);
        enemy.tex = enemyTex;
        game.enemies.push(enemy);
    }

    // Checks for whether the user has won the game:
    win_state()
    {
        // Checking how many enemies are still alive:
        let destroyed = 0;
        for(let e = 0; e < this.enemies.length; e++)
        {
            if(this.enemies[e].alive == false)
            {
                destroyed += 1;
            }
        }

        if(player.score >= this.enemies.length || (player.lives > 0 && destroyed >= this.enemies.length))
        {
            return true;
        }
        return false;
    }

    // Checks whether the user has lost the game:
    lose_state()
    {
        if(player.lives <= 0)
        {
            return true;
        }
        return false;
    }
}

// Entity class, handles entity attributes and methods:
class Entity
{
    // This is a class constructor, all variables inside its brackets are defined within it.
    constructor(x, y, SPEED, width, height)
    {
        this.x = x;
        this.y = y;
        this.SPEED = SPEED;
        this.width = width;
        this.height = height;
    }

    alive = true;
    tex; // Texture

    // Moves the entity along x and y:
    move_entity(_x, _y)
    {
        //console.log("move entity");
        this.x = this.x + (_x * this.SPEED);
        this.y = this.y + (_y * this.SPEED);
    }

    //Draws rectangles to the canvas:
    draw_entity(_x, _y, _width, _height, _color)
    {
        ctx.fillStyle = _color;
        ctx.fillRect(_x, _y, _width, _height); //x,y,width,height
    }

    // Flags the entity as not alive:
    destroy()
    {
        this.alive = false;
    }
}

// Player Class that inherits from entity class:
class Player extends Entity
{
    // Variables:
    BUTTLEW = 10;
    BUTTLEH = 30;
    BULLETSPEED = 8;

    score = 0;
    lives = 3;

    // Methods:
    // When called, spawns in a bullet at the player's current position.
    shoot(_event)
    {
        _event.preventDefault();
        // Creating a new bullet and appending it to the game's list of bullets:
        const bullet = new Bullet((this.x + ((this.width - this.BUTTLEW)/2)), this.y, this.BULLETSPEED, this.BUTTLEW, this.BUTTLEH);
        bullet.tex = bulletTex;
        game.bullets.push(bullet);
    }

    increment_score(_value)
    {
        score += _value
    }

    // Overriding the draw_entity function with the texture:
    draw_entity()
    {
        ctx.drawImage(this.tex, this.x, this.y, this.width, this.height);
    }
}

// Bullet class inherits from the entity class:
class Bullet extends Entity
{
    // Overriding the draw_entity function with the texture:
    draw_entity()
    {
        ctx.drawImage(this.tex, this.x, this.y, this.width, this.height);
    }
}

// Enemy class that inherits from entity class:
class Enemy extends Entity
{
    // Overriding the draw_entity function with the texture:
    draw_entity()
    {
        ctx.drawImage(this.tex, this.x, this.y, this.width, this.height);
    }
}

// Displays text onto the canvas element:
function display_canvas_text(_color, _message, _x, _y)
{
    ctx.fillStyle = _color;
    ctx.font = 'bold 24px cursive' // bold comic-sans at 24px big.
    ctx.fillText(_message, _x, _y); //"text", x, y, maxwidth
}

// Called, once window has loaded:
window.onload = async() =>
{
    //Loading Textures:
    player.tex = await loadTexture('../../../assets/SpaceShip.png');
    bulletTex = await loadTexture('../../../assets/bullet.png');
    enemyTex = await loadTexture('../../../assets/Asteroid.png');
}

// When called, loads the texture found within the specified path:
function loadTexture(_path)
{
    // This function uses promises:
    // Instead of returning imediately, it returns a token that will later become the loaded texture.
    return new Promise((resolve, reject) => 
    {
        const img = new Image();
        img.src = _path;
        // Need to have a look at this to understand it further:
        img.onload = function() //= () => 
        {
            resolve(img);
        }
        
    })
}

// Called once the user has chosen to begin the game.
function start_game(_event)
{
    _event.onkeydown = on_key;

    function on_key(_event)
    {
        //console.log(_event.key);
        if (_event.key == 'Enter')
        {
            console.log("START GAME!");
            game.state = true;
            run_game();
        }
    }
}

// Compares two parameter locations to determine whether they have collided with each other.
function has_collided(_objA, _objB)
{
    // Checking if the object is has been destroyed or not:
    if(_objA.alive == true && _objB.alive == true)
    {
        //objA is enemy:
        // Determining whether _objB is within the ranage of _objA along the x axis:
        if((_objB.x + _objB.width) >= _objA.x && _objB.x <= (_objA.x + _objA.width))
        {
            // Determining whether _objB's y axis aligns with _objA's y + _objA's height (this compares the bottom not the top:
            if(_objB.y <= (_objA.y + _objA.height) && (_objB.y + _objB.height) >= _objA.y)
            {
                return true;
            }
        }
    }
    return false;
}

// Checking for whether an object has collided with the bottom of the screen:
function has_collided_canvas_floor(_obj)
{
    if(_obj.alive == true) // Checking whether the object is valid.
    {
        if((_obj.y + _obj.height) == canvas.height)
        {
            return true;
        }
    }
    return false;
}

// Variables:
const game = new Game();
const player = new Player(300, 550, 7, 50, 50);

// When called, handles user input/key presses:
function player_movement(_event)
{
    if(game.state == true)
    {
        if(_event.key == ' ')
        {
            player.shoot(_event);
        }
        //console.log(_event.key);
        // Player Movement:    
        if(_event.key == 'a') // Move left
        {
            player.move_entity(-1, 0)
        }
        if(_event.key == 'd') // Move Right
        {
            player.move_entity(1, 0);
        }
    }
}

// Spawns a wave of enemies:
function spawn_enemy_wave()
{
    let x = 300;
    let enemyAmount = 3;
    // Spawns 3 enemies:
    for(let e = 0; e < enemyAmount; e++)
    {
        game.spawn_enemy(x, 200);
        x += 75;
    }
}

// Game Loop:
function run_game()
{
    spawn_enemy_wave();

    // setInterval function takes in a definition and a numberical value that determines...
    // ...how often that function definition is executed:
    setInterval(function ()
    {
        game.refresh_screen();
        // User Input event listener (listening for keydown):
        document.onkeydown = player_movement;
        for(let b = 0; b < game.bullets.length; b++)
        {
            game.bullets[b].move_entity(0, -1);
        }
        for(let e = 0; e < game.enemies.length; e++)
        {
            game.enemies[e].move_entity(0, 1);
        }

        // Collision checking all bullets with each enemy as well as the player:
        for(let e = 0; e < game.enemies.length; e++)
        {
            // Checking if Player has collided with enemies or enemy has collided with bottom of the game window:
            if(has_collided(game.enemies[e], player) == true || has_collided_canvas_floor(game.enemies[e]) == true)
            {
                console.log("PLAYER HIT!");
                game.enemies[e].destroy();
                player.lives -= 1;
            }
            for(let b = 0; b < game.bullets.length; b++)
            {
                if(has_collided(game.enemies[e], game.bullets[b]) == true)
                {
                    console.log("COLLISION!");
                    game.bullets[b].destroy();
                    game.enemies[e].destroy();
                    player.score += 1;
                }
            }
        }

        // Checking game states:
        if(game.win_state() == true)
        {
            game.state = false;
            display_canvas_text('#a5a200ff', "WINNER!", 420, 375);
            display_canvas_text('#fffc3aff', "WINNER!", 422, 377);
        }
        if(game.lose_state() == true)
        {
            game.state = false;
            display_canvas_text('#a50000ff', "GAME OVER!", 400, 375);
            display_canvas_text('#ff3a3aff', "GAME OVER!", 402, 377);
        }

        // Displaying player score & lives:
        display_canvas_text('#ff0000ff', ("Score: " + player.score), 800, 700);
        display_canvas_text('#02bd02ff', ("Lives: " + player.lives), 800, 727);
    }
    ,15); // number is how often the function is called e.g. 1000 is equal to 1 second.
}


// Game start event listener (listening for keydown):
start_game(document);
display_canvas_text('#0004ffff', "Press [ENTER] to Start the Game!", 320, 375);
display_canvas_text('#0084ffff', "Press [ENTER] to Start the Game!", 322, 377);
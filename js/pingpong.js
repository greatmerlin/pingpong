(function($){
    // data definition
    // playground -> This stores variables that are related to playground
    var pingpong = {
    scoreA : 0, // score for player A
    scoreB : 0, // score for player B

    paddleA: {
    x: 50,
    y: 100,
    width: 20,
    height: 70
    },
    paddleB: {
    x: 320,
    y: 100,
    width: 20,
    height: 70
    },
    playground: {
        offsetTop: $("#playground").offset().top,
        height: parseInt($("#playground").height()),
        width: parseInt($("#playground").width()),
    },
    ball: {
        speed: 10,
        x: 150,
        y: 100,
        directionX: 1,
        directionY: 1
        }
    };
    // view rendering
    function renderPaddles() {
    $("#paddleB").css("top", pingpong.paddleB.y);
    $("#paddleA").css("top", pingpong.paddleA.y);
}

// function that handles the mouse's enter, move, and leave events

function handleMouseInputs() {
    // run the game when mouse moves in the playground.
    $('#playground').mouseenter(function(){
    pingpong.isPaused = false;
    });
    // pause the game when mouse moves out the playground.
    $('#playground').mouseleave(function(){
    pingpong.isPaused = true;
    });
    // calculate the paddle position by using the mouse position.
    $('#playground').mousemove(function(e){
        pingpong.paddleB.y = e.pageY -
        pingpong.playground.offsetTop;
    });
}

function render() {
    renderBall();
    renderPaddles();
    window.requestAnimationFrame(render);
    }
        
function init() { 
    // set interval to call gameloop logic in 30 FPS
    pingpong.timer = setInterval(gameloop, 1000/30);
    // view rendering
    window.requestAnimationFrame(render);
    // inputs
    handleMouseInputs();
} 

// We define a gameloop function and move the ball on each game loop iteration
function gameloop() {
    autoMovePaddleA();
    moveBall();
    }
// We define the functions to check whether the ball is hitting the four boundary walls of the playground
function ballHitsTopBottom() {
    var y = pingpong.ball.y + pingpong.ball.speed *
    pingpong.ball.directionY;
    return y < 0 || y > pingpong.playground.height;
    }
    function ballHitsRightWall() {
        return pingpong.ball.x + pingpong.ball.speed *
        pingpong.ball.directionX > pingpong.playground.width;
        }
        function ballHitsLeftWall() {
        return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.
        directionX < 0;
        }

// Then, we define two functions that reset the game after either player wins.
function playerAWin() {
    // increment the score
    pingpong.scoreA += 1;
    $("#score-a").text(pingpong.scoreA);
    // reset the ball;
    pingpong.ball.x = 250;
    pingpong.ball.y = 100;
    // update the ball location variables;
    pingpong.ball.directionX = -1;
}
function playerBWin() {
    //increment the score
    pingpong.scoreB += 1;
    $("#score-b").text(pingpong.scoreB);
    // reset the ball;
    pingpong.ball.x = 150;
    pingpong.ball.y = 100;
    pingpong.ball.directionX = 1;
}
    
/*
It is time to define the moveBall function. The function checks the boundaries
of the playground, changes the direction of the ball when it hits the boundaries,
and sets the new ball position after all these calculations. Let's put the following
moveBall function definition in the JavaScript file:
*/
function moveBall() {
    // reference useful varaibles
    var ball = pingpong.ball;
    // check playground top/bottom boundary
    if (ballHitsTopBottom()) {
    // reverse direction
    ball.directionY *= -1;
    }
    // check right
    if (ballHitsRightWall()) {
    playerAWin();
    }
    // check left
    if (ballHitsLeftWall()) {
        playerBWin();
    }

    // Variables for checking paddles
    var ballX = ball.x + ball.speed * ball.directionX;
    var ballY = ball.y + ball.speed * ball.directionY;

    // check paddles here
    
    // check left paddle
    if (ballX >= pingpong.paddleA.x && ballX < pingpong.paddleA.x +
        pingpong.paddleA.width) {
            if (ballY <= pingpong.paddleA.y + pingpong.paddleA.height &&
            ballY >= pingpong.paddleA.y) {
                ball.directionX = 1;
            }
        }

    // check right paddle
    if (ballX >= pingpong.paddleB.x && ballX < pingpong.paddleB.x +
        pingpong.paddleB.width) {
            if (ballY <= pingpong.paddleB.y + pingpong.paddleB.height &&
            ballY >= pingpong.paddleB.y) {
                ball.directionX = -1;
            }
        }

    // update the ball position data
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;
}

/**
 * We have calculated the ball's movement. Next, we want to render the view to
update the ball's position based on the data. To do this, define a new renderBall
function with the following code.

 * 
 */
function renderBall() {
    var ball = pingpong.ball;
    $("#ball").css({
    "left" : ball.x + ball.speed * ball.directionX,
    "top" : ball.y + ball.speed * ball.directionY
    });
}

// function that follows the ball's y position.
function autoMovePaddleA() {
    var speed = 4;
    var direction = 1;
    var paddleY = pingpong.paddleA.y + pingpong.paddleA.height/2;
    if (paddleY > pingpong.ball.y) {
        direction = -1;
    }
    pingpong.paddleA.y += speed * direction;
}
    
    

renderPaddles();

// Execute the starting point
init();

})(jQuery);
    


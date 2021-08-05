(function($){
    // data definition
    // playground -> This stores variables that are related to playground
    var pingpong = {
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
    },
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
    renderPaddles();
    window.requestAnimationFrame(render);
    }
        
function init() { 
    // view rendering 
    window.requestAnimationFrame(render); 
    // inputs 
    handleMouseInputs(); 
    } 

renderPaddles();

// Execute the starting point
init();

})(jQuery);
    


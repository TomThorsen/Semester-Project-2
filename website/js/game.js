let player1char = localStorage.getItem("player1storage");
let player2char = localStorage.getItem("player2storage");
let player1loc = 0;
let player2loc = 0;
let oldPlayer1loc = 0;
let oldPlayer2loc = 0;
let diceValue = 0;
let playerTurn = 'player1';
let playerTurnElem = document.getElementById("nextPlayerPara");
let currentX = 0;
let currentY = 0;
let frameCount = 60;
let timer;
let points;
let currentFrame;
let curPlayer2X = 0;
let curPlayer2Y = 0;
let curPlayer1X = 0;
let curPlayer1Y = 0;
let punishBool = false;
let samePos = true;
let animRolling = false;
let dicePosX = 1632;
let dicePosY = 30;
let mouseClickSound = new Audio("sound/mouseclick.wav");
let sadSound = new Audio("sound/sad.wav");
let fanfareSound = new Audio("sound/fanfare.wav");
let diceSound = new Audio("sound/dice.wav");
let stepSound = new Audio("sound/step.wav");
let winSound = new Audio("sound/win.wav");
// waypoints
const waypointArray = [[1463,490],[1511,578],[1535,668],[1445,716],[1361,778],[1298,743],[1286,661],[1391,653],[1439,580],[1346,564],[1247,571],[1197,497],[1145,366],[1092,445],[1073,534],[1056,610],[1010,678],[953,710],[884,630],[858,537],[815,452],[881,408],
    [833,309],[735,319],[694,386],[712,483],[715,584],[697,681],[626,743],[532,741],[422,714],[355,673],[291,681],[362,627],[453,593],[477,503],[381,423],[396,330],[392,225],[453,222],[460,158],[444,104]];
// Vaes Dothrak - 0 // Lhazosh - 3 // Meereen - 6 // Morosh - 12 // Volantis - 17 // Lorath - 21 // Sunspear - 29 // Oldtown -32 // Kings Landing - 35 // Winterfell - 38 // Castle Black - 41
// quit game
document.getElementById("quitButton").addEventListener("click", function(){
    window.location.href="index.html";
});
window.onload = function () {
    let player1token = new Image();
    player1token.src = 'img/playertoken_' + player1char + '.png';
    let player2token = new Image();
    player2token.src = 'img/playertoken_' + player2char + '.png';
    let dice1 = new Image();
    dice1.src = 'img/dice_1.png';
    let dice2 = new Image();
    dice2.src = 'img/dice_2.png';
    let dice3 = new Image();
    dice3.src = 'img/dice_3.png';
    let dice4 = new Image();
    dice4.src = 'img/dice_4.png';
    let dice5 = new Image();
    dice5.src = 'img/dice_5.png';
    let dice6 = new Image();
    dice6.src = 'img/dice_6.png';
    let diceArray = [dice1,dice2,dice3,dice4,dice5,dice6];
    player2token.onload = function () {
        initCanvas(player1token,player2token,dice1,dice2,dice3,dice4,dice5,dice6);
    };
    function initCanvas() {
        //set up the canvas and context
        let canvas = document.getElementById("gameCanvas");
        let ctx = canvas.getContext("2d");
        let player1startPos = [waypointArray[player1loc][0] - 90, waypointArray[player1loc][1] - 123];
        let player2startPos = [waypointArray[player2loc][0] + 10, waypointArray[player2loc][1] - 123];
        ctx.drawImage(player1token, player1startPos[0], player1startPos[1], player1token.width = 100, player1token.height = 126);
        ctx.drawImage(player2token, player2startPos[0], player2startPos[1], player2token.width = 100, player2token.height = 126);
        ctx.textAlign = "center";
        ctx.font = "bold 30px Cinzel";
        ctx.drawImage(dice1, dicePosX, dicePosY, dice1.width = 100, dice1.height = 100);
        function positionText(){
            ctx.fillStyle = "#29090F";
            ctx.strokeStyle = "#D6C3A7";
            ctx.lineWidth = "5";
            ctx.fillRect(1500, 150, 380, 100);
            ctx.strokeRect(1500, 150, 380, 100);
            ctx.fillStyle = "#D6C3A7";
            ctx.fillText("Player 1 location:" + " " + oldPlayer1loc, 1690, 190);
            ctx.fillText("Player 2 location:" + " " + oldPlayer2loc, 1690, 232);
        }
        function eventText(locationName, text1, text2) {
            ctx.fillStyle = "#29090F";
            ctx.strokeStyle = "#C29C54";
            ctx.lineWidth = "5";
            ctx.fillRect(690, 100, 550, 150);
            ctx.strokeRect(690, 100, 550, 150);
            ctx.fillStyle = "#C29C54";
            ctx.fillText(locationName , 965, 140);
            ctx.fillText(text1 , 965, 190);
            ctx.fillText(text2 , 965, 220);
        }
        positionText();
        // roll dice button
        document.getElementById("rollDiceButton").addEventListener("click", function(){
            if (!animRolling && !punishBool) {
                diceValue = Math.floor(Math.random() * 6) + 1;
                mouseClickSound.play();
                mouseClickSound.currentTime=0;
                diceSound.play();
                diceSound.currentTime=0;
                if (playerTurn === 'player1') {
                    oldPlayer1loc = player1loc;
                    player1loc = player1loc + diceValue;
                    if (player1loc > 41) {
                        player1loc = 41; // WINNER
                    }
                    initP1animate();
                } else {
                    oldPlayer2loc = player2loc;
                    player2loc = player2loc + diceValue;
                    if (player2loc > 41) {
                        player2loc = 41; // WINNER
                    }
                    initP2animate();
                }
            }
        });
        // init player 1 animation for step by step movement
        function initP1animate() {
            if (oldPlayer1loc < player1loc) {
                let curLocationX = waypointArray[oldPlayer1loc][0] - 42;
                let curLocationY = waypointArray[oldPlayer1loc][1] - 123;
                oldPlayer1loc = oldPlayer1loc + 1;
                let newLocationX = waypointArray[oldPlayer1loc][0] - 42;
                let newLocationY = waypointArray[oldPlayer1loc][1] - 123;
                points = linePoints(curLocationX, curLocationY, newLocationX, newLocationY, frameCount);
                currentFrame = 0;
                currentX = newLocationX;
                currentY = newLocationY;
                animRolling= true;
                animateP1();
            }else if (oldPlayer1loc === player1loc) {
                eventChecker();
            }
        }
        // init player 1 punishment for step by step movement
        function initp1punishment () {
            if (oldPlayer1loc > player1loc) {
                let curLocationX = waypointArray[oldPlayer1loc][0] - 42;
                let curLocationY = waypointArray[oldPlayer1loc][1] - 123;
                oldPlayer1loc = oldPlayer1loc - 1;
                let newLocationX = waypointArray[oldPlayer1loc][0] - 42;
                let newLocationY = waypointArray[oldPlayer1loc][1] - 123;
                points = linePoints(curLocationX, curLocationY, newLocationX, newLocationY, frameCount);
                currentFrame = 0;
                currentX = newLocationX;
                currentY = newLocationY;
                animRolling= true;
                animateP1();
            }else if (oldPlayer1loc === player1loc) {
                punishBool = false;
                eventChecker();
            }
        }
        // init player 2 animation for step by step movement
        function initP2animate() {
            if (oldPlayer2loc < player2loc) {
                let curLocationX = waypointArray[oldPlayer2loc][0] - 42;
                let curLocationY = waypointArray[oldPlayer2loc][1] - 123;
                oldPlayer2loc = oldPlayer2loc + 1;
                let newLocationX = waypointArray[oldPlayer2loc][0] - 42;
                let newLocationY = waypointArray[oldPlayer2loc][1] - 123;
                points = linePoints(curLocationX, curLocationY, newLocationX, newLocationY, frameCount);
                currentFrame = 0;
                currentX = newLocationX;
                currentY = newLocationY;
                animRolling = true;
                animateP2();
            }else if (oldPlayer2loc === player2loc) {
                eventChecker();
            }
        }
        // init player 2 punishment for step by step movement
        function initp2punishment () {
            if (oldPlayer2loc > player2loc) {
                let curLocationX = waypointArray[oldPlayer2loc][0] - 42;
                let curLocationY = waypointArray[oldPlayer2loc][1] - 123;
                oldPlayer2loc = oldPlayer2loc - 1;
                let newLocationX = waypointArray[oldPlayer2loc][0] - 42;
                let newLocationY = waypointArray[oldPlayer2loc][1] - 123;
                points = linePoints(curLocationX, curLocationY, newLocationX, newLocationY, frameCount);
                currentFrame = 0;
                currentX = newLocationX;
                currentY = newLocationY;
                animRolling= true;
                animateP2();
            }else if (oldPlayer2loc === player2loc) {
                punishBool = false;
                eventChecker();
            }
        }
        // player 1 animation
        function animateP1() {
            let point = points[currentFrame++];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (samePos === true && oldPlayer1loc + 1 < player1loc) {
                curPlayer2X = waypointArray[player2loc][0] + 10;
                curPlayer2Y = waypointArray[player2loc][1] - 123;
                ctx.drawImage(player2token, curPlayer2X, curPlayer2Y, player2token.width = 100, player2token.height = 126);
            } else {
                curPlayer2X = waypointArray[player2loc][0] - 42;
                curPlayer2Y = waypointArray[player2loc][1] - 123;
                ctx.drawImage(player2token, curPlayer2X, curPlayer2Y, player2token.width = 100, player2token.height = 126);
            }
            ctx.drawImage(player1token, point.x, point.y, player1token.width = 100, player1token.height = 126);
            ctx.drawImage(diceArray[diceValue-1], dicePosX, dicePosY, dice1.width = 100, dice1.height = 100);
            positionText();
            if (currentFrame < points.length) {
                timer = setTimeout(animateP1, 1000 / 60);
            } else {
                animRolling = false;
                 if (oldPlayer1loc === player2loc && oldPlayer1loc === player1loc) {
                    samePos = true;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(player1token, point.x - 49, point.y, player1token.width = 100, player1token.height = 126);
                    ctx.drawImage(player2token, curPlayer2X + 49, curPlayer2Y, player2token.width = 100, player2token.height = 126);
                    ctx.drawImage(diceArray[diceValue-1], dicePosX, dicePosY, dice1.width = 100, dice1.height = 100);
                    positionText();
                } else {
                    samePos = false;
                }
                if (punishBool) {
                    initp1punishment ();
                }else{
                    initP1animate();
                }
                stepSound.play();
                stepSound.currentTime=0;
            }
        }
        // player 2 animation
        function animateP2() {
            let point = points[currentFrame++];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (samePos === true && oldPlayer2loc + 1 < player2loc) {
                curPlayer1X = waypointArray[player1loc][0] - 48;
                curPlayer1Y = waypointArray[player1loc][1] - 123;
                ctx.drawImage(player1token, curPlayer1X, curPlayer1Y, player1token.width = 100, player1token.height = 126);
            } else {
                curPlayer1X = waypointArray[player1loc][0] - 42;
                curPlayer1Y = waypointArray[player1loc][1] - 123;
                ctx.drawImage(player1token, curPlayer1X, curPlayer1Y, player1token.width = 100, player1token.height = 126);
            }
            positionText();
            ctx.drawImage(player2token, point.x, point.y, player2token.width = 100, player2token.height = 126);
            ctx.drawImage(diceArray[diceValue-1], dicePosX, dicePosY, dice1.width = 100, dice1.height = 100);
            if (currentFrame < points.length) {
                timer = setTimeout(animateP2, 1000 / 60);
            } else {
                animRolling = false;
                if (oldPlayer2loc === player1loc && oldPlayer2loc === player2loc) {
                    samePos = true;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(player2token, point.x + 49, point.y, player2token.width = 100, player2token.height = 126);
                    ctx.drawImage(player1token, curPlayer1X -48, curPlayer1Y, player1token.width = 100, player1token.height = 126);
                    ctx.drawImage(diceArray[diceValue-1], dicePosX, dicePosY, dice1.width = 100, dice1.height = 100);
                    positionText();
                } else {
                    samePos = false;
                }
                if (punishBool) {
                    initp2punishment ();
                }else{
                    initP2animate();
                }
                stepSound.play();
                stepSound.currentTime=0;
            }
        }
        // getting mousecoords
        function getMouseCoords(canvas, event) {
            let canvasButton = canvas.getBoundingClientRect();
            return {
                x: event.clientX - canvasButton.left,
                y: event.clientY - canvasButton.top
            };
        }
        // check if mouse inside button
        function checkButtonMousePos(pos, canvasButton){
            return pos.x > canvasButton.x && pos.x < canvasButton.x+canvasButton.width && pos.y < canvasButton.y+canvasButton.height && pos.y > canvasButton.y
        }
        function drawButton () {
            ctx.fillStyle = "#29090F";
            ctx.strokeStyle = "#C29C54";
            ctx.lineWidth = "5";
            ctx.fillRect(835, 270, 250, 50);
            ctx.strokeRect(835, 270, 250, 50);
            ctx.fillStyle = "#C29C54";
            ctx.fillText("UNDERSTOOD" , 960, 305);
        }
        let buttonSize = {
            x: 835,
            y: 270,
            width: 250,
            height: 50
        };
        // check for location events
        function eventChecker() {
            if (player1loc === 3 || player2loc === 3) {
                eventText("LOCATION: Lhazosh","Someone stole your horse!", "Move back 1 position");
                if (playerTurn === 'player1') {
                    punishFunc(1,1);
                }else{
                    punishFunc(1,2);
                }
                punishBool = true;
            }
            if (player1loc === 6 || player2loc === 6) {
                eventText("LOCATION: Meereen","You fell in the river!", "Move back 2 positions");
                if (playerTurn === 'player1') {
                    punishFunc(2,1);
                }else{
                    punishFunc(2,2);
                }
                punishBool = true;
            }
            if (player1loc === 12 || player2loc === 12) {
                eventText("LOCATION: Morosh","Thieves stole your lunch!", "Move back 3 positions");
                if (playerTurn === 'player1') {
                    punishFunc(3,1);
                }else{
                    punishFunc(3,2);
                }
                punishBool = true;
            }
            if (player1loc === 17 || player2loc === 17) {
                eventText("LOCATION: Volantis","A pack of bandits rob you!", "Move back 3 positions");
                if (playerTurn === 'player1') {
                    punishFunc(3,1);
                }else{
                    punishFunc(3,2);
                }
                punishBool = true;
            }
            if (player1loc === 21 || player2loc === 21) {
                eventText("LOCATION: Lorath","You came too late to the ferry!", "Move back 2 positions");
                if (playerTurn === 'player1') {
                    punishFunc(2,1);
                }else{
                    punishFunc(2,2);
                }
                punishBool = true;
            }
            if (player1loc === 29 || player2loc === 29) {
                eventText("LOCATION: Sunspear","Pirates rob the ferry!", "Move back 4 positions");
                if (playerTurn === 'player1') {
                    punishFunc(4,1);
                }else{
                    punishFunc(4,2);
                }
                punishBool = true;
            }
            if (player1loc === 32 || player2loc === 32) {
                eventText("LOCATION: Oldtown","You overslept!", "Move back 2 positions");
                if (playerTurn === 'player1') {
                    punishFunc(2,1);
                }else{
                    punishFunc(2,2);
                }
                punishBool = true;
            }
            if (player1loc === 35 || player2loc === 35) {
                eventText("LOCATION: Kings Landing","The queen tries to kill you!", "Move back 2 positions");
                if (playerTurn === 'player1') {
                    punishFunc(2,1);
                }else{
                    punishFunc(2,2);
                }
                punishBool = true;
            }
            if (player1loc === 38 || player2loc === 38) {
                eventText("LOCATION: Winterfell","The cold is slowing you down!", "Move back 1 positions");
                if (playerTurn === 'player1') {
                    punishFunc(1,1);
                }else{
                    punishFunc(1,2);
                }
                punishBool = true;
            }
            if (player1loc >= 41 || player2loc >= 41) {
                if (playerTurn === 'player1') {
                    eventText("LOCATION: Castle Black","CONGRATULATIONS!", "Player 1 won the game!");
                    localStorage.setItem("winningPlayer", playerTurn);
                    localStorage.setItem("winningChar", player1char);
                }else{
                    eventText("LOCATION: Castle Black","CONGRATULATIONS!", "Player 2 won the game!");
                    localStorage.setItem("winningPlayer", playerTurn);
                    localStorage.setItem("winningChar", player2char);
                }
                winSound.play();
                drawButton();
                canvas.addEventListener('click', function _clickForOk(evt) {

                    let  mousePos = getMouseCoords(canvas, evt);
                    if (checkButtonMousePos(mousePos,buttonSize)) {
                        mouseClickSound.play();
                        mouseClickSound.currentTime=0;
                        window.location.href="winner.html";
                    }
                }, true);
                punishBool = true;
            }
            // execute punish
            function punishFunc(punishment,player) {
                drawButton();
                sadSound.play();
                sadSound.currentTime=0;
                canvas.addEventListener('click', function _clickForOk(evt) {

                    let  mousePos = getMouseCoords(canvas, evt);
                    if (checkButtonMousePos(mousePos,buttonSize)) {
                        mouseClickSound.play();
                        mouseClickSound.currentTime=0;
                        if (player === 1) {
                            player1loc = player1loc - punishment;
                            initp1punishment ();

                        }else{
                            player2loc = player2loc - punishment;
                            initp2punishment ();
                        }
                        canvas.removeEventListener("click", _clickForOk, true);
                    }
                }, true);
            }
            // rolled 6, gets new turn
            if (playerTurn === 'player1' && punishBool === false) {
                if (diceValue === 6) {
                    eventText("CONGRATULATIONS!","You rolled a 6", "You get another turn!");
                    fanfareSound.play();
                    fanfareSound.currentTime=0;
                }else{
                playerTurn = 'player2';
                playerTurnElem.innerHTML = "PLAYER 2";
                }
            }else if (playerTurn ==='player2' && punishBool === false){
                if (diceValue === 6) {
                    eventText("CONGRATULATIONS!","You rolled a 6", "You get another turn!");
                    fanfareSound.play();
                    fanfareSound.currentTime=0;
                }else{
                playerTurn = 'player1';
                playerTurnElem.innerHTML = "PLAYER 1";
                }
            }
        }
        // player animation calculations
        function linePoints(x1, y1, x2, y2, frames) {
            let dx = x2 - x1;
            let dy = y2 - y1;
            let incrementX = dx / frames;
            let incrementY = dy / frames;
            let a = [];
            a.push({
                x: x1,
                y: y1
            });
            for (let frame = 0; frame < frames - 1; frame++) {
                a.push({
                    x: x1 + (incrementX * frame),
                    y: y1 + (incrementY * frame)
                });
            }
            a.push({
                x: x2,
                y: y2
            });
            return (a);
        }
    }
};


/* Map ocordinate finder

var wpNumber = 0;

//report the mouse position on click
canvas.addEventListener("click", function (evt) {

    var mousePos = getMousePos(canvas, evt);
    wpNumber = wpNumber + 1;
    console.log('waypointLoc' + wpNumber + ' ' + '=' + ' ' + mousePos.x + ',' + mousePos.y + ';');
    ctx.fillRect(mousePos.x,mousePos.y,10,10);
}, false);

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
*/
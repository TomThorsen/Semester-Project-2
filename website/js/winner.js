let winningPlayer = localStorage.getItem("winningPlayer");
let winningChar = localStorage.getItem("winningChar");
let playerName = '';

if (winningPlayer === 'player1') {
    playerName = 'Player 1';
} else {
    playerName = 'Player 2';
}

let elementVar = document.getElementById("winnerText");
elementVar.innerHTML = "Congratulations to" + " " + playerName + " " + "for winning the game!";

document.getElementById("playerAgainBtn").addEventListener("click", function(){
    window.location.href="index.html";
});

window.onload = function () {
    let winnerToken = new Image();
    winnerToken.src = 'img/playertoken_' + winningChar + '.png';
    winnerToken.onload = function () {
        initCanvas(winnerToken);
    };
    function initCanvas() {
        let canvas = document.getElementById("winCanvas");
        let ctx = canvas.getContext("2d");

        let canvasW = window.innerWidth;
        let canvasH = window.innerHeight;
        let maxParticles = 35;
        let particles = [];
        canvas.width = canvasW;
        canvas.height = canvasH;
        for(let i = 0; i < maxParticles; i++) {
            particles.push({
                r: Math.random()*4+1,
                d: Math.random()*maxParticles,
                x: Math.random()*canvasW,
                y: Math.random()*canvasH,
            })
        }
        function draw()
        {
            ctx.clearRect(0, 0, canvasW, canvasH);
            ctx.drawImage(winnerToken, 810, 280, winnerToken.width = 300, winnerToken.height = 378);
            for(let i = 0; i < maxParticles; i++){
                let particle = particles[i];
                ctx.beginPath();
                ctx.fillStyle = '#D6C3A7';
                ctx.moveTo(particle.x, particle.y);
                ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI*2, true);
                ctx.fill();
            }
            update();
        }
        let angle = 0;
        function update() {
            angle += 0.01;
            for(let i = 0; i < maxParticles; i++) {
                let particle = particles[i];
                particle.y += Math.cos(angle+particle.d) + 1 + particle.r/2;
                particle.x += Math.sin(angle) * 2;
                if(particle.x > canvasW+5 || particle.x < -5 || particle.y > canvasH) {
                    if(i%3 > 0) {
                        particles[i] = {x: Math.random()*canvasW, y: -10, r: particle.r, d: particle.d};
                    } else {
                        if (Math.sin(angle) > 0) {
                            particles[i] = {x: -5, y: Math.random()*canvasH, r: particle.r, d: particle.d};
                        } else {
                            particles[i] = {x: canvasW+5, y: Math.random()*canvasH, r: particle.r, d: particle.d};
                        }
                    }
                }
            }
        }
        setInterval(draw, 33);
    }
};

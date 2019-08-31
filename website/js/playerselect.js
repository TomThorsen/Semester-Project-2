let mouseClickSound = new Audio("sound/mouseclick.wav");
// Fetch data async and update character cards
async function getCharDetails(char)
{
    let response = await fetch('https://anapioficeandfire.com/api/characters?name=' + char);
    return await response.json();
}
let charNumber = 0;
for (var i = 0; i < 10; i++) {
    let chars = ["Eddard+Stark","Jaime+Lannister","Daenerys+Targaryen","Sandor+Clegane","Petyr+Baelish","Margaery+Tyrell","Theon+Greyjoy","Jon+Arryn","Jeor+Mormont","Robert+I+Baratheon"];
    getCharDetails(chars[i])
        .then(data => updateCharCards(data));

    function updateCharCards(data) {
        let characterCardCont = document.getElementById("char" + charNumber);
        if (charNumber === 2) {
            characterCardCont.innerHTML += "<p class='charInfo'>GENDER:" + " " + data[1].gender + "</p>";
            characterCardCont.innerHTML += "<p class='charInfo'>CULTURE:" + " " + data[1].culture + "</p>";
            characterCardCont.innerHTML += "<p class='charInfo'>ALIAS:" + " " + data[1].aliases[3] + "</p>";
        } else {
                characterCardCont.innerHTML += "<p class='charInfo'>GENDER:" + " " + data[0].gender + "</p>";
            if (data[0].culture.length > 1) {
                characterCardCont.innerHTML += "<p class='charInfo'>CULTURE:" + " " + data[0].culture + "</p>";
            } else {
                characterCardCont.innerHTML += "<p class='charInfo'>CULTURE: UNKNOWN</p>";
            }
            if (data[0].aliases.length > 1) {
                 characterCardCont.innerHTML += "<p class='charInfo'>ALIAS:" + " " + data[0].aliases[0] + "</p>";
            } else {
                characterCardCont.innerHTML += "<p class='charInfo'>ALIAS: UNKNOWN</p>";
            }
        }
        charNumber = charNumber + 1;
    }
}

// CHAR SELECTION

//selected char glob vars
player1char = '';
player2char = '';

//clear selected button
function clearSelected() {
    let buttonsVar = document.querySelector(".buttonSelected");
        buttonsVar.classList.remove('buttonSelected');
        buttonsVar.classList.add("buttonUnselected");
}
//player 1 select
document.getElementById("player1button").addEventListener("click", function(){
    mouseClickSound.play();
    mouseClickSound.currentTime=0;
    let elementVar = document.getElementById("player1button");
    if (elementVar.classList.contains('buttonUnselected')) {
        elementVar.classList.remove("buttonUnselected");
        clearSelected();
        elementVar.classList.add("buttonSelected");
    }
});
//player 2 select
document.getElementById("player2button").addEventListener("click", function(){
    mouseClickSound.play();
    mouseClickSound.currentTime=0;
    let elementVar = document.getElementById("player2button");
    if (elementVar.classList.contains('buttonUnselected')) {
        elementVar.classList.remove("buttonUnselected");
        clearSelected();
        elementVar.classList.add("buttonSelected");
    }
});
//start game
document.getElementById("startGameButton").addEventListener("click", function(){
    mouseClickSound.play();
    mouseClickSound.currentTime=0;
    let elementVar = document.getElementById("startErrorPara");
    if (player1char === '' || player2char === '') {
        elementVar.innerHTML = "You must select a character <br> for each player!";
    } else {
        localStorage.setItem("player1storage", player1char);
        localStorage.setItem("player2storage", player2char);
        window.location.href="game.html";
    }
});
//player select
let charCardsByClass = document.querySelectorAll(".characterCard");
let player1SelButton = document.getElementById("player1button");
let player2SelButton = document.getElementById("player2button");

function clearSelectedPlayer1() {
    let buttonsVar = document.querySelector(".player1selected");
        if (buttonsVar != null) {
            buttonsVar.classList.remove('player1selected');
        }
}
function clearSelectedPlayer2() {
    let buttonsVar = document.querySelector(".player2selected");
        if (buttonsVar != null) {
            buttonsVar.classList.remove('player2selected');
        }
}

for (let i = 0; i < charCardsByClass.length; i++) {
    let charID = charCardsByClass[i].id;
    let elementVar = document.getElementById(charID);
    charCardsByClass[i].addEventListener("click", function() {
        mouseClickSound.play();
        mouseClickSound.currentTime=0;
        if (player1SelButton.classList.contains('buttonSelected')) {
            if (!elementVar.classList.contains('player2selected')) {
                player1char = charID;
                clearSelectedPlayer1();
                elementVar.classList.add("player1selected");
                console.log('player1=' + player1char);// DEBUG
            }
        } else if (player2SelButton.classList.contains('buttonSelected')){
            if (!elementVar.classList.contains('player1selected')) {
                player2char = charID;
                clearSelectedPlayer2();
                elementVar.classList.add("player2selected");
                console.log('player2=' + player2char);// DEBUG
            }
        } else {
            alert('Something went terribly wrong... Lets blame hamsters');
        }

    })

}

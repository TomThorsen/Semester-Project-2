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
            }
            if (data[0].aliases.length > 1) {
            characterCardCont.innerHTML += "<p class='charInfo'>ALIAS:" + " " + data[0].aliases[0] + "</p>";
            }
        }
        charNumber = charNumber + 1;
    }
}


// dice
function throwDice() {
var diceValue = Math.floor(Math.random() * 6) + 1;
console.log(diceValue);
}

function canvasSetup() {
//set up the canvas and context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

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
// waypoints

var waypointLoc1 = [1463,490]; // Vaes Dothrak - START
var waypointLoc2 = [1511,578];
var waypointLoc3 = [1535,668];
var waypointLoc4 = [1445,716]; // Lhazosh
var waypointLoc5 = [1361,778];
var waypointLoc6 = [1298,743];
var waypointLoc7 = [1286,661]; // Meereen
var waypointLoc8 = [1391,653];
var waypointLoc9 = [1439,580];
var waypointLoc10 = [1346,564];
var waypointLoc11 = [1247,571];
var waypointLoc12 = [1197,497];
var waypointLoc13 = [1145,366]; // Morosh
var waypointLoc14 = [1092,445];
var waypointLoc15 = [1073,534];
var waypointLoc16 = [1056,610];
var waypointLoc17 = [1010,678];
var waypointLoc18 = [953,710]; // Volantis
var waypointLoc19 = [884,630];
var waypointLoc20 = [858,537];
var waypointLoc21 = [815,452];
var waypointLoc22 = [881,408]; // Lorath
var waypointLoc23 = [833,309];
var waypointLoc24 = [735,319];
var waypointLoc25 = [694,386];
var waypointLoc26 = [712,483];
var waypointLoc27 = [715,584];
var waypointLoc28 = [697,681];
var waypointLoc29 = [626,743];
var waypointLoc30 = [532,741]; // Sunspear
var waypointLoc31 = [422,714];
var waypointLoc32 = [355,673];
var waypointLoc33 = [291,681]; // Oldtown
var waypointLoc34 = [362,627];
var waypointLoc35 = [453,593];
var waypointLoc36 = [477,503]; // Kings Landing
var waypointLoc37 = [381,423];
var waypointLoc38 = [396,330];
var waypointLoc39 = [392,225]; // Winterfell
var waypointLoc40 = [453,222];
var waypointLoc41 = [460,158];
var waypointLoc42 = [444,104]; // Castle Black
}
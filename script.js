function bouge(elem) {
    elem.style.animation = "bouge 0.3s"
    elem.style.animationIterationCount = "infinite"
    setTimeout(() => {
        elem.style.animation = ""
        elem.style.animationIterationCount = ""
    }, 300)
};

var plouf = new Audio("plouf.wav");
var error = new Audio("error.mp3");
var boum = new Audio("boum.mp3");
var grosBoum = new Audio("grosBoum.mp3");
var nbplouf = 0;
var ploufSave = 0;
var board = null;

const noteDiv = document.getElementById("note");
noteDiv.innerHTML = "";

const chiffre = document.createElement("h1");
chiffre.style.textAlign = "center";
chiffre.innerText = " ";
noteDiv.appendChild(chiffre);


for (let i = 0; i < 10; i++) {
    const chiffre = document.createElement("h1");
    chiffre.style.textAlign = "center";
    chiffre.innerText = i;
    noteDiv.appendChild(chiffre);
}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const chiffre = document.createElement("h1");
        if (j === 0) {
            chiffre.style.textAlign = "center";
            chiffre.innerText = String.fromCharCode(i + 65);
            noteDiv.appendChild(chiffre);
        }

        const NotecolonneDiv = document.createElement("div");
        NotecolonneDiv.id = "N" + String.fromCharCode(i + 65) + j.toString();
        NotecolonneDiv.innerText = " . "
        NotecolonneDiv.onclick = () => guess(NotecolonneDiv.id[1] + NotecolonneDiv.id[2]);
        noteDiv.appendChild(NotecolonneDiv);
    }
}

var url = window.location.href;
url = url.split('?ip=');
var ip = url[1];
var ws = null;

if (ip){
    ws = new WebSocket("wss://" + ip);
}else{
    ws = new WebSocket("wss://192.168.1.26:5000");
};

const chat = document.getElementById("message");


let touches = 0
let tour = null;
const tourDiv = document.getElementById("tour");

const bateaux = {
    "bleu": "#0dcaf0",
    "rouge": "#EE6677",
    "jaune": "#ffc107",
    "vert": "#198754",
    "noir": "#101B27",
    "touche": "grey",
};

ws.onopen = function(event) {
    console.log("WebSocket connected");
};

ws.onmessage = function(event) {
    if (event.data.includes("@")) {
        const boardDiv = document.getElementById("board");
        boardDiv.innerHTML = "";

        const liste = event.data.split(",");
        board = liste;

        const chiffre = document.createElement("h1");
        chiffre.style.textAlign = "center";
        chiffre.innerText = " ";
        boardDiv.appendChild(chiffre);

        for (let i = 0; i < liste.length; i++) {
            const chiffre = document.createElement("h1");
            chiffre.style.textAlign = "center";
            chiffre.innerText = i;
            boardDiv.appendChild(chiffre);
        }

        for (let i = 0; i < liste.length; i++) {
            let ligne = liste[i].split('@');
            for (let j = 0; j < ligne.length; j++) {
                let colonne = ligne[j];
                var point = null;
                var C = colonne.split(";");

                colonne = C[0];
                point = C[1];

                console.log(point);
                if (j === 0) {
                    const lettre = document.createElement("h1");
                    lettre.innerText = String.fromCharCode(i + 65);
                    lettre.style.textAlign = "center";
                    boardDiv.appendChild(lettre);
                }

                const colonneDiv = document.createElement("div");
                colonneDiv.id = String.fromCharCode(i + 65) + j.toString();

                colonneDiv.onclick = () => guess(colonneDiv.id);
                colonneDiv.style.backgroundColor = bateaux[colonne];

                // for (let i = 0; i < document.querySelectorAll("span").length; i++) {
                //     document.querySelectorAll("span")[i].className = ""
                // };

                const span = document.createElement("span")
                span.className = "acti"
                span.innerText = "•";
                if(point){ colonneDiv.appendChild(span)};
                boardDiv.appendChild(colonneDiv);
            }
        }
        compteTouches()
    } else if (event.data == "True" || event.data == "False") {
        tour = event.data
        if (tour == "True") {
            tourDiv.innerText = "C'est votre tour";
            bouge(document.getElementById("tourDiv"));
        }else{
            tourDiv.innerText = "C'est au tour de l'adversaire";
            bouge(document.getElementById("tourDiv"));
        }
        console.log(tour)
    } else if(event.data == "reload"){
        location.reload()
    }else if(event.data == "Serveur complet. Réessayez plus tard."){
        tourDiv.innerText = event.data;
    }
    else {
        chat.value = event.data;
    }

    if (event.data == "lose"){
        lose();
    }
};

ws.onclose = function(event) {
    console.log("WebSocket disconnected");
};



function compteTouches(){
    nbplouf = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].includes(".")){
                nbplouf += 1
            }
        }
    }
    if (ploufSave != nbplouf){
        ploufSave = nbplouf;
        nbplouf = 0;
        stop()
        plouf.play();
    } else{
        stop()
        boum.play();
    }

}

function stop(){
    error.pause();
    error.currentTime = 0;
    
    boum.pause();
    boum.currentTime = 0;
    
    grosBoum.pause();
    grosBoum.currentTime = 0;
    
    plouf.pause();
    plouf.currentTime = 0;
}

function shake(elem) {
    stop()
    error.play();
    
    elem.style.animation = "shake 0.5s"
    elem.style.animationIterationCount = "infinite"
    elem.style.backgroundColor = "rgb(248, 89, 89)";
    setTimeout(() => {
        elem.style.animation = ""
        elem.style.animationIterationCount = ""
        elem.style.backgroundColor = "#1d2a35";
    }, 300)
};

function win(){
    document.getElementById("win").style.transform = "translateY(0%)";
    tourDiv.outerHTML = '<button id="tour" onclick="location.reload()">Rejouer</button>';
}

function lose(){
    document.getElementById("lose").style.transform = "translateY(0%)";
    tourDiv.outerHTML = '<button  id="tour" onclick="location.reload()">Rejouer</button>';
}

function guess(coo) {
    ws.send(coo);
    console.log(coo);
    setTimeout(() => {
        const note = document.getElementById("N" + coo);
        if (chat.value === "touché") {
            stop()
            boum.play();
            
            note.style.backgroundColor = "#f44336";
            touches += 1;
            
            if (touches == 15){
                win()
                ws.send("D");
            }
            note.innerText = "";
        } else if (chat.value === "coulé") {
            stop()
            grosBoum.play();
            
            note.style.backgroundColor = "#f44336";
            touches += 1;
            
            if (touches == 15){
                win()
                ws.send("D");
            }
            note.innerText = "";
        } else if (chat.value === "Raté") {
            stop()
            plouf.play();
            
            note.style.backgroundColor = "#4C5B6A";
            note.innerText = "";
        } else {
            shake(document.body)
        }
    }, 100);
}


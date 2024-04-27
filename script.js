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

const ws = new WebSocket("ws://192.168.182.1:5000");

const chat = document.getElementById("message");

const bateaux = {
    "bleu": "#0dcaf0",
    "rouge": "#EE6677",
    "jaune": "#ffc107",
    "vert": "#198754",
    "noir": "#101B27",
    "touche": "grey"
};

ws.onopen = function(event) {
    console.log("WebSocket connected");
};

ws.onmessage = function(event) {
    if (event.data.includes("@")) {
        const boardDiv = document.getElementById("board");
        boardDiv.innerHTML = "";

        const liste = event.data.split(",");

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
                boardDiv.appendChild(colonneDiv);
            }
        }
    } else {
        chat.value = event.data;
    }
};

ws.onclose = function(event) {
    console.log("WebSocket disconnected");
};

function shake(elem) {
    elem.style.animation = "shake 0.5s"
    elem.style.animationIterationCount = "infinite"
    elem.style.backgroundColor = "rgb(248, 89, 89)";
    setTimeout(() => {
        elem.style.animation = ""
        elem.style.animationIterationCount = ""
        elem.style.backgroundColor = "white";
    }, 300)
};

function guess(coo) {
    ws.send(coo);
    console.log(coo);
    setTimeout(() => {
        const note = document.getElementById("N" + coo);
        if (chat.value === "touché") {
            note.style.backgroundColor = "#f44336";
            note.innerText = "";
        } else if (chat.value === "Raté") {
            note.style.backgroundColor = "#4C5B6A";
            note.innerText = "";
        } else {
            shake(document.body)
        }
    }, 100);
}

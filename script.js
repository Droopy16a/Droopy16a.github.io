const matches = [
    { Match: "106 - T07", Score: "0 - 0", Date: "25/03/2024", Heure: "13:00", Poule: "P1", Etat: "Terminé", Action: "Resultats"},
    { Match: "TSTMG - 1STMG", Score: "3 - 0", Date: "28/03/2024", Heure: "12:30", Poule: "P1", Etat: "Terminé", Action: "Resultats"},
    { Match: "102+109 - TO5", Score: "2 - 0", Date: "28/03/2024", Heure: "13:00", Poule: "P4", Etat: "Terminé", Action: "Resultats"},
    { Match: "T04+T03 - 101", Score: "0 - 0", Date: "02/04/2024", Heure: "12:30", Poule: "P3", Etat: "Plannifié", Action: "Parier"},
    { Match: "TO8 - 1STL", Score: "0 - 0", Date: "02/04/2024", Heure: "13:00", Poule: "P4", Etat: "Plannifié", Action: "Parier" },
    { Match: "TO9 - TO6", Score: "0 - 0", Date: "03/04/2024", Heure: "12:30", Poule: "P2", Etat: "Plannifié", Action: "Parier" },
    { Match: "105 - 101", Score: "0 - 0", Date: "04/04/2024", Heure: "12:30", Poule: "P3", Etat: "Plannifié", Action: "Parier" },
    { Match: "TO1 - 108+103", Score: "0 - 0", Date: "04/04/2024", Heure: "13:00", Poule: "P3", Etat: "Plannifié", Action: "Parier" },
    { Match: "TO9 - 107", Score: "0 - 0", Date: "05/04/2024", Heure: "12:30", Poule: "P2", Etat: "Plannifié", Action: "Parier" },
    { Match: "1STMG - 106", Score: "0 - 0", Date: "05/04/2024", Heure: "13:00", Poule: "P1", Etat: "Plannifié", Action: "Parier" },
    { Match: "102+109 - 1STL", Score: "0 - 0", Date: "22/04/2024", Heure: "12:30", Poule: "P4", Etat: "Plannifié", Action: "Parier" },
    { Match: "108+103 - T03+T04", Score: "0 - 0", Date: "22/04/2024", Heure: "13:00", Poule: "P3", Etat: "Plannifié", Action: "Parier" },
    { Match: "T06 - 104", Score: "0 - 0", Date: "23/04/2024", Heure: "12:30", Poule: "P2", Etat: "Plannifié", Action: "Parier" },
    { Match: "TSTMG - T07", Score: "0 - 0", Date: "24/04/2024", Heure: "12:30", Poule: "P1", Etat: "Plannifié", Action: "Parier" },
    { Match: "T01 - 101", Score: "0 - 0", Date: "25/04/2024", Heure: "12:30", Poule: "P3", Etat: "Plannifié", Action: "Parier" },
    { Match: "T08 - T05", Score: "0 - 0", Date: "26/04/2024", Heure: "12:30", Poule: "P4", Etat: "Plannifié", Action: "Parier" },
    { Match: "104 - 107", Score: "0 - 0", Date: "29/04/2024", Heure: "13:00", Poule: "P2", Etat: "Plannifié", Action: "Parier" },
    { Match: "105 - 108+103", Score: "0 - 0", Date: "30/04/2024", Heure: "12:30", Poule: "P3", Etat: "Plannifié", Action: "Parier" },
    { Match: "T01 - T04+T03", Score: "0 - 0", Date: "02/05/2024", Heure: "12:30", Poule: "P3", Etat: "Plannifié", Action: "Parier" },
    { Match: "T06 - 107", Score: "0 - 0", Date: "02/05/2024", Heure: "13:00", Poule: "P2", Etat: "Plannifié", Action: "Parier" },
    { Match: "TSTMG - 106", Score: "0 - 0", Date: "03/05/2024", Heure: "12:30", Poule: "P1", Etat: "Plannifié", Action: "Parier" },
    { Match: "T05 - 1STL", Score: "0 - 0", Date: "06/05/2024", Heure: "12:30", Poule: "P4", Etat: "Plannifié", Action: "Parier" },
    { Match: "105 - T01", Score: "0 - 0", Date: "06/05/2024", Heure: "13:00", Poule: "P3", Etat: "Plannifié", Action: "Parier" },
    { Match: "T09 - 104", Score: "0 - 0", Date: "07/05/2024", Heure: "12:30", Poule: "P2", Etat: "Plannifié", Action: "Parier" },
    { Match: "1STMG - T07", Score: "0 - 0", Date: "13/05/2024", Heure: "12:30", Poule: "P1", Etat: "Plannifié", Action: "Parier" },
    { Match: "108+103 - 101", Score: "0 - 0", Date: "13/05/2024", Heure: "13:00", Poule: "P3", Etat: "Plannifié", Action: "Parier" },
    { Match: "105 - TO4+T03", Score: "0 - 0", Date: "14/05/2024", Heure: "12:30", Poule: "P3", Etat: "Plannifié", Action: "Parier" }
];

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

window.scrollTo(0,0)

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';


window.addEventListener('DOMMouseScroll', preventDefault, false);
window.addEventListener(wheelEvent, preventDefault, wheelOpt);
window.addEventListener('touchmove', preventDefault, wheelOpt);
window.addEventListener('keydown', preventDefaultForScrollKeys, false);

const body = document.body
var main = document.getElementsByClassName("main")[0]

const nombreMatch = matches.length

for (var i = 0; i < nombreMatch; i++){
    var container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
    <div class="match">
        <div class="match-content">
            <div class="column">
                <div class="team team--home">
                    <h2 class="team-name">${matches[i]["Match"].split(' - ')[0]}</h2>
                </div>
            </div>
            <div class="column">
                <div class="match-details">
                    <div class="match-date">
                    ${matches[i]["Date"]} à <strong>${matches[i]["Heure"]}</strong>
                    </div>
                    <div class="match-score">
                        <span class="match-score-number match-score-number--leading">${matches[i]["Score"].split(' - ')[0]}</span>
                        <span class="match-score-divider">:</span>
                        <span class="match-score-number">${matches[i]["Score"].split(' - ')[1]}</span>
                    </div>
                    <div class="match-time-lapsed">
                        Poule ${matches[i]["Poule"]}
                    </div>
                    <div class="match-referee">
                        Arbitre: <strong>Nom</strong>
                    </div>
                    <input onclick="betclick(${i})" type="button" id="bet${i}" class="match-bet-place" value="${matches[i]["Action"]}"/>
                </div>
            </div>
            <div class="column">
                <div class="team team--away">
                    <h2 class="team-name">${matches[i]["Match"].split(' - ')[1]}</h2>
                </div>
            </div>
        </div>
        
        <div id=betDiv${i}" class="bet">
            <h1>bet</h1>
        </div>
    </div>
    `;
    main.appendChild(container);
    
    var betDiv = document.getElementsByClassName(`bet`)[i];
    var match = document.getElementsByClassName("match")[0];
};

var nombreScroll = 0

var transparent = document.getElementsByClassName("transparent")[0];

var betButton = document.getElementById("bet0");

var container =  document.getElementsByClassName(`container`)[0];

container.style.zIndex = 999;

main.style.height = window.innerHeight + "px";

maxwidth = match.clientWidth;

console.log(maxwidth);

function getMaxWidth() {
    var M = document.getElementsByClassName("match");
    for (i=0; i<M.length; i++){
        if (M[i].clientWidth < maxwidth){
            maxwidth = M[i].clientWidth;
        }
    }
}

next = function($el) {
    while($el.length) {  
      var s = $el.next();
      if (s.length) return s;
      $el = $el.parent();
    }
  }
  
hr = $('.container');
  
distance = next(hr).offset().top - hr.offset().top

main.style.top = distance *  Math.floor(nombreMatch / 2) + "px";

var r = document.querySelector(':root');

var nb = 0

function betclick(i) {
    betButton = document.getElementById(`bet${i}`);
    betDiv = document.getElementsByClassName(`bet`)[i];
    match = document.getElementsByClassName("match")[i];
    betDiv.style.width = match.clientWidth + "px";
    if (nb % 2 == 0) {
        betDiv.style.transform = `translate(0,${match.clientHeight}px)`;
        betDiv.style.borderTopRightRadius = "0";
        betDiv.style.borderTopLeftRadius = "0";
        betButton.style.backgroundColor = "#1c2a38";
        betButton.value = "Confirmer";
        nb = 1;
    }else{
        betDiv.style.transform = `translate(0,0)`;
        betDiv.style.borderTopRightRadius = "10px";
        betDiv.style.borderTopLeftRadius = "10px";
        betButton.style.backgroundColor = "var(--color-theme-primary)";
        betButton.value = "Parier";
        nb = 0;
    }
}

window.addEventListener(wheelEvent ,function(e) {
    
    if (nb % 2 != 0){betclick(nombreScroll)}
    if (e.deltaY > 0){
        if (nombreScroll < nombreMatch-1){
            nombreScroll += 1;
        };
    } else if(nombreScroll > 0) {
        nombreScroll -= 1;
    };
    
    
    container.style.zIndex = 0;
    container = document.getElementsByClassName('container')[nombreScroll];
    container.style.zIndex = 999;
    main.style.top = distance *  (Math.floor(nombreMatch / 2) - nombreScroll) + "px";
})

window.addEventListener("load" ,function(e) {
        getMaxWidth()
        var M = document.getElementsByClassName("match");
        for (i=0; i<M.length; i++){
            M[i].style.minWidth = maxwidth + "px";
        }
        
        betDiv.style.width = match.clientWidth + "px";
        transparent.style.height = window.innerHeight + "px";
        transparent.style.width = window.innerWidth + "px";
        main.style.height = window.innerHeight + "px";
        // main.style.width = window.innerWidth + "px";
})


var column = document.getElementsByClassName('column');

window.addEventListener("resize" ,function(e) {
    getMaxWidth()
    var M = document.getElementsByClassName("match");
    for (i=0; i<M.length; i++){
        M[i].style.minWidth = maxwidth + "px";
    }
    hr = $('.container');
    betDiv.style.width = match.clientWidth + "px";
    distance = next(hr).offset().top - hr.offset().top
    main.style.height = window.innerHeight + "px";
    // main.style.width = window.innerWidth + "px";
    transparent.style.height = window.innerHeight + "px";
    transparent.style.width = window.innerWidth + "px";
});

var place = null;

window.addEventListener("touchstart" ,function(e) {
    place = e.touches[0].clientY/this.window.innerHeight;
});

window.addEventListener("touchend" ,function(e) {
    place -= (e.changedTouches[0].clientY/this.window.innerHeight)
    if (place > 0.25){
        if (nombreScroll < nombreMatch-1){
            if (nb % 2 != 0){betclick(nombreScroll)}
            nombreScroll += 1;
        };
    } else if(nombreScroll > 0 && place < -0.25) {
        nombreScroll -= 1;
    };
    
    
    container.style.zIndex = 0;
    container = document.getElementsByClassName('container')[nombreScroll];
    container.style.zIndex = 999;
    main.style.top = distance *  (Math.floor(nombreMatch / 2) - nombreScroll) + "px";
});

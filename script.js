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

const nombreMatch = 7

for (var i = 0; i < nombreMatch; i++){
    var container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
    <div class="match">
        <div class="match-content">
            <div class="column">
                <div class="team team--home">
                    <h2 class="team-name">106</h2>
                </div>
            </div>
            <div class="column">
                <div class="match-details">
                    <div class="match-date">
                        25 Mars à <strong>12:40</strong>
                    </div>
                    <div class="match-score">
                        <span class="match-score-number match-score-number--leading">0</span>
                        <span class="match-score-divider">:</span>
                        <span class="match-score-number">0</span>
                    </div>
                    <div class="match-time-lapsed">
                        Poule P1
                    </div>
                    <div class="match-referee">
                        Arbitre: <strong>Nom</strong>
                    </div>
                    <input onclick="betclick(${i})" type="button" id="bet${i}" class="match-bet-place" value="Parier"/>
                </div>
            </div>
            <div class="column">
                <div class="team team--away">
                    <h2 class="team-name">T07</h2>
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
    betDiv.style.width = match.clientWidth + "px";
};

var nombreScroll = 0

var betButton = document.getElementById("bet0");

var container =  document.getElementsByClassName(`container`)[0];

container.style.zIndex = 999;

main.style.height = window.innerHeight + "px";

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
    if (e.deltaY > 0){
        if (nombreScroll < nombreMatch-1){
            nombreScroll += 1;
        };
    } else if(nombreScroll > 0) {
        nombreScroll -= 1;
    };
    
    console.log(nombreScroll)
    container.style.zIndex = 0;
    container = document.getElementsByClassName('container')[nombreScroll];
    container.style.zIndex = 999;
    main.style.top = distance *  (Math.floor(nombreMatch / 2) - nombreScroll) + "px";
})
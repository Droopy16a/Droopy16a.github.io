const ws = new WebSocket("ws://nsiprojet.netlify.app:5000");

const chat = document.getElementById("message");

ws.onopen = function(event) {
    console.log("WebSocket connected");
    chat.onkeyup = () => ws.send(chat.value);
};

ws.onmessage = function(event) {
    chat.value = event.data
};

ws.onclose = function(event) {
    console.log("WebSocket disconnected");
};

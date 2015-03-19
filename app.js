var outcomeOfGame = '{"outcome":"win","wins":0,"losses":0,"ties":0}';
var choices = ["rock", "paper", "scissors", "lizard", "spock"];
var winJSON = JSON.parse(outcomeOfGame);

var http = require("http"), server;


function gamePlay(userChoice, winJSON, choices) {
var serverChoice = choices[Math.floor(Math.random() * choices.length)];
console.log("Server Played:" +serverChoice);
if (userChoice === "rock") {
console.log("You Played:" +userChoice);
if (serverChoice === "paper" || serverChoice === "spock") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "rock") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else if (userChoice === "paper") {
console.log("You Played:" +userChoice); 
if (serverChoice === "lizard" || serverChoice === "scissors") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "paper") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else if (userChoice === "scissors") {
console.log("You Played:" +userChoice)
if (serverChoice === "spock" || serverChoice === "rock") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "scissors") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else if (userChoice === "lizard") {
console.log("You Played:" +userChoice)
if (serverChoice === "rock" || serverChoice === "scissors") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "lizard") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else if (userChoice === "spock") {
console.log("You Played:" +userChoice)
if (serverChoice === "paper" || serverChoice === "lizard") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "spock") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else {
winJSON = {};
}
return winJSON;
}


function frontPage(req, res) {
if (req.method === "POST" && (req.url === "/play/rock" || req.url === "/play/paper" ||
req.url === "/play/scissors" || req.url === "/play/lizard" || req.url === "/play/spock")) {
var divides = req.url.split("/");
var userChoice = divides[2];
winJSON = gamePlay(userChoice, winJSON, choices);
console.log("Result is as following:")
console.log(winJSON);
res.setHeader('Content-Type', 'application/json');
res.write(JSON.stringify(winJSON));
res.end();
} else {
res.writeHead(200, {"Content-Type": "text/html"});
beginPage(res);
res.write("Slect from the following<br/><br/>");
httpPost(res, "rock");
httpPost(res, "paper");
httpPost(res, "scissors");
httpPost(res, "lizard");
httpPost(res, "spock");
endPage(res);
}
}


function httpPost(res, action) {
res.write("<form method='POST' action='/play/" + action + "'>\n");
res.write("<input type='submit' value='" + action + "'>\n");
res.write("</form><br/>");
}


function beginPage(res) {
res.write("<!DOCTYPE html>\n");
res.write("<html lang='en'>\n");
res.write("<head>\n");
res.write("<meta charset='utf-8'>\n");
res.write("<title>Game</title>\n");
res.write("</head>\n");
res.write("<body>\n");
res.write("<div class='container'>");
}


function endPage(res) {
res.write("</div>");
res.write("</body>\n");
res.write("</html>\n");
res.end();
}

server = http.createServer(frontPage);
server.listen(8080);
console.log("Server listening on port 8080 http://localhost:8080");

var users = [
  {
      name: "elie",
      date: "01/06/1989",
      score: "770",
    },
    {
      name: "angelina",
      date: "06/04/1990",
      score: "613",
    },
    {
      name: "Naomie",
      date: "08/02/2018",
      score: "555",
    },
    {
      name: "lapinou",
      date: "08/02/2018",
      score: "444",
    },
    {
      name: "lapinette",
      date: "08/02/2018",
      score: "333",
    }   
];

var usersJSON = localStorage.getItem("allusers") // var qui prend le fichier dans le local storage
if (usersJSON != null) {
  users = JSON.parse(usersJSON)
}

createHTML()

function createHTML() {
  var toAppend = "";
  users.forEach(user => {
    toAppend += `
    <div class="hsplayer" width="20px" height="20px">
        <span id="hgquery">
      </div>

      <div class="date">
        ${user.date}
      </div>

      <p> 
        ${user.name} : ${user.score}
      </p>
  </div>` 
  })
  document.getElementById("highScores").innerHTML = toAppend;
}

function GoDiv()  { 
  console.log("go div ouvert")
  $(".date").css({"display":"block", "font-size" : "8px"})
}

function ciaoDiv(){
  $(".date").css({"display":"none"})
}

function addusers(theNewUserWinner) {
  console.log("addusers")
  for (let i = 0; i < users.length; i++) {
    const userComparateur = users[i];
    if (initvar.score.val > userComparateur.score) {
      users.splice(i, 1, theNewUserWinner);
      break;
    }
  }
}

function Endgame() { 
  if (initvar.score.val > users[4].score) {
    let audio2 = document.getElementById("notreprojet")
    audio2.play()
    var nameW = prompt("good game, enter your name")
  initvar.name.val = nameW
  var newusers = {date: dateText, score: initvar.score.val, name : nameW};
  addusers(newusers);
  updateLS();
  createHTML();
  }else{ 
    alert("YOU LOOSE")
  }
}

function sortByScore(a, b) {
  console.log("sortByScore open")
  if(a.score > b.score){
    return -1;
  }
  if (a.score < b.score){
    return 1;
  }
  return 0;
}

function updateLS() { // mettre à jour le LocalStorage
  console.log("update open")
  var usersJSON = JSON.stringify(users);
  localStorage.setItem("allusers", usersJSON);
}

var myDate = new Date
var theDay = myDate.getDate();
var theMonth = myDate.getMonth()+1;
var theYear = myDate.getFullYear();
var dateText = theDay + "/" + theMonth + "/" + theYear ;

const timer = {
  timer: null,
  sec: { val: 60, DOM: document.getElementById("timer") },
  start: function () {
    this.timer = setInterval(()=>{
      this.sec.val--;
      this.sec.DOM.innerHTML = this.sec.val;
      if (this.sec.val == 0) {
        Endgame()
        
        clearInterval(this.timer);
      }
    }, 1000);
  },
};

const initvar = {
score: {val: 0, DOM: document.getElementById("score") },
level: { val: 1, DOM: document.getElementById("level")},
pointToNextLevel: { val: 10, DOM: document.getElementById("pointToNextLevel")},
compteurblack: { val: 0, DOM: document.getElementById("missedClicks")},
speed: { val:2 },
timeToEscape: { val:2300 },
name: {val:""}
}

var theClickme = document.getElementById("clickme");
var theClickblack = document.getElementById("boxblack");
var domSpanStart = document.getElementById("spanstart")

domSpanStart.addEventListener("mouseover",fonctionStart )
domSpanStart.addEventListener("mouseout",fonctionmouseout )

function fonctionStart() {
  domSpanStart.innerHTML = "CLICK TO START"; 
} 

function fonctionmouseout() {
  domSpanStart.innerHTML = "CATCH ME IF YOU CAN !"; 
} 

domSpanStart.addEventListener("click", blabla);

function blabla() {
  var backconfirm = confirm("voulez vous démarrer le jeu ?");

  if (backconfirm == true) {
    let audio1 = document.getElementById("enguerre")
    audio1.play()
    domSpanStart.removeEventListener("click", blabla)
    timer.start();
    theClickme.addEventListener("click", myFunc, { capture: false }); // good click
    theClickblack.addEventListener("click", funcmissedclick, {
      capture: false,
    }); // bad click
    theClickme.style.animationDuration = initvar.speed.val + "s" // activation rotation div
    theClickme.addEventListener("mouseover", escape); // function echappement
    initvar.level.DOM.innerHTML =
    initvar.level.val; // level.val s'imprime dans l'html a la div level
  }
}

function escape() {
  setTimeout(function () {
    theClickme.style.top = Math.trunc(Math.random() * 450) + "px";
    theClickme.style.left = Math.trunc(Math.random() * 650) + "px";
  },initvar.timeToEscape.val);
}



function myFunc(e) { // fonction good click
    initvar.score.val+=10*initvar.level.val ; // le score augmente de 10 * le level
    initvar.score.DOM.innerHTML = initvar.score.val ; // j'imprime dans le DOM la valeur de mon score
    initvar.pointToNextLevel.val--
    initvar.pointToNextLevel.DOM.innerHTML = initvar.pointToNextLevel.val
    e.stopPropagation();
if (initvar.pointToNextLevel.val < 1) {
    console.log("passage de niveau")
      reset()
      upLevel()
    }

if (initvar.level.val == 6) {
  alert("you win")
  Endgame()
  updateLS();
}
}

function funcmissedclick(e) { // function bad click
    initvar.compteurblack.val+=1*initvar.level.val // ajoute 1 au missed click (*niveau)
    initvar.compteurblack.DOM.innerHTML = initvar.compteurblack.val // j'imprime missedClick dans mon html
    initvar.score.val = initvar.score.val-=1*initvar.level.val// 
    initvar.score.DOM.innerHTML = initvar.score.val
    e.stopPropagation();
}

function reset() {
  initvar.pointToNextLevel.val = 10
  initvar.pointToNextLevel.DOM.innerHTML = initvar.pointToNextLevel.val
}

function upLevel() {
 timer.sec.val += 10 // j'incrémente mon timer de 10s
 timer.sec.DOM.innerHTML = timer.sec.val // je l'imprime
 initvar.level.val++ // j'augmente le level
  initvar.level.DOM.innerHTML = initvar.level.val // je l'imprime
  initvar.timeToEscape.val = initvar.timeToEscape.val - 50 
  initvar.speed.val = initvar.speed.val+0.25
}
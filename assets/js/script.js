
function maingame() {
  this.cardGameContainer = document.getElementById("cardContainer");
  this.cardSizeOne = 134;
  this.cardMargin = 30;
  this.moblieSize = 100;
  this.mobileMargin= 10;
  this.gamerow = 4;
  this.gamecol = 4;
  this.firstcard = null;
  this.secondcard = null;
  this.chkTimeout = null;
  this.matchedcards = 0;
 this.sound = new Audio();
 this.soundbtn= document.getElementById("soundtogglebtn");
  this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
   this.playpause= function (){
      if(sound.muted){
         sound.muted= false;
     }else{
         sound.muted = true;
     }
     
}
  
 soundbtn.addEventListener("click",playpause); 

  this.arrangeCrds = function(vertical, horizontal) {
    let myarr = [];
    for (let a = 1; a < (gamerow * gamecol) / 2 + 1; a++) {
      myarr.push(a);
      myarr.push(a);
    }
    let cardShuffle = [];
    while (myarr.length > 0) {
      let cardRandom = Math.floor(Math.random() * myarr.length);
      cardShuffle.push(myarr[cardRandom]);
      myarr.splice(cardRandom, 1);
    }

    for (let i = 0; i < vertical; i++) {
      for (let j = 0; j < horizontal; j++) {
        makeCard(cardShuffle.pop(), i, j);
      }
    }
  };

  this.makeCard = function(crdname, axx, axy) {
    let card = document.createElement("img");
    card.nAme = crdname;
    card.src = "assets/images/crdbck.png"; 
    card.classList.add("cardImage");
    card.style.position = "absolute";
    card.style.left = axy * (cardSizeOne + cardMargin) + cardMargin + "px";
    card.style.top = axx * (cardSizeOne + cardMargin) + cardMargin + "px";
    if (isMobile) {
        card.style.left = axy * (moblieSize + mobileMargin) + mobileMargin + "px";
       card.style.top = axx * (moblieSize + mobileMargin) + mobileMargin + "px";
  
  }

    card.onclick = clickedCard;
    cardGameContainer.appendChild(card);
  };
  this.clickedCard = function(event) {
    gamesound("assets/cardsound.mp3");
    if (chkTimeout != null) {
      clearTimeout(chkTimeout);

      verifycard();
    }
    let card = event.target;

    if (firstcard == null) {
      card.src = "assets/images/crd" + card.nAme + ".png";
      firstcard = card;
    } else if (firstcard == card) {
      firstcard.src = "assets/images/crdbck.png";
      firstcard = null;
    } else if (secondcard == null) {
      card.src = "assets/images/crd" + card.nAme + ".png";
      secondcard = card;
      chkTimeout = setTimeout(verifycard, 1000);
    }
  };
  this.verifycard = function() {
    if (firstcard.nAme == secondcard.nAme) {
      cardGameContainer.removeChild(firstcard);
      cardGameContainer.removeChild(secondcard);
      gamesound("assets/mtsound.wav");
      matchedcards++;
      if (matchedcards >= (gamerow * gamecol) / 2) {
        winner();
        stpTime();

         
        //Update winner time.
        let playerId = sessionStorage.getItem('playerId');
        let players = getGamePlayers();
        let timeValue = document.getElementById("time").innerHTML;
        if(players) {
            players.forEach(player => {
                if(player.id == playerId) {
                    player.time = timeValue;
                }
            })

            saveUpdatedGamePlayers(players);
        }
        const div = document.createElement('div');
        div.setAttribute("id", "leadscorediv");
       //leadboard
      const leaderBoard = getLeaderBoard();
      leaderBoard.forEach(player => {
          div.innerHTML += `<div></div><span>${player.name}</span> -- <span>${player.time}</span></div>`
      });

      document.body.querySelector("#cardContainer").appendChild(div);
    
      }
    } else {
      firstcard.src = "assets/images/crdbck.png";
      secondcard.src = "assets/images/crdbck.png";
    }
    firstcard = null;
    secondcard = null;
    chkTimeout = null;
  };
  this.winner = function() {
    document.getElementById("winner").style.display = "block";
  };
 
  
  this.gamesound = function(music) {
    sound.src= music;
    sound.play();
  };
  this.arrangeCrds(gamerow, gamecol);
  
};

 
    
let startGame= document.getElementById("cardContainer");
let signUpform= document.getElementById("signinForm");
let usernameInput= document.getElementById("username");
let userdisplayname = document.getElementById("userNameDisplay")
let counter = 0;
let timelft = 0;
let time = document.getElementById("time");
let soundoffon= document.getElementById("soundtoggle");    
function collectuserInput(){
    signUpform.addEventListener("submit",function(e){
       e.preventDefault();
       signUpform.style.display= "none";
        
       startGame.style.display='block';
        // Store new user info in storage.
       let players = getGamePlayers();
       const id = Date.now();
       let newPlayer = {
            id,
            name: usernameInput.value,
            time: "0:00",
       };
       players.push(newPlayer);
       saveCurrentPlayerId(id);
       saveUpdatedGamePlayers(players);
       startTimer(usernameInput.value);
        //leadboard
      /**const div = document.createElement('div');

      const leaderBoard = getLeaderBoard();
      leaderBoard.forEach(player => {
          div.innerHTML += `<div></div><span>${player.name}</span> -- <span>${player.time}</span></div>`
      });

      document.querySelector('body').append(div);**/
     
    });
 }

  function getLeaderBoard() {
    let players = getGamePlayers();
    let sortedPlayers = players.sort(function(a, b) {
    let atime = a.time.replace(':', '.');
    let btime = b.time.replace(':', '.');
    return parseFloat(atime) - parseFloat(btime);
    })
    
    return sortedPlayers;
 }

  function saveCurrentPlayerId(playerId) {
     sessionStorage.setItem('playerId', playerId);
  }

  function saveUpdatedGamePlayers(players) {
     sessionStorage.setItem('players', JSON.stringify(players));
  }

 function getGamePlayers() {
   return sessionStorage.getItem('players') ? JSON.parse(sessionStorage.getItem('players')) : [];
 }
 
   
  function startTimer(x){
    let btn = userdisplayname;
    btn.innerHTML= `Hello ${x} click me to continue!`;
    btn.addEventListener("click",function(){
    btn.innerHTML="";
    soundoffon.style.display="block";
    maingame();
    myinterval();
    
    });
    
}
 function myinterval(){
   let myintervaltime =  setInterval(timeSet, 1000);
   return myintervaltime;
 }
 stpTime = function(){
    let t = myinterval();
     let c = clearInterval(t);
    counter = ""
   timelft = ""
    time = ""
   return c;
    }
    


function convertsec(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return min + ":" + sec;
}

function timeSet() {
  counter++;
  time.innerHTML = convertsec(timelft + counter);
}
 
 collectuserInput();

  
class Game {
  constructor(row = 4, col = 4) {
    this.cardGameContainer = document.getElementById("cardContainer");
    this.cardSizeOne = 134;
    this.cardMargin = 30;
    this.moblieSize = 80;
    this.mobileMargin = 8;
    this.gamerow = row;
    this.gamecol = col;
    this.firstcard = null;
    this.secondcard = null;
    this.chkTimeout = null;
    this.matchedcards = 0;
    this.counter = 0;
    this.timelft = 0;
    this.sound = new Audio();
    this.soundbtn = document.getElementById("soundtogglebtn");

    //Game Config
    this.configureGameSound();
  }

  configureGameSound() {
    this.soundbtn.addEventListener("click", () => {
      this.sound.muted = !this.sound.muted;
    });
  }

  isMobileBrowser() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  arrangeCrds() {
    const myarr = [];
    for (let a = 1; a < (this.gamerow * this.gamecol) / 2 + 1; a++) {
      myarr.push(a);
      myarr.push(a);
    }

    let cardShuffle = [];
    while (myarr.length > 0) {
      let cardRandom = Math.floor(Math.random() * myarr.length);
      cardShuffle.push(myarr[cardRandom]);
      myarr.splice(cardRandom, 1);
    }

    for (let i = 0; i < this.gamerow; i++) {
      for (let j = 0; j < this.gamecol; j++) {
        this.makeCard(cardShuffle.pop(), i, j);
      }
    }
  }

  makeCard(crdname, axx, axy) {
    let card = document.createElement("img");
    card.nAme = crdname;
    card.src = "assets/images/crdbck.png";
    card.classList.add("cardImage");
    card.style.position = "absolute";
    card.style.left =
      axy * (this.cardSizeOne + this.cardMargin) + this.cardMargin + "px";
    card.style.top =
      axx * (this.cardSizeOne + this.cardMargin) + this.cardMargin + "px";
    if (this.isMobileBrowser()) {
      card.style.left =
        axy * (this.moblieSize + this.mobileMargin) + this.mobileMargin + "px";
      card.style.top =
        axx * (this.moblieSize + this.mobileMargin) + this.mobileMargin + "px";
    }

    card.addEventListener("click", (e) => this.clickedCard(e));
    this.cardGameContainer.appendChild(card);
  }

  playGameSound(music) {
    // this.sound.src = music;
    // this.sound.play();
  }

  clickedCard(event) {
    this.playGameSound("assets/cardsound.mp3");
    if (this.chkTimeout != null) {
      clearTimeout(this.chkTimeout);

      this.verifycard();
    }
    let card = event.target;

    if (this.firstcard == null) {
      card.src = "assets/images/crd" + card.nAme + ".png";
      this.firstcard = card;
    } else if (this.firstcard === card) {
      this.firstcard.src = "assets/images/crdbck.png";
      this.firstcard = null;
    } else if (this.secondcard == null) {
      card.src = "assets/images/crd" + card.nAme + ".png";
      this.secondcard = card;
      this.chkTimeout = setTimeout(() => this.verifycard(), 1000);
    }
  }

  winner = function () {
    document.getElementById("winner").style.display = "block";
   };

  verifycard() {
    if (this.firstcard.nAme === this.secondcard.nAme) {
      this.cardGameContainer.removeChild(this.firstcard);
      this.cardGameContainer.removeChild(this.secondcard);
      this.playGameSound("assets/mtsound.wav");
      this.matchedcards++;
      if (this.matchedcards >= (this.gamerow * this.gamecol) / 2) {
        this.winner();
        this.stpTime();
       
        

        //Update winner time.
        let playerId = sessionStorage.getItem("playerId");
        let players = this.getGamePlayers();
        let timeValue = document.getElementById("time").innerHTML;
        if (players) {
          players.forEach((player) => {
            if (player.id === playerId) {
              player.time = timeValue;
            }
          });

          this.saveUpdatedGamePlayers(players);
        }
        const div = document.createElement("div");
        div.setAttribute("id", "leadscorediv");
        // leader-board
        const leaderBoard = this.getLeaderBoard();
        leaderBoard.forEach((player) => {
          div.innerHTML += `<div></div><span>${player.name}</span> -- <span>${player.time}</span></div>`;
        });

        document.body.querySelector("#cardContainer").appendChild(div);
      }
    } else {
      this.firstcard.src = "assets/images/crdbck.png";
      this.secondcard.src = "assets/images/crdbck.png";
    }
    this.firstcard = null;
    this.secondcard = null;
    this.chkTimeout = null;
  }

  getLeaderBoard() {
    let players = getGamePlayers();
    return players.sort(function (a, b) {
      let atime = a.time.replace(":", ".");
      let btime = b.time.replace(":", ".");
      return parseFloat(atime) - parseFloat(btime);
    });
  }

  collectuserInput(signUpform) {
    let usernameInput = document.getElementById("username");
    signUpform.style.display = "none";

    this.cardGameContainer.style.display = "block";
    // Store new user info in storage.
    let players = this.getGamePlayers();
    const id = Date.now();
    let newPlayer = {
      id,
      name: usernameInput.value,
      time: "0:00",
    };
    players.push(newPlayer);
    this.saveCurrentPlayerId(id);
    this.saveUpdatedGamePlayers(players);
    this.startTimer(usernameInput.value);
  }

  getGamePlayers() {
    return sessionStorage.getItem("players")
      ? JSON.parse(sessionStorage.getItem("players"))
      : [];
  }

  saveCurrentPlayerId(playerId) {
    sessionStorage.setItem("playerId", playerId);
  }

  // Game Initialization -> Gets user name from sign up screen
  initGame() {
    const signUpform = document.getElementById("signinForm");
    signUpform.addEventListener("submit", (e) => {
      e.preventDefault();
      this.collectuserInput(signUpform);
    });
  }

  saveUpdatedGamePlayers(players) {
    sessionStorage.setItem("players", JSON.stringify(players));
  }

  startGame() {
    let btn = document.getElementById("userNameDisplay");
    let soundoffon = document.getElementById("soundtoggle");
    btn.innerHTML = "";
    btn.parentNode.removeChild(btn);
    soundoffon.style.display = "block";
    setInterval(this.timeSet(), 1000);
    this.arrangeCrds();
    this.myinterval();
  }

  startTimer(x) {
    let btn = document.getElementById("userNameDisplay");
    btn.innerHTML = `Hello ${x} click me to continue!`;
    btn.addEventListener("click", () => this.startGame());
  }

 /* myinterval() {
    return setInterval(() => this.timeSet(), 1000);
  }**/

  convertsec(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60;
    return min + ":" + sec;
  }

  timeSet() {
    const time = document.getElementById("time");
    this.counter++;
    time.innerHTML = this.convertsec(this.timelft + this.counter);
  }

  stpTime() {
    let myt= document.getElementById("time");
    let t = this.myinterval;
    let c = clearInterval(t);
    this.counter = "";
    this.timelft = "";
    myt.innerHTML="00.00";
    
    //myt.parentNode.removeChild(myt);
    return c;
  }
 }

const game = new Game(4, 4);
game.initGame();
let cardGameContainer = document.getElementById("cardContainer");
let cardSizeOne = 134;
let cardMargin = 30;
let gamerow = 4;
let gamecol = 4;
let firstcard = null;
let secondcard = null;
 /*function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
 } // makeCard(getRandomArbitrary(1, 8), i, j);**/

function arrangeCrds(vertical, horizontal) {
    let myarr = [];
    for(let a = 1; a < (gamerow * gamecol/2) + 1; a++){
        myarr.push(a);
        myarr.push(a);
    }
    let cardShuffle=[];
    while(myarr.length > 0){
        let cardRandom = Math.floor(Math.random()* myarr.length);
        cardShuffle.push(myarr[cardRandom]);
        myarr.splice(cardRandom,1);

    }

  for (let i = 0; i < vertical; i++) {
    for (let j = 0; j < horizontal; j++) {
      makeCard(cardShuffle.pop(),i, j);
    }
  }
}
arrangeCrds(gamerow,gamecol);

function makeCard(crdname, axx, axy) {
  let card = document.createElement("img");
  card.nAme= crdname;
  card.src = "assets/images/crdbck.png"; //" + crdname + "
  card.style.position = "absolute";
  card.style.left = axy * (cardSizeOne + cardMargin) + cardMargin + "px";
  card.style.top = axx * (cardSizeOne + cardMargin) + cardMargin + "px";
  //card.classList.add("cardImage");
  card.onclick = clickedCard;
  cardGameContainer.appendChild(card);
}
 function clickedCard(event){
     let card = event.target;
     card.src = "assets/images/crd"+card.nAme+".png";

     if(firstcard == null){
         firstcard = card;
     }else if (secondcard == null){
        secondcard = card;
     
     if(firstcard.nAme == secondcard.nAme){
         cardGameContainer.removeChild(firstcard);
         cardGameContainer.removeChild(secondcard);
     } else{
         firstcard.src= "assets/images/crdbck.png";
         secondcard.src= "assets/images/crdbck.png";
     }
        firstcard = null;
        secondcard = null;
    }
    
     
 }
/*
 makeCard(1,0,0);
 makeCard(5,0,1);
 makeCard(7,0,2);
 makeCard(9,0,3);
  makeCard(8,1,0);
 makeCard(4,1,1);
 makeCard(3,1,2);
 makeCard(6,1,3);**/

//makeCard(1,0,3.8);

/*function startTimer(){
    let btn = document.getElementById("start-btn");
    btn.addEventListener("click",setInterval(timeSet, 1000));
}

let counter = 0;
let timelft = 0;
let time = document.getElementById("time");
function convertsec(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return min + ":" + sec;
}

function timeSet() {
  counter++;
  time.innerHTML = convertsec(timelft + counter);
}
//setInterval(timeSet, 1000);

    let myinput= document.getElementById("name");
    
    myinput.addEventListener("submit",function(e){
        e.preventDefault();
        console.log(myinput.value);
    }); **/

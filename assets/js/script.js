 let cardGameContainer = document.getElementById("cardContainer");
 let cardSizeOne = 134;
 let cardSizeTwo = 100;
 let cardMargin = 30;
 function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
 
 function arrangeCrds(vertical,horizontal){
     for(let i = 0; i < vertical; i++){
         for(let j = 0; j < horizontal; j++){
             makeCard( getRandomArbitrary(1,8),i,j);
         }
     }

 } 
 arrangeCrds(4,4);
 
 function makeCard(crdname,axx,axy) {
  let card = document.createElement("img");
  card.src = "assets/images/crd"+crdname + ".png";
  card.style.position = "absolute";
  card.style.left= (axy*(cardSizeOne + cardMargin) + cardMargin )+ "px";
  card.style.top= (axx * (cardSizeOne + cardMargin) + cardMargin )  + "px";
  //card.classList.add("cardImage");
  cardGameContainer.appendChild(card);
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

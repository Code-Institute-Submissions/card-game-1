let cardGameContainer = document.getElementById("cardContainer");
let card = document.createElement("img");
card.src= "assets/images/crd3.png";
card.classList.add("cardImage");
cardGameContainer.appendChild(card);







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



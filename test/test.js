function convertsec(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60;
    return min + ":" + sec;
  }

   function isMobileBrowser(browserAgent) { //stackoverflow
    return /iPhone|iPad|iPod|Android/i.test(browserAgent);
  }
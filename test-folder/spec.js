describe("Time functionality", function(){ 
    it("should return seconds to minutes", function(){
        let sec = 120;
        let ans= convertsec(sec);

        expect(ans).toBe("2:0");
    })
});
/**function convertsec(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return min + ":" + sec;
} */
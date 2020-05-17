describe("Game functions", function(){ 
    it("should return seconds to minutes", function(){
        let sec = 120;
        let ans= convertsec(sec);

        expect(ans).toBe("2:0");
    })
    it("should return minutes and seconds", function(){
        let sec = 72;
        let ans= convertsec(sec);

        expect(ans).toBe("1:12");
    })
    it("should return true", function(){
        let browserAgent = false;
        let result= isMobileBrowser(browserAgent);

        expect(result).toBe(false);
    })
});

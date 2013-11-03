describe('durationInEnglish', function () {

    it('should return "now" when duration is 0', function () {
        expect(durationInEnglish(0)).toBe('now');
    });

    it('should return "x seconds ago" when duration is less than a minute', function () {
        var now = new Date(2013, 4, 19, 11, 0, 17);
        var then = new Date(2013, 4, 19, 11, 0, 0);
        expect(durationInEnglish(now - then)).toBe('18 seconds ago');
    });

});
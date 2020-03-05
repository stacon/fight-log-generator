const expect = require('expect');

const randomID = require('./randomID').default;

describe('randomID', () => {
    it('should return default string of 7 chars', () => {
        expect(randomID().length).toBe(7);
    });

    it('should return of 10 chars', () => {
        expect(randomID(10).length).toBe(10);
    });
    it('should return string of 10 chars due to 10 being the max acceptable value', () => {
        expect(randomID(123546).length).toBe(10);
    });


    it('should return a string of 5 chars', () => {
        expect(randomID(5).length).toBe(5);
    });
});
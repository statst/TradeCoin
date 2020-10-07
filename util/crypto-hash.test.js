const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () =>{
    it('generates a SHA- 256 hashed output', () =>{
        expect(cryptoHash('value'))
        .toEqual("a0b7821a11db531982044ca5ca2e788e2d749d6b696cd3aa4172342f584f2ee1")

    });

    it('produces the same hash with the same input arguments in any order', () =>{
        expect(cryptoHash('one', 'two', 'three'))
        .toEqual(cryptoHash('three', 'two', 'one'));
    });

    it('produces a unique hash when the properties have changed on an input', () =>{
        const value = {}
        const originalHash = cryptoHash(value);
        value['a'] = 'a';

        expect(cryptoHash(value)).not.toEqual(originalHash);
    })
});
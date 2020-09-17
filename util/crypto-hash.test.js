const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () =>{
    it('generates a SHA- 256 hashed output', () =>{
        expect(cryptoHash('fgjk123'))
        .toEqual("4cf76b158a96d12a8abff7e97de288bd026e0076226e67c5fe039cc3045d9f66")

    });

    it('produces the same hash with the same input arguments in any order', () =>{
        expect(cryptoHash('one', 'two', 'three'))
        .toEqual(cryptoHash('three', 'two', 'one'));
    })
});
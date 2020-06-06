const Block = require('./block');
const {GENESIS_DATA} = require('../config')

describe('Block', ()=>{
    const timestamp = 'any-date';
    const lastHash = 'last hash value';
    const hash = 'hash value';
    const data = ['first transaction', 'data'];
    const block = new Block({
			timestamp,
			lastHash,
			hash,
			data,
		}); 

    it('has a timestamp, lastHash, hash and data', () => {
         expect(block.timestamp).toEqual(timestamp);
		 expect(block.lastHash).toEqual(lastHash);
		 expect(block.hash).toEqual(hash);
		 expect(block.data).toEqual(data);
    });

describe('genesis()', () =>{
    const genesisBlock = Block.genesis();

    it ('returns a block instance', () =>{
        expect(genesisBlock instanceof Block).toBe(true);
    })

    it('returns the genesis data', () => {
        expect(genesisBlock).toEqual(GENESIS_DATA);

    })
})
});
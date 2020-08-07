const BlockChain = require('./blockchain');
const Block = require('./block');
const Blockchain = require('./blockchain');

describe('Blockchain', () => {
	let blockchain;
	beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
	});

	it('contains a `chain` Array instance', () => {
		expect(blockchain.chain instanceof Array).toBe(true);
	});

	it('start with the genesis block', () => {
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});

	it('adds a new block to the chain', () => {
		const newData = 'foo bar';
		blockchain.addBlock({ data: newData });
		expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
	});

	describe('isValidChain()', () => {
		describe('when the chain does not start with the genesis block', () => {
			it('returns false', () => {
				blockchain.chain[0] = { data: 'fake-genesis' };
				expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
			});
		});

		describe('when the chain starts with the genesis block and has multiple blocks', () => {
			beforeEach(() => {
				blockchain.addBlock({ data: 'abc' });
				blockchain.addBlock({ data: 'xyz' });
				blockchain.addBlock({ data: 'pqr st' });
			});

			describe('and a lastHash reference has changed', () => {
				it('returns false', () => {
					blockchain.chain[2].lastHash = 'broken-hash';
					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
				});
			});
			describe('and the chain contains a block with an invalid blocks', () => {
				it('return false', () => {
					blockchain.chain[2].data = 'wrong-hash-value';
					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
				});
			});
			describe('and the chain does not contains any invalid blocks', () => {
				it('return true', () => {
					expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
				});
			});
		});
    });
    
    describe('replaceChain()', () => {
        describe('whn the new chain is not longer', () =>{
            it('does not replace the chain', () => {
                newChain.chain[0] = { new: 'chain'};
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            });
        });

        describe('when the new chain is longer', () =>{
            beforeEach(() => {
                newChain.addBlock({data: 'abc'});
                newChain.addBlock({ data: 'abxyzc' });
                newChain.addBlock({ data: 'pqr st' });
            })
            describe('and the chain is invalid',() => {
                it('does not replace the chain', () =>{
                    newChain.chain[2].hash = 'fake-hash';
                    blockchain.replaceChain(newChain.chain);
					expect(blockchain.chain).toEqual(originalChain);
                });
            });

            describe('and the chain is valid', () => {
                it('does replace a chain', () => {
                    blockchain.replaceChain(newChain.chain);
					expect(blockchain.chain).toEqual(newChain.chain);
                });
            });

        });

    

    })
});
const TransactionPool = require('./transactionPool');
const Transaction= require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
	let transactionPool, transaction, senderWallet;

	beforeEach(() => {
		transactionPool = new TransactionPool();
		senderWallet = new Wallet();
		transaction = new Transaction({
			senderWallet,
			recipient: 'fake-recipient',
			amount: 80,
		});

		describe('setTransaction()', () => {
			it('adds a transaction', () => {
				transactionPool.setTransaction(transaction);
				expect(transactionPool.transactionMap[transaction.id]).toBe(
					transaction
				);
			});
		});

		describe('existingTransaction()', () => {
			it('return an existing transaction given an input address', () => {
				transactionPool.setTransaction(transaction);
				expect(
					transactionPool.existingTransaction({
						inputAddress: senderWallet.publicKey,
					})
				).toBe(transaction);
			});
        });
        
        describe('validTransactions()', () => {
            let validTransactions;

            beforeEach(() => {
                validTransactions = [];
                errorMock = jest.fn();
                global.console.error = errorMock;

                for(let i = 0; i < 10; i++){
                    transaction = new Transaction({
                    senderWallet,
                    recipient: 'any-recipient',
                    amount: 40
                    })
                    if(i%3 === 0){
                        transaction.input.amount = 99999;
                    } else if(i%3 === 1){
                        transaction.input.signature = new Wallet().sign('foo');
                    } else {
                        validTransactions.push(transaction);
                    }
                    transactionPool.setTransaction(transaction);
                }
            })
            it('returns valid transaction', () => {
                expect(transactionPool.validTransactions()).toEqual(validTransactions);
            })

            it('logs errors for the invalid transaction', () =>{
                transactionPool.validTransactions();
                expect(errorMock).toHaveBeenCalled();
            })
        })
	});
});

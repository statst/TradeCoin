const TransactionPool = require('./transactionPool');
const Transaction= require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
    let transactionPool, transaction;

    beforeEach(() =>{
        transactionPool = new TransactionPool();
        transaction = new Transaction({
            senderWallet: new Wallet(),
            recipient: 'fake-recipient',
            amount: 80
        })
    })

    describe('setTransaction()', () =>{
        it('adds a transaction', () =>{
            transactionPool.setTransaction(transaction);
            expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
        })

    })
});
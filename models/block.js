class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }   
}

module.exports = Block;

// const block1 = new Block({
// 	data: 'some data',
// 	lastHash: 'this is the last hash',
// 	hash: 'hash value',
// 	timestamp: '06/05/20',
// });

// console.log('block1', block1)
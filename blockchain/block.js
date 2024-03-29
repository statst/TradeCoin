const { GENESIS_DATA, mine_rate } = require('../config');
const {cryptoHash} = require('../util');
const hexToBinary = require('hex-to-binary');
class Block{
    constructor({timestamp, lastHash, hash, data, nonce, difficulty}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    } 

    static genesis(){
        return new this(GENESIS_DATA);
    }  
    static mineBlock({ lastBlock, data }) {
        let hash, timestamp;
        // const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp})
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp,
            lastHash, 
            data,
            difficulty,
            nonce,
            hash
            // hash: cryptoHash(timestamp, lastHash, data, nonce, difficulty) 
    })
}
    static adjustDifficulty({originalBlock, timestamp}){
        const {difficulty} = originalBlock;
        if(difficulty < 1)
            return 1;      
        if (timestamp - originalBlock.timestamp > mine_rate) {
					return difficulty - 1;
				}
        return difficulty + 1;
    }
}

module.exports= Block;

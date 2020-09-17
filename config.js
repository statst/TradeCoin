const mine_rate = 1000;
const initial_difficulty = 3;

const GENESIS_DATA = {
    timestamp: 10,
    lastHash: 'lasthash',
    hash:'first-hash',
    difficulty: initial_difficulty,
    nonce: 0,
    data:[]
};

const STARTING_BALANCE = 1000;

module.exports = { GENESIS_DATA, mine_rate, STARTING_BALANCE};
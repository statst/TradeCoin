const express = require('express');
const Blockchain = require('./models/blockchain');

const app = express();
const blockchain = new Blockchain();

app.get('/api/blocks', (req, res) =>{
    res.json(blockchain.chain);
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`App is listening on localhost ${PORT}`)
})
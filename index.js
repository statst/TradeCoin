const bodyParser = require('body-parser');
const express = require('express');
const Blockchain = require('./models/blockchain');

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

app.get('/api/blocks', (req, res) =>{
    res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
    const { data } =req.body;
    blockchain.addBlock({ data });
    res.redirect('/api/blocks');
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`App is listening on localhost ${PORT}`)
})
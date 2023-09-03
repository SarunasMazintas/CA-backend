const express = require('express')
const cors = require('cors');
const app  = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://user1:password.1@cluster0.s2wnxr9.mongodb.net/FinalProject?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected')
    })
    .catch((e) => {
        console.log(e)
    })

const PORT = 8001;

app.use(cors());
app.use(express.json())

app.listen(PORT);

const router = require('./routes/mainRouter')

app.use('/', router);
app.use(express.static('public'));
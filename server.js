const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');

const items = require('./routes/api/items');


const app = express();
//body parser middleware

app.use(bodyParser.json());

//DB 
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose
    .connect(db)
    .then (() => console.log('mongodb connected ... '))
    .catch(err => console.log(err));


//  use Routes
app.use('/api/items',items)

//server static assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Server Started on port ${port}`));
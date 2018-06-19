const express = require('express');
const morgan = require('morgan');
const mongoClient = require('mongodb').MongoClient;
const app = express();

const port = 5000;


const URL = 'mongodb://localhost:27017';

//Settings
app.set('port', process.env.PORT || port);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Init Server
app.listen(app.get('port'), () => {    
    console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
}).on('error',(err)=>{
    if(err)
        console.log("Error: ",err.message);
});

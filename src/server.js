const express = require('express');
const morgan = require('morgan');
const port = 3000;
const app = express();
//const bodyParser = require('body-parser');


//Db
const  { mongoose } = require('./libs/database');

//Settings
const appConfig = require('./libs/configLoader').appConfig;
app.set('port', process.env.PORT || appConfig.port);


//Routes
app.use(require('./routes/sprint-routes'));

//Middlewares
app.use(morgan('dev'));
//app.use(express.json);

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());




//Init Server
app.listen(app.get('port'), () => {    
    console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
}).on('error',(err)=>{
    if(err)
        console.log("Error: ",err.message);
});

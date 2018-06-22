//const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');


//Db
const  { mongoose } = require('./libs/database');

//Settings
const appConfig = require('./libs/configLoader').appConfig;
app.set('port', process.env.PORT || appConfig.port);


//Routes
app.use(require('./routes/sprint-routes'));

//Middlewares
//app.use(express.json);
//app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});






//Init Server
app.listen(app.get('port'), () => {    
    console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
}).on('error',(err)=>{
    if(err)
        console.log("Error: ",err.message);
});

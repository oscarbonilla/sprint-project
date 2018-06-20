const 
    mongoose = require('mongoose'),
    dbConfig = require('./configLoader').databaseConfig,
    URL = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database;

mongoose.connect(URL,(err,db)=>{
    if(!err)
        console.log("Connected to MongoDB...");
    else
        console.log("Error: " + err.message);
});

module.exports = mongoose;
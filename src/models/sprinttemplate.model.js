const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const sprintTemplate = new Schema({
    name :          { type: String, required: true, trim: true },
    duration :      { type: String, required: true, trim: true },
    status :        { type: Boolean }
});

module.exports = mongoose.model('sprintTemplate',sprintTemplate);

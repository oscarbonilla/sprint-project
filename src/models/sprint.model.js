const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// const sprintTemplate = new Schema({
//     name :          { type: String, required: true, trim: true },
//     duration :      { type: String, required: true, trim: true },
//     status :        { type: Boolean }
// });

const pastSprint = new Schema({
    name :          { type: String, required: true, trim: true }, //Same as DropDown List on sprint template page
    duration :      { type: String, required: true, trim: true },
    status :        { type: String, required: true, trim: true },
    progress:       { type: String, required: true, trim: true },
    description:    { type: String, required: true, trim: true },
    notify :        { type: Boolean },
    user:           { type: String, required: true, trim: true },
    createdAt:      { type: Date, defaul: Date.now, required: true, trim: true },
    startedAt:      { type: String, required: true, trim: true },
    finishedAt:     { type: String, required: true, trim: true }
});

module.exports = mongoose.model('pastSprint',pastSprint);

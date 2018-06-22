const sprint = require('../models/sprint.model');
const util = require('util');

const sprintController = {};

sprintController.getPastSprints = async function(request, response){
    try{
        
        const sprintList = await sprint.find();        
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.json(sprintList);
        

        console.log('getPastSprints API requested: Past sprints: ' + util.inspect(sprintList));
        // response.json({
        //     "message" : "getPastSprints API works..."
        // })
    }catch(e){
        console.log("Error: " + e.message);
    }
};

sprintController.getPastSprintFiltered = (request, response) => {

};

sprintController.createSprint = async (request, response) => {
    let answer = { status: 0, message: "Sprint was not created", data: null };

    try{ 
        const oSprint = new sprint(request.body);
        await oSprint.save();
        console.log('createSprint API requested: \nSprint Schema created: ', oSprint);
        
        answer = { status: 1, message: "Sprint create successfully...", data: oSprint };
        // response.json({
        //     "message" : "createSprint API requested."
        // })
        //response.json(answer);
    }catch(e){
        answer = { status: -1, message: e.message, data: null };
        console.log("Error: " + e.message);        
    }
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.json(answer.data);
};

sprintController.deleteAllPastSprints = async function(request, response){
    let answer = { status: 0, message: "", data: null };

    try{ 
        
        await sprint.remove();
        console.log('deleteAllPastSprints API requested...');
        
        answer = { status: 1, message: "Sprints deleted successfully...", data: null };        
    }catch(e){
        answer = { status: -1, message: e.message, data: null };
        console.log("Error: " + e.message);        
    }
    
    response.setHeader('Access-Control-Allow-Origin', '*');    
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    response.json(answer);
};

sprintController.DeletePastSprintById = (request, response) => {
    sprint.findByIdAndRemove()
};

module.exports = sprintController;
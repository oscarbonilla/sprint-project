const sprint = require('../models/sprint.model');
const util = require('util');

const sprintController = {};

sprintController.getPastSprints = async function(request, response){
    try{
        
        const sprintList = await sprint.find();        
        
        setHeaderResponse(response);      
        
        response.json(sprintList);
        

        //console.log('getPastSprints API requested: Past sprints: ' + util.inspect(sprintList));
        console.log('getPastSprints API requested: Past sprints... ');
        // response.json({
        //     "message" : "getPastSprints API works..."
        // })
    }catch(e){
        console.log("Error: " + e.message);
    }
};

sprintController.getPastSprintsByUser = async function(request, response){
    try{
        let user = request.params.user;

        const sprintList = await sprint.find({user: user});        
        
        setHeaderResponse(response);      
        
        response.json(sprintList);
        
        console.log('getPastSprints API requested, Past sprints for user:', user);        
    }catch(e){
        console.log("Error: " + e.message);
    }
};

sprintController.getPastSprintFiltered = (request, response) => {

};

sprintController.createSprint = async (request, response) => {
    let answer = { status: 200, message: "Sprint was not created", data: null };

    try{
        const oSprint = new sprint(request.body);
        await oSprint.save();
        
        console.log('createSprint API requested: \nSprint Schema created: ' ,oSprint);        
        
        answer = { status: 200, message: "Sprint create successfully...", data: oSprint };                
    }catch(e){
        answer = { status: 400, message: e.message, data: null };
        console.log("Error: " + e.message);        
    }
    setHeaderResponse(response);      
    response.json(answer);
};

sprintController.deleteAllPastSprints = async function(request, response){
    let answer = { status: 200, message: "", data: null };

    try{ 
        
        await sprint.remove();
        console.log('deleteAllPastSprints API requested...');
        
        answer = { status: 200, message: "Sprints deleted successfully...", data: null };        
    }catch(e){
        answer = { status: 400, message: e.message, data: null };
        console.log("Error: " + e.message);        
    }
    
    setHeaderResponse(response);      

    response.json(answer);
};

sprintController.deletePastSprintsByUser = async function(request, response){
    let answer = { status: 200, message: "", data: null };

    try{ 
        let user = request.params.user;
        
        //await sprint.deleteMany({user: user});
        await sprint.remove({user: user});
        console.log('deletePastSprintsByUser API requested for user: ', user);
        
        answer = { status: 200, message: "Past Sprints deleted successfully.", data: null };        
    }catch(e){
        answer = { status: 400, message: e.message, data: null };
        console.log("Error: " + e.message);        
    }
    
    setHeaderResponse(response);      

    response.json(answer);
};

sprintController.ManageOptionMethod = (request, response) => {
    const strMethod = request.get('access-control-request-method');
  //console.log("REQUEST HEADER Method: ", strMethod)
  setHeaderResponse(response);    
  if (strMethod === 'POST') {
    console.log("OPTIONS Method => HEADER Request Method : ", strMethod)        
    response.send({status: 200});
    
  } else if (strMethod === 'DELETE') {
    console.log("OPTIONS Method => HEADER Request Method : ", strMethod)
    //this.deleteAllPastSprints(req, res, next);    
    response.send({status: 200});
  }
};

const setHeaderResponse = (res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }

module.exports = sprintController;
const sprinttemplate = require('../models/sprinttemplate.model');

SprintTemplateController = {};

SprintTemplateController.getSprintTemplates = async function(request, response, next){
    try{
        
        const templates = await sprinttemplate.find();        
        
        setHeaderResponse(response);      
        
        response.json(templates);
                
        console.log('getSprintTemplates API requested..');        
    }catch(e){
        response.json({
            status: 404,
            message: e.message
        })
        console.log("Error: " + e.message);
    }
};


SprintTemplateController.createTemplates = async function (request, response, next) {

    console.log("SprintTemplateController.createTemplates.....");

    try {
        const templates = await sprinttemplate.insertMany([
            { name: "Instant",  duration: 5, status: true},
            { name: "Very Short",  duration: 300, status: true},
            { name: "Short",  duration: 600, status: true},
            { name: "Pomodoro",  duration: 1500, status: true},
            { name: "Long",  duration: 2700, status: true},
            { name: "Very Long",  duration: 3600, status: true},
        ]);       

        setHeaderResponse(response);      

        response.json({
            status: 200,
            data: templates
        })
    }
    catch (err) {
        response.json({
            status: 404,
            message: "Error:" + err.message
        })
        console.log(err);
    }
}

SprintTemplateController.deleteTemplates = async function (request, response, next) {

    console.log("SprintTemplateController.deleteTemplates.....");

    try {
        await sprinttemplate.remove();     

        setHeaderResponse(response);      

        response.json({
            status: 200,
            message: "Sprint templates deleted...",
            data: null
        })
    }
    catch (err) {
        response.json({
            status: 404,
            message: "Error:" + err.message
        })
        console.log(err);
    }
}

const setHeaderResponse = (response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
  }

module.exports = SprintTemplateController;

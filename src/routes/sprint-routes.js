const 
    express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');    


router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const configRoutes = require('../libs/configLoader').apiRoutesConfig;
const mainApiRoute = configRoutes.apiSprints
const sprintCtrl = require('../controllers/sprint.controller');
const templateCtrl = require('../controllers/sprinttemplate.controller');

let msg = "Welcome page!";
//About Page
router.get('/', (request, response) => {
    //response.send("Welcome page!");
    
    console.log(msg,'requested.');
    response.json({
        "message":msg
    })
});
router.post('/test', (request, response) => {    
    console.log('Test - Body: ', request.body);

    response.json({
        "message":"Test - Retreiving the body page..."
    })
});

//Past Sprint
 router.get(mainApiRoute, sprintCtrl.getPastSprints);
 router.post(mainApiRoute, sprintCtrl.createSprint); 
 router.options(mainApiRoute, sprintCtrl.ManageOptionMethod);
 router.delete(mainApiRoute, sprintCtrl.deleteAllPastSprints); 
 
 router.get(mainApiRoute + '/:user', sprintCtrl.getPastSprintsByUser); 
 router.delete(mainApiRoute + '/:user', sprintCtrl.deletePastSprintsByUser);
 router.options(mainApiRoute + '/:user', sprintCtrl.ManageOptionMethod);
  

 //Sprint Templates
 router.get('/api/templates', templateCtrl.getSprintTemplates); 
 router.post('/api/templates', templateCtrl.createTemplates); 
 router.delete('/api/templates', templateCtrl.deleteTemplates); 
 
 

module.exports = router;
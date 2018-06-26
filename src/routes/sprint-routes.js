const 
    express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');    


router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const configRoutes = require('../libs/configLoader').apiRoutesConfig;
const mainApiRoute = configRoutes.api;
const sprintCtrl = require('../controllers/sprint.controller');

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
    //response.send("Welcome page!");    

    // let body = '';
    // request.on('data',chunk => {         
    //     body += chunk.toString();
    //     console.log('Body: ' + body);
    // });
    // request.on('end',() => { 
    //     console.log('Test body: ' + body);
    // });

    //console.log('Test - Body: ', request.body,'\ntest - Query: ', request.query);

    response.json({
        "message":"Test - Retreiving the body page..."
    })
});

//Sprint pages
//router.get(mainApiRoute+'/');
 router.get(mainApiRoute+'/sprints', sprintCtrl.getPastSprints);
 router.post(mainApiRoute+'/sprint', sprintCtrl.createSprint);
 router.delete(mainApiRoute+'/sprints', sprintCtrl.deleteAllPastSprints);
 router.options(mainApiRoute+'/sprints', sprintCtrl.deleteAllPastSprints);
 

module.exports = router;
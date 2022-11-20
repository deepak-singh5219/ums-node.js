const express =  require('express');
const router = express.Router();
const {home,createUser,allusers,updateuser,deleteuser} = require('../controllers/usercontrollers');


router.get('/', home);
router.post('/createuser', createUser);
router.get('/allusers',allusers);
router.put('/updateuser/:id',updateuser);
router.delete('/deleteuser/:id',deleteuser);



module.exports = router;
const expree = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');

const router = expree.Router()


router.route("/").post(registerUser);
router.route("/login").post(authUser);



module.exports=router;
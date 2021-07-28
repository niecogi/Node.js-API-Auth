const router = require('express').Router();
const User = require('../model/User');

// we need a body parser
// and we need some time to submit to database so we need a
//async method
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password      
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);

    }catch(err){
        res.status(400).send("HOLA");
    }
   
});

/*
router.post('/login',(req, res) => {

})
*/
module.exports = router;
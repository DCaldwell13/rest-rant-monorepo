const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt');

const { User } = db;

router.post('/', async (res, req) => {
   console.log('Logging in with', res,body)
   const { email, password } = req.body
   let user = await User.findOne({
    where: {
        email
    }
   })
   if(!user || !await bcrypt.compare(password, user.passwordDigest)) {
    res.statusCode(404).json({
        message: 'Could not find user with the provided credentials'
    }) 
   } else {
    res.json({ user: {...user, passwordDigest: ''} })
   }
   console.log(user);
})

module.exports = router;
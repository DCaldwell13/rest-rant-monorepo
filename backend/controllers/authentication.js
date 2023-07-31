const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');

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
    //pass token stuff here
    const { value } = await jwt.encode(process.envJWT_SECRET, { userID: user.userID })
    res.status(200).json({ user, token: value })
   }
   console.log(user);
})

router.get('/profile', async (req, res) => {
    try {
        const [authMethod, token] = req.headers.authorization.split(' ');
        
        if(authMethod === 'Bearer') {
            const { value: {userId} } = await jwt.decode(process.env.JWT_SECRETS, token)
            let user = await User.findOne({
                where: {
                    userID
                }
            })
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'user could not be found'})
            }
          }
        } catch (error){
            res.status(500).json({ message: 'Server did an oppsie'})
        }
});

module.exports = router;
const db = require("../models");
const jwt = require('json-web-token');

const { Place, Comment, User } = db

async function defineCurrentUser(req, res, next){
    let currentUser;
    try{
        const [authMethod, token] = req.headers.authorization.split(' ');
        if(authMethod === 'Bearer') {
            const result = await jwt.decode(process.env.JWT_SECRETS, token);
            const { userId } = result.value;
            currentUser = await User.findOne({
                where: { 
                    userID
                }
            });
            req.currentUser = currentUser;
        } 
        next();
    }catch(e){
        currentUser = null;
        next();
    }




}

module.exports = defineCurrentUser;
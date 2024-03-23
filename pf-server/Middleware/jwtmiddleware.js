const jwt = require('jsonwebtoken')

const jwtmiddleware = (req,res,next)=>{
    console.log('Inside jwtmiddleware');
    
    if (!req.headers['authorization']) {
        return res.status(401).json('Authorization header missing');
    }
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token,'superSecretKey123')
        console.log(jwtResponse);
        req.user = jwtResponse.userId
        next()
    }catch(err){
        res.status(401).json('Authorisation failed!!! Please login...')
    }
}

module.exports = jwtmiddleware
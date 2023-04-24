const { verify } = require('jsonwebtoken');
const User = require('../models/auth');

async function auth(req,res,next) {
    try {
        const token = req.header('authorization').split(' ')[1];
        const decoded = verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id);
        const tokenExist = user.tokens.includes(token);
        if (!user || (user && !tokenExist)) {
            throw new Error('Authentication Failed!');
        };
        req.user = user;
        req.token = token;
        next();
    } 
    catch (error) {
        res.status(400).send({ error, message: 'Please Authenticate!'});
    };  
};

module.exports = auth;
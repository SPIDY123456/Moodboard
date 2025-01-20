const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
        } catch (err) {
            console.error('Token is invalid ',err.message);
             res.status(401).json({ message: 'Token is not valid',});
        }
    }
    if(!token){
         res.status(401).json({ message: 'No token, authorization denied' });
    }

}

module.exports = {protect};
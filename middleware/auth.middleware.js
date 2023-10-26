const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) 
            res.status(403).json({ message: 'Пользователь не авторизован' });
        
        const decodedData = jwt.verify(token, config.get('jwtSecret')) ;
        req.user = decodedData;
        next();

    } catch (e) {
        return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
}  
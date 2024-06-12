const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const header = req.header('Authorization');
    const token = header.split(" ")[1];

    if (!token) return res.status(401).json({error: 'Access denied'});

    try {
        const jwtKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtKey);
        req.userId = decoded.id;
        next();
    } catch (e) {
        res.status(401).json({error: 'Invalid token'});
    }
}

module.exports = verifyToken;
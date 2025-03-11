const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        // decrypring jwt_token
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decryptedToken && decryptedToken?.userId) {
            req.userId = decryptedToken.userId;
            next();
        } else {
            res.status(200).json({
                success: false,
                statusode: 401,
                message: "Not Authroized"
            })
        }
    } catch (err) {
        console.log("Error in authMiddleware:", err);
        res.status(200).json({
            success: false,
            statusode: 401,
            message: "Not Authroized"
        })
    }
}

module.exports = authMiddleware;
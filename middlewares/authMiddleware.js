const authMiddleware = (req, res, next) => {
    if (req.query) {
        if (req.query.token === 'validToken') {
            next();
        } else {
            res.status(200).json({
                success: false,
                statusode: 401,
                message: "Not Authroized"
            })
        }
    } else {
        res.status(200).json({
            success: false,
            statusode: 401,
            message: "Not Authroized"
        })
    }
}

module.exports = authMiddleware;
const authMiddleware = require('./middlewares/authMiddleware');

const router = require('express').Router();

router.get('/health', (req, res) => {
    console.log("HEALTH api call");

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "API is working fine"
    });
});

router.get('/users', authMiddleware, (req, res) => {
    const users = [
        {
            _id: "asdiyasd8",
            name: "John Doe",
            email: "john.doe@example.com"
        },
        {
            _id: "asdiyasd9",
            name: "Jane Doe",
            email: "jane.doe@example.com"
        },
        {
            _id: "asdiyasd10",
            name: "Adam Doe",
            email: "adam.doe@example.com"
        }
    ]

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully",
        count: users?.length,
        data: users
    });
})

router.post('/addUser', (req, res) => {
    console.log("addUser API call", req.body);

    if (req.body?.user) {
        console.log("user data: ", req.body.user);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User added successfully",
            data: req.body.user
        });
    } else {
        console.log("required params missing");
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: "required params missing"
        });
    }
})

router.delete('/deleteUser', (req, res) => {
    console.log("deleteUser API call", req.query);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
        query: req.query
    })
})

module.exports = router;
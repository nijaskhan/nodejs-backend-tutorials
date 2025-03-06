const UserModel = require("../models/UserModel");

module.exports = {
    addUser: (req, res) => {
        try {
            const { name, username, email, age, gender } = req.body;

            if (name && username && email && age) {
                const newUser = new UserModel({
                    name,
                    username,
                    email,
                    age,
                    gender
                });
                newUser.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "User added successfully",
                        });
                    })
                    .catch((error) => {
                        console.log("error: ", error);

                        if (error?.code === 11000) {
                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "User with same name already exists!"
                            });
                        } else {
                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "User adding failed"
                            });
                        }
                    })
            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    getUsers: async (req, res) => {
        try {
            // conditions:
            // fetch users 18+ age
            // sort by gender field
            const users = await UserModel.aggregate([
                {
                    '$match': {
                        'age': {
                            '$gte': 18
                        }
                    }
                }, {
                    '$sort': {
                        'gender': 1
                    }
                }, {
                    '$match': {
                        'gender': 'male'
                    }
                }
            ]);

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Users fetched successfully",
                count: users.length,
                data: users
            })

        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    }
}
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// bcrypt: password hashing algorithm

module.exports = {
    addUser: async (req, res) => {
        try {
            const { name, username, email, age, gender, password } = req.body;

            if (name && username && email && age && password) {
                const encryptedPassword = await bcrypt.hash(password, 10);

                const newUser = new UserModel({
                    name,
                    username,
                    email,
                    password: encryptedPassword,
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

            /* aggregation method */
            // const users = await UserModel.aggregate([
            //     {
            //         '$match': {
            //             'isDeleted': false
            //         }
            //     }, {
            //         '$lookup': {
            //             'from': 'products',
            //             'localField': 'cart.productId',
            //             'foreignField': '_id',
            //             'as': 'products'
            //         }
            //     }, {
            //         '$sort': {
            //             'gender': 1
            //         }
            //     }
            // ]);

            /* using find method */
            const users = await UserModel
                .find({ isDeleted: false })
                .populate('cart.productId')
                .lean();

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Users fetched successfully",
                count: users.length,
                data: users,
            });

        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    addProductToUserCart: (req, res) => {
        try {
            const { userId, product } = req.body;
            const { productId, quantity } = product;

            if (userId && productId && quantity) {

                UserModel.updateOne(
                    { _id: userId },
                    {
                        $push: {
                            cart: product
                        }
                    }
                ).then((response) => {
                    if (response?.modifiedCount !== 0) {
                        res.status(200).json({
                            success: true,
                            statusCode: 200,
                            message: "Product added to cart successfully"
                        })
                    } else {
                        res.status(200).json({
                            success: false,
                            statusCode: 400,
                            message: "Product adding to cart failed"
                        })
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
            console.log("error: ", err);
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (email && password) {
                const userFound = await UserModel.findOne({ email: email }).lean();

                if (userFound) {
                    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

                    if (isPasswordMatch) {
                        delete userFound.password;

                        // creating a jwt token for authentication purposes
                        const jwtSecret = process.env.JWT_SECRET;
                        const token = jwt.sign(
                            { userId: userFound?._id },
                            jwtSecret,
                            { expiresIn: '5d' }
                        )

                        return res.status(200).json({
                            success: true,
                            statusCode: 200,
                            message: "User Login successfully",
                            token: token,
                            user: userFound
                        });
                    } else {
                        return res.status(200).json({
                            success: false,
                            statusCode: 401,
                            message: "Incorrect password!"
                        });
                    }

                } else {
                    return res.status(200).json({
                        success: false,
                        statusCode: 401,
                        message: "User does not exist!"
                    });
                }
            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

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
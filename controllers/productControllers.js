const ProductModel = require("../models/ProductModel");

module.exports = {
    addProduct: (req, res) => {
        try {
            // const name = req.body.name
            // const price = req.body.price
            // const size = req.body.size
            const { brand, name, price, size } = req.body;

            if (name && price && size && brand) {
                const newProduct = new ProductModel({
                    brand,
                    name,
                    price,
                    size
                });
                newProduct.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Product added successfully",
                        });
                    })
                    .catch((error) => {
                        console.log("error: ", error);

                        if (error?.code === 11000) {
                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "Product with same category already exists!"
                            });
                        } else {
                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "Product adding failed"
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
    getProducts: async (req, res) => {
        try {
            const products = await ProductModel
                .find({ isDeleted: false })
                .lean();

            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Products retrieved successfully",
                count: products.length,
                data: products
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            })
        }
    },
    updateProduct: (req, res) => {
        try {
            const { productId, updatedData } = req.body;

            if (productId) {
                ProductModel.updateOne(
                    { _id: productId },
                    updatedData
                    // {
                    // name: name,
                    // size: updatedData?.size
                    // }
                ).then((response) => {
                    // console.log("response: ", response);

                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: "Product updated successfully"
                    });
                })
                    .catch((err) => {
                        console.log("err: ", err);
                        return res.status(200).json({
                            success: false,
                            statusCode: 400,
                            message: "Product updating failed",
                            error: err
                        });
                    })

            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

        } catch (err) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            })
        }
    },
    // soft_delete method
    deleteProduct: (req, res) => {
        try {
            const { productId } = req.query;

            if (productId) {
                ProductModel.updateOne(
                    { _id: productId },
                    {
                        $set: {
                            isDeleted: true
                        }
                    }
                ).then((response) => {
                    if (response?.modifiedCount != 0) {
                        return res.status(200).json({
                            success: true,
                            statusCode: 200,
                            message: "Product deleted successfully"
                        });
                    } else {
                        return res.status(200).json({
                            success: false,
                            statusCode: 400,
                            message: "Product deleting failed",
                            error: err
                        });
                    }
                }).catch(err => {
                    console.log("err: ", err);
                    return res.status(200).json({
                        success: false,
                        statusCode: 400,
                        message: "Product deleting failed",
                        error: err
                    });
                })

            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

        } catch (err) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            })
        }
    },
    // hard_delete method
    deleteProductFromDatabase: async (req, res) => {
        try {
            const { productId } = req.query;

            if (productId) {
                const response = await ProductModel.deleteOne({ _id: productId });
                if (response.deletedCount != 0) {
                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: "Product deleted successfully"
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        statusCode: 400,
                        message: "Product deleting failed"
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
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            })
        }
    }
}
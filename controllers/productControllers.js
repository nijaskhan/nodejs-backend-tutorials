const ProductModel = require("../models/ProductModel");

module.exports = {
    addProduct: (req, res) => {
        try {
            // const name = req.body.name
            // const price = req.body.price
            // const size = req.body.size
            const { name, price, size } = req.body;

            if (name && price && size) {
                const newProduct = new ProductModel({
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

                        return res.status(200).json({
                            success: false,
                            statusCode: 400,
                            message: "Product adding failed"
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
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    getProducts: async (req, res) => {
        try {
            const products = await ProductModel.find({ isDeleted: false });

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
    }
}
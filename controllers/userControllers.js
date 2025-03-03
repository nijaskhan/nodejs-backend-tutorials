const products = [
    {
        _id: 2,
        "name": "Shirt",
        "size": "M",
        "price": "1299"
    },
    {
        _id: 3,
        "name": "Pants",
        "size": "XL",
        "price": "1999"
    }
];

module.exports = {
    addProduct: (req, res) => {
        try {
            console.log("api call: ", req?.body);

            products.push(req.body);

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Product added successfully",
                data: req.body
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    getProducts: (req, res) => {
        try {
            console.log("products call: ", products);

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Products retrieved successfully",
                count: products?.length,
                data: products
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    updateProduct: (req, res) => {
        try {
            console.log("reqBody: ", req.body);

            const productIndex = products.findIndex((product) => product._id === req.body.productId);
            if (productIndex === -1) {
                return res.status(200).json({
                    success: false,
                    statusCode: 404,
                    message: "Product not found"
                });
            } else {
                products[productIndex] = req.body.updatedData;

                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "Product updated successfully",
                    data: products[productIndex]
                });
            }

        } catch (e) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    }
}
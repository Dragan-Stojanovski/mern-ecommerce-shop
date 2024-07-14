const ProductSchema = require("../../models/product/productSchema");

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, category, marketingLabel, productImages } = req.body;

        // Validate that the price is a number
        const numericPrice = Number(price);
        if (isNaN(numericPrice)) {
            return res.status(400).json({ message: "Price must be a number" });
        }

        const product = new ProductSchema({
            name,
            price: numericPrice,
            description,
            category,
            marketingLabel,
            productImages
        });

        await product.save();

        res.status(201).json({
            id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            marketingLabel: product.marketingLabel,
            productImages: product.productImages
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation error", errors: validationErrors });
        }

        res.status(500).json({ message: "Error in saving product", error: error.message });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const { name, price, description, category, marketingLabel, productImages } = req.body;

        const filter = {};
        if (name !== null) filter.name = name;
        if (price !== null) filter.price = price;
        if (description !== null) filter.description = description;
        if (category !== null) filter.category = category;
        if (marketingLabel !== null) filter.marketingLabel = marketingLabel;
        if (productImages !== null) filter.productImages = productImages;

        const products = await ProductSchema.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching products", error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await ProductSchema.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in deleting product", error: error.message });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await ProductSchema.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching product", error: error.message });
    }
};
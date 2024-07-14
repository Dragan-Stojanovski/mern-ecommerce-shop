const CategorySchema = require("../../../models/content/categorySchema")

exports.createCategory = async (req, res) => {
    try {
        const { label, path } = req.body; 

        const categoryExists = await CategorySchema.findOne({ label: label });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new CategorySchema({
            label,
            path
        });

        await category.save();

        res.status(201).json({
            id: category._id,
            label: category.label,
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation error", errors: validationErrors });
        }

        res.status(500).json({ message: "Error in saving category", error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await CategorySchema.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching categories", error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        const category = await CategorySchema.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in deleting category", error: error.message });
    }
};

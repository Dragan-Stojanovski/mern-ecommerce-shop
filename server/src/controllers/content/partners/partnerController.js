const PartnerSchema = require("../../../models/content/partnerSchema");

exports.createPartner =  async (req,res) => {
    try{
        const {imageUrl, imageAltText} = req.body;

        const partner = new PartnerSchema({
            imageUrl,
            imageAltText
        });

        await partner.save();

        res.status(201).json({
            id:partner._id,
            imageUrl:partner.imageUrl,
            imageAltText:partner.imageAltText
        });

    }catch(error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation error", errors: validationErrors });
        }

        res.status(500).json({ message: "Error in saving partner", error: error.message });
    }
};

exports.getPartners = async (req, res) => {
    try {
        const partners = await PartnerSchema.find({});
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching partners", error: error.message });
    }
};

exports.deletePartner = async (req, res) => {
    try {
        const { id } = req.params;
        
        const partner = await PartnerSchema.findByIdAndDelete(id);

        if (!partner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        res.status(200).json({ message: "Partner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in deleting partner", error: error.message });
    }
};

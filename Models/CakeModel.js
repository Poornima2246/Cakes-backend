 
import mongoose from "mongoose";

const CakeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    mainImage: { type:  File, required: true }, // Main image filename
    addImage1:{type: File, required: true},
    addImage2:{type: File, required: true},
    category: { type: String, required: true },

      // additionalImages: [{ type: String }], // Array of additional image filenames
});

const CakeModel = mongoose.models.cake || mongoose.model("cake", CakeSchema);

export default CakeModel;


 
//models/Products.ts
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  details: { type: String },
  images: { 
    type: [String], 
    validate: [arrayLimit, 'Maximum 4 images allowed'] 
  },
  color: { 
    type: String,
    match: /^#([A-Fa-f0-9]{6})$/ 
  }
}, { timestamps: true });

function arrayLimit(val: string[]): boolean {
    return val.length <= 4; // Max 4 images
}

export default mongoose.models.Product || mongoose.model('Product', productSchema);
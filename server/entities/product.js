import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    price: Number,
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
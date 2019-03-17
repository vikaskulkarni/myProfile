import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    address: String,
}, { timestamps: true });

export default mongoose.model('Customer', CustomerSchema);
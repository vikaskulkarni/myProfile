import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
}, { timestamps: true });

export default mongoose.model('Profile', ProfileSchema);
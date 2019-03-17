import mongoose from 'mongoose';

const CountersSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
}, { timestamps: true });

CountersSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};

export default mongoose.model('Counters', CountersSchema);
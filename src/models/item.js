const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    name: { type: String, required: true, trim: true }, 
    description: { type: String, trim: true, lowercase: true }, 
    quantity: { type: Number, required: true, trim: true }, 
    price: { type: Number, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

const Item = model('Item', itemSchema);
module.exports = Item;
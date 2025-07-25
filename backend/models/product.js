const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  image_url: { type: String },
  description: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema); 
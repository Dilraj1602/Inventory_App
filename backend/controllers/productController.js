const Product = require('../models/product');

exports.addProduct = async (req, res) => {
  const { name, type, sku, quantity, price } = req.body;
  if (!name || !type || !sku || typeof quantity !== 'number' || typeof price !== 'number') {
    return res.status(400).json({ message: 'Missing or invalid required fields: name, type, sku, quantity (number), price (number).' });
  }
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ id: product._id, message: 'Product added successfully.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProductQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Quantity updated.', product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();
    res.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 
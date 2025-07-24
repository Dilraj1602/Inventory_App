const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Inventory Management API');
});

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use('/api/v1', authRoutes);
app.use('/api/v1/products', productRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
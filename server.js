const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orders');
const productRoutes = require("./routes/products");




dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use("/products", productRoutes);

app.get('/products', (req, res) => {
    res.json([
        { _id: '1', name: 'Product A', price: 10, image: 'link-to-image', description: 'A great product' },
        { _id: '2', name: 'Product B', price: 20, image: 'link-to-image', description: 'Another product' },
    ]);
});

app.post('/orders', (req, res) => {
    const { name, email, address, paymentOption, productId } = req.body;

    // Log order data
    console.log('New Order:', { name, email, address, paymentOption, productId });

    // Respond with success
    res.status(201).json({ message: 'Order received!' });
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));

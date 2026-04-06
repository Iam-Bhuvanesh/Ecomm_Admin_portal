const express = require('express');
const dotenv = require('dotenv');

// Load environment variables immediately
dotenv.config();

const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const posterRoutes = require('./routes/posterRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posters', posterRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
